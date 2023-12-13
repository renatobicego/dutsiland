import { Piazzolla } from 'next/font/google'
import './globals.css'
import Header from './Header'
import { Providers } from './providers'

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
        </Providers>
      </body>
    </html>
  )
}
