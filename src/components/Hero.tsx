/* eslint-disable @next/next/no-img-element */
import { site } from '@/content/site'
import Button, { ArrowDiagonal } from './Button'
import Services from './Services'

// Cuadros 3 a 8 del storyboard: dos "D" negras que se transforman.
//  - Intro (tiempo): la D del loader abre sus esquinas, "UTSILAND" sale de atrás de la D,
//    el blob se achica a la izquierda y el blob derecho entra con el titular.
//  - Scroll (fijado): el blob izquierdo se cierra, el derecho crece a todo el ancho y
//    muestra la frase + botón; después se parte en dos otra vez.
export default function Hero() {
  return (
    <section className="home-hero" data-set-section="dark" id="top">
      <div className="container-sticky" data-sticky data-trigger="parent">
        <div className="hero-stage">
          {/* Blob izquierdo: logo + mail */}
          <div className="blob blob-left" data-cursor-style="default-white">
            <div className="hero-logo">
              <img className="hero-logo__d" src="/brand/D-light.png" alt="" />
              <div className="hero-logo__rest-mask">
                <img className="hero-logo__rest" src="/brand/utsiland-light.png" alt="Dutsiland" />
              </div>
            </div>
            <a href={`mailto:${site.email}`} className="hero-mail btn-underlined white-1" data-cursor-style="hovered">
              <span>{site.email}</span>
              <ArrowDiagonal />
            </a>
          </div>

          {/* Blob derecho: titular y, más abajo en el scroll, la frase */}
          <div className="blob blob-right" data-cursor-style="default-white">
            {/* El reveal palabra por palabra lo anima la intro con GSAP, no data-aos */}
            <h1 className="hero-headline">
              {site.hero.headline.map((line, i) => (
                <span className="hero-headline__line split-words" key={i}>
                  {line}
                </span>
              ))}
            </h1>

            <div className="hero-claim" id="sobre-nosotros">
              <p className="hero-claim__text">{site.claim.text}</p>
              <Button href={site.claim.cta.href}>{site.claim.cta.label}</Button>
            </div>
          </div>

          {/* Panel izquierdo: la sombra negra que entra cuando la frase se va a la
              derecha. No es decorativa: es el contenedor de "Qué hacemos". Se abre a
              todo el ancho y los tres frentes se muestran acá adentro. */}
          <div className="blob blob-left2" data-cursor-style="default-white">
            <Services />
          </div>
        </div>
      </div>
    </section>
  )
}
