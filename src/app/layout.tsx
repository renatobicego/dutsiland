import type { Metadata } from 'next'
import type { ReactNode } from 'react'
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

// Montserrat Subrayada (OFL, solo 400 y 700): la pide el diseñador para todo botón con
// tipografía subrayada. El subrayado viene en los glifos, así que donde se aplica no
// se dibuja ninguna línea aparte (ver .btn-underlined y .btn-d__label en globals.css).
const subrayada = localFont({
  src: [
    { path: '../fonts/MontserratSubrayada-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/MontserratSubrayada-Bold.ttf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-subrayada',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${subrayada.variable}`}>
      <body data-load="first-loading" data-scroll-direction="initial" data-scroll-position="top">
        {/* El navegador restaura el scroll apenas termina el layout inicial, mucho antes
            de que corra ningún efecto de React. Si avisamos recién ahí llegamos tarde y
            se ve el salto a mitad de página. anclarArriba() se encarga del resto (ver
            lib/entrada.ts). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{history.scrollRestoration='manual'}catch(e){}window.scrollTo(0,0)",
          }}
        />
        {children}
      </body>
    </html>
  )
}
