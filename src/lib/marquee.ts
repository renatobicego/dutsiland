import gsap from 'gsap'

/** Función para desmontar lo que la utilidad haya enganchado */
export type Cleanup = () => void

// Marquesina infinita idéntica a la de la referencia: clona el item hasta cubrir
// 1.5 pantallas, avanza en rAF, invierte el sentido con la dirección del scroll
// y cambia de velocidad al pasar el mouse.
export function initMarquees(root: Document | HTMLElement = document): Cleanup {
  const cleanups: Cleanup[] = []
  root.querySelectorAll<HTMLElement>('.marquee-trigger:not(.js-running)').forEach((trigger) => {
    trigger.classList.add('js-running')
    const track = trigger.querySelector<HTMLElement>('.marquee')
    const item = trigger.querySelector<HTMLElement>('.marquee-item')
    if (!track || !item) return

    const copies = Math.ceil((window.innerWidth * 1.5) / item.getBoundingClientRect().width)
    for (let i = 0; i < copies; i++) track.appendChild(item.cloneNode(true))

    const reverse = !!track.dataset.reverse
    const baseSpeed = track.dataset.marqueeSpeed ? parseFloat(track.dataset.marqueeSpeed) : 2
    const hoverSpeed = track.dataset.marqueeSpeedHover ? parseFloat(track.dataset.marqueeSpeedHover) : 0.5
    const state = { speed: baseSpeed }

    let x = 0
    let raf: number | null = null
    let lastY = window.scrollY
    let dir = 1

    const onScroll = () => {
      dir = window.scrollY < lastY ? -1 : 1
      if (reverse) dir *= -1
      lastY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const tick = () => {
      x -= state.speed * dir
      track.style.transform = `translate3d(${x}px,0,0)`
      const w = item.getBoundingClientRect().width
      if (x <= -w) x = 0
      if (dir === -1 && x >= 0) x = -w
      raf = requestAnimationFrame(tick)
    }
    tick()

    const io = new IntersectionObserver(
      (recs) => {
        recs.forEach((r) => {
          if (r.isIntersecting) {
            if (raf) cancelAnimationFrame(raf)
            tick()
          } else if (raf) cancelAnimationFrame(raf)
        })
      },
      { threshold: 0.1 }
    )
    io.observe(trigger)

    const onEnter = () => gsap.to(state, { speed: hoverSpeed, ease: 'power1.out', duration: 0.3 })
    const onLeave = () => gsap.to(state, { speed: baseSpeed, ease: 'power1.out', duration: 0.3 })
    track.addEventListener('mouseenter', onEnter)
    track.addEventListener('mouseleave', onLeave)

    cleanups.push(() => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      track.removeEventListener('mouseenter', onEnter)
      track.removeEventListener('mouseleave', onLeave)
    })
  })
  return () => cleanups.forEach((fn) => fn())
}
