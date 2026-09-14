import Header from '@/components/Header'
import Hero from '@/components/Hero'
import History from '@/components/History'
import Process from '@/components/Process'
import Portfolio from '@/components/Portfolio'
import Footer from '@/components/Footer'
import Cookies from '@/components/Cookies'
import ScrollTop from '@/components/ScrollTop'
import DMark from '@/components/DMark'
import HomeExperience from '@/components/HomeExperience'

export default function Home() {
  return (
    <>
      <div id="loader">
        <div className="flex-center align-self-center w-100">
          <div className="container-lottie">
            <DMark className="d-mark--loader" />
          </div>
        </div>
      </div>

      <div className="cursor-wrapper" id="wrapper-cursor">
        <div />
      </div>

      <Header />

      <div id="main-transition">
        <div id="smooth-wrapper" className="container-wrapper">
          <div className="wrapper" id="pg-home" data-scroll-container>
            {/* "Qué hacemos" no es una sección propia: va dentro del panel izquierdo
                del hero, que es la sombra negra que entra cuando la frase se va.
                "Sobre Dutsiland" acá es sólo el anuncio; el contenido está en /sobre. */}
            <main>
              <Hero />
              <History />
              <Process />
              <Portfolio />
            </main>
            <Footer />
          </div>
        </div>
      </div>

      <ScrollTop />
      <Cookies />
      <HomeExperience />
    </>
  )
}
