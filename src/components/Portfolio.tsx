/* eslint-disable @next/next/no-img-element */
'use client'

import { useCallback, useEffect, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { site } from '@/content/site'
import Button from './Button'

// Cuadro 11: sección negra con una fila de tarjetas que corre sola, la frase encima y
// el botón a /proyectos.
//
// Las tarjetas ya no son decorado: el click abre el proyecto en grande —la portada, qué
// es y el botón a la ficha—, igual que las capturas dentro de una ficha (ver
// ProjectGallery). El hover señala, el click abre.
//
// El click se escucha en el contenedor y no en cada tarjeta a propósito: initMarquees
// clona la fila con cloneNode para cubrir la pantalla, y esas copias son nodos de DOM
// sin componente de React detrás, así que un onClick puesto en cada botón no se
// dispararía en ellas. Delegando, la copia que se ve abre el proyecto que le toca:
// cuál es lo dice su data-proyecto, que el clonado se lleva puesto.
export default function Portfolio() {
  const proyectos = site.projects
  const [abierto, setAbierto] = useState<number | null>(null)

  const cerrar = useCallback(() => setAbierto(null), [])
  const mover = useCallback(
    (paso: number) =>
      setAbierto((i) => (i === null ? null : (i + paso + proyectos.length) % proyectos.length)),
    [proyectos.length]
  )

  useEffect(() => {
    if (abierto === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar()
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
    }
    window.addEventListener('keydown', onKey)
    // Con el proyecto abierto el fondo no se mueve. Se guarda lo que había en vez de
    // asumir que estaba vacío: el menú a pantalla completa también toca el overflow.
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = antes
    }
  }, [abierto, cerrar, mover])

  const abrirDesdeLaFila = (e: MouseEvent<HTMLDivElement>) => {
    const tarjeta = (e.target as HTMLElement).closest<HTMLElement>('[data-proyecto]')
    if (!tarjeta) return
    const i = Number(tarjeta.dataset.proyecto)
    if (Number.isInteger(i) && proyectos[i]) setAbierto(i)
  }

  const proyecto = abierto === null ? null : proyectos[abierto]

  return (
    <>
      <section className="home-portfolio prev-section" data-set-section="dark">
        <div className="portfolio-inner prev-section__inner">
          <div className="cards-marquee marquee-wrapper" data-aos="" onClick={abrirDesdeLaFila}>
            <div className="marquee-trigger">
              <div className="marquee" data-marquee-speed="0.6" data-marquee-speed-hover="0.15">
                <div className="marquee-item cards-row">
                  {proyectos.map((project, i) => (
                    <figure className="card" key={project.slug}>
                      {/* El rótulo del cursor es lo único que avisa que esto se abre: el
                          sitio apaga el cursor del sistema, así que acá no hay manito
                          que lo diga (lo dibuja initCursor, ver .cursor-wrapper). */}
                      <button
                        type="button"
                        className="card__btn"
                        data-proyecto={i}
                        aria-label={`Ver ${project.name}`}
                        data-cursor-style="hovered"
                        data-cursor-title={site.portfolio.verLabel}
                      >
                        <img src={project.cover} alt="" loading="lazy" />
                        <span className="card__pie">
                          <span className="card__name">{project.name}</span>
                        </span>
                      </button>
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

      {/* El visor va colgado del <body> y no de la sección: .home-portfolio tiene
          z-index propio, así que abre un contexto de apilado y adentro de él el visor
          nunca puede pasar por encima del header, que es fijo y está más arriba en la
          página. Sin esto el menú del header quedaba flotando sobre el proyecto
          abierto. Como sólo se arma cuando hay un proyecto elegido —y elegirlo es un
          click—, nunca corre en el servidor, donde no hay document.

          Reusa el chrome del visor de capturas —la cruz y las flechas— porque es el
          mismo gesto; lo propio es la caja, que acá lleva texto y un botón. */}
      {proyecto
        ? createPortal(
            <div
              className="project-viewer portfolio-viewer"
              role="dialog"
              aria-modal="true"
              aria-label={proyecto.name}
              onClick={cerrar}
            >
              <button
                type="button"
                className="project-viewer__cerrar"
                onClick={cerrar}
                aria-label="Cerrar"
                data-cursor-style="hovered"
              >
                <span />
                <span />
              </button>

              {proyectos.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="project-viewer__flecha project-viewer__flecha--izq"
                    onClick={(e) => {
                      e.stopPropagation()
                      mover(-1)
                    }}
                    aria-label="Proyecto anterior"
                    data-cursor-style="hovered"
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    type="button"
                    className="project-viewer__flecha project-viewer__flecha--der"
                    onClick={(e) => {
                      e.stopPropagation()
                      mover(1)
                    }}
                    aria-label="Proyecto siguiente"
                    data-cursor-style="hovered"
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </>
              ) : null}

              {/* El click adentro no cierra: cerrar es el fondo, la cruz o Escape */}
              <div className="portfolio-viewer__caja" onClick={(e) => e.stopPropagation()}>
                <div className="portfolio-viewer__foto">
                  <img src={proyecto.cover} alt={proyecto.coverAlt} />
                </div>
                <div className="portfolio-viewer__texto">
                  <p className="portfolio-viewer__n">
                    {(abierto ?? 0) + 1} / {proyectos.length}
                  </p>
                  <h3 className="portfolio-viewer__nombre">{proyecto.name}</h3>
                  <p className="portfolio-viewer__lead">{proyecto.lead}</p>
                  {/* Sin ficha escrita no hay a dónde ir: se dice, en vez de ofrecer
                      un botón que lleva a una página vacía. Igual que /proyectos. */}
                  {proyecto.detail ? (
                    <div className="portfolio-viewer__cta">
                      <Button href={`/proyectos/${proyecto.slug}`} data-menu-close>
                        {site.portfolio.verLabel}
                      </Button>
                    </div>
                  ) : (
                    <p className="portfolio-viewer__sinficha">{site.projectsIndex.sinFicha}</p>
                  )}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
