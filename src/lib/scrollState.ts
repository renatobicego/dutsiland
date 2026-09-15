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

const OSCURO = 'dark'
const CLARO = ''

/** Lee un color de `getComputedStyle` y devuelve si es oscuro, claro, o nada cuando es
 *  transparente (y entonces hay que seguir mirando lo que tiene abajo). */
function tonoDelColor(color: string): 'dark' | '' | null {
  const m = color.match(/rgba?\(([^)]+)\)/)
  if (!m) return null
  const [r, g, b, a = 1] = m[1].split(',').map((n) => parseFloat(n))
  if (!(a > 0.5)) return null
  // Luminancia percibida: el ojo pesa mucho más el verde que el azul
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.6 ? OSCURO : CLARO
}

/** Qué hay pintado justo abajo de un punto de la pantalla.
 *
 *  `elementsFromPoint` respeta el `clip-path`, que es justamente lo que hace falta acá:
 *  arriba de /sobre la portada es una D negra que no llega hasta la derecha, y el punto
 *  donde está el botón de menú cae sobre el crema aunque el rectángulo de la D lo tape.
 *  También ignora lo que tenga `pointer-events: none` (el velo de las tarjetas, el
 *  cursor, el loader apagado), que es lo que queremos: interesa el fondo, no el velo. */
function tonoEn(x: number, y: number): 'dark' | '' | null {
  const pila = document.elementsFromPoint(x, y)
  for (const el of pila) {
    if (el.closest('#header')) continue
    const t = tonoDelColor(getComputedStyle(el).backgroundColor)
    if (t !== null) return t
  }
  return null
}

/** El logo y el botón de menú toman cada uno su color del fondo que tienen debajo.
 *
 *  Cada uno por su lado y no un valor único para todo el header: cuando la forma de
 *  arriba es una D que no cubre el ancho, el logo queda sobre negro y el botón sobre
 *  crema, y con un solo criterio uno de los dos se pierde contra el fondo.
 *
 *  Se mide el píxel en lugar de leer la sección declarada porque la sección no alcanza:
 *  las formas de este sitio son recortes que no llenan su propio rectángulo. El
 *  `data-set-section` de cada sección queda como red: si el sondeo no encuentra ningún
 *  fondo opaco, manda lo declarado.
 *
 *  Va atado al render (rAF) y no al evento de scroll: con el scroll suave la posición
 *  VISUAL sigue cambiando después del evento —el smoother interpola la transformación
 *  del contenido durante un par de segundos, sin disparar más eventos— así que un
 *  listener medía a mitad del recorrido y se quedaba con una lectura vieja. */
export function initSectionWatcher(): Cleanup {
  const header = document.querySelector<HTMLElement>('#header')
  const logo = header?.querySelector<HTMLElement>('.column-logo')
  const boton = header?.querySelector<HTMLElement>('.column-bt')
  if (!header || !logo || !boton) return () => {}

  const declarado = () => {
    // La sección que cruza la mitad del header, como respaldo del sondeo
    const y = header.getBoundingClientRect().height / 2
    for (const s of document.querySelectorAll<HTMLElement>('[data-set-section]')) {
      const r = s.getBoundingClientRect()
      if (r.top <= y && r.bottom > y) return s.dataset.setSection || CLARO
    }
    return CLARO
  }

  const medir = (el: HTMLElement, respaldo: string) => {
    const r = el.getBoundingClientRect()
    // El header se esconde al llegar al fondo de la página: ahí no hay nada que medir
    if (r.top < 0 || r.height === 0) return null
    // Se mide bajo la MARCA que se ve, no bajo su contenedor: el enlace del logo lleva
    // adentro el nombre del estudio para quien no ve la imagen, escondido con un
    // left: -100vw que le estira la caja media pantalla hacia la izquierda. Midiendo el
    // centro de esa caja, el punto caía lejos de la D y devolvía el fondo equivocado.
    const marca = el.querySelector<HTMLElement>('.logo .logo-d, #bt-menu') ?? el
    const m = marca.getBoundingClientRect()
    return tonoEn(m.left + m.width / 2, m.top + m.height / 2) ?? respaldo
  }

  let raf = 0
  let frame = 0
  const aplicar = () => {
    raf = requestAnimationFrame(aplicar)
    // Un sondeo de cada tres: el cambio de color tarda 0.3s en CSS, así que medir a
    // ~20Hz es indistinguible de medir a 60 y son dos hit tests menos por frame.
    if (frame++ % 3) return
    const respaldo = declarado()
    const tLogo = medir(logo, respaldo)
    const tBoton = medir(boton, respaldo)
    if (tLogo !== null && logo.dataset.tono !== tLogo) logo.dataset.tono = tLogo
    if (tBoton !== null && boton.dataset.tono !== tBoton) boton.dataset.tono = tBoton
  }
  raf = requestAnimationFrame(aplicar)

  return () => cancelAnimationFrame(raf)
}
