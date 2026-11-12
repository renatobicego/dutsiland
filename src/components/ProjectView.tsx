/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import type { Project, ProjectDetail } from '@/content/site'
import { site } from '@/content/site'
import Button, { ArrowDiagonal, Check, DIcon } from './Button'
import ProjectGallery from './ProjectGallery'

type ProjectViewProps = {
  project: Project & { detail: ProjectDetail }
  /** El que se ofrece al final, para seguir mirando */
  next: Project
}

// Ficha de proyecto. Usa el mismo vocabulario que la landing: la D negra como
// contenedor, el antetítulo con la D roja, las pastillas crema y el botón.
// A diferencia de la home, acá no se fija nada: es un documento que scrollea y
// cada bloque se revela al entrar (ver PageExperience).
export default function ProjectView({ project, next }: ProjectViewProps) {
  const { detail } = project
  const v = site.projectView
  // La primera captura hace de imagen de portada
  const portada = detail.photos[0]

  return (
    <main className="project">
      {/* Portada: la D negra con el nombre, como el hero de la home */}
      {/* --con-captura: la única portada que reserva la derecha, porque acá va la captura */}
      <section className="project-hero project-hero--con-captura" data-set-section="dark">
        <div className="project-hero__shape">
          <div className="project-hero__inner">
            <Link href="/proyectos" className="project-back btn-underlined" data-cursor-style="hovered" data-menu-close>
              <span>← {v.back}</span>
            </Link>

            <p className="section-kicker section-kicker--light">
              <DIcon />
              <span>{detail.kicker}</span>
            </p>
            <h1 className="project-title split-words">{project.name}</h1>
            {/* Qué es el proyecto, en una línea. Debajo iban dos datos sueltos —"qué
                hicimos" y el estado— y los enlaces al producto: el primero sobraba
                porque los proyectos se hacen enteros y no por partes, y los enlaces no
                van porque la mayoría son sistemas privados de cada cliente. */}
            <p className="project-lead">{project.lead}</p>
          </div>

          {/* La captura de portada: el lado derecho de la D era un vacío negro */}
          {portada ? (
            <div className="project-hero__shot" aria-hidden="true">
              <img src={portada.src} alt="" />
            </div>
          ) : null}
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

            {/* Una lista de tildes y no una lista numerada: estas no son etapas en
                orden, son cosas que el sistema hace. Antes cada una ocupaba un bloque
                con número, título de 3,8rem y su regla; seis piezas eran casi dos
                pantallas para enumerar funcionalidades. */}
            <ul className="project-built__list">
              {detail.built.map((item) => (
                <li className="built-item" key={item.title} data-reveal>
                  <span className="built-item__check">
                    <Check />
                  </span>
                  <div>
                    <h3 className="built-item__title">{item.title}</h3>
                    <p className="built-item__text">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
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
          <p className="project-photos__nota" data-reveal>
            {v.photosNota}
          </p>
        </div>

        {/* Las capturas en carrusel, no en grilla: así se ven más grandes, y el click
            abre cualquiera a pantalla casi completa (ver ProjectGallery). */}
        <ProjectGallery fotos={detail.photos} />
      </section>

      {/* Siguiente proyecto + la invitación a contactarnos */}
      <section className="project-next prev-section" data-set-section="dark">
        <div className="project-next__inner prev-section__inner">
          <p className="section-kicker section-kicker--light" data-reveal>
            <DIcon />
            <span>{v.nextKicker}</span>
          </p>
          <Link
            href={next.detail ? `/proyectos/${next.slug}` : "/proyectos"}
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
