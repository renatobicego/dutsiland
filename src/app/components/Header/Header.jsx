"use client";
import Image from "next/image";
import { useDisclosure } from "@nextui-org/react";
import CustomDrawer from "./Drawer";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion";
const Header = ({ scrollYProgress }) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  // const scrollDirection = useScrollDirection()
  const scrollToTop = () => {
    document.querySelector("main").scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };

  const color = useTransform(
    scrollYProgress,
    [0.93, 0.98],
    ["#ffffff", "#202020"]
  );

  return (
    <motion.header
      style={{ color }}
      className={`w-screen px-[3.5vw] flex items-center justify-between py-2 h-16 md:h-20 
        fixed left-0 z-30  lg:text-sm 2xl:text-base 
        3xl:text-lg max-lg:!text-white
        transition-all duration-500`}
    >
      {/* <div className="bg-negro w-full absolute left-0 top-0 h-full -z-10 mix-blend-exclusion"></div> */}
      <button
        onClick={scrollToTop}
        className="h-[90%]"
      >
        <Image
          alt="logo"
          width={300}
          height={300}
          className="h-full w-auto min-w-[43px]"
          src={"/logoLineasBlancas.png"}
        />
      </button>
      <nav className="">
        <ul className="hidden md:flex items-center gap-6 lg:gap-10 uppercase">
          <li className="link">
            <a href="/#quienesSomos">¿quienes somos?</a>
          </li>
          <li className="link">
            <a href="/#servicios">servicios</a>
          </li>
          <li className="link">
            <a href="/#contacto">Contacto</a>
          </li>
        </ul>
      </nav>
      <button onClick={onOpen} className="md:hidden w-8 invert">
        <Image
          width={64}
          height={64}
          src="/hamburger.png"
          alt="Menu desplegable"
        />
      </button>
      <CustomDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <nav className="absolute w-full top-0 left-0">
          <ul className="flex flex-col items-start gap-6 text-white uppercase pt-16 p-10">
            <li onClick={onClose}>
              <a href="/#quienesSomos">¿quienes somos?</a>
            </li>
            <li onClick={onClose}>
              <a href="/#servicios">servicios</a>
            </li>
            <li onClick={onClose}>
              <a href="/#contacto">Contacto</a>
            </li>
          </ul>
        </nav>
      </CustomDrawer>
    </motion.header>
  );
};

export default Header;
