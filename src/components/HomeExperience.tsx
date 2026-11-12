'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { getDevice, seguirAlturaReal } from '@/lib/device'
import { runSplitting } from '@/lib/splitting'
import { refreshAOS, destroyAOS } from '@/lib/aos'
import { initMarquees } from '@/lib/marquee'
import type { Cleanup } from '@/lib/marquee'
import { initCursor } from '@/lib/cursor'
import { runLoader } from '@/lib/loader'
import { anclarArriba, revelarEntrada } from '@/lib/entrada'
import { initScrollState, initSectionWatcher } from '@/lib/scrollState'
import { initMenu } from '@/lib/menu'
import { initFooterReveal, protegerRevelados, refrescarAlCargarMedios } from '@/lib/reveal'

gsap.registerPlugin(ScrollTrigger, CustomEase)

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

type Animation = gsap.core.Timeline | gsap.core.Tween

/* El scroll de la home es el del navegador y nada más: no hay secciones fijadas, ni
   animaciones que avancen con la rueda, ni scroll suavizado. Lo único que corre en
   tiempo es la intro del hero, al terminar el preloader; todo lo demás se anima al
   entrar en pantalla y una sola vez (once: true), así que bajar y volver a subir no
   repite nada ni deja contenido a medio aparecer. */

/* Estados de las "D" del hero: inset (%) + radios (vh).
   Cada número viaja en su propia variable CSS y el clip-path se compone en la hoja
   de estilos (ver .blob en globals.css). Animar el string completo no sirve: el
   navegador lo re-serializa y GSAP pierde la correspondencia de números al interpolar.

   Quedan sólo los estados que recorre la intro. Los demás —la frase creciendo, la
   partida en dos D, la apertura del panel— eran del tramo fijado, que ya no existe:
   esos contenidos ahora son secciones propias. */
type ClipState = { t?: number; r: number; b?: number; l: number; tl: number; tr: number; br: number; bl: number; u?: 'vh' | 'vw' }

type ClipName = 'leftFull' | 'leftRounded' | 'leftHero' | 'rightHidden' | 'rightHero'

/* Apaisado (desktop): las dos D se reparten el ancho. */
const CLIP: Record<ClipName, ClipState> = {
  leftFull: { r: 0, l: 0, tl: 0, tr: 0, br: 0, bl: 0 }, // rectángulo = fondo del loader
  leftRounded: { r: 0, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // la D grande con el lockup
  leftHero: { r: 56, l: 0, tl: 0, tr: 50, br: 50, bl: 0 }, // reposo
  rightHidden: { r: 0, l: 100, tl: 0, tr: 0, br: 0, bl: 0 },
  rightHero: { r: 0, l: 46, tl: 50, tr: 0, br: 0, bl: 50 }, // reposo
}

/* Vertical (teléfono y tablet), según la referencia móvil del diseñador.
 *
 * En apaisado las dos D se reparten el ANCHO; en vertical se reparten el ALTO, una
 * arriba y otra abajo, y por eso se miran: el blob de arriba es una D al revés
 * —redondeada a la izquierda y a sangre por la derecha— y el de abajo es una D
 * —a sangre por la izquierda y redondeada a la derecha—. El de arriba lleva el titular
 * y el de abajo el logotipo con el mail.
 *
 * Todas las siluetas dejan aire arriba (t: 3): el negro no llega al borde de la
 * pantalla. El botón de menú queda entonces sobre el crema y se pinta oscuro solo,
 * porque el tono de cada pieza del header se mide contra lo que tiene debajo
 * (initSectionWatcher).
 *
 * Radios en vw: 26vw es el redondeo grande de la referencia. */
const MCLIP: Record<ClipName, ClipState> = {
  leftFull: { t: 0, r: 0, b: 0, l: 0, tl: 0, tr: 0, br: 0, bl: 0, u: 'vw' }, // el fondo del loader
  leftRounded: { t: 3, r: 4, b: 3, l: 0, tl: 0, tr: 26, br: 26, bl: 0, u: 'vw' }, // la D grande con el lockup
  leftHero: { t: 48, r: 7, b: 3, l: 0, tl: 0, tr: 26, br: 26, bl: 0, u: 'vw' }, // el blob de abajo
  // El blob de arriba. Arranca sin alto (t + b = 100) y baja su borde inferior al 45%.
  rightHidden: { t: 3, r: 0, b: 97, l: 7, tl: 26, tr: 0, br: 0, bl: 26, u: 'vw' },
  rightHero: { t: 3, r: 0, b: 55, l: 7, tl: 26, tr: 0, br: 0, bl: 26, u: 'vw' }, // con el titular
}

/* Todo lo que cambia entre apaisado y vertical, junto. */
type Layout = {
  clip: Record<ClipName, ClipState>
  /** De dónde a dónde se mueve el lockup durante la intro */
  logoFrom: gsap.TweenVars
  logoTo: gsap.TweenVars
}

const DESKTOP: Layout = {
  clip: CLIP,
  logoFrom: { left: '50%' },
  logoTo: { left: '22%' },
}

const MOBILE: Layout = {
  clip: MCLIP,
  // El lockup arranca centrado en la pantalla —para que el paso desde la D del loader
  // sea un fundido— y termina centrado en el blob de abajo, que va del 48% al 97%.
  logoFrom: { top: '50%' },
  logoTo: { top: '70%' },
}

function clipVars(s: ClipState): gsap.TweenVars {
  const u = s.u ?? 'vh'
  return {
    '--ct': `${s.t ?? 0}%`,
    '--cr': `${s.r}%`,
    '--cb': `${s.b ?? 0}%`,
    '--cl': `${s.l}%`,
    '--ctl': `${s.tl}${u}`,
    '--ctr': `${s.tr}${u}`,
    '--cbr': `${s.br}${u}`,
    '--cbl': `${s.bl}${u}`,
  }
}

function setClip(selector: string, state: ClipState) {
  gsap.set(selector, clipVars(state))
}

/* Cada paso declara sus dos extremos: si sólo dijera "hasta acá", GSAP tomaría como
   punto de partida lo que dejó el anterior y la silueta arrancaría de donde no debe. */
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

/* ---------- intro del hero, en tiempo, tras el loader ---------- */

/** El hueco entre la D y "UTSILAND", tal como lo dejó el CSS antes de que la intro
 *  aplaste la máscara. Lo lee setHeroInitialState y lo devuelve playHeroIntro. */
let huecoLockup = '2.2vh'

function setHeroInitialState(layout: Layout) {
  const S = layout.clip
  setClip('.blob-left', S.leftFull)
  setClip('.blob-right', S.rightHidden)
  gsap.set('.hero-logo', layout.logoFrom)
  // El hueco entre la D y "UTSILAND" lo fija el CSS y no vale lo mismo en apaisado que
  // en vertical, donde el lockup se mide contra el lado más chico (--d-hero). Se anota
  // antes de aplastar la máscara para que la intro lo devuelva tal cual.
  const mascara = document.querySelector<HTMLElement>('.hero-logo__rest-mask')
  if (mascara) {
    // Se borra el inline ANTES de leer. React monta el efecto dos veces en desarrollo, y
    // sin esto la segunda lectura tomaba el 0 que había escrito la primera: el hueco
    // quedaba en cero y la D terminaba pegada a "UTSILAND".
    mascara.style.marginLeft = ''
    huecoLockup = getComputedStyle(mascara).marginLeft
  }
  gsap.set('.hero-logo__rest-mask', { width: 0, marginLeft: 0 })
  gsap.set('.hero-mail', { autoAlpha: 0, y: '2rem' })
  gsap.set('#header', { autoAlpha: 0 })
  // El punto de partida del titular se declara acá con las dos componentes (yPercent
  // e y). Si se lo deja al `transform: translateY(100%)` del CSS, GSAP lo convierte a
  // píxeles y lo guarda en `y`: animar solo yPercent no mueve nada y las palabras
  // quedan abajo, tapadas por la máscara de .word.
  gsap.set('.hero-headline .word > span', { opacity: 0, yPercent: 100, y: 0 })
}

/* La coreografía de la intro está escrita en segundos "de dibujo": cada paso con la
   duración que lo hace legible y los solapes contados a mano. Para acelerarla no se
   tocan esos números uno por uno —se perderían los solapes, que es de donde sale que
   parezca un solo movimiento y no cinco—: se corre entera más rápido. */
const RITMO_INTRO = 1.9

function playHeroIntro(layout: Layout, onComplete: () => void): gsap.core.Timeline {
  const S = layout.clip
  const mask = document.querySelector('.hero-logo__rest-mask')
  const rest = document.querySelector('.hero-logo__rest')
  const restWidth = rest ? rest.getBoundingClientRect().width : 0
  const tl = gsap.timeline({ onComplete })
  // 1. el fondo negro del loader se vuelve una D gigante
  tl.add(clipTween('.blob-left', S.leftFull, S.leftRounded, { duration: 0.8, ease: 'power2.inOut' }), 0)
  // 2. "UTSILAND" sale de atrás de la D
  tl.to(mask, { width: restWidth, marginLeft: huecoLockup, duration: 0.9, ease: 'power3.out' }, 0.55)
  // 3. la D se achica (a la izquierda en apaisado, hacia arriba en vertical) y entra la
  //    otra D, la que lleva el titular. Ahí las dos quedan quietas: eso es la portada.
  tl.add(clipTween('.blob-left', S.leftRounded, S.leftHero, { duration: 1.1, ease: 'power3.inOut' }), 1.5)
  tl.to('.hero-logo', { ...layout.logoTo, duration: 1.1, ease: 'power3.inOut' }, 1.5)
  tl.add(clipTween('.blob-right', S.rightHidden, S.rightHero, { duration: 1.1, ease: 'power3.inOut' }), 1.6)
  // Mismo movimiento que tenía la animación CSS slide-up (1s, la misma curva y 70ms
  // de stagger), pero con GSAP: escribe estilos inline y no se reinicia solo.
  tl.to(
    '.hero-headline .word > span',
    { opacity: 1, yPercent: 0, y: 0, duration: 1, stagger: 0.07, ease: CustomEase.create('headline-ease', 'M0,0 C0.645,0.045 0.355,1 1,1') },
    2.2
  )
  tl.to('.hero-mail', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 2.5)
  tl.to('#header', { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 2.4)
  tl.timeScale(RITMO_INTRO)
  return tl
}

/* ---------- La frase ----------
   Antes vivía dentro de la D derecha y la descubría el scroll; ahora es una sección
   con su propia silueta y entra cuando aparece en pantalla. */
function initClaim(): gsap.core.Timeline | null {
  const seccion = document.querySelector('.home-claim')
  if (!seccion) return null
  const forma = seccion.querySelector('.claim-shape')
  gsap.set('.home-claim .hero-claim__text', { autoAlpha: 0, y: '4rem' })
  gsap.set('.home-claim .claim-cta', { autoAlpha: 0, y: '3rem' })
  const tl = gsap.timeline({ scrollTrigger: { trigger: seccion, start: 'top 78%', once: true, invalidateOnRefresh: true } })
  // Primero entra la D, barriendo desde la derecha; el texto llega detrás, cuando ya
  // hay negro donde apoyarse. Si entraran juntos, las palabras aparecerían sobre el
  // crema y el barrido las pasaría por encima.
  tl.fromTo(forma, { '--pl': '100%' }, { '--pl': '0%', duration: 1.1, ease: 'power3.inOut' }, 0)
  tl.to('.home-claim .hero-claim__text', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.5)
  tl.to('.home-claim .claim-cta', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.85)
  return tl
}

/* ---------- Problemas comunes: los síntomas ----------
   Abre con la pregunta y nada más. Cada fila entra como se completa una lista: primero
   la línea que la cierra por abajo, después el número y la frase. El pie —el porqué y
   el remate— llega al final, cuando ya se leyeron las cuatro. */
function initProblems(): gsap.core.Timeline[] {
  const timelines: gsap.core.Timeline[] = []
  const head = document.querySelector('.problems-head')
  if (head) {
    // Sólo la pregunta: el antetítulo y el párrafo que la acompañaban ya no están acá.
    gsap.set('.problems-title .word > span', { autoAlpha: 0, yPercent: 110 })
    const tl = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 85%', once: true, invalidateOnRefresh: true } })
    tl.to('.problems-title .word > span', { autoAlpha: 1, yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' })
    timelines.push(tl)
  }

  gsap.utils.toArray<HTMLElement>('.problems-list .problem').forEach((item) => {
    const linea = item.querySelector('.problem__line')
    const contenido = item.querySelectorAll('.problem__id, .problem__quote')
    gsap.set(linea, { scaleX: 0 })
    gsap.set(contenido, { autoAlpha: 0, y: '2.4rem' })
    const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 88%', once: true, invalidateOnRefresh: true } })
    tl.to(linea, { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, 0)
    tl.to(contenido, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out' }, 0.14)
    timelines.push(tl)
  })

  const cierre = document.querySelector('.problems-close')
  if (cierre) {
    const partes = cierre.querySelectorAll('.problems-close__texto, .problems-close__remate')
    gsap.set(partes, { autoAlpha: 0, y: '2.4rem' })
    const tl = gsap.timeline({ scrollTrigger: { trigger: cierre, start: 'top 92%', once: true, invalidateOnRefresh: true } })
    // El remate detrás del párrafo y no con él: es la respuesta, y llega cuando ya se
    // leyó por qué ninguna de las cuatro se arregla comprando otra cosa.
    tl.to(partes, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.2, ease: 'power2.out' })
    timelines.push(tl)
  }
  return timelines
}

/* ---------- Qué hacemos: los frentes, apilados ----------
   Antes compartían un mismo lugar y el scroll los intercambiaba de a uno; ahora están
   los cuatro a la vista y cada uno entra cuando le toca aparecer. Cada frente trae su
   propio disparador: con una sola cascada para los cuatro, los últimos se animarían
   fuera de vista y el que mira los encontraría ya puestos. */
function initServices(): gsap.core.Timeline[] {
  const timelines: gsap.core.Timeline[] = []
  const head = document.querySelector('.services-head')
  if (head) {
    gsap.set('.services-head .section-kicker', { autoAlpha: 0, y: '2rem' })
    gsap.set('.services-title .word > span', { autoAlpha: 0, yPercent: 110 })
    gsap.set('.services-intro', { autoAlpha: 0, y: '3rem' })
    const tl = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 85%', once: true, invalidateOnRefresh: true } })
    tl.to('.services-head .section-kicker', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0)
    tl.to('.services-title .word > span', { autoAlpha: 1, yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' }, 0.15)
    tl.to('.services-intro', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.45)
    timelines.push(tl)
  }

  // La línea abre cada frente: se traza sola de izquierda a derecha y el texto llega
  // atrás. Ahora cada una tiene su lugar propio en la página, así que se queda dibujada
  // —antes se retraía, porque las cuatro caían en el mismo píxel.
  gsap.utils.toArray<HTMLElement>('.services-stack .service').forEach((service) => {
    const linea = service.querySelector('.service__line')
    const contenido = service.querySelectorAll('.service__n, .service__body')
    const pills = service.querySelectorAll('.pill')
    gsap.set(linea, { scaleX: 0 })
    gsap.set(contenido, { autoAlpha: 0, y: '4rem' })
    gsap.set(pills, { autoAlpha: 0, y: '2rem' })
    const tl = gsap.timeline({ scrollTrigger: { trigger: service, start: 'top 85%', once: true, invalidateOnRefresh: true } })
    tl.to(linea, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 0)
    tl.to(contenido, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.2)
    tl.to(pills, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0.32)
    timelines.push(tl)
  })

  const cta = document.querySelector('.services-cta')
  if (cta) {
    gsap.set(cta, { autoAlpha: 0, y: '3rem' })
    const tl = gsap.timeline({ scrollTrigger: { trigger: cta, start: 'top 92%', once: true, invalidateOnRefresh: true } })
    tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    timelines.push(tl)
  }
  return timelines
}

/* ---------- Cómo trabajamos: el recorrido ----------
   La D de la marca cruza el riel y va encendiendo cada estación al pasarle por encima:
   el punto salta, el número y el texto suben, y detrás queda el riel pintado de rojo.
   Un proceso es un camino, así que se muestra recorriéndolo en vez de listarlo.

   El viaje va con ease 'none' a propósito: si acelerara, la D dejaría de coincidir con
   la estación que enciende, y la sincronía es todo el truco. Con velocidad constante,
   el paso i-ésimo dispara en la fracción i/(n-1) del recorrido y cae exacto.

   En tiempo y al entrar en pantalla, no atado al scroll: tiene que completarse se
   scrollee rápido o lento. */
const VIAJE = 1.7

function initProcess(): gsap.core.Timeline[] {
  const timelines: gsap.core.Timeline[] = []
  const head = document.querySelector('.process-head')
  if (head) {
    gsap.set('.process-head .section-kicker', { autoAlpha: 0, y: '2rem' })
    gsap.set('.process-title .word > span', { autoAlpha: 0, yPercent: 110 })
    const tl = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 85%', once: true, invalidateOnRefresh: true } })
    tl.to('.process-head .section-kicker', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0)
    tl.to('.process-title .word > span', { autoAlpha: 1, yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' }, 0.15)
    timelines.push(tl)
  }

  const track = document.querySelector<HTMLElement>('.process-track')
  const riel = document.querySelector<HTMLElement>('.process-rail')
  const relleno = document.querySelector<HTMLElement>('.process-rail__fill')
  const marca = document.querySelector<HTMLElement>('.process-rail__mark')
  const pasos = gsap.utils.toArray<HTMLElement>('.process-steps .step')
  const puntos = pasos.map((p) => p.querySelector<HTMLElement>('.step__dot'))

  if (track && riel && relleno && marca && pasos.length > 1 && puntos.every(Boolean)) {
    const esVertical = window.matchMedia('(max-width: 1025px)').matches
    const centro = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      return esVertical ? r.top + r.height / 2 : r.left + r.width / 2
    }

    // El riel va del primer punto al último, medido: en vertical los pasos tienen
    // alturas distintas y no hay calc de CSS que resuelva dónde cae el último.
    const ajustarRiel = () => {
      const t = track.getBoundingClientRect()
      const a = centro(puntos[0]!)
      const b = centro(puntos[puntos.length - 1]!)
      if (esVertical) {
        riel.style.top = `${a - t.top}px`
        riel.style.bottom = 'auto'
        riel.style.height = `${b - a}px`
      } else {
        riel.style.left = `${a - t.left}px`
        riel.style.right = 'auto'
        riel.style.width = `${b - a}px`
      }
      return b - a
    }
    let largo = ajustarRiel()

    const eje = esVertical ? 'y' : 'x'
    const escala = esVertical ? 'scaleY' : 'scaleX'

    gsap.set(relleno, { [escala]: 0 })
    gsap.set(marca, { autoAlpha: 0, x: 0, y: 0, scale: 1 })
    pasos.forEach((p, i) => {
      gsap.set(puntos[i]!, { scale: 0 })
      gsap.set(p.querySelectorAll('.step__n, .step__title, .step__text'), { autoAlpha: 0, y: '2.4rem' })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: 'top 80%',
        once: true,
        invalidateOnRefresh: true,
        onRefresh: () => {
          largo = ajustarRiel()
        },
      },
    })

    tl.to(marca, { autoAlpha: 1, duration: 0.18, ease: 'none' }, 0)
    tl.to(marca, { [eje]: () => largo, duration: VIAJE, ease: 'none' }, 0)
    tl.to(relleno, { [escala]: 1, duration: VIAJE, ease: 'none' }, 0)

    pasos.forEach((p, i) => {
      const at = (i / (pasos.length - 1)) * VIAJE
      tl.to(puntos[i]!, { scale: 1, duration: 0.45, ease: 'back.out(2.8)' }, at)
      tl.to(
        p.querySelectorAll('.step__n, .step__title, .step__text'),
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.05, ease: 'power3.out' },
        at + 0.04
      )
      // La D pega un tirón en cada estación: se nota que está encendiéndolas, no que
      // simplemente pasa por al lado.
      tl.to(marca, { scale: 1.5, duration: 0.12, ease: 'power2.out' }, at)
      tl.to(marca, { scale: 1, duration: 0.24, ease: 'power2.inOut' }, at + 0.12)
    })

    // Llega al final y se funde con el último punto: el recorrido terminó y lo que
    // queda es el riel rojo entero.
    tl.to(marca, { autoAlpha: 0, scale: 0.5, duration: 0.3, ease: 'power2.in' }, VIAJE + 0.42)
    timelines.push(tl)
  }

  const cta = document.querySelector('.process-cta')
  if (cta) {
    gsap.set(cta, { autoAlpha: 0, y: '3rem' })
    const tl = gsap.timeline({ scrollTrigger: { trigger: cta, start: 'top 92%', once: true, invalidateOnRefresh: true } })
    tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    timelines.push(tl)
  }
  return timelines
}

export default function HomeExperience() {
  useEffect(() => {
    const device = getDevice()
    const cleanups: Cleanup[] = []
    let marqueeCleanup: Cleanup | null = null
    let intro: gsap.core.Timeline | null = null
    const sections: (Animation | null)[] = []

    if (device.isMobile) cleanups.push(seguirAlturaReal())

    runSplitting()
    // Antes de armar nada: si se recargó con el scroll a mitad, la intro arrancaría con
    // la portada fuera de cuadro. Se entra siempre desde arriba.
    cleanups.push(anclarArriba())
    cleanups.push(initScrollState())
    cleanups.push(initCursor())

    // El loader dura poco más de un segundo: a ritmo normal la D no llegaba a completar
    // su respiración y se la veía quedar a mitad de camino. Late al doble.
    const loaderMark = animateDMark(document.querySelector('#loader .d-mark'), 2)
    const menuMark = animateDMark(document.querySelector('.menu .d-mark'), 1)
    if (loaderMark) loaderMark.play()

    const layout = device.isDesktop ? DESKTOP : MOBILE
    setHeroInitialState(layout)
    // Sin scroll mientras corre la intro: dura poco más de un segundo, y si se scrollea
    // encima la portada se va de cuadro mientras todavía se está armando.
    document.documentElement.classList.add('intro-running')
    cleanups.push(initSectionWatcher())
    cleanups.push(initMenu({ menuMark }))

    const startMarquees = () => {
      setTimeout(() => {
        marqueeCleanup = initMarquees()
      }, 600)
    }
    // Volver desde una ficha de proyecto es navegación dentro del sitio: el preloader
    // ya se vio al entrar y repetirlo es tapar la página por gusto. Y si además se
    // vuelve a un ancla, tampoco corresponde la intro: el usuario quiere ir a ese
    // punto, no ver la presentación de nuevo, así que la timeline se salta al final.
    const yaEntro = document.body.dataset.load === 'first-done'
    const conAncla = Boolean(window.location.hash) && window.location.hash !== '#top'

    const soltarScroll = () => document.documentElement.classList.remove('intro-running')

    const arrancar = () => {
      intro = playHeroIntro(layout, () => {
        soltarScroll()
        ScrollTrigger.refresh()
        refreshAOS()
      })
      if (yaEntro && conAncla) {
        intro.progress(1)
        soltarScroll()
      }
      // Los revelados se arman ya, sin esperar a la intro: no dependen de ella, y si se
      // entra con un ancla el contenido de destino tiene que estar listo antes del salto.
      const revelados = [
        ...initProblems(),
        ...initServices(),
        ...initProcess(),
        initClaim(),
        initFooterReveal(),
        // Todas devuelven timelines (o null si su sección no está en la página); el
        // predicado saca los nulos para que protegerRevelados reciba sólo animaciones.
      ].filter((t): t is gsap.core.Timeline => Boolean(t))
      sections.push(...revelados)
      // Todos bajo la misma red: casi toda la página entra al aparecer, así que una
      // sección cuyo disparador no llegue a correr sería contenido invisible.
      cleanups.push(protegerRevelados(revelados))
      ScrollTrigger.refresh()
    }

    if (yaEntro) {
      startMarquees()
      arrancar()
    } else {
      cleanups.push(
        runLoader({
          onLeaving: () => {
            document.dispatchEvent(new CustomEvent('load:leaving'))
            if (loaderMark) loaderMark.pause()
            gsap.to('#loader .d-mark__d', { scale: 1, duration: 0.35 })
            startMarquees()
          },
          onDone: () => {
            revelarEntrada()
            arrancar()
          },
        })
      )
    }

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    // Las fuentes y las imágenes pueden llegar después del load y cambian el alto de la
    // página: sin recalcular, los disparadores quedan corridos del contenido que miran.
    cleanups.push(refrescarAlCargarMedios())

    return () => {
      window.removeEventListener('load', onLoad)
      cleanups.forEach((fn) => fn())
      if (marqueeCleanup) marqueeCleanup()
      destroyAOS()
      if (intro) intro.kill()
      sections.forEach((t) => t && t.kill())
      ScrollTrigger.getAll().forEach((st) => st.kill())
      if (loaderMark) loaderMark.kill()
      if (menuMark) menuMark.kill()
      document.documentElement.classList.remove('intro-running')
    }
  }, [])

  return null
}
