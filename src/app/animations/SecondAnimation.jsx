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
          className="w-[50%] absolute z-40 left-28 top-1/2 -translate-y-1/2 h-[90%]"
        >
          <div
            id="services-container"
            className="w-full flex items-start flex-col p-10 bg-[#CE9F5D]/80 rounded-lg text-white h-full overflow-auto"
          >
            <h4 className="text-5xl mb-4">¿Qué hacemos?</h4>
            <p className="text-lg w-[80%]">
              Construimos experiencias web sobresalientes y resolvemos problemas
              de negocio a través de código.
            </p>
            <Accordion
              className="dark w-[80%] !px-0"
              itemClasses={{ indicator: "text-white", title: "text-xl" }}
            >
              <AccordionItem key="1" aria-label="UX/UI" title="UX / UI">
                Impulsamos conexiones más profundas entre su negocio y sus clientes a través del diseño centrado en las personas.
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Backend/Frontend"
                title="Backend / Frontend"
              >
                Adoptamos un enfoque holístico para plataformas web, conectando la experiencia visual junto 
                con la funcionalidad lógica para maximizar el valor de su producto.
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Experiencias Web 3D"
                title="Experiencias Web 3D"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Soporte Técnico"
                title="Soporte Técnico"
              >
                {defaultContent}
              </AccordionItem>
            </Accordion>
          </div>
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
