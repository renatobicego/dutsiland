import type { Metadata } from 'next'
import { site } from '@/content/site'
import PageShell from '@/components/PageShell'
import ContactForm from '@/components/ContactForm'
import { ArrowDiagonal, DIcon } from '@/components/Button'

const title = `Contacto — ${site.shortName}`

export const metadata: Metadata = {
  title,
  description: site.contact.intro,
  openGraph: {
    title,
    description: site.contact.intro,
    url: `${site.url}/contacto`,
    siteName: site.name,
    locale: 'es_AR',
    type: 'website',
  },
}

// Contacto es el formulario y nada más: antes abría con la misma portada a pantalla
// completa que /sobre y la ficha de proyecto —una D negra con el título—, y había que
// pasarla entera para llegar a los campos. En una página cuyo único objetivo es que
// alguien escriba, eso es una pantalla de distancia al único botón que importa.
//
// El título se queda, en versión compacta sobre el formulario: es el h1 de la página,
// y sin él queda sin título para los buscadores y para quien la recorre con un lector
// de pantalla.
export default function ContactPage() {
  const c = site.contact

  return (
    <PageShell id="pg-contacto">
      <main className="project">
        {/* Una franja negra baja de borde a borde, no una portada a pantalla completa:
            da el corte de color y el título sin poner una pantalla entera entre el que
            llega y los campos. Sin recorte de D: acá el negro hace de cabecera de la
            página, y una silueta recortada dejaba un pedazo de crema suelto al costado. */}
        <section className="contact-band" data-set-section="dark">
          <header className="contact-head">
            <p className="section-kicker section-kicker--light">
              <DIcon />
              <span>{c.kicker}</span>
            </p>
            <h1 className="contact-title split-words">{c.title}</h1>
            <p className="contact-intro">{c.intro}</p>
          </header>
        </section>

        <section className="contact-section" data-set-section="">
          <div className="contact-grid">
            <div className="contact-main" data-reveal>
              <ContactForm />
            </div>

            <aside className="contact-side" data-reveal>
              <h2 className="contact-side__title">{c.nextTitle}</h2>
              <ol className="contact-steps">
                {c.next.map((p) => (
                  <li className="contact-step" key={p.n}>
                    <span className="contact-step__n">{p.n}</span>
                    <div>
                      <h3 className="contact-step__title">{p.title}</h3>
                      <p className="contact-step__text">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="contact-direct">
                <p className="contact-direct__label">{c.directLabel}</p>
                <a
                  className="contact-direct__mail"
                  href={`mailto:${site.email}`}
                  data-cursor-style="hovered-small"
                >
                  <span>{site.email}</span>
                  <ArrowDiagonal />
                </a>
                <ul className="contact-redes">
                  {site.social.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" data-cursor-style="hovered-small">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
