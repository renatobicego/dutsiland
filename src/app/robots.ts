import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

// robots.txt nativo de Next: se sirve en /robots.txt.
// Abrimos todo el sitio al rastreo y apuntamos al sitemap. Los casos demo no se
// bloquean acá porque directamente no están en el sitemap ni enlazados como URL;
// cuando existan como trabajos reales, entran solos.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
