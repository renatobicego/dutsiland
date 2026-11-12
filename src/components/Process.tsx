import { site } from '@/content/site'
import Button, { DIcon } from './Button'

// Cómo trabajamos: los pasos de la software factory, del primer café al soporte.
//
// Va en negro y en recorrido, no en grilla sobre crema. Antes era la segunda de dos
// secciones claras seguidas que además abrían igual —antetítulo rojo, título negro,
// alineadas a la izquierda— y se leían como una sola cosa larga.
//
// Los pasos cuelgan de un riel que no se dibuja solo: lo recorre la D de la marca, que
// va encendiendo cada estación al pasarle por encima (ver initProcess). Un proceso es
// un camino, así que se muestra recorriéndolo.
export default function Process() {
  const { kicker, title, steps, cta } = site.process
  return (
    <section className="home-process" data-set-section="dark">
      {/* La D mira a la izquierda, espejo de la de "Qué hacemos": las dos secciones
          oscuras del medio son parientes, no la misma. Y la curva de abajo deja ver el
          crema antes de Proyectos, que también es oscuro. */}
      <div className="process-shape">
        <div className="process-inner">
          <header className="process-head">
            <p className="section-kicker section-kicker--light">
              <DIcon />
              <span>{kicker}</span>
            </p>
            <h2 className="process-title split-words">{title}</h2>
          </header>

          <div className="process-track">
            <div className="process-rail" aria-hidden="true">
              <span className="process-rail__fill" />
              <span className="process-rail__mark">
                <DIcon />
              </span>
            </div>

            <ol className="process-steps">
              {steps.map((step) => (
                <li className="step" key={step.n}>
                  <span className="step__dot" aria-hidden="true" />
                  <span className="step__n">{step.n}</span>
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__text">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="process-cta">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
