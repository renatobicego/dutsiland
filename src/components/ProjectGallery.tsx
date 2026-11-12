/* eslint-disable @next/next/no-img-element */
'use client'

import { useCallback, useEffect, useState } from 'react'
import { site, type ProjectPhoto } from '@/content/site'

export type ProjectGalleryProps = {
  fotos: ProjectPhoto[]
}

// Las capturas del proyecto, en carrusel.
//
// El desfile y el destaque al pasar el mouse son de CSS: una animación que se pausa con
// :hover y un filtro que desenfoca a las que no están debajo del puntero. Acá en JS va
// sólo lo que necesita estado —cuál está abierta en grande— y lo que necesita teclado.
//
// El desfile corre en todos los anchos. Cada captura va encuadrada en un marco de
// proporción fija para que la fila se vea pareja aunque los archivos tengan tamaños
// distintos (ver .shot__btn en globals.css).
//
// La imagen grande se abre con un click y no al pasar el mouse: tapar la pantalla tiene
// que ser una decisión. El hover señala, el click abre.
export default function ProjectGallery({ fotos }: ProjectGalleryProps) {
  const [abierta, setAbierta] = useState<number | null>(null)
  // Con una sola captura no hay nada que desfilar: se muestra quieta.
  const desfila = fotos.length > 1

  const cerrar = useCallback(() => setAbierta(null), [])
  const mover = useCallback(
    (paso: number) => setAbierta((i) => (i === null ? null : (i + paso + fotos.length) % fotos.length)),
    [fotos.length]
  )

  useEffect(() => {
    if (abierta === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar()
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
    }
    window.addEventListener('keydown', onKey)
    // Con la imagen abierta el fondo no se mueve. Se guarda lo que había en vez de
    // asumir que estaba vacío: el menú a pantalla completa también toca el overflow.
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = antes
    }
  }, [abierta, cerrar, mover])

  const tiras = desfila ? [...fotos, ...fotos] : fotos
  const foto = abierta === null ? null : fotos[abierta]

  return (
    <>
      <div className="project-gallery" data-desfila={desfila ? '' : undefined} data-abierta={abierta !== null ? '' : undefined} data-reveal>
        <div className="project-gallery__track">
          {tiras.map((f, i) => {
            const idx = i % fotos.length
            return (
              <figure className="shot" key={`${f.src}-${i}`}>
                {/* El rótulo del cursor es lo único que avisa que esto se abre: el sitio
                    apaga el cursor del sistema, así que acá no hay manito que lo diga.
                    Lo lee initCursor y lo dibuja al lado del punto (ver .cursor-wrapper
                    en globals.css), igual que las tarjetas de /proyectos. */}
                <button
                  type="button"
                  className="shot__btn"
                  onClick={() => setAbierta(idx)}
                  aria-label={`Ver ${f.alt} en grande`}
                  data-cursor-style="hovered"
                  data-cursor-title={site.projectView.photosHint}
                >
                  <img src={f.src} alt={f.alt} loading="lazy" />
                </button>
                <figcaption>{f.caption}</figcaption>
              </figure>
            )
          })}
        </div>
      </div>

      {foto ? (
        <div className="project-viewer" role="dialog" aria-modal="true" aria-label={foto.alt} onClick={cerrar}>
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

          {fotos.length > 1 ? (
            <>
              <button
                type="button"
                className="project-viewer__flecha project-viewer__flecha--izq"
                onClick={(e) => {
                  e.stopPropagation()
                  mover(-1)
                }}
                aria-label="Captura anterior"
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
                aria-label="Captura siguiente"
                data-cursor-style="hovered"
              >
                <span aria-hidden="true">→</span>
              </button>
            </>
          ) : null}

          {/* El click en la imagen no cierra: cerrar es el fondo, la cruz o Escape */}
          <figure className="project-viewer__caja" onClick={(e) => e.stopPropagation()}>
            <img src={foto.src} alt={foto.alt} />
            <figcaption>
              {foto.caption}
              {fotos.length > 1 ? (
                <small>
                  {(abierta ?? 0) + 1} / {fotos.length}
                </small>
              ) : null}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  )
}
