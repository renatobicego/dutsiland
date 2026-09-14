/* eslint-disable @next/next/no-img-element */
import { site } from '@/content/site'
import Button from './Button'

// Cuadro 11: sección negra con una fila de tarjetas que corre sola (misma marquesina de
// la referencia), la frase encima y el botón a /proyectos.
// Las tarjetas acá son decorado: no navegan. El índice completo, con las que sí llevan a
// su ficha, está en /proyectos.
export default function Portfolio() {
  return (
    <section className="home-portfolio prev-section" data-set-section="dark">
      <div className="portfolio-inner prev-section__inner">
        <div className="cards-marquee marquee-wrapper" data-aos="">
          <div className="marquee-trigger">
            <div className="marquee" data-marquee-speed="0.6" data-marquee-speed-hover="0.15">
              <div className="marquee-item cards-row">
                {site.projects.map((project) => (
                  <figure className="card" key={project.slug} aria-hidden="true">
                    <img src={project.cover} alt="" loading="lazy" />
                    <figcaption>
                      <span className="card__name">{project.name}</span>
                    </figcaption>
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
          <div className="portfolio-cta">
            <Button href={site.portfolio.cta.href}>{site.portfolio.cta.label}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
