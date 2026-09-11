'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { CustomEase } from 'gsap/CustomEase'
import { getDevice } from '@/lib/device'
import { runSplitting } from '@/lib/splitting'
import { refreshAOS, destroyAOS } from '@/lib/aos'
import { initMarquees } from '@/lib/marquee'
import type { Cleanup } from '@/lib/marquee'
import { initCursor } from '@/lib/cursor'
import { runLoader } from '@/lib/loader'
import { initScrollState, initSectionWatcher } from '@/lib/scrollState'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase)

declare global {
  interface Window {
    __gsap?: typeof gsap
    __ScrollTrigger?: typeof ScrollTrigger
  }
}

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // Acceso desde la consola para depurar los triggers de scroll
  window.__gsap = gsap
  window.__ScrollTrigger = ScrollTrigger
}

type Smoother = ReturnType<typeof ScrollSmoother.create>
type Animation = gsap.core.Timeline | gsap.core.Tween

/* Estados de las "D" del hero: inset (%) + radios (vh).
   Cada número viaja en su propia variable CSS y el clip-path se compone en la hoja
   de estilos (ver .blob en globals.css). Dos motivos:
   - Animar el string completo no sirve: el navegador lo re-serializa y GSAP pierde
     la correspondencia de números al interpolar.
   - Escribirlo a mano desde un onUpdate tampoco: en cada refresh ScrollTrigger
     re-renderiza con los eventos suprimidos, el onUpdate no se dispara y la silueta
     se queda con lo último que alguien alcanzó a escribir —a mitad de camino— mientras
     el contenido sigue de largo. Animando variables, el estilo del elemento ES el
     objetivo y cualquier render lo deja bien. */
type ClipState = { r: number; l: number; tl: number; tr: number; br: number; bl: number }

const CLIP = {
  leftFull: { r: 0, l: 0, tl: 0, tr: 0, br: 0, bl: 0 }, // rectángulo = fondo del loader
  leftRounded: { r: 0, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // cuadro 3
  leftHero: { r: 56, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // cuadro 5
  rightHidden: { r: 0, l: 100, tl: 0, tr: 0, br: 0, bl: 0 },
  rightHero: { r: 0, l: 46, tl: 50, tr: 0, br: 0, bl: 50 }, // cuadro 5
  rightClaim: { r: 0, l: 0, tl: 50, tr: 0, br: 0, bl: 50 }, // cuadro 7
  rightSplit: { r: 0, l: 52, tl: 50, tr: 0, br: 0, bl: 50 }, // cuadro 8
  rightGone: { r: 0, l: 100, tl: 50, tr: 0, br: 0, bl: 50 }, // la frase termina de irse a la derecha
  left2Hidden: { r: 100, l: 0, tl: 0, tr: 0, br: 0, bl: 0 },
  left2Split: { r: 51, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // cuadro 8
  left2Full: { r: 0, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // el panel se abre para "qué hacemos"
} satisfies Record<string, ClipState>

function clipVars(s: ClipState): gsap.TweenVars {
  return { '--cr': `${s.r}%`, '--cl': `${s.l}%`, '--ctl': `${s.tl}vh`, '--ctr': `${s.tr}vh`, '--cbr': `${s.br}vh`, '--cbl': `${s.bl}vh` }
}

function setClip(selector: string, state: ClipState) {
  gsap.set(selector, clipVars(state))
}

/* Cada fase declara sus dos extremos. Es importante que los declare: si solo dijera
   "hasta acá", GSAP tomaría como punto de partida lo que dejó otra fase, y una "D"
   con varias fases (el panel izquierdo tiene dos, la D derecha tres) termina
   arrancando desde donde no debe en cuanto algo invalida la timeline. */
function clipTween(selector: string, from: ClipState, to: ClipState, vars: gsap.TweenVars = {}): gsap.core.Tween {
  return gsap.fromTo(selector, clipVars(from), { ...clipVars(to), ...vars, immediateRender: false })
}

/* ---------- "D" del loader y del menú: pulso suave ---------- */
function animateDMark(root: Element | null, timeScale = 1): gsap.core.Timeline | null {
  if (!root) return null
  const d = root.querySelector('.d-mark__d')
  const hole = root.querySelector('.d-mark__hole')
  const ease = CustomEase.create('dmark-ease', 'M0,0 C0.8,0 0.2,1 1,1')
  const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 1.2, ease }, paused: true })
  tl.fromTo(d, { scale: 1 }, { scale: 1.06 }, 0)
  if (hole) tl.fromTo(hole, { scale: 2.3 }, { scale: 0.7 }, 0)
  tl.timeScale(timeScale)
  return tl
}

/* ---------- secciones "pegadas" (pin) ---------- */
function initSticky() {
  document.querySelectorAll<HTMLElement>('[data-sticky]').forEach((el) => {
    let start: string | (() => string) = el.dataset.start || 'top top'
    let end: string | (() => string) = el.dataset.end || 'bottom top'
    let trigger: Element | null = el.dataset.trigger ? document.querySelector(el.dataset.trigger) : el
    if (el.dataset.trigger === 'parent') trigger = el.parentElement
    const endTrigger = el.dataset.endTrigger ? document.querySelector(el.dataset.endTrigger) : trigger
    if (el.dataset.trigger === 'parent') {
      start = () => 'top top'
      end = () => `bottom-=${el.offsetHeight} top`
    }
    ScrollTrigger.create({ trigger, endTrigger, start, end, pin: el, pinSpacing: false, scrub: true, anticipatePin: 1, invalidateOnRefresh: true })
  })
}

/* ---------- intro del hero (cuadros 2 → 5), en tiempo, tras el loader ---------- */
function setHeroInitialState() {
  setClip('.blob-left', CLIP.leftFull)
  setClip('.blob-right', CLIP.rightHidden)
  setClip('.blob-left2', CLIP.left2Hidden)
  gsap.set('.blob-left', { xPercent: 0 })
  gsap.set('.hero-logo', { left: '50%' })
  gsap.set('.hero-logo__rest-mask', { width: 0, marginLeft: 0 })
  gsap.set('.hero-mail', { autoAlpha: 0, y: '2rem' })
  gsap.set('#header', { autoAlpha: 0 })
  // El punto de partida del titular se declara acá con las dos componentes (yPercent
  // e y). Si se lo deja al `transform: translateY(100%)` del CSS, GSAP lo convierte a
  // píxeles y lo guarda en `y`: animar solo yPercent no mueve nada y las palabras
  // quedan abajo, tapadas por la máscara de .word.
  gsap.set('.hero-headline .word > span', { opacity: 0, yPercent: 100, y: 0 })
}

function playHeroIntro(onComplete: () => void): gsap.core.Timeline {
  const mask = document.querySelector('.hero-logo__rest-mask')
  const rest = document.querySelector('.hero-logo__rest')
  const restWidth = rest ? rest.getBoundingClientRect().width : 0
  const tl = gsap.timeline({ onComplete })
  // 1. el fondo negro del loader se vuelve una D gigante
  tl.add(clipTween('.blob-left', CLIP.leftFull, CLIP.leftRounded, { duration: 0.8, ease: 'power2.inOut' }), 0)
  // 2. "UTSILAND" sale de atrás de la D
  tl.to(mask, { width: restWidth, marginLeft: '2.2vh', duration: 0.9, ease: 'power3.out' }, 0.55)
  // 3. la D se achica a la izquierda, entra la D derecha con el titular
  tl.add(clipTween('.blob-left', CLIP.leftRounded, CLIP.leftHero, { duration: 1.1, ease: 'power3.inOut' }), 1.5)
  tl.to('.hero-logo', { left: '22%', duration: 1.1, ease: 'power3.inOut' }, 1.5)
  tl.add(clipTween('.blob-right', CLIP.rightHidden, CLIP.rightHero, { duration: 1.1, ease: 'power3.inOut' }), 1.6)
  // Mismo movimiento que tenía la animación CSS slide-up (1s, la misma curva y 70ms
  // de stagger), pero con GSAP: escribe estilos inline y no se reinicia cuando
  // ScrollTrigger re-inserta el hero fijado en cada refresh.
  tl.to(
    '.hero-headline .word > span',
    { opacity: 1, yPercent: 0, y: 0, duration: 1, stagger: 0.07, ease: CustomEase.create('headline-ease', 'M0,0 C0.645,0.045 0.355,1 1,1') },
    2.2
  )
  tl.to('.hero-mail', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 2.5)
  tl.to('#header', { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 2.4)
  return tl
}

/* La secuencia de "qué hacemos" se escribió con su propio ritmo de scroll (~485px por
   unidad). Metida en la timeline del hero, que corre a ~900px por unidad, hay que
   comprimirla con timeScale para que cada paso cueste el mismo scroll que antes. */
const SERVICES_TIMESCALE = 1.85

/* Posición en la timeline del hero desde la que cada ancla tiene sentido: el menú las
   lee de data-hero-progress para saber a qué altura del tramo fijado saltar. */
function markHeroAnchor(selector: string, position: number, total: number) {
  const el = document.querySelector<HTMLElement>(selector)
  if (el) el.dataset.heroProgress = (position / total).toFixed(4)
}

/* ---------- scroll del hero (cuadros 5 → 8 + qué hacemos), fijado al scroll ----------
   Fase A: la frase entra. Fase B: se parte en dos D. Fase C: la frase termina de irse
   a la derecha y, mientras tanto, el panel negro de la izquierda se abre a todo el
   ancho y muestra adentro los tres frentes. Después sigue nuestra historia. */
function initHeroScroll(header: HTMLElement | null): gsap.core.Timeline {
  const base = { markers: false, anticipatePin: 1, invalidateOnRefresh: true }
  const t = gsap.timeline({
    scrollTrigger: {
      trigger: '.home-hero',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      ...base,
      onEnterBack: () => {
        if (header) header.dataset.getSection = 'dark'
      },
    },
  })
  // Fase A: la D izquierda sale de escena, la derecha ocupa todo y muestra la frase.
  // Se va desplazándose (no contrayéndose): contraerla dejaba una franja con forma rara
  // pegada al borde izquierdo.
  t.to('.blob-left', { xPercent: -60, duration: 1, ease: 'none' }, 0)
  t.add(clipTween('.blob-right', CLIP.rightHero, CLIP.rightClaim, { duration: 1, ease: 'none' }), 0)
  t.to('.hero-headline', { autoAlpha: 0, duration: 0.35, ease: 'none' }, 0)
  t.to('.hero-mail', { autoAlpha: 0, duration: 0.3, ease: 'none' }, 0)
  t.fromTo('.hero-claim', { autoAlpha: 0, y: '6rem' }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'none', immediateRender: false }, 0.55)
  // Fase B: la frase se parte en dos D. El texto queda recortado por las siluetas,
  // nítido y sin desvanecer, como en el cuadro 8 del storyboard.
  t.add(clipTween('.blob-right', CLIP.rightClaim, CLIP.rightSplit, { duration: 1, ease: 'none' }), 1)
  t.add(clipTween('.blob-left2', CLIP.left2Hidden, CLIP.left2Split, { duration: 1, ease: 'none' }), 1)

  // Fase C: la frase termina de irse por la derecha y, mientras tanto, el panel negro
  // de la izquierda se abre a todo el ancho. Ese panel es el contenedor de "qué
  // hacemos": una vez abierto, los tres frentes se muestran adentro.
  const OPEN = 0.85
  t.add(clipTween('.blob-right', CLIP.rightSplit, CLIP.rightGone, { duration: OPEN, ease: 'power2.inOut' }), 2)
  t.add(clipTween('.blob-left2', CLIP.left2Split, CLIP.left2Full, { duration: OPEN, ease: 'power2.inOut' }), 2)

  const servicesAt = 2 + OPEN + 0.05
  const services = buildServicesSequence()
  if (services) {
    services.timeScale(SERVICES_TIMESCALE)
    t.add(services, servicesAt)
  }

  const total = t.duration()
  markHeroAnchor('.hero-claim', 1, total)
  markHeroAnchor('#servicios', servicesAt, total)
  return t
}

/* ---------- Sin pin (móvil y tablet): cada bloque entra al aparecer ---------- */
function initRevealOnEnter(selectors: string[]): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = []
  selectors.forEach((sel) => {
    gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
      tweens.push(
        gsap.from(el, {
          y: '3rem',
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true, invalidateOnRefresh: true },
        })
      )
    })
  })
  return tweens
}

/* ---------- Nuestra historia (fijada): el revelado lo maneja el scroll ---------- */
function initHistoryScroll(): gsap.core.Timeline | null {
  if (!document.querySelector('.home-history')) return null

  // Estado inicial explícito (no `from`): con stagger dentro de una timeline
  // posicionada, el estado inicial no se aplica parejo y algún bloque arranca visible.
  gsap.set('.history-kicker', { autoAlpha: 0, y: '2rem' })
  gsap.set('.history-year', { autoAlpha: 0, xPercent: -18, scale: 1.14, transformOrigin: 'left center' })
  gsap.set('.history-title .word > span', { autoAlpha: 0, yPercent: 110 })
  gsap.set('.history-text p', { autoAlpha: 0, y: '5rem' })

  const t = gsap.timeline({
    scrollTrigger: { trigger: '.home-history', start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true },
  })
  t.to('.history-kicker', { autoAlpha: 1, y: 0, duration: 0.3, ease: 'none' }, 0)
  // El año entra desde la izquierda y se asienta: es el ancla visual de la sección
  t.to('.history-year', { autoAlpha: 1, xPercent: 0, scale: 1, duration: 0.9, ease: 'power2.out' }, 0.1)
  t.to('.history-title .word > span', { autoAlpha: 1, yPercent: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, 0.35)
  t.to('.history-text p', { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.25, ease: 'power3.out' }, 1.1)
  // Tramo final quieto: deja leer antes de soltar la sección
  t.to({}, { duration: 0.6 })
  return t
}

/* ---------- Qué hacemos: los tres frentes se intercambian dentro del panel ----------
   No tiene scrollTrigger propio: devuelve una timeline suelta que initHeroScroll
   engancha a la del hero, porque "qué hacemos" vive dentro del panel izquierdo y
   comparte el mismo tramo fijado. */
function buildServicesSequence(): gsap.core.Timeline | null {
  const services = gsap.utils.toArray<HTMLElement>('.services-stack .service')
  if (!services.length) return null
  const stack = document.querySelector<HTMLElement>('.services-stack')

  // Alto de una fila del índice del cierre: con el detalle oculto, de cada frente
  // solo queda el número y el título. Se mide en vivo (y se recalcula en cada
  // refresh) porque el rem escala con el ancho de la ventana.
  const rowStep = () => {
    if (!stack) return 0
    const first = services[0]
    const title = first.querySelector<HTMLElement>('.service__title')
    const pad = parseFloat(getComputedStyle(first).paddingTop) || 0
    const natural = pad + (title ? title.offsetHeight : 0) + 2 + stack.offsetHeight * 0.05
    // Nunca más de un tercio del hueco: así las tres filas entran siempre
    return Math.min(natural, stack.offsetHeight / 3)
  }

  // Estado inicial explícito, por el mismo motivo que en initHistoryScroll
  gsap.set('.services-head .section-kicker', { autoAlpha: 0, y: '2rem' })
  gsap.set('.services-title .word > span', { autoAlpha: 0, yPercent: 110 })
  gsap.set('.services-intro', { autoAlpha: 0, y: '3rem' })
  gsap.set('.services-cta', { autoAlpha: 0, y: '3rem' })
  gsap.set(services, { autoAlpha: 0, y: '6rem' })
  gsap.set('.services-stack .pill', { autoAlpha: 0, y: '2rem' })

  const t = gsap.timeline()

  // Primero el encabezado
  t.to('.services-head .section-kicker', { autoAlpha: 1, y: 0, duration: 0.3, ease: 'none' }, 0)
  t.to('.services-title .word > span', { autoAlpha: 1, yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' }, 0.15)
  t.to('.services-intro', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.6)

  // Después los frentes: entran de a uno y siempre en el mismo lugar
  const start = 1.3
  const hold = 1.1
  services.forEach((service, i) => {
    const at = start + i * hold
    t.to(service, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }, at)
    t.to(service.querySelectorAll('.pill'), { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, at + 0.12)
    if (i < services.length - 1) {
      t.to(service, { autoAlpha: 0, y: '-5rem', duration: 0.4, ease: 'power2.in' }, at + hold - 0.35)
    }
  })

  // Cierre: el detalle se repliega y los tres frentes se alinean como índice, así
  // la sección se ve completa (los tres juntos) y no suelta el pin a mitad de camino.
  const recap = start + services.length * hold + 0.25
  t.to('.services-stack .service__lead, .services-stack .services-pills', { autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, recap)
  services.forEach((service, i) => {
    t.to(service, { autoAlpha: 1, y: () => i * rowStep(), duration: 0.7, ease: 'power3.out' }, recap + 0.1 + i * 0.08)
  })
  t.to('.services-cta', { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, recap + 0.95)
  // Tramo final quieto: deja leer los tres frentes antes de soltar el pin
  t.to({}, { duration: 0.8 })
  return t
}

/* ---------- Cómo trabajamos: los seis pasos se encadenan de 01 a 06 ----------
   Cada paso traza su línea de izquierda a derecha y recién entonces sube su
   contenido, así se lee como un recorrido que avanza y no como seis bloques
   que aparecen juntos. */
function initProcess(pinned: boolean): gsap.core.Timeline | gsap.core.Timeline[] | null {
  const steps = gsap.utils.toArray<HTMLElement>('.home-process .step')
  if (!steps.length) return null

  // Estado inicial explícito: dentro de una timeline un fromTo en posición > 0 no
  // aplica su "from" hasta que la playhead llega, y el texto se vería antes de entrar.
  const contents = steps.map((s) => s.querySelectorAll('.step__n, .step__title, .step__text'))
  contents.forEach((c) => gsap.set(c, { y: '3.2rem', autoAlpha: 0 }))

  const draw = (step: HTMLElement, content: NodeListOf<Element>, tl: gsap.core.Timeline, at: number, dur: number) => {
    tl.to(step.querySelector('.step__line'), { scaleX: 1, duration: dur * 0.55, ease: 'power2.inOut' }, at)
    tl.to(content, { y: 0, autoAlpha: 1, duration: dur * 0.6, ease: 'power3.out', stagger: dur * 0.06 }, at + dur * 0.18)
  }

  // Sin pin (móvil / tablet): cada paso se anima al entrar en pantalla. Con una sola
  // cascada, los últimos se animarían fuera de vista y el usuario los vería ya puestos.
  if (!pinned) {
    return steps.map((step, i) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 88%', once: true, invalidateOnRefresh: true } })
      draw(step, contents[i], tl, 0, 1)
      return tl
    })
  }

  // Fijada: el scroll traza un paso por vez, así se avanza el proceso de 01 a 06
  gsap.set('.process-head .section-kicker', { autoAlpha: 0, y: '2rem' })
  gsap.set('.process-title .word > span', { autoAlpha: 0, yPercent: 110 })
  gsap.set('.process-cta', { autoAlpha: 0, y: '3rem' })

  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.home-process', start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true },
  })
  tl.to('.process-head .section-kicker', { autoAlpha: 1, y: 0, duration: 0.3, ease: 'none' }, 0)
  tl.to('.process-title .word > span', { autoAlpha: 1, yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' }, 0.15)

  const start = 0.95
  const step = 0.85 // cuánto scroll cuesta cada paso
  steps.forEach((s, i) => draw(s, contents[i], tl, start + i * step, step))
  tl.to('.process-cta', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, start + steps.length * step - 0.3)
  // Tramo final quieto: deja ver los seis pasos juntos antes de soltar la sección
  tl.to({}, { duration: 0.6 })
  return tl
}

/* ---------- footer que se revela debajo de proyectos (como la referencia) ---------- */
function initFooterReveal(): gsap.core.Timeline {
  const foot = gsap.timeline({
    scrollTrigger: { trigger: '#footer', endTrigger: '.wrapper', start: 'top bottom', end: 'bottom bottom', scrub: true, anticipatePin: 1, invalidateOnRefresh: true },
  })
  foot.fromTo('#footer .footer-panel', { y: '30vh' }, { y: 0, ease: 'none' })
  foot.to('.prev-section .portfolio-inner', { y: '14vh', ease: 'none' }, '<')
  // El fade arranca a mitad: si empieza junto con el footer, queda un hueco negro visible
  foot.to('.prev-section .portfolio-inner', { autoAlpha: 0, ease: 'power2.in' }, '<+0.5')
  foot.to('#footer .footer-logo .letter', { y: 0, duration: 0.3, stagger: 0.04 }, '>-.2')
  return foot
}

/* ---------- menú ---------- */
type MenuOptions = {
  smoother: Smoother | null
  menuMark: gsap.core.Timeline | null
}

function initMenu({ smoother, menuMark }: MenuOptions): Cleanup {
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
    if (!href.startsWith('#')) return
    e.preventDefault()
    const target = href === '#top' ? 0 : document.querySelector(href)
    if (target === null) return
    const go = () => {
      if (smoother) {
        // Las anclas dentro del hero no tienen una posición propia: el hero está fijado
        // y su contenido lo va mostrando el scroll. initHeroScroll deja en cada una un
        // data-hero-progress con el punto del tramo fijado en el que se ve.
        const hero = target === 0 ? null : target.closest('.home-hero')
        if (hero instanceof HTMLElement && target instanceof HTMLElement) {
          const p = parseFloat(target.dataset.heroProgress ?? '')
          const span = Math.max(0, hero.offsetHeight - window.innerHeight)
          smoother.scrollTo(hero.offsetTop + (Number.isFinite(p) ? p * span : window.innerHeight), true)
        } else smoother.scrollTo(target, true, 'top top')
      } else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setTimeout(go, wasOpen ? 450 : 0)
  }
  const anchors = Array.from(document.querySelectorAll('a[href^="#"], a[data-menu-close]'))
  anchors.forEach((a) => a.addEventListener('click', onAnchor))

  return () => {
    bt && bt.removeEventListener('click', onBt)
    anchors.forEach((a) => a.removeEventListener('click', onAnchor))
    body.classList.remove(ACTIVE, LEAVE)
  }
}

export default function HomeExperience() {
  useEffect(() => {
    const device = getDevice()
    const cleanups: Cleanup[] = []
    let smoother: Smoother | null = null
    let marqueeCleanup: Cleanup | null = null
    let intro: gsap.core.Timeline | null = null
    let process: gsap.core.Timeline | gsap.core.Timeline[] | null = null
    const sections: (Animation | null)[] = []
    const header = document.querySelector<HTMLElement>('#header')

    if (device.isMobile) {
      const setVh = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
      setVh()
      setTimeout(setVh, 1000)
    }

    runSplitting()
    cleanups.push(initScrollState())
    cleanups.push(initCursor())

    const loaderMark = animateDMark(document.querySelector('#loader .d-mark'), 1)
    const menuMark = animateDMark(document.querySelector('.menu .d-mark'), 1)
    loaderMark && loaderMark.play()

    if (device.isDesktop) {
      setHeroInitialState()
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#pg-home',
        smooth: 2,
        normalizeScroll: true,
        ignoreMobileResize: true,
        effects: true,
      })
      smoother.paused(true) // sin scroll hasta que termine la intro
      initSticky()
      initFooterReveal()
    } else {
      // En móvil no hay intro: el titular se muestra directo
      gsap.set('.hero-headline .word > span', { opacity: 1, yPercent: 0, y: 0 })
    }
    cleanups.push(initSectionWatcher())
    cleanups.push(initMenu({ smoother, menuMark }))

    const startMarquees = () => {
      setTimeout(() => {
        marqueeCleanup = initMarquees()
      }, 600)
    }
    cleanups.push(
      runLoader({
        onLeaving: () => {
          document.dispatchEvent(new CustomEvent('load:leaving'))
          loaderMark && loaderMark.pause()
          gsap.to('#loader .d-mark__d', { scale: 1, duration: 0.35 })
          startMarquees()
        },
        onDone: () => {
          if (device.isDesktop) {
            intro = playHeroIntro(() => {
              initHeroScroll(header)
              smoother && smoother.paused(false)
              ScrollTrigger.refresh()
              refreshAOS()
            })
            // "Qué hacemos" no lleva su propia timeline: la arma initHeroScroll
            // porque vive dentro del panel izquierdo del hero
            sections.push(initHistoryScroll())
          } else {
            refreshAOS()
            // Sin pin: historia y servicios se revelan bloque por bloque
            sections.push(
              ...initRevealOnEnter([
                '.history-kicker',
                '.history-year',
                '.history-title',
                '.history-text p',
                '.services-head > *',
                '.services-stack .service',
                '.services-cta',
              ])
            )
          }
          // Solo en desktop la sección se fija (ver .home-process en globals.css)
          process = initProcess(device.isDesktop)
          ScrollTrigger.refresh()
        },
      })
    )

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      cleanups.forEach((fn) => fn())
      marqueeCleanup && marqueeCleanup()
      destroyAOS()
      intro && intro.kill()
      if (Array.isArray(process)) process.forEach((t) => t.kill())
      else process && process.kill()
      sections.forEach((t) => t && t.kill())
      ScrollTrigger.getAll().forEach((st) => st.kill())
      loaderMark && loaderMark.kill()
      menuMark && menuMark.kill()
      if (smoother) smoother.kill()
    }
  }, [])

  return null
}
