"use client";
import { useRef, useState } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import ExperienceTormenta from "./Tormenta/ExperienceTormenta";
import useWindowSize from "../utils/useWindowSize";
const FirstAnimation = () => {
  const firstAnimationContainerRef = useRef(null);

  // scroll animations
  const { scrollYProgress: scrollYProgressFirstAnimation } = useScroll({
    target: firstAnimationContainerRef,
  });

  const { width } = useWindowSize();
  const scrollClampFirstAnimation = useSpring(scrollYProgressFirstAnimation, {
    stiffness: 100,
    damping: 25,
    mass: width < 1000 ? 0.05 : 0.1,
    velocity: 0.01,
    restSpeed: 2,
  });

  // div position based in scroll
  const xFirstAnimation = useTransform(
    scrollClampFirstAnimation,
    [0, 0.95],
    ["3%", "-72%"]
  );
  return (
    <section ref={firstAnimationContainerRef} className="relative h-[400vh]">
      <div className="sticky top-16 md:top-[6.5rem] overflow-hidden">
        <motion.div
          style={{ x: xFirstAnimation }}
          className="w-[300vw] absolute h-[75vh] flex items-center justify-between left-0 top-0 z-40"
        >
          <h3 className="relative title-size w-[25%]">
            En el mar, la tempestad es un desafío para los{" "}
            <span className="font-medium">navegantes</span>
          </h3>
          <div className="animate-bounce absolute lg:left-[67vw] xl:left-[70vw] bottom-[2dvh] lg:bottom-0 z-50 text-white 
          flex items-center gap-2 text-xs md:text-sm 2xl:text-base">
            Desplazar para explorar
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
          <h3 className="relative title-size w-[25%]">
            En la tierra, los <span className="font-medium">faros</span> buscan
            una barca al cual iluminar
          </h3>
          <h3 className="relative title-size w-[25%]">
            <span className="font-medium">¡Tierra a la vista!</span> <br />
            Bienvenido a Dutsiland
          </h3>
        </motion.div>
        <ExperienceTormenta scrollYProgress={scrollClampFirstAnimation} />
      </div>
    </section>
  );
};

export default FirstAnimation;
