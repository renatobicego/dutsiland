'use client'

import { useState } from 'react'
import { site } from '@/content/site'
import { DIcon } from './Button'
import Spinner from './Spinner'

// El mismo endpoint que usaba el sitio anterior
const FORMSPREE = 'https://formspree.io/f/xnqenpeb'

type Estado = 'listo' | 'enviando' | 'ok' | 'error'

// Validación nativa del navegador (required, type, minLength): alcanza para este
// formulario y evita sumar una dependencia sólo para tres campos.
export default function ContactForm() {
  const c = site.contact
  const [estado, setEstado] = useState<Estado>('listo')

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const datos = new FormData(form)
    setEstado('enviando')
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: datos.get('name'),
          email: datos.get('email'),
          message: datos.get('message'),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setEstado('ok')
    } catch {
      setEstado('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={enviar} noValidate={false}>
      <div className="contact-field">
        <label htmlFor="contact-name">{c.fields.name}</label>
        <input id="contact-name" name="name" type="text" required minLength={2} autoComplete="name" data-cursor-style="hovered-small" />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-email">{c.fields.email}</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" data-cursor-style="hovered-small" />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message">{c.fields.message}</label>
        <textarea id="contact-message" name="message" rows={6} required minLength={10} data-cursor-style="hovered-small" />
      </div>

      <div className="contact-actions">
        {/* Botón de verdad y no el <Button/>, que renderiza un link: esto envía un form.
            Mientras se envía, la D quieta del botón deja su lugar a la que carga: ocupa
            exactamente el mismo espacio, así que el botón no cambia de ancho. */}
        <button type="submit" className="btn-d" disabled={estado === 'enviando'} data-cursor-style="hovered">
          <span className="btn-d__content">
            {estado === 'enviando' ? <Spinner /> : <DIcon />}
            <span className="btn-d__label">{estado === 'enviando' ? c.sending : c.submit}</span>
          </span>
          <span className="btn-d__content btn-d__content--hover" aria-hidden="true">
            {estado === 'enviando' ? <Spinner /> : <DIcon />}
            <span className="btn-d__label">{estado === 'enviando' ? c.sending : c.submit}</span>
          </span>
        </button>

        {/* aria-live: el estado se anuncia sin robarle el foco a nadie */}
        <p className="contact-status" role="status" aria-live="polite">
          {estado === 'ok' ? c.success : null}
          {estado === 'error' ? (
            <>
              {c.error}{' '}
              <a className="btn-underlined" href={`mailto:${site.email}`} data-cursor-style="hovered-small">
                <span>{site.email}</span>
              </a>
            </>
          ) : null}
        </p>
      </div>
    </form>
  )
}
