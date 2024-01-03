import Image from "next/image"


const Header = () => {
  return (
    <header className="w-[93vw] flex items-center justify-between py-2 pr-3.5 h-20 md:h-[6.5rem] fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-white">
        <Image
            alt="logo"
            width={300}
            height={300}
            className="h-[90%] w-auto"
            src={'/logo7-recortado.png'}
        />
        <nav>
            <ul className="flex items-center gap-6 lg:gap-10 lg:text-lg uppercase">
                <li>Inicio</li>
                <li>¿quienes somos?</li>
                <li><a href="/#servicios">servicios</a></li>
                <li>Contacto</li>
            </ul>
        </nav>
    </header>
  )
}

export default Header