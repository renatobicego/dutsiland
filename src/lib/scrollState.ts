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
export function tonoEn(x: number, y: number): 'dark' | '' | null {
  const pila = document.elementsFromPoint(x, y)
  for (const el of pila) {
    if (el.closest('#header')) continue
    const t = tonoDelColor(getComputedStyle(el).backgroundColor)
    if (t !== null) return t
  }
  return null
}

/** Qué piezas del header toman su color del fondo, y qué se mide para cada una.
 *
 *  `destino` recibe el data-tono; `marca` es lo que se sondea, cuando no coincide con
 *  el destino. Una lista y no dos lecturas sueltas porque ahora arriba hay más que el
 *  logo y un botón: los tres destinos escritos ocupan media barra, y nada garantiza que
 *  todos caigan sobre el mismo fondo. */
const PIEZAS: { destino: string; marca?: string }[] = [
  // El enlace del logo lleva adentro el nombre del estudio para quien no ve la imagen,
  // escondido con un left: -100vw que le estira la caja media pantalla hacia la
  // izquierda: midiendo el centro de esa caja, el punto caía lejos de la D.
  { destino: '.column-logo', marca: '.logo .logo-d' },
  { destino: '.column-bt', marca: '#bt-menu' },
  { destino: '.header-link' },
  { destino: '.header-cta' },
]

/** Cada pieza del header toma su color del fondo que tiene justo debajo.
 *
 *  Una por una y no un valor único para todo el header: el header no tiene fondo propio
 *  y lo que pasa por detrás puede cambiar a lo ancho. Arriba de /sobre la portada es una
 *  D negra que no llega hasta el borde derecho, así que el logo cae sobre negro y la
 *  navegación sobre crema; con un solo criterio, una de las dos se pierde contra su
 *  fondo. El botón de contacto además necesita dos colores, porque está relleno: toma
 *  --color de fondo y --color-contra de texto, y así nunca queda crema sobre crema.
 *
 *  Se mide el píxel en lugar de leer la sección declarada porque la sección no alcanza:
 *  las formas de este sitio son recortes que no llenan su propio rectángulo. El
 *  `data-set-section` de cada sección queda como red: si el sondeo no encuentra ningún
 *  fondo opaco, manda lo declarado.
 *
 *  Va atado al render (rAF) y no al evento de scroll: lo que se mide es lo que se VE, y
 *  eso puede seguir cambiando después del último evento de scroll —una silueta que
 *  termina de entrar, un bloque que se revela—, así que un listener se quedaba con una
 *  lectura vieja. Antes el caso grande era el scroll suave, que seguía interpolando la
 *  posición del contenido un par de segundos sin disparar un solo evento más. */
export function initSectionWatcher(): Cleanup {
  const header = document.querySelector<HTMLElement>('#header')
  if (!header) return () => {}

  const declarado = () => {
    // La sección que cruza la mitad del header, como respaldo del sondeo
    const y = header.getBoundingClientRect().height / 2
    for (const s of document.querySelectorAll<HTMLElement>('[data-set-section]')) {
      const r = s.getBoundingClientRect()
      if (r.top <= y && r.bottom > y) return s.dataset.setSection || CLARO
    }
    return CLARO
  }

  const medir = (destino: HTMLElement, selMarca: string | undefined, respaldo: string) => {
    // Se mide bajo la MARCA que se ve, no siempre bajo el destino: ver PIEZAS.
    const marca = (selMarca ? destino.querySelector<HTMLElement>(selMarca) : null) ?? destino
    const m = marca.getBoundingClientRect()
    // Lo que no se ve no se mide: el header escondido al llegar al fondo de la página, y
    // las piezas que el ancho actual apaga —la navegación escrita en vertical, el botón
    // de menú en apaisado— quedan con alto cero.
    if (m.top < 0 || m.height === 0) return null
    return tonoEn(m.left + m.width / 2, m.top + m.height / 2) ?? respaldo
  }

  let raf = 0
  let frame = 0
  const aplicar = () => {
    raf = requestAnimationFrame(aplicar)
    // Un sondeo de cada tres: el cambio de color tarda 0.3s en CSS, así que medir a
    // ~20Hz es indistinguible de medir a 60 y son varios hit tests menos por frame.
    if (frame++ % 3) return
    const respaldo = declarado()
    // Las piezas se buscan en cada sondeo y no una sola vez: la navegación escrita la
    // monta un componente de cliente, así que puede no existir todavía cuando esto
    // arranca. Son cuatro consultas a ~20Hz sobre el header, no sobre el documento.
    for (const { destino, marca } of PIEZAS) {
      for (const el of header.querySelectorAll<HTMLElement>(destino)) {
        const t = medir(el, marca, respaldo)
        if (t !== null && el.dataset.tono !== t) el.dataset.tono = t
      }
    }
  }
  raf = requestAnimationFrame(aplicar)

  return () => cancelAnimationFrame(raf)
}
