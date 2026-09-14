import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import type { Cleanup } from './marquee'

// Revelados atados al scroll que comparten la home y las demás vistas.

gsap.registerPlugin(ScrollTrigger)

/** Cada elemento entra al aparecer en pantalla. Se usa donde no hay pin: en móvil
 *  en la home, y en toda página que no sea la home.
 *
 *  fromTo y no from: `from` toma el estado ACTUAL como destino, así que si el revelado
 *  se arma dos veces sobre los mismos nodos lee el estado que dejó el anterior
 *  (invisible) y anima de invisible a invisible, dejando el contenido oculto para
 *  siempre. Con los dos extremos escritos, armarlo de nuevo da lo mismo. */
export function initRevealOnEnter(selectors: string[]): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = []
  selectors.forEach((sel) => {
    gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
      tweens.push(
        gsap.fromTo(
          el,
          { y: '3rem', autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true, invalidateOnRefresh: true },
          }
        )
      )
    })
  })
  return tweens
}

/** Red de seguridad de los revelados: ningún contenido puede quedar invisible porque su
 *  animación no llegó a correr.
 *
 *  `gsap.from` deja el elemento oculto hasta que su trigger entra, así que si el trigger
 *  no entra nunca el texto no existe para el que mira. Y hay dos formas de que no entre:
 *  que el punto de arranque caiga más allá del final del scroll (pasa con lo último de
 *  una página corta) o que las posiciones se hayan calculado con la página más corta de
 *  lo que terminó siendo —fuentes o imágenes que llegaron después— y el tramo quede
 *  detrás del scroll sin que nadie lo dispare.
 *
 *  Va en el evento 'refresh' y no en 'refreshInit': el primero corre DESPUÉS de
 *  recalcular las posiciones y de que ScrollTrigger dispare lo que corresponda al scroll
 *  actual, así que lo que siga sin correr acá es lo que de verdad quedó huérfano. */
export function protegerRevelados(tweens: gsap.core.Tween[]): Cleanup {
  const revisar = () => {
    const limite = ScrollTrigger.maxScroll(window)
    tweens.forEach((t) => {
      const st = t.scrollTrigger
      if (!st || t.progress() > 0) return
      if (st.start <= limite && st.scroll() <= st.start) return
      // kill(false, true): se saca el trigger del medio pero se deja viva la animación.
      // Sin sacarlo, si el tramo volviera a ser alcanzable lo reiniciaría desde
      // invisible y se vería un parpadeo.
      st.kill(false, true)
      t.progress(1)
    })
  }
  ScrollTrigger.addEventListener('refresh', revisar)
  return () => ScrollTrigger.removeEventListener('refresh', revisar)
}

/** Las medidas del scroll se toman una vez y las fuentes y las imágenes llegan después:
 *  cambian el alto de la página y dejan todos los tramos corridos. Con la página en
 *  caché no se nota —ya están cuando se mide— y por eso el síntoma aparecía al entrar
 *  por primera vez a una URL y se iba al recargar. */
export function refrescarAlCargarMedios(): Cleanup {
  let t = 0
  const refrescar = () => {
    clearTimeout(t)
    // Agrupado: si entran veinte imágenes seguidas, se recalcula una sola vez
    t = window.setTimeout(() => ScrollTrigger.refresh(), 200)
  }

  const fuentes = document.fonts
  fuentes?.addEventListener('loadingdone', refrescar)

  const imgs = Array.from(document.querySelectorAll('img')).filter((i) => !i.complete)
  imgs.forEach((i) => {
    i.addEventListener('load', refrescar, { once: true })
    i.addEventListener('error', refrescar, { once: true })
  })

  return () => {
    clearTimeout(t)
    fuentes?.removeEventListener('loadingdone', refrescar)
    imgs.forEach((i) => {
      i.removeEventListener('load', refrescar)
      i.removeEventListener('error', refrescar)
    })
  }
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
