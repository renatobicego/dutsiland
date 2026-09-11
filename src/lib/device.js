// Detección de dispositivo equivalente a la del sitio de referencia.
export const THRESHOLD_PHONE = 768
export const THRESHOLD_TABLET = 1025

export function getDevice() {
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
