import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import RouteTransition from "@/components/RouteTransition";

// Montserrat (OFL, variable 400–800), la tipografía del storyboard v2, servida desde el proyecto.
const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-latin.woff2",
      weight: "400 800",
      style: "normal",
    },
    {
      path: "../fonts/Montserrat-latin-ext.woff2",
      weight: "400 800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-grotesk",
  adjustFontFallback: false,
});

// Montserrat Subrayada (OFL, solo 400 y 700): la pide el diseñador para todo botón con
// tipografía subrayada. El subrayado viene en los glifos, así que donde se aplica no
// se dibuja ninguna línea aparte (ver .btn-underlined y .btn-d__label en globals.css).
const subrayada = localFont({
  src: [
    {
      path: "../fonts/MontserratSubrayada-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/MontserratSubrayada-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-subrayada",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // El home usa el título largo (con las keywords); las páginas internas ponen su propio
  // título y el template les agrega " — Dutsiland" al final.
  title: {
    default: site.seoTitle,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  appleWebApp: {
    title: site.shortName,
  },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: site.seoTitle,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: site.ogImage,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.description,
    images: [site.ogImage],
  },
};

// Datos estructurados del estudio. Describe la organización y el sitio para que Google
// entienda qué es Dutsiland (empresa de desarrollo de software) y a quién sirve.
// Se arma desde site.ts para no repetir datos que ya viven ahí.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      description: site.description,
      email: site.email,
      foundingDate: site.foundingYear,
      logo: `${site.url}${site.ogImage}`,
      image: `${site.url}${site.ogImage}`,
      sameAs: site.social.map((s) => s.href),
      areaServed: {
        "@type": "Country",
        name: site.geo.country,
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: site.geo.region,
        addressCountry: site.geo.countryCode,
      },
      knowsAbout: site.keywords,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "es-AR",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${subrayada.variable}`}>
      <body
        data-load="first-loading"
        data-scroll-direction="initial"
        data-scroll-position="top"
      >
        {/* El navegador restaura el scroll apenas termina el layout inicial, mucho antes
            de que corra ningún efecto de React. Si avisamos recién ahí llegamos tarde y
            se ve el salto a mitad de página. anclarArriba() se encarga del resto (ver
            lib/entrada.ts). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{history.scrollRestoration='manual'}catch(e){}window.scrollTo(0,0)",
          }}
        />
        {/* Datos estructurados (schema.org): Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {/* Overlay de la transición entre rutas. Vive en el layout —fuera de cada
            página— para sobrevivir a la navegación del router y poder tapar la salida y
            descubrir la entrada. Usa la misma D clara del hero (/brand/D-light.png); el
            movimiento lo maneja RouteTransition con GSAP. */}
        <div className="route-transition" aria-hidden="true">
          <div className="route-transition__mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-logo__d" src="/brand/D-light.png" alt="" />
          </div>
        </div>
        <RouteTransition />
      </body>
    </html>
  );
}
