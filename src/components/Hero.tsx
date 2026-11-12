/* eslint-disable @next/next/no-img-element */
import { site } from '@/content/site'
import { ArrowDiagonal } from './Button'

// La portada: dos "D" negras quietas, el logotipo con el mail en una y el titular
// sobre la otra. Ocupa una pantalla y nada más.
//
// Las D ya no se transforman con el scroll: llegan a esta composición con la intro
// —que corre sola, en tiempo, apenas se va el preloader— y se quedan así. Lo que antes
// mostraba el tramo fijado (la frase y "Qué hacemos") ahora son secciones propias que
// vienen abajo y se animan al entrar en pantalla.
export default function Hero() {
  return (
    <section className="home-hero" data-set-section="dark">
      <div className="hero-stage">
        {/* Blob del logotipo: el lockup y el mail */}
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

        {/* El titular va por fuera de las D: en apaisado cae sobre la D derecha (texto
            crema sobre negro) y en vertical sobre la D de arriba. El reveal palabra por
            palabra lo anima la intro con GSAP, no data-aos. */}
        <h1 className="hero-headline">
          {site.hero.headline.map((line, i) => (
            <span className="hero-headline__line split-words" key={i}>
              {line}
            </span>
          ))}
        </h1>

        {/* La otra D: es el fondo negro sobre el que se lee el titular */}
        <div className="blob blob-right" data-cursor-style="default-white" />
      </div>
    </section>
  )
}
