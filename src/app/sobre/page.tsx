/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { site } from '@/content/site'
import PageShell from '@/components/PageShell'
import Button, { DIcon } from '@/components/Button'

const title = `Sobre ${site.shortName} — ${site.shortName}`

export const metadata: Metadata = {
  title,
  description: site.about.subtitle,
  openGraph: {
    title,
    description: site.about.subtitle,
    url: `${site.url}/sobre`,
    siteName: site.name,
    locale: 'es_AR',
    type: 'website',
  },
}

// La historia del estudio, que antes era una sección fijada del home. Acá tiene lugar
// para el cuerpo entero y para el equipo; en el home queda sólo el anuncio con el botón.
export default function AboutPage() {
  const a = site.about

  return (
    <PageShell id="pg-sobre">
      <main className="project">
        {/* Portada: la misma D negra que abre la ficha de proyecto */}
        <section className="project-hero" data-set-section="dark">
          <div className="project-hero__shape">
            <div className="project-hero__inner">
              <p className="section-kicker section-kicker--light">
                <DIcon />
                <span>{a.kicker}</span>
              </p>
              <h1 className="project-title split-words">{a.title}</h1>
              <p className="project-lead">{a.subtitle}</p>

              <dl className="project-meta">
                <div className="project-meta__item">
                  <dt>Desde</dt>
                  <dd>{a.year}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* El cuerpo, sobre el crema */}
        <section className="project-problem" data-set-section="">
          <div className="project-block">
            <div className="project-problem__text">
              {a.text.map((p, i) => (
                <p key={i} data-reveal>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* El equipo. Sin fotos todavía, la sección no se muestra. */}
        {a.team.length ? (
          <section className="about-team" data-set-section="dark">
            <div className="about-team__shape">
              <div className="project-block">
                <p className="section-kicker section-kicker--light" data-reveal>
                  <DIcon />
                  <span>{a.teamKicker}</span>
                </p>
                <h2 className="project-block__title project-block__title--light split-words" data-reveal>
                  {a.teamTitle}
                </h2>

                <ul className="team-grid">
                  {a.team.map((m) => (
                    <li className="team-member" key={m.name} data-reveal>
                      <img src={m.src} alt={m.alt} loading="lazy" />
                      <p className="team-member__name">{m.name}</p>
                      <p className="team-member__role">{m.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        <section className="project-next prev-section" data-set-section="dark">
          <div className="project-next__inner prev-section__inner">
            <div className="project-next__cta" data-reveal>
              <Button href={a.ctaFinal.href}>{a.ctaFinal.label}</Button>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
