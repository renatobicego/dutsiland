import { Inter, Piazzolla } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const piazzolla = Piazzolla({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  variable: "--font-piazzolla",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://dutsiland.com"),
  title: {
    default: "Estudio Dutsiland | Diseño y Desarrollo Web en Argentina",
    template: "%s | Estudio Dutsiland",
  },
  description:
    "Estudio de diseño y desarrollo web en Argentina. Creamos experiencias digitales inmersivas, landing pages, ecommerce y aplicaciones web con tecnología de vanguardia.",
  keywords: [
    "diseño web",
    "desarrollo web",
    "estudio digital",
    "argentina",
    "landing page",
    "ecommerce",
    "aplicación web",
    "UX UI",
    "experiencia de usuario",
    "desarrollo frontend",
    "react",
    "next.js",
    "3D web",
    "WebGL",
    "dutsiland",
  ],
  authors: [{ name: "Estudio Dutsiland", url: "https://dutsiland.com" }],
  creator: "Estudio Dutsiland",
  publisher: "Estudio Dutsiland",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://dutsiland.com",
  },
  openGraph: {
    title: "Estudio Dutsiland | Diseño y Desarrollo Web",
    url: "https://dutsiland.com/",
    siteName: "Estudio Dutsiland",
    locale: "es_AR",
    type: "website",
    description:
      "Creamos experiencias digitales inmersivas. Diseño UI/UX, desarrollo web y soluciones a medida para tu negocio.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Estudio Dutsiland - Diseño y Desarrollo Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Dutsiland | Diseño y Desarrollo Web",
    description:
      "Creamos experiencias digitales inmersivas. Diseño UI/UX, desarrollo web y soluciones a medida.",
    images: ["https://dutsiland.com/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://dutsiland.com/",
    name: "Estudio Dutsiland",
    url: "https://dutsiland.com",
    logo: "https://dutsiland.com/logoLineasBlancas.png",
    image: "https://dutsiland.com/opengraph-image.png",
    description:
      "Estudio de diseño y desarrollo web en Argentina. Creamos experiencias digitales inmersivas, landing pages, ecommerce y aplicaciones web.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AR",
    },
    sameAs: [
      "https://www.linkedin.com/company/dutsiland",
      "https://www.instagram.com/dutsiland.estudio/",
    ],
    knowsAbout: [
      "Diseño Web",
      "Desarrollo Web",
      "UX/UI",
      "React",
      "Next.js",
      "WebGL",
      "Three.js",
      "Ecommerce",
    ],
    serviceType: [
      "Diseño de Interfaz de Usuario",
      "Desarrollo de Aplicaciones Web",
      "Desarrollo de Landing Pages",
      "Desarrollo de Ecommerce",
    ],
  };

  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${piazzolla.variable} ${inter.variable} font-sans overflow-x-hidden scroll-smooth`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.GA_ID} />
      </body>
    </html>
  );
}
