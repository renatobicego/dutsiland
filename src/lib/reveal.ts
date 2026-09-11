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
  // El logotipo arranca cuando el panel ya terminó de subir, que es cuando de verdad
  // se lo empieza a ver
  const logo = buildFooterLogo()
  if (logo) foot.add(() => logo.restart(), '>-0.15')
  return foot
}

/** El logotipo del footer se arma desde el centro hacia afuera, que es como está
 *  construido el lockup: abre y cierra con una D. Cada letra sale de su propia máscara.
 *
 *  Corre en tiempo y no atado al scroll, y la dispara la timeline del footer. Las dos
 *  alternativas no funcionan acá:
 *  - Con scrub dentro de esa timeline terminaba mientras el logotipo todavía estaba
 *    abajo del fondo de la pantalla: para cuando se lo veía, ya estaba armado.
 *  - Con un ScrollTrigger propio tampoco: el logotipo está al fondo de todo y nunca
 *    llega a subir, así que el rango se queda sin recorrido; y encima el panel del
 *    footer se revela con un transform, que le corre la posición al cálculo. */
function buildFooterLogo(): gsap.core.Tween | null {
  const letters = gsap.utils.toArray<HTMLElement>('#footer .footer-logo .letter')
  if (!letters.length) return null
  // Las dos componentes (yPercent e y): si el punto de partida se lee del transform
  // del CSS, GSAP lo pasa a píxeles y animar solo yPercent no mueve nada.
  gsap.set(letters, { yPercent: 115, y: 0 })
  return gsap.to(letters, {
    yPercent: 0,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: { each: 0.08, from: 'center' },
    paused: true,
  })
}
