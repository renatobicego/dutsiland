import { site } from '@/content/site'
import Button, { DIcon } from './Button'

// Cómo trabajamos: los seis pasos de la software factory, del primer café al soporte.
// En desktop la sección se fija y el scroll va trazando un paso por vez
// (ver initProcess); en móvil cada paso se anima al entrar en pantalla.
export default function Process() {
  const { kicker, title, steps, cta } = site.process
  return (
    <section className="home-process" data-set-section="">
      {/* data-sticky la fija con GSAP: position:sticky no retiene dentro del scroll suave */}
      <div className="container-sticky" data-sticky data-trigger="parent">
        <div className="process-inner">
          <header className="process-head">
            <p className="section-kicker">
              <DIcon />
              <span>{kicker}</span>
            </p>
            <h2 className="process-title split-words">{title}</h2>
          </header>

          <ol className="process-steps">
            {steps.map((step) => (
              <li className="step" key={step.n}>
                <span className="step__line" aria-hidden="true" />
                <span className="step__n">{step.n}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="process-cta">
            <Button href={cta.href} className="btn-d--dark">
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
