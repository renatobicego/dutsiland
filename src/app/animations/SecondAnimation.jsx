"use client";
import { useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import ExperienceFaro from "./Faro/ExperienceFaro";
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

  const xSecondAnimation = useTransform(
    scrollClampSecondAnimation,
    [0.2, 0.35, 0.5, 0.75],
    ["3%", "-22.5%", "-22.5%", "-72%"]
  );

  const opacityServices= useTransform(scrollClampSecondAnimation, [0.35, 0.4, 0.48, 0.5], [0, 1, 1, 0])
  return (
    <section ref={secondAnimationContainerRef} className="relative h-[400vh]">
      <div
        className="sticky top-36 overflow-hidden z-10"
      >
        <div className="w-[2.9vw] h-[75vh] absolute left-0 top-0 bg-white z-50"></div>
        <motion.div
          style={{ x: xSecondAnimation }}
          className="w-[400vw] lg:w-[400vw] absolute h-[75vh] flex items-center justify-between left-0 top-0 z-40"
        >
          <div className="relative text-[#202020] w-[25%] sm:w-[28%] lg:w-[25%]">
            <h3 className="text-6xl font-medium mb-4  ">¿En dónde estamos?</h3>
            <p className="text-2xl w-1/2 ">
              En el lugar donde llevamos tu negocio a <span className="font-bold">nuevos horizontes</span>  en el
              mundo digital. En esta era, ser una navegante web es esencial, y
              nosotros somos tu faro en este viaje.
            </p>
          </div>
          <motion.div style={{opacity: opacityServices}} className="w-[30%] flex flex-col items-center">
            <h5 className="title-size">Nuestros Servicios</h5>
          </motion.div>
          <motion.div  className="w-[30%] flex flex-col items-center">
            <h5 className="title-size">Nuestros Trabajos</h5>
          </motion.div>
          <motion.div  className="w-[30%] flex flex-col items-center">
            <h5 className="title-size">Contacto</h5>
          </motion.div>
        </motion.div>
        <ExperienceFaro scrollYProgress={scrollClampSecondAnimation} />
      </div>
    </section>
  );
};

export default SecondAnimation;
