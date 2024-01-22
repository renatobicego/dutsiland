import { Piazzolla } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
const piazzolla = Piazzolla({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

export const metadata = {
  title: "Estudio Dutsiland",
  description: "Construimos experiencias web sobresalientes.",
  keywords: [
    "Next.js",
    "dutsiland",
    "desarrollador",
    "estudio web",
    "web",
    "empresa",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Estudio Dutsiland",
    url: "https://dutsiland.com/",
    siteName: "Estudio Dutsiland",
    locale: "es_ES",
    type: "website",
    description: "Construimos experiencias web sobresalientes.",
    images: "opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Dutsiland",
    description: "Construimos experiencias web sobresalientes.",
    images: ["https://dutsiland.com/opengraph-image.png"], // Must be an absolute URL
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://dutsiland.com/",
    name: "Estudio Dutsiland",
    image: "https://dutsiland.com/opengraph-image.png",
    description:
      "Construimos experiencias web sobresalientes.",
  };
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${piazzolla.className} overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Providers>
          <Header />
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
