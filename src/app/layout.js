import { Piazzolla } from 'next/font/google'
import './globals.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Providers } from './providers'
import { SpeedInsights } from "@vercel/speed-insights/next"
const piazzolla = Piazzolla({ 
  subsets: ['latin'], 
  display: 'swap',
  weight: 'variable'
})

export const metadata = {
  title: 'Estudio Dutsiland',
  description: 'Tu faro de la navegación web',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={piazzolla.className}>
        <Providers>
          <Header  />
          {children}
          <Footer />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}
