// Detección de dispositivo equivalente a la del sitio de referencia.
export const THRESHOLD_PHONE = 768
export const THRESHOLD_TABLET = 1025

export type DeviceSize = 'phone' | 'tablet' | 'desktop'

export type Device = {
  isPhone: boolean
  isTablet: boolean
  isMobile: boolean
  isDesktop: boolean
  size: DeviceSize
}

/** Mantiene --vh con el alto real de la ventana, que en vertical no es 100vh.
 *
 *  En el teléfono `100vh` cuenta la barra del navegador aunque esté a la vista, así que
 *  el hero quedaba más alto que la pantalla. De ahí la variable.
 *
 *  Se recalcula sólo cuando cambia el ANCHO, no en cada resize: al scrollear en el
 *  teléfono la barra del navegador se esconde y aparece, y eso dispara resize con un
 *  alto distinto cada vez. Si se escuchara todo, el hero cambiaría de altura mientras
 *  alguien lee. El caso que sí hay que atender es rotar el teléfono, y ahí el ancho
 *  cambia siempre. */
export function seguirAlturaReal(): () => void {
  if (typeof window === 'undefined') return () => {}
  const aplicar = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
  let anchoPrevio = window.innerWidth
  aplicar()
  // Las barras del navegador terminan de acomodarse después del primer frame
  const t = window.setTimeout(aplicar, 1000)

  const alCambiar = () => {
    if (window.innerWidth === anchoPrevio) return
    anchoPrevio = window.innerWidth
    aplicar()
  }
  // orientationchange llega antes de que el navegador reporte el alto nuevo
  const alRotar = () => window.setTimeout(aplicar, 120)

  window.addEventListener('resize', alCambiar)
  window.addEventListener('orientationchange', alRotar)
  return () => {
    window.clearTimeout(t)
    window.removeEventListener('resize', alCambiar)
    window.removeEventListener('orientationchange', alRotar)
  }
}

export function getDevice(): Device {
  if (typeof window === 'undefined') {
    return { isPhone: false, isTablet: false, isMobile: false, isDesktop: true, size: 'desktop' }
  }
  const w = window.innerWidth
  const touchUA = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const isPhone = w < THRESHOLD_PHONE
  const isTablet = w >= THRESHOLD_PHONE && w <= THRESHOLD_TABLET
  const isMobile = w <= THRESHOLD_TABLET || touchUA
  const isDesktop = w > THRESHOLD_TABLET && !touchUA
  return {
    isPhone,
    isTablet,
    isMobile,
    isDesktop,
    size: isPhone ? 'phone' : isTablet ? 'tablet' : 'desktop',
  }
}
