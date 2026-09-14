import { ScrollTrigger } from 'gsap/ScrollTrigger'

import type { Cleanup } from './marquee'

// Mantiene body[data-scroll-direction] (initial | up | down) y
// body[data-scroll-position] (top | center | bottom), como en la referencia.
export function initScrollState(): Cleanup {
  let lastY = 0
  let dirState = 0
  let posState = 0
  let vh = window.innerHeight
  let sh = document.body.scrollHeight
  document.body.dataset.scrollDirection = 'initial'
  document.body.dataset.scrollPosition = 'top'

  const update = () => {
    const y = window.scrollY
    if (dirState !== 0 && y <= 0) {
      document.body.dataset.scrollDirection = 'initial'
      dirState = 0
    } else if (dirState !== 1 && lastY > y && y > 0) {
      document.body.dataset.scrollDirection = 'up'
      dirState = 1
    } else if (dirState !== 2 && lastY < y && y > 0) {
      document.body.dataset.scrollDirection = 'down'
      dirState = 2
    }
    lastY = y
    if (posState !== 0 && y <= vh * 0.5) {
      document.body.dataset.scrollPosition = 'top'
      posState = 0
    } else if (posState !== 1 && y >= vh * 0.5 && !(y + vh >= sh - vh * 0.3)) {
      document.body.dataset.scrollPosition = 'center'
      posState = 1
    } else if (posState !== 2 && y + vh >= sh - vh * 0.3) {
      document.body.dataset.scrollPosition = 'bottom'
      posState = 2
    }
  }
  const onResize = () => {
    vh = window.innerHeight
    sh = document.body.scrollHeight
  }
  const mo = new MutationObserver(() => {
    sh = document.body.scrollHeight
  })
  mo.observe(document.body, { childList: true, subtree: true })
  const iv = window.setInterval(() => {
    sh = document.body.scrollHeight
  }, 100)
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', onResize)
  return () => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', onResize)
    mo.disconnect()
    clearInterval(iv)
  }
}

/** header[data-get-section] toma el valor del [data-set-section] que tenga debajo, y de
 *  ahí salen el color del logo y el del botón de menú.
 *
 *  Un ScrollTrigger por sección y no un listener de scroll: con el scroll suave la
 *  posición VISUAL sigue cambiando después del evento de scroll (el smoother interpola
 *  la transformación del contenido durante un par de segundos, sin disparar más
 *  eventos). Un listener mide a mitad de ese recorrido y se queda con una lectura
 *  vieja: el header terminaba en claro sobre una sección oscura y al revés.
 *  ScrollTrigger, en cambio, va atado al render. */
export function initSectionWatcher(): Cleanup {
  const header = document.querySelector<HTMLElement>('[data-get-section]')
  if (!header) return () => {}

  // La línea que decide es la mitad del header, igual que antes
  const mitad = () => header.getBoundingClientRect().height / 2

  header.dataset.getSection = ''
  const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-set-section]')).map((seccion) => {
    const aplicar = () => {
      header.dataset.getSection = seccion.dataset.setSection || ''
    }
    return ScrollTrigger.create({
      trigger: seccion,
      start: () => `top top+=${mitad()}`,
      end: () => `bottom top+=${mitad()}`,
      onEnter: aplicar,
      onEnterBack: aplicar,
      invalidateOnRefresh: true,
    })
  })

  return () => triggers.forEach((t) => t.kill())
}
