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

// La ficha de proyecto no fija ninguna sección: es un documento que scrollea y cada
// bloque entra al aparecer. Solo la portada tiene una entrada propia, la misma
// apertura en D del hero, para que la llegada no se sienta un corte.

const REVEALS = ['[data-reveal]']

function playCoverIntro(): gsap.core.Timeline {
  const tl = gsap.timeline()
  // La D se abre de izquierda a derecha. El recorte va por variables CSS, igual que
  // en el hero: animar el string del clip-path o escribirlo desde un onUpdate se
  // rompe en cuanto ScrollTrigger refresca (ver clipTween en HomeExperience).
  tl.fromTo('.project-hero__shape', { '--pr': '100%' }, { '--pr': '0%', duration: 1, ease: 'power3.inOut' }, 0)
  tl.from('.project-hero__inner > *', { autoAlpha: 0, y: '4rem', duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0.45)
  return tl
}

export default function ProjectExperience() {
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
    cleanups.push(initScrollState())
    cleanups.push(initCursor())

    if (device.isDesktop) {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#pg-project',
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
    else cleanups.push(runLoader({ onDone: arrancar }))

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      cleanups.forEach((fn) => fn())
      destroyAOS()
      intro && intro.kill()
      footer && footer.kill()
      reveals.forEach((t) => t.kill())
      ScrollTrigger.getAll().forEach((st) => st.kill())
      if (smoother) smoother.kill()
    }
  }, [])

  return null
}
