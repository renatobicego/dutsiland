"use client";
import ExperienceFaro from "./animations/Faro/ExperienceFaro";
import FirstAnimation from "./animations/FirstAnimation";
import Footer from "./components/Footer/Footer";
import { useEffect, useRef } from "react";
import { useMotionValue, useScroll } from "framer-motion";
import Services from './components/Services/Services'
import SelectedWorks from './components/Services/SelectedWorks'
import AboutUs from './components/AboutUs/AboutUs'
import Contact from './components/Contact'
const servicesList = [
  {
    ariaLabel: "Disenio Web",
    title: "Diseño Web",
    text: `Una experiencia de usuario eficiente e inmersiva es la forma de captar la atención y transmitir un mensaje claro. Por eso creemos, ante todo, que la usabilidad está al servicio del diseño. Y que todo diseño debe ser elegante e innovador.`,
    list: [
      "Diseño de interfaz de usuario",
      "Prototipado de aplicación web",
      "Diseño responsive",
      "Arquitectura de la información",
      "Diseño de identidad visual",
    ],
  },
  {
    ariaLabel: "Backend/Frontend",
    title: "Desarrollo Web",
    text: `Nuestro enfoque holístico para el desarrollo de aplicaciones web integra la
    experiencia visual junto con la funcionalidad lógica y nna arquitectura escalable y mantenible,
     maximizando el valor de su producto.`,
    list: [
      "Desarrollo de APIs",
      "Desarrollo de interfaces de usuario",
      "Organización e implementación de bases de datos",
      "Desarrollo de Ecommerce",
    ],
  },
  {
    ariaLabel: "Web Interactiva",
    title: "Web Interactiva / 3D",
    text: `Fusionamos innovación y creatividad para construir landing pages
    sobresalientes, combinando animaciones y modelos 3D para lograr una
    experiencia única, ¡como nuestra propia web!`,
    list: [],
  },
  {
    ariaLabel: "Soporte Tecnico",
    title: "Soporte Técnico",
    text: `Ofrecemos soluciones sólidas y eficientes para mantener sus
    operaciones en perfecto funcionamiento, permitiéndote centrarte en
    lo que haces mejor.`,
    list: [
      "Mantenimiento y actualización de aplicaciones web",
      "Diagnóstico y arreglo de errores",
    ],
  },
];

export default function Home() {
  const containerRef = useRef(null);

  // Set up scroll animations
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  return (
    <main
      ref={containerRef}
      className="w-full relative pt-20 md:pt-[15vh] h-screen overflow-x-hidden overflow-y-scroll snap-y scroll-smooth"
    >
      {/* storm animation */}
      <FirstAnimation />
      <ExperienceFaro scrollYProgress={scrollYProgress} />
      <AboutUs />
      <Services />
      <SelectedWorks />
      <Contact />
      {/* lighthouse animation */}
      {/* <SecondAnimation /> */}
      <Footer />
    </main>
  );
}
