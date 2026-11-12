import type gsap from 'gsap'
import type { Cleanup } from './marquee'

// Menú y anclas. Lo usan las dos vistas (la home y la ficha de proyecto), por eso
// vive acá y no dentro de HomeExperience.

export type MenuOptions = {
  menuMark: gsap.core.Timeline | null
}

/** Lleva el scroll a un ancla. `0` es el principio de la página.
 *
 *  Todas las anclas son secciones de verdad, con su lugar en la página: alcanza con
 *  pedirle al navegador que vaya. Antes no era así —las que caían dentro del hero no
 *  tenían posición propia, porque el hero estaba fijado y su contenido lo mostraba el
 *  scroll— y había que calcular la altura a partir de un data-hero-progress. */
export function scrollToTarget(target: Element | 0): void {
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function initMenu({ menuMark }: MenuOptions): Cleanup {
  const body = document.body
  const ACTIVE = 'menu-active'
  const LEAVE = 'menu-leave'

  /* Con el menú abierto el fondo no se mueve, y de eso ya se encarga el CSS: la clase
     menu-active del body trae overflow: hidden y touch-action: none. Antes hacía falta
     además frenar a mano el scroll suave en apaisado y el normalizador táctil de
     ScrollTrigger en vertical, que interceptaban el gesto antes que el navegador. */

  const api = {
    get isOpen() {
      return body.classList.contains(ACTIVE)
    },
    open() {
      body.classList.add(ACTIVE)
      setTimeout(() => menuMark && menuMark.play(), 500)
    },
    close() {
      if (!api.isOpen) return
      body.classList.remove(ACTIVE)
      body.classList.add(LEAVE)
      setTimeout(() => {
        body.classList.remove(LEAVE)
        if (menuMark) menuMark.pause(0)
      }, 800)
    },
  }

  const bt = document.getElementById('bt-menu')
  const onBt = () => (api.isOpen ? api.close() : api.open())
  if (bt) bt.addEventListener('click', onBt)

  const onAnchor = (e: Event) => {
    const a = e.currentTarget
    if (!(a instanceof HTMLAnchorElement)) return
    const href = a.getAttribute('href') || ''
    const wasOpen = api.isOpen
    if (a.hasAttribute('data-menu-close')) api.close()
    // Los href que empiezan con "/" son rutas: los deja pasar para que navegue Next.
    if (!href.startsWith('#')) return
    e.preventDefault()
    // Las secciones del home ya no llevan id —no son direcciones, no se visitan— así
    // que el destino se busca por data-ancla. El href queda como pista de "es acá
    // mismo": el que navega es este handler.
    const target = href === '#top' ? 0 : document.querySelector(`[data-ancla="${href.slice(1)}"]`)
    if (target === null) return
    setTimeout(() => scrollToTarget(target), wasOpen ? 450 : 0)
  }
  const anchors = Array.from(document.querySelectorAll('a[href^="#"], a[data-menu-close]'))
  anchors.forEach((a) => a.addEventListener('click', onAnchor))

  return () => {
    if (bt) bt.removeEventListener('click', onBt)
    anchors.forEach((a) => a.removeEventListener('click', onAnchor))
    body.classList.remove(ACTIVE, LEAVE)
  }
}
