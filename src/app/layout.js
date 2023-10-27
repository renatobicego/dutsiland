import { Piazzolla } from 'next/font/google'
import './globals.css'
import Header from './Header'

const piazzolla = Piazzolla({ subsets: ['latin'] })

export const metadata = {
  title: 'Estudio Dutsiland',
  description: 'Tu faro de la navegación web',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={piazzolla.className}>
        <Header  />
        {children}
      </body>
    </html>
  )
}
