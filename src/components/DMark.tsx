// La "D" de Dutsiland como vector (misma silueta que D-black.png: 278x356,
// esquinas derechas elípticas rx=133 ry=150). Se usa en el loader y en el menú.
export type DMarkProps = {
  className?: string
  /** Agrega el círculo interior que late (solo lo usa el menú) */
  hole?: boolean
}

export default function DMark({ className = '', hole = false }: DMarkProps) {
  return (
    <div className={`d-mark ${className}`} aria-hidden="true">
      <svg className="d-mark__d" viewBox="0 0 278 356" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 H144 A133,150 0 0 1 277,150 V206 A133,150 0 0 1 144,356 H0 Z" />
      </svg>
      {hole ? <div className="d-mark__hole" /> : null}
    </div>
  )
}
