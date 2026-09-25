import type { ProjectPhoto } from '@/content/site'

// Filas de la galería de un proyecto. La primera apaisada va sola; después cada
// apaisada se empareja con la siguiente de celular, alternando el lado del celular.

/** La captura con su lugar en la lista original, para respetar ese orden en móvil */
export type GalleryShot = ProjectPhoto & { index: number }

export type GalleryRow =
  | { kind: 'single'; shot: GalleryShot }
  | { kind: 'pair'; desktop: GalleryShot; mobile: GalleryShot; mobileSide: 'left' | 'right' }
  /** Las de celular que no alcanzaron apaisada: van juntas, lado a lado */
  | { kind: 'mobiles'; shots: GalleryShot[] }

export function buildGalleryRows(photos: ProjectPhoto[]): GalleryRow[] {
  const shots = photos.map((photo, index) => ({ ...photo, index }))
  const desktops = shots.filter((s) => !s.tall)
  const mobiles = shots.filter((s) => s.tall)

  const rows: GalleryRow[] = []
  const [first, ...rest] = desktops
  if (first) rows.push({ kind: 'single', shot: first })

  let pairs = 0
  rest.forEach((desktop) => {
    const mobile = mobiles.shift()
    if (!mobile) {
      rows.push({ kind: 'single', shot: desktop })
      return
    }
    rows.push({ kind: 'pair', desktop, mobile, mobileSide: pairs % 2 === 0 ? 'right' : 'left' })
    pairs++
  })

  if (mobiles.length) rows.push({ kind: 'mobiles', shots: mobiles })
  return rows
}
