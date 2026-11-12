// Botón para volver al inicio. Aparece cuando el body deja de estar en
// [data-scroll-position="top"] (lo marca initScrollState), así no necesita JS propio.
// El scroll suave lo resuelve el handler de anclas de initMenu, que ya trata el "#top".
export default function ScrollTop() {
  return (
    <a href="#top" className="scroll-top" aria-label="Volver arriba" data-cursor-style="hovered">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 20V5M12 5L5 12M12 5l7 7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
