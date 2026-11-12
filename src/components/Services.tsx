import { site } from '@/content/site'
import Button, { DIcon } from './Button'

// Qué hacemos: los frentes, cada uno con su número, su título y una línea que lo abre.
// Es una sección propia con silueta de D negra. Los frentes van apilados, uno debajo
// del otro, y se animan al entrar en pantalla (ver initServices en HomeExperience).
// Antes compartían un mismo lugar y el scroll los intercambiaba de a uno, que es lo
// que obligaba a fijar el hero durante ocho pantallas.
export default function Services() {
  const { kicker, title, intro, groups, cta } = site.services
  // data-ancla y no un id: el menú necesita un punto al que saltar, pero "qué hacemos"
  // no tiene URL propia y no debería poder visitarse escribiendo /#servicios.
  return (
    <section className="home-services" data-set-section="dark" data-ancla="servicios">
      <div className="services-shape">
        <div className="services-inner">
          <header className="services-head">
            <p className="section-kicker section-kicker--light">
              <DIcon />
              <span>{kicker}</span>
            </p>
            <h2 className="services-title split-words">{title}</h2>
            <p className="services-intro">{intro}</p>
          </header>

          <div className="services-stack">
            {groups.map((group) => (
              <article className="service" key={group.title}>
                {/* Elemento propio y no un border-top: así GSAP puede trazarla cuando
                    el frente entra, igual que el riel de "cómo trabajamos" */}
                <span className="service__line" aria-hidden="true" />
                <span className="service__n">{group.n}</span>
                <div className="service__body">
                  <h3 className="service__title">{group.title}</h3>
                  <p className="service__lead">{group.lead}</p>
                  <ul className="services-pills">
                    {group.items.map((item) => (
                      <li className="pill" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="services-cta">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
