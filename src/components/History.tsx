import { site } from '@/content/site'
import Button, { DIcon } from './Button'

// En el home "Sobre Dutsiland" es sólo un anuncio: título, subtítulo y el botón que
// lleva a /sobre, que es donde está el contenido entero. Por eso no se fija: se revela
// al entrar, como cualquier bloque corto (ver initRevealOnEnter en HomeExperience).
export default function History() {
  const { kicker, title, subtitle, cta } = site.about
  return (
    <section className="home-history" data-set-section="">
      <div className="history-inner">
        <p className="section-kicker history-kicker">
          <DIcon />
          <span>{kicker}</span>
        </p>

        <h2 className="history-title split-words">{title}</h2>
        <p className="history-subtitle">{subtitle}</p>

        <div className="history-cta">
          <Button href={cta.href} className="btn-d--dark">
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
