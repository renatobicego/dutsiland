import { site } from '@/content/site'

// Problemas comunes: los síntomas con los que el visitante se reconoce. Va antes de
// "qué hacemos" porque primero tiene que pensar "esto me pasa a mí" y recién después
// leer qué hacemos al respecto.
//
// Cada una lleva su número y la frase tal como la dice el que la sufre, y nada más.
// Antes cada fila terminaba en una pastilla roja que decía "sin resolver": cuatro
// seguidas y siempre la misma, no agregaban información y dejaban al que lee parado
// en el problema. La respuesta la da el pie.
//
// Abre con la pregunta sola, sin antetítulo: el que había decía lo mismo que ella.
// Y la respuesta va al pie y no arriba, después de que cayeron las cuatro.
//
// Cada fila entra al aparecer en pantalla (ver initProblems en HomeExperience).
export default function Problems() {
  const { title, items, cierre } = site.problems
  return (
    <section className="home-problems" data-set-section="">
      <div className="problems-inner">
        <header className="problems-head">
          <h2 className="problems-title split-words">{title}</h2>
        </header>

        <ul className="problems-list">
          {items.map((item) => (
            <li className="problem" key={item.n}>
              {/* Elemento propio y no un border-top: así se traza con GSAP cuando la
                  fila entra, igual que el riel de "cómo trabajamos" */}
              <span className="problem__line" aria-hidden="true" />
              <span className="problem__id">#{item.n}</span>
              {/* Las comillas van en el CSS (::before): son un signo de la pieza, no
                  parte de la frase, así no las lee el lector de pantalla ni se cuelan
                  si alguien reescribe el contenido. */}
              <p className="problem__quote">{item.quote}</p>
            </li>
          ))}
        </ul>

        <div className="problems-close">
          <p className="problems-close__texto">{cierre.texto}</p>
          <p className="problems-close__remate">{cierre.remate}</p>
        </div>
      </div>
    </section>
  )
}
