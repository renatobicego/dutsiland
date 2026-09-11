import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Revelados atados al scroll que comparten la home y la ficha de proyecto.

gsap.registerPlugin(ScrollTrigger)

/** Cada elemento entra al aparecer en pantalla. Se usa donde no hay pin: en móvil
 *  en la home, y en toda la ficha de proyecto. */
export function initRevealOnEnter(selectors: string[]): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = []
  selectors.forEach((sel) => {
    gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
      tweens.push(
        gsap.from(el, {
          y: '3rem',
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true, invalidateOnRefresh: true },
        })
      )
    })
  })
  return tweens
}

/** El footer se revela por debajo de la última sección, que se va hundiendo.
 *  La última sección lleva .prev-section y su contenido .prev-section__inner. */
export function initFooterReveal(): gsap.core.Timeline {
  const foot = gsap.timeline({
    scrollTrigger: { trigger: '#footer', endTrigger: '.wrapper', start: 'top bottom', end: 'bottom bottom', scrub: true, anticipatePin: 1, invalidateOnRefresh: true },
  })
  foot.fromTo('#footer .footer-panel', { y: '30vh' }, { y: 0, ease: 'none' })
  foot.to('.prev-section .prev-section__inner', { y: '14vh', ease: 'none' }, '<')
  // El fade arranca a mitad: si empieza junto con el footer, queda un hueco negro visible
  foot.to('.prev-section .prev-section__inner', { autoAlpha: 0, ease: 'power2.in' }, '<+0.5')
  foot.to('#footer .footer-logo .letter', { y: 0, duration: 0.3, stagger: 0.04 }, '>-.2')
  return foot
}
