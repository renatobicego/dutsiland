import type { Cleanup } from './marquee'

// Preloader: replica la máquina de estados del sitio de referencia.
// body[data-load] pasa por: first-loading -> first-leaving -> first-done
// El progreso combina imágenes precargadas + un tiempo mínimo de "script ready".

const LEAVING_DURATION = 1000
const FAKE_PROGRESS_MAX = 10000
const TIMEOUT = 10000
const SCRIPT_READY_DELAY = 2300

type LoadStatus = 'loading' | 'leaving' | 'done'

export type LoaderOptions = {
  onLeaving?: () => void
  onDone?: () => void
}

export function runLoader({ onLeaving, onDone }: LoaderOptions = {}): Cleanup {
  const body = document.body
  const state = {
    startedAt: performance.now(),
    leavingAt: 0,
    progress: 0,
    scriptReady: false,
    imgTotal: 0,
    imgRemaining: 0,
  }
  let raf: number | null = null
  let status: LoadStatus = 'loading'

  const setLoad = (v: LoadStatus) => {
    status = v
    body.dataset.load = 'first-' + v
  }
  const setProgress = (p: number) => {
    state.progress = p
    body.style.setProperty('--percentage', String(p / 100))
    body.style.setProperty('--percentage2', p + '%')
  }

  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img[data-preload]')).filter(
    (i) => !i.complete
  )
  state.imgTotal = imgs.length
  state.imgRemaining = imgs.length
  imgs.forEach((img) => {
    let done = false
    const mark = () => {
      if (!done) state.imgRemaining--
      done = true
      img.dataset.loaded = 'true'
    }
    img.addEventListener('load', mark, { once: true })
    img.addEventListener('error', mark, { once: true })
  })
  setTimeout(() => {
    state.scriptReady = true
  }, SCRIPT_READY_DELAY)

  const isComplete = (now: number) =>
    (state.scriptReady && state.imgRemaining <= 0) || now > state.startedAt + TIMEOUT

  const animate = (now: number): void => {
    const complete = isComplete(now)
    raf = requestAnimationFrame(animate)
    if (!complete) {
      let t = (now - state.startedAt) / FAKE_PROGRESS_MAX
      if (t > 1) t = 1
      const imgPct = state.imgTotal === 0 ? 1 : 1 - state.imgRemaining / state.imgTotal
      const h = imgPct * 0.6 + (state.scriptReady ? 0.4 : 0)
      setProgress(Math.ceil(100 * (t * 0.65 + h * 0.35)))
      return
    }
    if (state.progress < 100) {
      if (state.progress < 80) state.progress += 5
      setProgress(++state.progress)
      return
    }
    if (status === 'loading') {
      setLoad('leaving')
      state.leavingAt = now
      onLeaving?.()
      return
    }
    if (now < state.leavingAt + LEAVING_DURATION) return
    if (raf) cancelAnimationFrame(raf)
    setLoad('done')
    onDone?.()
  }

  setLoad('loading')
  raf = requestAnimationFrame(animate)

  // Salvavidas: requestAnimationFrame se pausa en pestañas de fondo. Sin esto el
  // preloader podría quedar tapando la página indefinidamente al volver a ella.
  const failsafe = setTimeout(() => {
    if (status === 'done') return
    if (raf) cancelAnimationFrame(raf)
    setProgress(100)
    setLoad('leaving')
    onLeaving?.()
    setTimeout(() => {
      setLoad('done')
      onDone?.()
    }, LEAVING_DURATION)
  }, TIMEOUT + LEAVING_DURATION)

  return () => {
    if (raf) cancelAnimationFrame(raf)
    clearTimeout(failsafe)
  }
}
