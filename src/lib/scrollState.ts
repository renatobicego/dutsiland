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

type SectionRect = {
  el: HTMLElement
  top: number
  bottom: number
  middle: number
}

// header[data-get-section] toma el valor del [data-set-section] que tenga debajo.
export function initSectionWatcher(): Cleanup {
  const getters = () => Array.from(document.querySelectorAll<HTMLElement>('[data-get-section]'))
  const setters = () => Array.from(document.querySelectorAll<HTMLElement>('[data-set-section]'))
  const measure = (els: HTMLElement[]): SectionRect[] =>
    els.map((el) => {
      const r = el.getBoundingClientRect()
      return { el, top: r.top, bottom: r.bottom, middle: r.bottom - (r.bottom - r.top) / 2 }
    })
  const update = () => {
    const g = measure(getters())
    const s = measure(setters())
    g.forEach((getter) => {
      for (let i = 0; i < s.length; i++) {
        const sec = s[i]
        if (getter.middle > sec.top && getter.middle < sec.bottom) {
          const v = sec.el.dataset.setSection || ''
          if (getter.el.dataset.getSection !== v) getter.el.dataset.getSection = v
          return
        }
      }
    })
  }
  getters().forEach((g) => (g.dataset.getSection = ''))
  const t = window.setTimeout(() => {
    update()
    document.addEventListener('scroll', update, { passive: true })
  }, 100)
  return () => {
    clearTimeout(t)
    document.removeEventListener('scroll', update)
  }
}
