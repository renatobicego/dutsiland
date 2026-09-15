// Spinner de carga: la D del logo se va por la derecha y la siguiente entra por la
// izquierda ya de otro color, alternando la tinta del contexto con el rojo. El recorte
// y los dos tonos los define globals.css (.spinner-d), así que la pieza toma el color
// de donde esté sin que haya que decírselo.
export type SpinnerProps = {
  className?: string
  /** Texto para lectores de pantalla. Si al lado ya se lee "Enviando…", va sin esto
   *  y la pieza queda como lo que es: decoración de un estado que ya está dicho. */
  label?: string
}

export default function Spinner({ className = '', label }: SpinnerProps) {
  const clase = `spinner-d ${className}`.trim()
  return label ? (
    <span className={clase} role="status" aria-label={label}>
      <i />
    </span>
  ) : (
    <span className={clase} aria-hidden="true">
      <i />
    </span>
  )
}
