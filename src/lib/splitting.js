// Divide el texto en palabras / caracteres con máscaras, replicando el markup que
// genera Splitting.js en la referencia:
//   .split-words  -> <span class="word wrapper-mask" style="--word-index"><span>palabra&nbsp;</span></span>
//   .split-chars  -> <span class="word"><span class="char" style="--char-index">c</span>...</span>

function textNodesToWords(el) {
  // Respeta los <br> existentes convirtiéndolos en saltos explícitos.
  const html = el.innerHTML.replace(/<br\s*\/?>/gi, '\n')
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  const text = tmp.textContent || ''
  return text
    .split('\n')
    .map((line) => line.trim().split(/\s+/).filter(Boolean))
}

export function splitWords(el) {
  if (!el || el.classList.contains('splitting')) return
  const lines = textNodesToWords(el)
  const frag = document.createDocumentFragment()
  let wordIndex = 0
  lines.forEach((words, lineIndex) => {
    words.forEach((word, i) => {
      const w = document.createElement('span')
      w.className = 'word wrapper-mask' + (i === 0 ? ' first-word' : '')
      w.setAttribute('data-word', word)
      w.style.setProperty('--word-index', wordIndex)
      w.style.setProperty('--line-index', lineIndex)
      const inner = document.createElement('span')
      inner.className = 'line-' + lineIndex
      inner.innerHTML = word + '<span>&nbsp;</span>'
      w.appendChild(inner)
      frag.appendChild(w)
      wordIndex++
    })
    if (lineIndex < lines.length - 1) frag.appendChild(document.createElement('br'))
  })
  el.innerHTML = ''
  el.appendChild(frag)
  el.style.setProperty('--word-total', wordIndex)
  el.classList.add('words', 'splitting')
}

export function splitChars(el) {
  if (!el || el.classList.contains('splitting')) return
  const lines = textNodesToWords(el)
  const frag = document.createDocumentFragment()
  let charIndex = 0
  let wordIndex = 0
  lines.forEach((words, lineIndex) => {
    words.forEach((word, i) => {
      const w = document.createElement('span')
      w.className = 'word'
      w.setAttribute('data-word', word)
      w.style.setProperty('--word-index', wordIndex)
      Array.from(word).forEach((ch) => {
        const c = document.createElement('span')
        c.className = 'char'
        c.setAttribute('data-char', ch)
        c.style.setProperty('--char-index', charIndex)
        c.textContent = ch
        w.appendChild(c)
        charIndex++
      })
      frag.appendChild(w)
      if (i < words.length - 1) {
        const ws = document.createElement('span')
        ws.className = 'whitespace'
        ws.innerHTML = ' '
        frag.appendChild(ws)
      }
      wordIndex++
    })
    if (lineIndex < lines.length - 1) frag.appendChild(document.createElement('br'))
  })
  el.innerHTML = ''
  el.appendChild(frag)
  el.style.setProperty('--char-total', charIndex)
  el.classList.add('chars', 'splitting')
}

export function runSplitting(root = document) {
  root.querySelectorAll('.split-words:not(.splitting)').forEach(splitWords)
  root.querySelectorAll('.split-chars:not(.splitting)').forEach(splitChars)
}
