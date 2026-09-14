/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'
import PageShell from '@/components/PageShell'
import { ArrowDiagonal, DIcon } from '@/components/Button'

const title = `Proyectos — ${site.shortName}`

export const metadata: Metadata = {
  title,
  description: site.projectsIndex.intro,
  openGraph: {
    title,
    description: site.projectsIndex.intro,
    url: `${site.url}/proyectos`,
    siteName: site.name,
    locale: 'es_AR',
    type: 'website',
  },
}

// El índice de proyectos: todos en una grilla. Los que tienen ficha escrita navegan a
// /proyectos/<slug>; los que todavía no, se muestran igual pero no son clickeables.
export default function ProjectsPage() {
  const ix = site.projectsIndex

  return (
    <PageShell id="pg-proyectos">
      <main className="project">
        <section className="project-hero" data-set-section="dark">
          <div className="project-hero__shape">
            <div className="project-hero__inner">
              <p className="section-kicker section-kicker--light">
                <DIcon />
                <span>{ix.kicker}</span>
              </p>
              <h1 className="project-title split-words">{ix.title}</h1>
              <p className="project-lead">{ix.intro}</p>
            </div>
          </div>
        </section>

        <section className="projects-index" data-set-section="">
          <ul className="projects-grid">
            {site.projects.map((project) => {
              const inner = (
                <>
                  <span className="project-card__img">
                    <img src={project.cover} alt={project.coverAlt} loading="lazy" />
                  </span>
                  <span className="project-card__body">
                    <span className="project-card__name">{project.name}</span>
                    <span className="project-card__lead">{project.lead}</span>
                    <span className="project-card__case">
                      {project.detail ? (
                        <>
                          {site.portfolio.caseLabel}
                          <ArrowDiagonal />
                        </>
                      ) : (
                        ix.sinFicha
                      )}
                    </span>
                  </span>
                </>
              )
              return (
                <li className="project-card" key={project.slug} data-reveal>
                  {project.detail ? (
                    <Link
                      href={`/proyectos/${project.slug}`}
                      className="project-card__link"
                      data-cursor-style="hovered"
                      data-cursor-title={site.portfolio.caseLabel}
                    >
                      {inner}
                    </Link>
                  ) : (
                    // Sin ficha todavía: se ve, pero no navega
                    <div className="project-card__link project-card__link--off">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </PageShell>
  )
}
