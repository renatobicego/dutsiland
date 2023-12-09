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
  const opacity = useTransform(scrollYProgressSecondAnimation, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  const scrollClampSecondAnimation = useSpring(scrollYProgressSecondAnimation, {
    stiffness: 100,
    damping: 25,
    mass: 0.1,
    velocity: 0.01,
    restSpeed: 2,
  });

  const xSecondAnimation = useTransform(
    scrollClampSecondAnimation,
    [0.15, 0.75],
    ["3%", "-72%"]
  );
  return (
    <section ref={secondAnimationContainerRef} className="relative h-[400vh]">
      <motion.div
        style={{ opacity }}
        className="sticky top-36 overflow-hidden z-10"
      >
        <motion.div
          style={{ x: xSecondAnimation }}
          className="w-[400vw] lg:w-[300vw] absolute h-[75vh] flex items-center justify-between left-0 top-0 z-40"
        >
          <div className="relative text-[#202020] w-[25%] sm:w-[28%] lg:w-[25%] self-end mb-16">
            <h3 className="text-6xl font-medium mb-4 text-white ">¿En dónde estamos?</h3>
            <p className="text-2xl w-1/2 text-white">
              En el lugar donde llevamos tu negocio a <span className="font-bold">nuevos horizontes</span>  en el
              mundo digital. En esta era, ser una navegante web es esencial, y
              nosotros somos tu faro en este viaje.
            </p>
          </div>
        </motion.div>
        <ExperienceFaro scrollYProgress={scrollClampSecondAnimation} />
      </motion.div>
    </section>
  );
};

export default SecondAnimation;
