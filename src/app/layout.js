import localFont from 'next/font/local'
import './globals.css'
import { site } from '@/content/site'

// Montserrat (OFL, variable 400–800), la tipografía del storyboard v2, servida desde el proyecto.
const montserrat = localFont({
  src: [
    { path: '../fonts/Montserrat-latin.woff2', weight: '400 800', style: 'normal' },
    { path: '../fonts/Montserrat-latin-ext.woff2', weight: '400 800', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-grotesk',
  adjustFontFallback: false,
})

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body data-load="first-loading" data-scroll-direction="initial" data-scroll-position="top">
        {children}
      </body>
    </html>
  )
}
