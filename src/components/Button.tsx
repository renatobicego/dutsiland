import type { AnchorHTMLAttributes, ReactNode } from 'react'

// Botón del storyboard: pastilla crema con la "D" y el texto en rojo ladrillo, subrayado.
// Al pasar el mouse se invierte con la misma apertura en elipse de la referencia.
export function DIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`d-icon ${className}`} viewBox="0 0 278 356" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0,0 H144 A133,150 0 0 1 277,150 V206 A133,150 0 0 1 144,356 H0 Z" />
    </svg>
  )
}

export type ButtonProps = {
  href: string
  children: ReactNode
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className'>

export default function Button({ href, children, className = '', ...rest }: ButtonProps) {
  return (
    <a href={href} className={`btn-d ${className}`} data-cursor-style="hovered" {...rest}>
      <span className="btn-d__content">
        <DIcon />
        <span className="btn-d__label">{children}</span>
      </span>
      <span className="btn-d__content btn-d__content--hover" aria-hidden="true">
        <DIcon />
        <span className="btn-d__label">{children}</span>
      </span>
    </a>
  )
}

export function ArrowDiagonal() {
  return (
    <i className="icon-arrow-diagonal" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 13L13 3M13 3H5.5M13 3V10.5" strokeWidth="1.6" strokeLinecap="square" />
      </svg>
    </i>
  )
}
