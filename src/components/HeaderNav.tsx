'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site } from '@/content/site'

// La navegación escrita del header, sólo en apaisado. Con tres destinos, un menú a
// pantalla completa es un gesto de diseño y no una necesidad de navegación, y el gesto
// costaba que se supiera a dónde se puede ir: el botón de menú medía 12px de alto y no
// tenía estado de hover, así que nada avisaba que ahí estaba el sitio entero.
//
// Es cliente por una sola razón: marcar la página en la que se está. El resto —el color
// según el fondo— lo resuelve initSectionWatcher midiendo el píxel debajo de cada pieza.
export default function HeaderNav() {
  const pathname = usePathname()

  return (
    <nav className="header-nav" aria-label="Principal">
      {site.menu.map((item) => {
        // Una ficha de proyecto cuelga de /proyectos, así que la sección sigue activa
        const activo = pathname === item.href || pathname.startsWith(`${item.href}/`)
        const texto = item.short ?? item.label

        // Cada pieza lleva su propio data-tono: el header no tiene fondo propio y lo que
        // pasa por detrás puede no ser lo mismo debajo del logo que debajo del botón.
        return item.cta ? (
          <Link
            key={item.href}
            href={item.href}
            className="header-cta"
            data-tono=""
            data-cursor-style="hovered"
            aria-current={activo ? 'page' : undefined}
          >
            <span className="header-cta__dot" aria-hidden="true" />
            <span>{texto}</span>
          </Link>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="header-link"
            data-tono=""
            data-cursor-style="hovered"
            aria-current={activo ? 'page' : undefined}
          >
            <span>{texto}</span>
            <span className="header-link__bar" aria-hidden="true" />
          </Link>
        )
      })}
    </nav>
  )
}
