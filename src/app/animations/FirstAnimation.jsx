"use client"
import { useRef, useState } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import ExperienceTormenta from "./Tormenta/ExperienceTormenta";
const FirstAnimation = () => {
  const firstAnimationContainerRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(true)
  const { scrollYProgress: scrollYProgressFirstAnimation } = useScroll({
    target: firstAnimationContainerRef,
  });

  const scrollClampFirstAnimation = useSpring(scrollYProgressFirstAnimation, {
    stiffness: 100,
    damping: 25,
    mass: 0.1,
    velocity: 0.01,
    restSpeed: 2,
  });

  const xFirstAnimation = useTransform(
    scrollClampFirstAnimation,
    [0, 0.95],
    ["3%", "-72%"]
  );
  return (
    <section ref={firstAnimationContainerRef} className="relative h-[400vh]">
      <div className="sticky top-36 overflow-hidden">
        <motion.div
          style={{ x: xFirstAnimation }}
          className="w-[400vw] lg:w-[300vw] absolute h-[75vh] flex items-center justify-between left-0 top-0 z-40"
        >
          <h3 className="relative title-size w-[25%] sm:w-[28%] lg:w-[25%]">
            En el mar, la tempestad es un desafío para los{" "}
            <span className="font-medium">navegantes</span>
          </h3>
          <h3 className="relative title-size w-[25%] sm:w-[28%] lg:w-[25%]">
            En la tierra, los <span className="font-medium">faros</span> buscan
            una barca al cual iluminar
          </h3>
          <h3 className="relative title-size w-[25%] sm:w-[28%] lg:w-[25%]">
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
