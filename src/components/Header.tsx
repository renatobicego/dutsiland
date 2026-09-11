/* eslint-disable @next/next/no-img-element */
import { site } from '@/content/site'
import DMark from './DMark'
import { ArrowDiagonal } from './Button'

export default function Header() {
  return (
    <header id="header" data-get-section="">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-tablet-3 col-3 column-logo">
            <a href="#top" className="logo" aria-label={site.name} data-menu-close data-cursor-style="off">
              <span className="hide">{site.name}</span>
              <div className="container-logo">
                {/* Desktop: D + UTSILAND (la palabra se pliega al scrollear) */}
                <div className="logo-piece logo-d">
                  <img className="is-dark" src="/brand/wide-D-dark.png" alt="" />
                  <img className="is-light" src="/brand/wide-D-light.png" alt="" />
                </div>
                <div className="logo-piece logo-rest">
                  <img className="is-dark" src="/brand/wide-UTSILAND-dark.png" alt="" />
                  <img className="is-light" src="/brand/wide-UTSILAND-light.png" alt="" />
                </div>
                {/* Tablet / móvil: isologo compacto */}
                <div className="logo-piece logo-lockup">
                  <img className="is-dark" src="/brand/logo-dark.png" alt="" />
                </div>
              </div>
            </a>
          </div>

          <div className="col-lg-2 offset-lg-6 col-tablet-5 col-6 column-slogan">
            <div className="slogan-img">
              <span>{site.slogan}</span>
            </div>
          </div>

          <div className="col-lg-2 col-tablet-4 col-3 column-bt">
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
                      <a href={item.href} data-menu-close data-cursor-style="hovered">
                        <span data-letter={item.label}>{item.label}</span>
                      </a>
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
