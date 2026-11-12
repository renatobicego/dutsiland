'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site } from '@/content/site'

// La lista del menú a pantalla completa, que en la práctica es la navegación de
// vertical: en apaisado los destinos van escritos en el header y este menú no se abre.
//
// Es cliente por lo mismo que HeaderNav: para marcar en cuál de las tres páginas estás.
// Sin eso, el menú te deja elegir sin decirte de dónde venís.
export default function MenuList() {
  const pathname = usePathname()

  return (
    <ul className="menu--list fs--header">
      {site.menu.map((item, i) => {
        // Una ficha de proyecto cuelga de /proyectos, así que la sección sigue activa
        const activo = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <li key={item.href} className={activo ? 'is-active' : undefined}>
            <Link
              href={item.href}
              data-menu-close
              data-cursor-style="hovered"
              aria-current={activo ? 'page' : undefined}
            >
              <span className="menu--list__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="menu--list__label">{item.label}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
