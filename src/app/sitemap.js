 
export default function sitemap() {
  return [
    {
      url: 'https://dutsiland.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
        url: 'https://dutsiland.com/#contacto',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      },
    {
      url: 'https://dutsiland.com/#quienesSomos',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://dutsiland.com/#servicios',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}