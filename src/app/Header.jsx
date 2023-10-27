import Image from "next/image"


const Header = () => {
  return (
    <header className="w-full flex items-center justify-between py-4 pl-10 pr-16 h-32">
        <Image
            alt="logo"
            width={300}
            height={300}
            className="h-full w-auto"
            src={'/logo7-recortado.png'}
        />
        <nav>
            <ul className="flex items-center gap-10 text-lg uppercase">
                <li>Inicio</li>
                <li>¿quienes somos?</li>
                <li>nuestros trabajos</li>
                <li>servicios</li>
            </ul>
        </nav>
    </header>
  )
}

export default Header