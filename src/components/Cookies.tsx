'use client'

import { useSyncExternalStore } from 'react'
import { site } from '@/content/site'

const KEY = 'dutsiland:cookies-accepted'

/* localStorage es un estado que vive fuera de React, así que se lee con
   useSyncExternalStore en lugar de copiarlo a un useState dentro de un efecto: hacer
   eso encadena un render de más apenas monta (React 19 lo marca como error de lint).
   El snapshot del servidor dice "ya aceptó" para que el banner no se pinte en el HTML
   y no haya diferencia con lo que hidrata el cliente. */
let oyentes: (() => void)[] = []
/* Respaldo para cuando localStorage está bloqueado (ventana privada, cookies
   deshabilitadas): sin esto el click en aceptar no ocultaría nada, porque lo guardado
   no se puede volver a leer. Dura lo que dura la visita. */
let aceptadoEnMemoria = false

function suscribir(alCambiar: () => void) {
  oyentes.push(alCambiar)
  return () => {
    oyentes = oyentes.filter((o) => o !== alCambiar)
  }
}

function yaAcepto() {
  if (aceptadoEnMemoria) return true
  try {
    return localStorage.getItem(KEY) !== null
  } catch {
    return false
  }
}

function enElServidor() {
  return true
}

function aceptar() {
  aceptadoEnMemoria = true
  try {
    localStorage.setItem(KEY, '1')
  } catch {
    // Queda sólo en memoria: se vuelve a ver en la próxima visita
  }
  oyentes.forEach((o) => o())
}

export default function Cookies() {
  const aceptado = useSyncExternalStore(suscribir, yaAcepto, enElServidor)

  return (
    <div
      className={`container-cookies ${aceptado ? 'd-none' : ''}`}
      data-aos="reveal-up .8s ease-out-cubic 1s"
      data-cursor-style="default"
    >
      <div className="utilizamos-cookies">
        <p className="font-1 fs--13 text-cookies lh-150">
          {site.cookies.text}{' '}
          <a className="btn-underline black-1" href={site.footer.legal[1].href} data-cursor-style="hovered-small">
            <span>{site.cookies.linkLabel}</span>
          </a>{' '}
          y el uso de cookies.
        </p>
        <div className="container-btn">
          <button
            type="button"
            className="btn-cookies accept font-1 fs--12 black-1 btn-underline text-uppercase"
            onClick={aceptar}
            data-cursor-style="hovered-small"
          >
            <span>{site.cookies.accept}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
