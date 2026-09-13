/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { site } from '@/content/site'
import { ArrowDiagonal } from './Button'

// Cuadro 11: sección negra con una fila de tarjetas de proyectos que corre sola
// (misma marquesina de la referencia), la frase encima y el botón al portfolio.
// Los proyectos que ya tienen ficha escrita linkean a /proyectos/<slug>; los que
// todavía no, quedan como tarjeta sola.
export default function Portfolio() {
  return (
    <section className="home-portfolio prev-section" data-set-section="dark" id="proyectos">
      <div className="portfolio-inner prev-section__inner">
        <div className="cards-marquee marquee-wrapper" data-aos="">
          <div className="marquee-trigger">
            <div className="marquee" data-marquee-speed="0.6" data-marquee-speed-hover="0.15">
              <div className="marquee-item cards-row">
                {site.projects.map((project) => {
                  const inner = (
                    <>
                      <img src={project.cover} alt={project.coverAlt} loading="lazy" />
                      <figcaption>
                        <span className="card__name">{project.name}</span>
                        {project.detail ? (
                          <span className="card__case">
                            {site.portfolio.caseLabel}
                            <ArrowDiagonal />
                          </span>
                        ) : null}
                      </figcaption>
                    </>
                  )
                  return project.detail ? (
                    // Link y no <a>: la navegación es del lado del cliente, así no se
                    // recarga el sitio y el preloader no vuelve a aparecer.
                    <Link
                      className="card card--link"
                      key={project.slug}
                      href={`/proyectos/${project.slug}`}
                      data-cursor-style="hovered"
                      data-cursor-title={site.portfolio.caseLabel}
                      aria-label={`${project.name}: ${site.portfolio.caseLabel}`}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <figure className="card" key={project.slug} data-cursor-style="hovered" data-cursor-title={project.name}>
                      {inner}
                    </figure>
                  )
                })}
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
      </div>
    </section>
  )
}
