import { site } from '@/content/site'
import { DIcon } from './Button'

// Nuestra historia. En desktop la sección se fija y el contenido se revela con el
// scroll (ver initHistoryScroll), para que no se pase de largo en dos ruedazos.
export default function History() {
  const { kicker, year, title, text } = site.history
  return (
    <section className="home-history" data-set-section="" id="historia">
      {/* data-sticky lo pinea con GSAP: position:sticky no retiene dentro del scroll suave */}
      <div className="container-sticky" data-sticky data-trigger="parent">
        <div className="history-inner">
          <p className="section-kicker history-kicker">
            <DIcon />
            <span>{kicker}</span>
          </p>

          <div className="history-top">
            <span className="history-year" aria-label={`Desde ${year}`}>
              {year}
            </span>
            <h2 className="history-title split-words">{title}</h2>
          </div>

          <div className="history-text">
            {text.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
