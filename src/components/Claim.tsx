import { site } from '@/content/site'
import Button from './Button'

// La frase que abre el sitio. Antes vivía dentro de la D derecha del hero y la
// descubría el scroll; ahora es una sección propia con su propia silueta —una D
// negra espejada, redondeada por la izquierda y a sangre por la derecha— y entra
// al aparecer en pantalla.
export default function Claim() {
  return (
    <section className="home-claim" data-set-section="dark">
      <div className="claim-shape">
        <div className="claim-inner">
          <p className="hero-claim__text">{site.claim.text}</p>
          <div className="claim-cta">
            <Button href={site.claim.cta.href}>{site.claim.cta.label}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
