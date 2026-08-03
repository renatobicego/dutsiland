"use client";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/react";
import CustomDrawer from "./Drawer";
import { useTransform, motion } from "framer-motion";

const Header = ({ scrollYProgress }) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const scrollToTop = () => {
    document.querySelector("main").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const headerBg = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"],
  );

  const headerBlur = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["blur(0px)", "blur(12px)"],
  );

  return (
    <motion.header
      style={{ backgroundColor: headerBg, backdropFilter: headerBlur }}
      className="top-0 left-0 z-50 fixed flex justify-between items-center px-5 sm:px-8 md:px-12 lg:px-16 w-screen h-14 sm:h-16 md:h-20 text-white"
    >
      <button
        onClick={scrollToTop}
        className="flex items-center h-[60%]"
        aria-label="Volver al inicio"
      >
        <Image
          alt="Logo Estudio Dutsiland"
          width={200}
          height={60}
          className="w-auto h-full object-contain"
          src="/logoLineasBlancas.png"
          priority
        />
      </button>

      <nav aria-label="Navegación principal" className="hidden md:block">
        <ul className="flex items-center gap-6 lg:gap-10 font-medium text-xs sm:text-sm uppercase tracking-wider">
          <li>
            <a
              href="#nosotros"
              className="py-2 text-white/80 hover:text-white transition-colors nav-link"
            >
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="#servicios"
              className="py-2 text-white/80 hover:text-white transition-colors nav-link"
            >
              Servicios
            </a>
          </li>
          <li>
            <a
              href="#trabajos"
              className="py-2 text-white/80 hover:text-white transition-colors nav-link"
            >
              Trabajos
            </a>
          </li>
          <li>
            <a
              href="#contacto"
              className="bg-rojo/80 hover:bg-rojo !px-4 sm:!px-5 !py-2 !rounded-lg text-white !text-xs !uppercase !tracking-wider btn"
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>

      <button
        onClick={onOpen}
        className="md:hidden flex flex-col justify-center items-center gap-1.5 w-7 sm:w-8 h-7 sm:h-8"
        aria-label="Abrir menú de navegación"
      >
        <span className="bg-white rounded-full w-5 sm:w-6 h-[1.5px]" />
        <span className="bg-white rounded-full w-3.5 sm:w-4 h-[1.5px]" />
        <span className="bg-white rounded-full w-5 sm:w-6 h-[1.5px]" />
      </button>

      <CustomDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <nav
          className="top-0 left-0 absolute flex justify-center items-center bg-negro w-full h-screen"
          aria-label="Menú móvil"
        >
          <ul className="flex flex-col items-center gap-8 text-white text-base sm:text-lg uppercase tracking-wider">
            <li onClick={onClose}>
              <a href="#nosotros" className="py-2 nav-link">
                Nosotros
              </a>
            </li>
            <li onClick={onClose}>
              <a href="#servicios" className="py-2 nav-link">
                Servicios
              </a>
            </li>
            <li onClick={onClose}>
              <a href="#trabajos" className="py-2 nav-link">
                Trabajos
              </a>
            </li>
            <li onClick={onClose}>
              <a href="#contacto" className="mt-4 btn-accent">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </CustomDrawer>
    </motion.header>
  );
};

export default Header;
