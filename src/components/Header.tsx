/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { site } from '@/content/site'
import DMark from './DMark'
import { ArrowDiagonal } from './Button'

export default function Header() {
  return (
    <header id="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-tablet-6 col-6 column-logo">
            <Link href="/" className="logo" aria-label={site.name} data-menu-close data-cursor-style="off">
              <span className="hide">{site.name}</span>
              {/* La D está siempre; "UTSILAND" se pliega al scrollear y, en vertical,
                  directamente no entra al lado del botón de menú. Cada pieza trae su
                  versión clara y su versión oscura: cuál se ve lo decide el fondo de la
                  fondo que el logo tiene justo debajo (ver data-tono e initSectionWatcher). */}
              <div className="container-logo">
                <div className="logo-piece logo-d">
                  <img className="is-dark" src="/brand/wide-D-dark.png" alt="" />
                  <img className="is-light" src="/brand/wide-D-light.png" alt="" />
                </div>
                <div className="logo-piece logo-rest">
                  <img className="is-dark" src="/brand/wide-UTSILAND-dark.png" alt="" />
                  <img className="is-light" src="/brand/wide-UTSILAND-light.png" alt="" />
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-6 col-tablet-6 col-6 column-bt">
            <button type="button" id="bt-menu" aria-label="Menú" data-cursor-style="hovered">
              <span className="close-text">cerrar</span>
              <span className="menu-text">menu</span>
            </button>

            <nav className="menu">
              <div className="menu--wrapper">
                <div className="container-lottie">
                  <DMark className="d-mark--menu" />
                </div>

                <ul className="menu--list fs--header">
                  {site.menu.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} data-menu-close data-cursor-style="hovered">
                        <span data-letter={item.label}>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="social-list container-fluid">
                  <div className="row">
                    <div className="mail-wrapper col-lg-8 pb-mobile-10">
                      <a href={`mailto:${site.email}`} className="mail-link btn-underline" target="_blank" rel="noopener noreferrer" data-cursor-style="hovered">
                        <span>{site.email}</span>
                        <ArrowDiagonal />
                      </a>
                    </div>
                    <div className="phone-wrapper col-lg-4">
                      {site.social.map((s) => (
                        <a key={s.href} href={s.href} className="phone-link btn-underlined" target="_blank" rel="noopener noreferrer" data-cursor-style="hovered">
                          <span>{s.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
