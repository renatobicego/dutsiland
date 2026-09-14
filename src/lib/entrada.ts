import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

import type { Cleanup } from './marquee'

// La llegada al sitio, igual en las cinco vistas: se entra siempre desde arriba y el
// loader se disuelve en vez de cortarse de golpe.

const SALIDA = 0.9
const LIMITE = 14000

/** El navegador restaura el scroll donde estaba antes de recargar. En la home eso es
 *  fatal: el hero está fijado y la coreografía arranca desde un punto que no es el
 *  suyo, así que aparecía a mitad de camino y a los saltos. En las otras vistas es
 *  menos grave pero igual de feo: se cae en medio de la página sin ninguna entrada.
 *
 *  Mientras el loader está arriba mantenemos el scroll en cero por frame y no una sola
 *  vez: la restauración del navegador puede llegar después de nuestra llamada, y en
 *  desktop además el ScrollSmoother lleva su propia posición. Al terminar devolvemos
 *  scrollRestoration a 'auto' para no pisar el ir y volver dentro del sitio, que no
 *  recarga el documento y sí debería recordar dónde estaba. */
export function anclarArriba(): Cleanup {
  // Si el loader ya corrió, esto es una navegación dentro del sitio y no una carga del
  // documento: el router se ocupa del scroll —y al volver atrás lo restaura— así que
  // acá no hay nada que anclar ni scrollRestoration que tocar.
  if (document.body.dataset.load === 'first-done') return () => {}

  try {
    history.scrollRestoration = 'manual'
  } catch {
    // Safari en modo privado puede negarlo; el bucle de abajo alcanza igual
  }

  let raf: number | null = null
  const desde = performance.now()
  const soltar = () => {
    if (raf !== null) cancelAnimationFrame(raf)
    raf = null
    // Vuelve a 'auto' —el valor original, que el script de layout.tsx ya había pasado a
    // 'manual'— y no al que estaba al entrar acá. Ir y volver dentro del sitio no
    // recarga el documento, así que el loader no corre y este ancla no se activa: ahí
    // sí queremos que el navegador recuerde dónde estaba.
    try {
      history.scrollRestoration = 'auto'
    } catch {
      /* ídem */
    }
  }

  const arriba = (ahora: number) => {
    if (document.body.dataset.load === 'first-done' || ahora > desde + LIMITE) {
      soltar()
      return
    }
    if (window.scrollY !== 0) window.scrollTo(0, 0)
    ScrollSmoother.get()?.scrollTop(0)
    raf = requestAnimationFrame(arriba)
  }
  raf = requestAnimationFrame(arriba)

  return soltar
}

/** El loader pasa a first-done y el CSS lo apagaba de un frame al otro: un corte seco
 *  justo cuando la vista aparece. Acá lo sostenemos con estilos inline —que le ganan a
 *  la hoja de estilos— y lo desvanecemos. En la home debajo hay una D negra a pantalla
 *  completa y en las otras vistas la portada ya está armada, así que lo que se ve es la
 *  página apareciendo, no el loader yéndose.
 *
 *  Se llama desde el onDone del loader: es el mismo frame en el que cambia data-load,
 *  antes de que el navegador pinte, así que el corte nunca llega a verse. */
export function revelarEntrada(): gsap.core.Timeline {
  const tl = gsap.timeline()
  const loader = document.querySelector('#loader')
  if (loader) {
    gsap.set(loader, { opacity: 1 })
    tl.to(loader, { opacity: 0, duration: SALIDA, ease: 'power2.inOut' }, 0)
  }
  // Sin transform sobre #main-transition: crearía bloque contenedor y el header fijo y
  // las secciones fijadas por ScrollTrigger pasarían a posicionarse contra él.
  tl.fromTo('#main-transition', { opacity: 0.55 }, { opacity: 1, duration: SALIDA * 0.7, ease: 'power2.out' }, 0)
  return tl
}
