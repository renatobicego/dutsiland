import type gsap from 'gsap'
import type { Cleanup } from './marquee'
import type { ScrollSmoother } from 'gsap/ScrollSmoother'

// Menú y anclas. Lo usan las dos vistas (la home y la ficha de proyecto), por eso
// vive acá y no dentro de HomeExperience.

export type Smoother = ReturnType<typeof ScrollSmoother.create>

export type MenuOptions = {
  smoother: Smoother | null
  menuMark: gsap.core.Timeline | null
}

/** Lleva el scroll a un ancla. `0` es el principio de la página.
 *
 *  Las anclas que caen dentro del hero de la home no tienen una posición propia: el
 *  hero está fijado y su contenido lo va mostrando el scroll, así que initHeroScroll
 *  deja en cada una un data-hero-progress con el punto del tramo en el que se ve. */
export function scrollToTarget(target: Element | 0, smoother: Smoother | null): void {
  if (!smoother) {
    if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  const hero = target === 0 ? null : target.closest('.home-hero')
  if (hero instanceof HTMLElement && target instanceof HTMLElement) {
    const p = parseFloat(target.dataset.heroProgress ?? '')
    const span = Math.max(0, hero.offsetHeight - window.innerHeight)
    smoother.scrollTo(hero.offsetTop + (Number.isFinite(p) ? p * span : window.innerHeight), true)
  } else smoother.scrollTo(target, true, 'top top')
}

/** Resuelve el hash con el que se llegó a la página (por ejemplo al volver desde una
 *  ficha con /#servicios), usando la misma lógica que los clicks del menú. */
export function goToHash(smoother: Smoother | null): void {
  const hash = window.location.hash
  if (!hash || hash === '#top') return
  let target: Element | null = null
  try {
    target = document.querySelector(hash)
  } catch {
    // Un hash que no es un selector válido: no hay nada que hacer
  }
  if (target) scrollToTarget(target, smoother)
}

export function initMenu({ smoother, menuMark }: MenuOptions): Cleanup {
  const body = document.body
  const ACTIVE = 'menu-active'
  const LEAVE = 'menu-leave'
  const api = {
    get isOpen() {
      return body.classList.contains(ACTIVE)
    },
    open() {
      body.classList.add(ACTIVE)
      setTimeout(() => menuMark && menuMark.play(), 500)
      smoother && smoother.paused(true)
    },
    close() {
      if (!api.isOpen) return
      smoother && smoother.paused(false)
      body.classList.remove(ACTIVE)
      body.classList.add(LEAVE)
      setTimeout(() => {
        body.classList.remove(LEAVE)
        menuMark && menuMark.pause(0)
      }, 800)
    },
  }

  const bt = document.getElementById('bt-menu')
  const onBt = () => (api.isOpen ? api.close() : api.open())
  bt && bt.addEventListener('click', onBt)

  const onAnchor = (e: Event) => {
    const a = e.currentTarget
    if (!(a instanceof HTMLAnchorElement)) return
    const href = a.getAttribute('href') || ''
    const wasOpen = api.isOpen
    if (a.hasAttribute('data-menu-close')) api.close()
    // Los href que empiezan con "/" (por ejemplo "/#servicios" desde una ficha) son
    // navegación de verdad: los deja pasar y el hash lo resuelve goToHash al llegar.
    if (!href.startsWith('#')) return
    e.preventDefault()
    const target = href === '#top' ? 0 : document.querySelector(href)
    if (target === null) return
    setTimeout(() => scrollToTarget(target, smoother), wasOpen ? 450 : 0)
  }
  const anchors = Array.from(document.querySelectorAll('a[href^="#"], a[data-menu-close]'))
  anchors.forEach((a) => a.addEventListener('click', onAnchor))

  return () => {
    bt && bt.removeEventListener('click', onBt)
    anchors.forEach((a) => a.removeEventListener('click', onAnchor))
    body.classList.remove(ACTIVE, LEAVE)
  }
}
