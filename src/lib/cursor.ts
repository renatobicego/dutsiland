import type { Cleanup } from './marquee'

export type CursorOptions = {
  baseElement?: HTMLElement | null
  defaultCursor?: string
}

// Cursor personalizado (punto negro que crece sobre los elementos con data-cursor-style).
export function initCursor({ baseElement, defaultCursor = 'default' }: CursorOptions = {}): Cleanup {
  const el = baseElement ?? document.getElementById('wrapper-cursor')
  if (!el) return () => {}

  let x = 0
  let y = 0
  let pending = false
  let inside = true
  let style = defaultCursor
  let title = ''
  let last = performance.now()

  // Función flecha y no declaración: así TypeScript conserva dentro del cierre
  // el estrechamiento de `el` que hace el guard de arriba.
  const resolve = (): void => {
    const stack = document.elementsFromPoint(x, y)
    let foundStyle = false
    let foundTitle = false
    stack
      .slice()
      .reverse()
      .forEach((node) => {
        if (node.nodeName === 'IFRAME') inside = false
        if (!(node instanceof HTMLElement)) return
        if ('cursorTitle' in node.dataset) {
          title = node.dataset.cursorTitle ?? ''
          foundTitle = true
        }
        if ('cursorStyle' in node.dataset) {
          style = node.dataset.cursorStyle ?? defaultCursor
          foundStyle = true
        }
      })
    if (!foundTitle) title = ''
    if (!foundStyle) style = defaultCursor
    pending = false
    el.dataset.cursorTitle = inside ? title : ''
    el.dataset.cursor = inside ? style : ''
  }

  const schedule = () => {
    if (!pending) {
      pending = true
      setTimeout(resolve, 100)
    }
  }

  const onMove = (e: MouseEvent) => {
    x = e.clientX
    y = e.clientY
    inside = true
    el.classList.add('is-visible')
    schedule()
    if (performance.now() - last > 10) {
      requestAnimationFrame((t) => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0px)`
        last = t
      })
    }
  }
  const onClick = () => {
    el.dataset.clicked = 'true'
    setTimeout(() => {
      el.dataset.clicked = 'false'
    }, 350)
    resolve()
  }
  const onOut = (e: MouseEvent) => {
    if (e.relatedTarget === null) inside = false
  }

  document.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('click', onClick, { passive: true })
  document.addEventListener('mouseout', onOut, { passive: true })
  document.addEventListener('scroll', schedule, { passive: true })
  el.dataset.cursor = defaultCursor

  return () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('click', onClick)
    document.removeEventListener('mouseout', onOut)
    document.removeEventListener('scroll', schedule)
  }
}
