/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { site } from '@/content/site'
import PageShell from '@/components/PageShell'
import Button, { DIcon } from '@/components/Button'

const title = `Sobre ${site.shortName} — ${site.shortName}`

export const metadata: Metadata = {
  title,
  description: site.about.metaDescription,
  openGraph: {
    title,
    description: site.about.metaDescription,
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
        {/* Sin portada: la página abre directamente en el recorrido. La D negra con el
            titular grande ocupaba una pantalla entera para decir lo mismo que el home
            ya dijo antes de traerte acá, y retrasaba lo único que /sobre tiene de
            propio, que es la historia.

            El titular queda igual para el lector de pantalla y para Google: una página
            sin <h1> arranca su esquema en h2 y no se sabe de qué trata. */}
        <h1 className="hide">{a.pageTitle}</h1>

        {/* La historia, como recorrido: el año anclado a la izquierda y los hitos
            colgando de un riel que se dibuja al entrar (ver initRecorrido). Antes era
            un muro de tres párrafos corridos, sin nada que lo ordenara. */}
        <section className="about-story about-story--arranque" data-set-section="">
          <div className="story-inner">
            <aside className="story-aside">
              <p className="story-year">
                {a.year}
                <small>Desde</small>
              </p>
            </aside>

            <ol className="story-steps">
              <span className="story-rail" aria-hidden="true" />
              {a.hitos.map((h) => (
                <li className="story-step" key={h.etapa}>
                  <span className="story-step__dot" aria-hidden="true" />
                  <span className="story-step__etapa">{h.etapa}</span>
                  <h2 className="story-step__title">{h.title}</h2>
                  <p className="story-step__text">{h.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Qué nos define: ordena en tres puntos lo que dice el recorrido de arriba.
            Le da cuerpo a la página sin depender de las fotos del equipo, que todavía
            no están.

            Va sobre el crema y no sobre una D negra como antes: de las cuatro secciones
            de la página, tres eran oscuras, y ésta quedaba pegada al cierre —también
            oscuro— formando una masa de dos pantallas sin respiro. Sobre el claro, el
            negro del cierre vuelve a pesar. */}
        <section className="about-traits" data-set-section="">
          <div className="project-block">
            <p className="section-kicker" data-reveal>
              <DIcon />
              <span>{a.traitsKicker}</span>
            </p>
            <h2 className="project-block__title split-words" data-reveal>
              {a.traitsTitle}
            </h2>

            <ul className="traits-list">
              {a.traits.map((t) => (
                <li className="trait" key={t.n} data-reveal>
                  <span className="trait__n">{t.n}</span>
                  <div className="trait__body">
                    <h3 className="trait__title">{t.title}</h3>
                    <p className="trait__text">{t.text}</p>
                  </div>
                </li>
              ))}
            </ul>
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

        {/* Cierre con contexto: el botón solo, sin antetítulo ni título, quedaba
            colgado en el medio de una sección grande y vacía. */}
        <section className="project-next prev-section" data-set-section="dark">
          <div className="project-next__inner prev-section__inner">
            <p className="section-kicker section-kicker--light" data-reveal>
              <DIcon />
              <span>{a.finalKicker}</span>
            </p>
            <h2 className="project-block__title project-block__title--light split-words" data-reveal>
              {a.finalTitle}
            </h2>
            <p className="project-next__text" data-reveal>
              {a.finalText}
            </p>
            <div className="project-next__cta" data-reveal>
              <Button href={a.ctaFinal.href}>{a.ctaFinal.label}</Button>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
