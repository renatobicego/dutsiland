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
    [0, 0.75],
    ["3%", "-72%"]
  );
  return (
    <section ref={secondAnimationContainerRef} className="relative h-[400vh]">
      <div className="sticky top-36 overflow-hidden">
        {/* <motion.div
          style={{ x: xSecondAnimation }}
          className="w-[400vw] lg:w-[300vw] absolute h-[75vh] flex items-center justify-between left-0 top-0 z-40"
        >
          <div className="relative title-size w-[25%] sm:w-[28%] lg:w-[25%]">
            <h3 >
              ¿En dónde estamos?
            </h3>
            <p>
              En el lugar donde llevamos tu negocio a nuevos horizontes en el
              mundo digital. En esta era, ser una navegante web es esencial, y
              nosotros somos tu faro en este viaje
            </p>
          </div>
        </motion.div> */}
        <ExperienceFaro scrollYProgress={scrollClampSecondAnimation} />
      </div>
    </section>
  );
};

export default SecondAnimation;
