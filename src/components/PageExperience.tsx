'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { CustomEase } from 'gsap/CustomEase'
import { getDevice } from '@/lib/device'
import { runSplitting } from '@/lib/splitting'
import { refreshAOS, destroyAOS } from '@/lib/aos'
import type { Cleanup } from '@/lib/marquee'
import { initCursor } from '@/lib/cursor'
import { runLoader } from '@/lib/loader'
import { anclarArriba, revelarEntrada } from '@/lib/entrada'
import { initScrollState, initSectionWatcher } from '@/lib/scrollState'
import { initMenu } from '@/lib/menu'
import type { Smoother } from '@/lib/menu'
import { initRevealOnEnter, initFooterReveal } from '@/lib/reveal'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase)

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // Acceso desde la consola para depurar, igual que en la home
  window.__gsap = gsap
  window.__ScrollTrigger = ScrollTrigger
}

// La coreografía de cualquier página que no sea la home: la ficha de proyecto, /sobre,
// /proyectos y /contacto. Ninguna fija secciones —son documentos que scrollean y cada
// bloque entra al aparecer—, y todas abren con la misma apertura en D de la portada,
// para que la llegada no se sienta un corte.

const REVEALS = ['[data-reveal]']

export type PageExperienceProps = {
  /** El contenido que mueve el scroll suave, por id */
  content: string
}

function playCoverIntro(): gsap.core.Timeline {
  const tl = gsap.timeline()
  // La D se abre de izquierda a derecha. El recorte va por variables CSS, igual que
  // en el hero: animar el string del clip-path o escribirlo desde un onUpdate se
  // rompe en cuanto ScrollTrigger refresca (ver clipTween en HomeExperience).
  tl.fromTo('.project-hero__shape', { '--pr': '100%' }, { '--pr': '0%', duration: 1, ease: 'power3.inOut' }, 0)
  tl.from('.project-hero__inner > *', { autoAlpha: 0, y: '4rem', duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0.45)
  return tl
}

export default function PageExperience({ content }: PageExperienceProps) {
  useEffect(() => {
    const device = getDevice()
    const cleanups: Cleanup[] = []
    let smoother: Smoother | null = null
    let intro: gsap.core.Timeline | null = null
    let reveals: gsap.core.Tween[] = []
    let footer: gsap.core.Timeline | null = null

    if (device.isMobile) {
      const setVh = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
      setVh()
      setTimeout(setVh, 1000)
    }

    runSplitting()
    // Recargar a mitad de página y aparecer ahí de golpe se ve raro en todas las
    // vistas, no sólo en la home: se entra siempre desde la portada.
    cleanups.push(anclarArriba())
    cleanups.push(initScrollState())
    cleanups.push(initCursor())

    if (device.isDesktop) {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content,
        smooth: 2,
        normalizeScroll: true,
        ignoreMobileResize: true,
        effects: true,
      })
      footer = initFooterReveal()
    }
    cleanups.push(initSectionWatcher())
    cleanups.push(initMenu({ smoother, menuMark: null }))

    const arrancar = () => {
      intro = playCoverIntro()
      reveals = initRevealOnEnter(REVEALS)
      refreshAOS()
      ScrollTrigger.refresh()
    }

    // El preloader es de la primera carga del sitio. Si se llegó navegando desde la
    // home ya está en 'first-done' y volver a mostrarlo sería tapar la página por gusto.
    if (document.body.dataset.load === 'first-done') arrancar()
    else
      cleanups.push(
        runLoader({
          onDone: () => {
            revelarEntrada()
            arrancar()
          },
        })
      )

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      cleanups.forEach((fn) => fn())
      destroyAOS()
      if (intro) intro.kill()
      if (footer) footer.kill()
      reveals.forEach((t) => t.kill())
      ScrollTrigger.getAll().forEach((st) => st.kill())
      if (smoother) smoother.kill()
    }
  }, [content])

  return null
}
