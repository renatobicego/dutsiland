import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

// Sitemap nativo de Next (App Router): se sirve en /sitemap.xml.
// Las URLs salen de site.ts, así que agregar una página o un proyecto con ficha lo
// actualiza solo. Los proyectos `demo: true` quedan FUERA a propósito: son casos
// inventados y no deben indexarse hasta reemplazarse por trabajos reales.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/proyectos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/sobre`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]

  // Solo los proyectos con ficha escrita y que no son demostraciones tienen URL propia.
  const projectRoutes: MetadataRoute.Sitemap = site.projects
    .filter((p) => p.detail && !p.demo)
    .map((p) => ({
      url: `${base}/proyectos/${p.slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    }))

  return [...staticRoutes, ...projectRoutes]
}
