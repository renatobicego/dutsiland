'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { getDevice, seguirAlturaReal } from '@/lib/device'
import { runSplitting } from '@/lib/splitting'
import { refreshAOS, destroyAOS } from '@/lib/aos'
import type { Cleanup } from '@/lib/marquee'
import { initCursor } from '@/lib/cursor'
import { runLoader } from '@/lib/loader'
import { anclarArriba, revelarEntrada } from '@/lib/entrada'
import { initScrollState, initSectionWatcher } from '@/lib/scrollState'
import { initMenu } from '@/lib/menu'
import { initRevealOnEnter, initFooterReveal, protegerRevelados, refrescarAlCargarMedios } from '@/lib/reveal'

gsap.registerPlugin(ScrollTrigger, CustomEase)

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

function playCoverIntro(): gsap.core.Timeline {
  const tl = gsap.timeline()
  // La D se abre de izquierda a derecha. El recorte va por variables CSS, igual que
  // en el hero: animar el string del clip-path o escribirlo desde un onUpdate se
  // rompe en cuanto ScrollTrigger refresca (ver clipTween en HomeExperience).
  tl.fromTo('.project-hero__shape', { '--pr': '100%' }, { '--pr': '0%', duration: 1, ease: 'power3.inOut' }, 0)
  // fromTo y no from: `from` toma el estado ACTUAL como destino, así que si esta
  // apertura corre dos veces sobre los mismos nodos —React puede montar el efecto, tirar
  // la timeline a medio camino y volver a montarlo— la segunda vez lee el estado que
  // dejó la primera (invisible) y anima de invisible a invisible. Es lo que hacía que al
  // entrar a una ficha desde /proyectos se viera la portada vacía, sin título ni bajada.
  // `.contact-head` entra por lo mismo: /contacto no tiene portada —es el formulario y
  // nada más—, así que su encabezado es lo primero que se ve y le toca esta entrada.
  // Un selector que no encuentra nada no hace nada, así que cada vista anima el suyo.
  tl.fromTo(
    '.project-hero__inner > *, .contact-head > *',
    { autoAlpha: 0, y: '4rem' },
    { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
    0.45
  )
  return tl
}

/* ---------- El recorrido de /sobre ----------
   El riel se dibuja de arriba hacia abajo y cada hito entra detrás, con su punto. Sólo
   existe en /sobre: en las demás vistas no encuentra nada y no arma nada.

   Va en tiempo, disparado al entrar en pantalla, y no atado al scroll: el riel tiene
   que terminar de dibujarse se scrollee rápido o lento. */
function initRecorrido(): gsap.core.Timeline | null {
  const steps = gsap.utils.toArray<HTMLElement>('.story-steps .story-step')
  if (!steps.length) return null
  const rail = document.querySelector('.story-rail')
  gsap.set(rail, { scaleY: 0 })
  steps.forEach((s) => {
    gsap.set(s.querySelector('.story-step__dot'), { scale: 0 })
    gsap.set(s.querySelectorAll('.story-step__etapa, .story-step__title, .story-step__text'), { autoAlpha: 0, y: '2.6rem' })
  })

  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.story-steps', start: 'top 78%', once: true, invalidateOnRefresh: true },
  })
  tl.to(rail, { scaleY: 1, duration: 1.3, ease: 'power2.inOut' }, 0)
  steps.forEach((s, i) => {
    const at = 0.25 + i * 0.3
    // El punto primero y el texto detrás: el riel va dejando las marcas a su paso.
    tl.to(s.querySelector('.story-step__dot'), { scale: 1, duration: 0.4, ease: 'back.out(2.4)' }, at)
    tl.to(
      s.querySelectorAll('.story-step__etapa, .story-step__title, .story-step__text'),
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out' },
      at + 0.1
    )
  })
  return tl
}

export default function PageExperience() {
  useEffect(() => {
    const device = getDevice()
    const cleanups: Cleanup[] = []
    let intro: gsap.core.Timeline | null = null
    let reveals: gsap.core.Tween[] = []
    let footer: gsap.core.Timeline | null = null
    let recorrido: gsap.core.Timeline | null = null

    if (device.isMobile) cleanups.push(seguirAlturaReal())

    runSplitting()
    // Recargar a mitad de página y aparecer ahí de golpe se ve raro en todas las
    // vistas, no sólo en la home: se entra siempre desde la portada.
    cleanups.push(anclarArriba())
    cleanups.push(initScrollState())
    cleanups.push(initCursor())

    // El footer entra al aparecer, igual en todos los anchos: antes sólo se armaba en
    // desktop, porque el movimiento lo llevaba el scroll suave que únicamente había ahí.
    footer = initFooterReveal()
    cleanups.push(initSectionWatcher())
    cleanups.push(initMenu({ menuMark: null }))

    const arrancar = () => {
      intro = playCoverIntro()
      reveals = initRevealOnEnter(REVEALS)
      recorrido = initRecorrido()
      // El footer y el recorrido entran como una sección más, así que van bajo la misma
      // red: si su disparador no llegara a correr, el panel del footer se quedaría a
      // media subida y los hitos del recorrido, invisibles.
      const animados: (gsap.core.Tween | gsap.core.Timeline)[] = [...reveals]
      if (footer) animados.push(footer)
      if (recorrido) animados.push(recorrido)
      cleanups.push(protegerRevelados(animados))
      refreshAOS()
      ScrollTrigger.refresh()
    }
    // Las fuentes y las imágenes llegan después de la primera medición y corren todos
    // los tramos: es lo que hacía que entrando por URL directa el contenido no se
    // revelara y recargando sí (ver refrescarAlCargarMedios).
    cleanups.push(refrescarAlCargarMedios())

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
      if (recorrido) recorrido.kill()
      reveals.forEach((t) => t.kill())
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return null
}
