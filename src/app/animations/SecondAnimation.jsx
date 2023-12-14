"use client";
import { useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import ExperienceFaro from "./Faro/ExperienceFaro";
import { Accordion, AccordionItem, NextUIProvider } from "@nextui-org/react";
const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const SecondAnimation = () => {
  const secondAnimationContainerRef = useRef(null);
  const { scrollYProgress: scrollYProgressSecondAnimation } = useScroll({
    target: secondAnimationContainerRef,
  });

  const scrollClampSecondAnimation = useSpring(scrollYProgressSecondAnimation, {
    stiffness: 100,
    damping: 25,
    mass: 0.1,
    velocity: 0.01,
    restSpeed: 2,
  });

  const xTranslateFirstSection = useTransform(
    scrollClampSecondAnimation,
    [0.2, 0.25],
    ["3%", "-120%"]
  );

  const opacityServices = useTransform(
    scrollClampSecondAnimation,
    [0.35, 0.4, 0.48, 0.5],
    [0, 1, 1, 0]
  );
  return (
    <section ref={secondAnimationContainerRef} className="relative h-[400vh]">
      <div id="servicios" className="absolute top-[140vh]"></div>
      <div className="sticky top-[6.5rem] overflow-hidden z-10">
        <div className="w-[2.9vw] h-[75vh] absolute left-0 top-0 bg-white z-50"></div>
        <motion.div
          style={{ x: xTranslateFirstSection }}
          className="text-[#202020] lg:w-[40%] absolute z-40 left-28 top-28"
        >
          <h3 className="text-6xl font-medium mb-4  ">¿En dónde estamos?</h3>
          <p className="text-2xl w-full ">
            En el lugar donde llevamos tu negocio a{" "}
            <span className="font-bold">nuevos horizontes</span> en el mundo
            digital. En esta era, ser una navegante web es esencial, y nosotros
            somos tu faro en este viaje.
          </p>
        </motion.div>
        <motion.div
          style={{ opacity: opacityServices }}
          className="w-[80%] absolute z-40 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[90%] flex items-start"
        >
          <div className="services-container p-10 text-white h-full bg-[#CE9F5D]/80 flex items-start flex-col w-[50%] rounded-lg overflow-y-auto">
            <h4 className="text-5xl mb-4">¿Qué hacemos?</h4>
            <p className="text-lg w-full">
              Construimos experiencias web sobresalientes y resolvemos problemas
              de negocio a través de código.
            </p>
            <Accordion
              className="dark w-full !px-0"
              itemClasses={{ indicator: "text-white", title: "text-xl" }}
            >
              <AccordionItem key="1" aria-label="Disenio Web" title="Diseño Web">
                Impulsamos conexiones más profundas entre su negocio y sus
                clientes a través de un diseño de interfaz que va más allá de lo estético, 
                impulsando la narrativa, la funcionalidad, la accesibilidad y la usabilidad. 
                <ul className="list-disc list-inside">
                  <li>Diseño de interfaz de usuario</li>
                  <li>Prototipado de aplicación web</li>
                  <li>Diseño responsive</li>
                  <li>Arquitectura de la información</li>
                  <li>Diseño de identidad visual</li>
                </ul>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Backend/Frontend"
                title="Backend / Frontend"
              >
                Adoptamos un enfoque holístico para desarrollar aplicaciones
                web, conectando la experiencia visual junto con la funcionalidad
                lógica para maximizar el valor de su producto.
                <ul className="list-disc list-inside">
                  <li>Desarrollo de APIs</li>
                  <li>Desarrollo de interfaces de usuario</li>
                  <li>Organización e implementación de bases de datos</li>
                  <li>Desarrollo de Eccomerce</li>
                </ul>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Web Interactiva"
                title="Web Interactiva / 3D"
              >
                Fusionamos innovación y creatividad para construir landing pages
                sobresalientes, combinando animaciones y modelos 3D para lograr 
                una experiencia única, ¡como nuestra propia web!
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Soporte Técnico"
                title="Soporte Técnico"
              >
                Ofrecemos soluciones sólidas y eficientes para mantener sus
                operaciones en perfecto funcionamiento, permitiéndole centrarse
                en lo que hace mejor.
                <ul className="list-disc list-inside">
                  <li>Mantenimiento y actualización de aplicaciones web</li>
                  <li>Diagnóstico y arreglo de errores</li>
                </ul>
              </AccordionItem>
            </Accordion>
          </div>
          {/* <div className="services-container w-[50%] h-full bg-[#759DBA]/80 rounded-lg overflow-y-auto">

          </div> */}
        </motion.div>
        {/* <motion.div className="w-[30%] flex flex-col items-center">
            <h5 className="title-size">Nuestros Trabajos</h5>
          </motion.div>
          <motion.div className="w-[30%] flex flex-col items-center">
            <h5 className="title-size">Contacto</h5>
          </motion.div> */}
        <ExperienceFaro scrollYProgress={scrollClampSecondAnimation} />
      </div>
    </section>
  );
};

export default SecondAnimation;
