import { site } from '@/content/site'
import Button, { DIcon } from './Button'

// Qué hacemos: tres frentes con número, título y una línea que los diferencia.
// No es una sección aparte: vive dentro del panel izquierdo del hero (.blob-left2).
// Cuando la frase se va a la derecha, esa sombra negra entra, se abre a todo el ancho
// y los tres frentes se intercambian acá adentro — ver initHeroScroll (fase C) y
// addServicesSequence. En móvil el panel es un bloque más de la pila y los tres
// frentes quedan apilados.
export default function Services() {
  const { kicker, title, intro, groups, cta } = site.services
  // El id lo usa el botón del hero para scrollear hasta acá dentro de la misma sección
  // fijada. No es destino del menú: "qué hacemos" no tiene URL propia.
  return (
    <div className="services-shape" id="servicios">
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
  )
}
