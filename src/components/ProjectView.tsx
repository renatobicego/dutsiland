/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import type { Project, ProjectDetail } from '@/content/site'
import { site } from '@/content/site'
import Button, { ArrowDiagonal, DIcon } from './Button'

type ProjectViewProps = {
  project: Project & { detail: ProjectDetail }
  /** El que se ofrece al final, para seguir mirando */
  next: Project
}

// Ficha de proyecto. Usa el mismo vocabulario que la landing: la D negra como
// contenedor, el antetítulo con la D roja, las pastillas crema y el botón.
// A diferencia de la home, acá no se fija nada: es un documento que scrollea y
// cada bloque se revela al entrar (ver ProjectExperience).
export default function ProjectView({ project, next }: ProjectViewProps) {
  const { detail } = project
  const v = site.projectView

  return (
    <main className="project">
      {/* Portada: la D negra con el nombre, como el hero de la home */}
      <section className="project-hero" data-set-section="dark" id="top">
        <div className="project-hero__shape">
          <div className="project-hero__inner">
            <Link href="/#proyectos" className="project-back btn-underlined" data-cursor-style="hovered" data-menu-close>
              <span>← {v.back}</span>
            </Link>

            <p className="section-kicker section-kicker--light">
              <DIcon />
              <span>{detail.kicker}</span>
            </p>
            <h1 className="project-title split-words">{project.name}</h1>
            <p className="project-lead">{project.lead}</p>

            <dl className="project-meta">
              <div className="project-meta__item">
                <dt>Qué hicimos</dt>
                <dd>{detail.role}</dd>
              </div>
              <div className="project-meta__item">
                <dt>Contexto</dt>
                <dd>{detail.context}</dd>
              </div>
            </dl>

            {detail.links.length ? (
              <div className="project-links">
                {detail.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="project-link btn-underlined"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-style="hovered"
                  >
                    <span>{l.label}</span>
                    <ArrowDiagonal />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* El problema: sección clara, corta el ritmo igual que "Nuestra historia" */}
      <section className="project-problem" data-set-section="">
        <div className="project-block">
          <p className="section-kicker" data-reveal>
            <DIcon />
            <span>{v.problemKicker}</span>
          </p>
          <h2 className="project-block__title split-words" data-reveal>
            {v.problemTitle}
          </h2>
          <div className="project-problem__text">
            {detail.problem.map((p, i) => (
              <p key={i} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Qué construimos: la lista numerada, con el mismo aire que los pasos del proceso */}
      <section className="project-built" data-set-section="dark">
        <div className="project-built__shape">
          <div className="project-block">
            <p className="section-kicker section-kicker--light" data-reveal>
              <DIcon />
              <span>{v.builtKicker}</span>
            </p>
            <h2 className="project-block__title project-block__title--light split-words" data-reveal>
              {v.builtTitle}
            </h2>

            <ol className="project-built__list">
              {detail.built.map((item, i) => (
                <li className="built-item" key={item.title} data-reveal>
                  <span className="built-item__n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="built-item__body">
                    <h3 className="built-item__title">{item.title}</h3>
                    <p className="built-item__text">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            {detail.stack.length ? (
              <div className="project-stack" data-reveal>
                <h3 className="project-stack__title">{v.stackTitle}</h3>
                <ul className="services-pills">
                  {detail.stack.map((s) => (
                    <li className="pill" key={s}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* El producto: las capturas */}
      <section className="project-photos" data-set-section="">
        <div className="project-block">
          <p className="section-kicker" data-reveal>
            <DIcon />
            <span>{v.photosKicker}</span>
          </p>
          <h2 className="project-block__title split-words" data-reveal>
            {v.photosTitle}
          </h2>
        </div>

        <div className="project-gallery">
          {detail.photos.map((photo) => (
            <figure className="shot" key={photo.src} data-reveal data-cursor-style="hovered-small">
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Siguiente proyecto + la invitación a contactarnos */}
      <section className="project-next prev-section" data-set-section="dark">
        <div className="project-next__inner prev-section__inner">
          <p className="section-kicker section-kicker--light" data-reveal>
            <DIcon />
            <span>{v.nextKicker}</span>
          </p>
          <Link
            href={next.detail ? `/proyectos/${next.slug}` : '/#proyectos'}
            className="project-next__link"
            data-cursor-style="hovered"
            data-reveal
          >
            <span className="project-next__name split-words">{next.name}</span>
            <ArrowDiagonal />
          </Link>
          <div className="project-next__cta" data-reveal>
            <Button href={v.cta.href}>{v.cta.label}</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
