// Sistema de "reveal on scroll" equivalente al data-aos propio de la referencia.
//
// Sintaxis de data-aos (igual que el original):
//   data-aos="fadeIn .8s ease-in-out-cubic .8s, d:loop, trigger:.home-intro"
//   - primer bloque: nombre de animación, duración, easing, delay
//   - "loop" / "d:loop" / "dt:loop": vuelve a animar cada vez que entra (por dispositivo)
//   - "trigger:selector": observa otro elemento (closest o querySelector) en lugar de sí mismo
//   - data-aos="" (vacío): sólo agrega la clase .aos-animate

const EASES = {
  ease: 'ease',
  linear: 'linear',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'ease-in-cubic': 'cubic-bezier(.55,.055,.675,.19)',
  'ease-out-cubic': 'cubic-bezier(.215,.61,.355,1)',
  'ease-in-out-cubic': 'cubic-bezier(.645,.045,.355,1)',
  'ease-in-quart': 'cubic-bezier(.895,.03,.685,.22)',
  'ease-out-quart': 'cubic-bezier(.165,.84,.44,1)',
  'ease-in-out-quart': 'cubic-bezier(.77,0,.175,1)',
  'ease-in-expo': 'cubic-bezier(.95,.05,.795,.035)',
  'ease-out-expo': 'cubic-bezier(.19,1,.22,1)',
  'ease-in-out-expo': 'cubic-bezier(1,0,0,1)',
  'ease-in-out-circ': 'cubic-bezier(.785,.135,.15,.86)',
  'ease-in-out-sine': 'cubic-bezier(.445,.05,.55,.95)',
}

function currentSize() {
  const w = window.innerWidth
  if (w < 768) return 'phone'
  if (w <= 1200) return 'tablet'
  return 'desktop'
}

function buildAnimation(tokens) {
  // tokens: [name, duration?, easing?, delay?]
  const name = tokens[0]
  let duration = '.8s'
  let easing = 'ease-in-out'
  let delay = ''
  tokens.slice(1).forEach((t, i) => {
    if (EASES[t]) easing = EASES[t]
    else if (/^-?[\d.]+m?s$/.test(t)) {
      if (i === 0 && !delay && duration === '.8s' && tokens.slice(1).filter((x) => /^-?[\d.]+m?s$/.test(x)).length >= 1 && t === tokens[1]) duration = t
      else delay = t
    }
  })
  return `${name} ${duration} ${easing}${delay ? ' ' + delay : ''} both`
}

function parse(el) {
  const raw = (el.getAttribute('data-aos') || '').trim()
  const entry = {
    el,
    trigger: el,
    loop: { desktop: false, tablet: false, phone: false },
    animated: false,
    desktop: null,
    tablet: null,
    phone: null,
  }
  if (!raw) return entry
  raw.split(',').map((s) => s.trim()).filter(Boolean).forEach((part) => {
    const m = part.match(/^([a-z]{1,3}):\s*(.+)$/i)
    let key = null
    let value = part
    if (m && !/^\d/.test(m[2])) {
      key = m[1]
      value = m[2].trim()
    }
    if (key === 'trigger') {
      const sel = value
      let t = el.closest(sel)
      if (!t) t = document.querySelector(sel)
      if (t) entry.trigger = t
      return
    }
    if (value === 'loop') {
      if (key) {
        if (key.includes('d')) entry.loop.desktop = true
        if (key.includes('t')) entry.loop.tablet = true
        if (key.includes('p')) entry.loop.phone = true
      } else {
        entry.loop.desktop = entry.loop.tablet = entry.loop.phone = true
      }
      return
    }
    const anim = buildAnimation(value.split(/\s+/))
    if (!key) {
      entry.desktop = entry.tablet = entry.phone = anim
    } else {
      if (key.includes('d')) entry.desktop = anim
      if (key.includes('t')) entry.tablet = anim
      if (key.includes('p')) entry.phone = anim
    }
  })
  return entry
}

let entries = []
let observer = null

function animate(entry, size) {
  entry.animated = true
  entry.el.classList.add('aos-animate')
  const anim = entry[size]
  if (anim) {
    entry.el.style.animation = anim
    entry.el.classList.add(anim.split(/\s+/)[0])
  }
}

function reset(entry, size) {
  const anim = entry[size]
  if (anim) {
    entry.el.style.animation = ''
    entry.el.classList.remove(anim.split(/\s+/)[0])
  }
  entry.el.classList.remove('aos-animate')
}

function onIntersect(records) {
  const size = currentSize()
  records.forEach((rec) => {
    const matches = entries.filter((e) => e.trigger === rec.target)
    const visible = rec.isIntersecting
    const above = rec.boundingClientRect.top < 0
    matches.forEach((entry) => {
      if (!entry.el.isConnected) return
      if ((visible && !entry.animated) || (visible && entry.loop[size])) {
        const delay = Number(entry.el.dataset.delay || 0)
        if (delay > 0) setTimeout(() => animate(entry, size), delay)
        else animate(entry, size)
      }
      if (!visible && entry.loop[size] && !above) reset(entry, size)
    })
  })
}

export function refreshAOS(root = document) {
  entries = []
  if (observer) observer.disconnect()
  observer = new IntersectionObserver(onIntersect, { rootMargin: '0px', threshold: 0 })
  root.querySelectorAll('[data-aos]').forEach((el) => {
    const entry = parse(el)
    entries.push(entry)
    observer.observe(entry.trigger)
  })
}

export function destroyAOS() {
  if (observer) observer.disconnect()
  observer = null
  entries = []
}
