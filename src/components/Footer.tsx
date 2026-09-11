/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { site } from '@/content/site'
import { ArrowDiagonal, DIcon } from './Button'

type Letter = {
  /** Nombre del recorte dentro de /public/brand */
  file: string
  /** Ancho en px dentro de Dutsiland-wide-dark.png, relativo a TOTAL */
  w: number
}

// Letras del logotipo horizontal con su ancho relativo (recortadas de Dutsiland-wide-dark.png)
const LETTERS: Letter[] = [
  { file: 'letter-0-D-dark.png', w: 81 },
  { file: 'letter-1-U-dark.png', w: 85 },
  { file: 'letter-2-T-dark.png', w: 85 },
  { file: 'letter-3-S-dark.png', w: 89 },
  { file: 'letter-4-I-dark.png', w: 69 },
  { file: 'letter-5-L-dark.png', w: 81 },
  { file: 'letter-6-A-dark.png', w: 99 },
  { file: 'letter-7-N-dark.png', w: 85 },
  { file: 'letter-8-D2-dark.png', w: 82 },
]
const TOTAL = 969

export type FooterProps = {
  /** Vacío en la home; "/" en una ficha de proyecto (ver Header) */
  base?: string
}

// Cuadro 12: panel crema redondeado sobre fondo negro, links con la D roja y el logotipo centrado.
export default function Footer({ base = '' }: FooterProps) {
  return (
    <footer id="footer">
      <div className="footer-panel" id="contacto">
        <div className="footer-row footer-row--map row-opacity">
          <Link href={base || '#top'} className="footer-brand btn-underline" data-cursor-style="hovered-small">
            <span>{site.name}</span>
          </Link>
          <span className="footer-slogan">{site.slogan}</span>
          <ul className="footer-site-map">
            {site.menu.map((item) => (
              <li key={item.href}>
                <Link href={base + item.href} className="footer-link btn-underlined" data-cursor-style="hovered-small">
                  <DIcon />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-rule" />

        <div className="footer-row footer-row--legal row-opacity">
          <a href={`mailto:${site.email}`} className="footer-mail btn-underlined" data-cursor-style="hovered-small">
            <span>{site.email}</span>
            <ArrowDiagonal />
          </a>
          <div className="footer-legal">
            {site.footer.legal.map((l) => (
              <a key={l.label} href={l.href} className="btn-underlined" data-cursor-style="hovered-small">
                <span>{l.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-logo-wrap">
          <div className="footer-logo" aria-label="Dutsiland">
            {LETTERS.map((l) => (
              <img key={l.file} className="letter" src={`/brand/${l.file}`} alt="" style={{ width: `${(l.w / TOTAL) * 100}%` }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
