/* eslint-disable @next/next/no-img-element */
import { site } from '@/content/site'
import Button from './Button'

// Cuadro 11: sección negra con una fila de tarjetas de proyectos que corre sola
// (misma marquesina de la referencia), la frase encima y el botón al portfolio.
export default function Portfolio() {
  return (
    <section className="home-portfolio prev-section" data-set-section="dark" id="proyectos">
      <div className="portfolio-inner">
        <div className="cards-marquee marquee-wrapper" data-aos="">
          <div className="marquee-trigger">
            <div className="marquee" data-marquee-speed="0.6" data-marquee-speed-hover="0.15">
              <div className="marquee-item cards-row">
                {site.portfolio.cards.map((card) => (
                  <figure className="card" key={card.src} data-cursor-style="hovered" data-cursor-title={card.name}>
                    <img src={card.src} alt={card.alt} loading="lazy" />
                    <figcaption>{card.name}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
          {/* Velo: sin él el titular no se lee sobre las fotos */}
          <div className="cards-veil" aria-hidden="true" />
        </div>

        <div className="portfolio-heading">
          <h2 className="portfolio-title split-words" data-aos="d:loop">
            {site.portfolio.titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < site.portfolio.titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <p className="portfolio-subtitle" data-aos="fadeIn .8s ease-in-out-cubic .2s, d:loop">
            {site.portfolio.subtitle}
          </p>
        </div>

        <div className="portfolio-cta">
          <Button href={site.portfolio.cta.href} target="_blank" rel="noopener noreferrer">
            {site.portfolio.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
