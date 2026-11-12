import gsap from 'gsap'

/** Función para desmontar lo que la utilidad haya enganchado */
export type Cleanup = () => void

/** Cuánto conserva el envión de un cuadro al siguiente después de soltar la fila.
 *  0.94 da algo más de un segundo de deslizada, que es lo que se siente natural:
 *  más alto patina y más bajo se parece a frenar en seco. */
const FRENADO = 0.94

// Marquesina infinita: clona el item hasta cubrir 1.5 pantallas, avanza en rAF, cambia
// de velocidad al pasar el mouse y se puede arrastrar con el dedo o con el mouse.
//
// NO reacciona al scroll. Antes invertía el sentido según para dónde se scrolleaba
// —era el efecto de la referencia—, pero con las tarjetas clickeables eso las volvía
// un blanco que se escapaba: ibas a tocar una, el dedo movía la página un pixel y la
// fila salía para el otro lado. Corre siempre para el mismo lado, despacio.
export function initMarquees(root: Document | HTMLElement = document): Cleanup {
  const cleanups: Cleanup[] = []
  root.querySelectorAll<HTMLElement>('.marquee-trigger:not(.js-running)').forEach((trigger) => {
    trigger.classList.add('js-running')
    const track = trigger.querySelector<HTMLElement>('.marquee')
    const item = trigger.querySelector<HTMLElement>('.marquee-item')
    if (!track || !item) return

    const copies = Math.ceil((window.innerWidth * 1.5) / item.getBoundingClientRect().width)
    for (let i = 0; i < copies; i++) {
      const copia = item.cloneNode(true) as HTMLElement
      // Las copias son relleno visual: el original ya está en el árbol de accesibilidad
      // y repetirlo haría que un lector de pantalla leyera los proyectos cuatro veces.
      // Clickeables siguen siendo —el click se escucha en el contenedor, ver Portfolio—,
      // pero fuera del recorrido del tabulador.
      copia.setAttribute('aria-hidden', 'true')
      copia.querySelectorAll('a, button').forEach((el) => el.setAttribute('tabindex', '-1'))
      track.appendChild(copia)
    }

    const dir = track.dataset.reverse ? -1 : 1
    const baseSpeed = track.dataset.marqueeSpeed ? parseFloat(track.dataset.marqueeSpeed) : 2
    const hoverSpeed = track.dataset.marqueeSpeedHover ? parseFloat(track.dataset.marqueeSpeedHover) : 0.5
    const state = { speed: baseSpeed }

    let x = 0
    let raf: number | null = null
    let arrastrando = false
    /** El envión de la soltada, en píxeles por milisegundo */
    let impulso = 0
    let ultimoCuadro = performance.now()

    /** El ancho de UNA tanda: es lo que hay que recorrer para volver al punto de partida */
    const ancho = () => item.getBoundingClientRect().width || 1
    /* x siempre adentro de (-ancho, 0]. Antes el reenganche vivía suelto en el tick y
       sólo contemplaba el sentido en el que corría sola; ahora la fila también se
       arrastra, y se puede arrastrar para los dos lados y más de una tanda de una. */
    const normalizar = () => {
      const w = ancho()
      x = ((x % w) + w) % w
      if (x > 0) x -= w
    }
    const pintar = () => {
      track.style.transform = `translate3d(${x}px,0,0)`
    }

    /* Todo se mide en tiempo real y no en cuadros. Antes avanzaba un paso fijo por
       cuadro, así que la misma fila corría al doble en una pantalla de 120Hz que en una
       de 60: el desfile se veía distinto según el aparato. `cuadros` traduce el tiempo
       que pasó a la unidad en la que está escrita la velocidad —el paso de una pantalla
       de 60Hz—, para no tener que retocar los data-marquee-speed del HTML. */
    const tick = (ahora?: number) => {
      const t = ahora ?? performance.now()
      // Tope de 50ms: si la pestaña estuvo en segundo plano, el salto sería enorme.
      const ms = Math.min(t - ultimoCuadro, 50)
      ultimoCuadro = t
      const cuadros = ms / (1000 / 60)

      // Mientras el dedo la lleva, la fila no corre sola: manda el arrastre.
      if (!arrastrando) {
        // El envión se suma al paso de siempre y se va apagando, en vez de
        // reemplazarlo: así la fila nunca queda quieta ni arranca de golpe.
        x += impulso * ms
        impulso *= Math.pow(FRENADO, cuadros)
        if (Math.abs(impulso) < 0.002) impulso = 0
        x -= state.speed * dir * cuadros
        normalizar()
        pintar()
      }
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

    /* ---------- Arrastre con el dedo o con el mouse ----------
       La fila no es un contenedor con scroll: es un track que mueve JS con transform,
       así que el arrastre nativo del navegador no existe acá. Hay que escribir las tres
       cosas que uno da por sentadas en un carrusel y que a mano no vienen gratis:

       1. Decidir de quién es el gesto. El CSS le reserva al navegador sólo el vertical
          (touch-action: pan-y en .cards-marquee), pero el navegador tarda unos píxeles
          en decidirse, y en ese rato los eventos llegan igual. Sin esperar a saberlo,
          cualquier scroll apenas diagonal movía la fila de costado mientras la página
          bajaba: dos cosas moviéndose a la vez, que es lo que se siente mal. Por eso no
          se arrastra nada hasta pasar UMBRAL píxeles, y recién ahí se mira qué ganó: si
          mandó el eje vertical, el gesto es del scroll y no lo tocamos más.
       2. El envión. Soltar y que frene en seco no se parece a nada que uno haya usado.
          Se guarda la velocidad de los últimos píxeles y se deja correr apagándose.
       3. Un solo dedo. Si apoyás un segundo, el primero sigue mandando. */
    const UMBRAL = 6
    let ultimoX = 0
    let recorrido = 0
    let candidato = false
    let decidido = false
    let partidaX = 0
    let partidaY = 0
    let puntero = -1
    let ultimoMovimiento = 0

    const onDown = (e: PointerEvent) => {
      if (e.button > 0 || candidato) return
      puntero = e.pointerId
      candidato = true
      decidido = false
      arrastrando = false
      recorrido = 0
      partidaX = ultimoX = e.clientX
      partidaY = e.clientY
    }
    const onMove = (e: PointerEvent) => {
      if (!candidato || e.pointerId !== puntero) return

      if (!decidido) {
        const dx = Math.abs(e.clientX - partidaX)
        const dy = Math.abs(e.clientY - partidaY)
        if (dx < UMBRAL && dy < UMBRAL) return
        decidido = true
        if (dy > dx) {
          // Gana el eje vertical: esto es scroll de página, no es nuestro.
          candidato = false
          return
        }
        arrastrando = true
        impulso = 0
        ultimoX = e.clientX
        ultimoMovimiento = e.timeStamp
      }

      const d = e.clientX - ultimoX
      ultimoX = e.clientX
      recorrido += Math.abs(d)
      // La velocidad va en píxeles por milisegundo y no por evento: los eventos de
      // puntero no llegan a un ritmo fijo, y de a uno pueden venir con saltos raros,
      // así que además se suaviza contra la medición anterior.
      const dt = Math.max(e.timeStamp - ultimoMovimiento, 1)
      ultimoMovimiento = e.timeStamp
      impulso = impulso * 0.6 + (d / dt) * 0.4
      x += d
      normalizar()
      pintar()
    }
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== puntero) return
      candidato = false
      arrastrando = false
    }
    /* Si el puntero se movió, lo que terminó no fue un click sino un arrastre. Se corta
       en captura y sobre el trigger: así no llega al contenedor que abre el proyecto
       (ver Portfolio), que escucha más arriba y en burbuja. */
    const onClickCapture = (e: MouseEvent) => {
      if (recorrido > UMBRAL) {
        e.stopPropagation()
        e.preventDefault()
      }
      recorrido = 0
    }

    trigger.addEventListener('pointerdown', onDown)
    // En window y no en el trigger: el puntero se sale de la fila mientras la arrastra
    // y hay que seguirlo igual, y soltarlo aunque suelte afuera.
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    trigger.addEventListener('click', onClickCapture, true)

    cleanups.push(() => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      track.removeEventListener('mouseenter', onEnter)
      track.removeEventListener('mouseleave', onLeave)
      trigger.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      trigger.removeEventListener('click', onClickCapture, true)
    })
  })
  return () => cleanups.forEach((fn) => fn())
}
