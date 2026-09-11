import { site } from '@/content/site'
import Button, { DIcon } from './Button'

// Qué hacemos: tres frentes con número, título y una línea que los diferencia.
// En desktop la sección se fija y los tres se intercambian en el mismo lugar a
// medida que scrolleás (ver initServicesScroll), así se ven de a uno y la sección
// no se pasa de largo. En móvil quedan apilados.
export default function Services() {
  const { kicker, title, intro, groups, cta } = site.services
  return (
    <section className="home-services" data-set-section="dark" id="servicios">
      {/* data-sticky lo pinea con GSAP: position:sticky no retiene dentro del scroll suave */}
      <div className="container-sticky" data-sticky data-trigger="parent">
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
      </div>
    </section>
  )
}
