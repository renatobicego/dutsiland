"use client";
import { useRef } from "react";
import { useAnimate, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import ExperienceFaro from "./Faro/ExperienceFaro";
import Services from "../components/Services/Services";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs/AboutUs";
import useWindowSize from "../utils/useWindowSize";

const SecondAnimation = () => {
  const secondAnimationContainerRef = useRef(null);
  const { width } = useWindowSize();
  // Scroll animations
  const { scrollYProgress: scrollYProgressSecondAnimation } = useScroll({
    target: secondAnimationContainerRef,
  });

  const scrollClampSecondAnimation = useSpring(scrollYProgressSecondAnimation, {
    stiffness: width < 1000 ? 300 : 100,
    damping: width < 1000 ? 20 : 25,
    mass: width < 1000 ? 1 : 0.1,
    velocity: 0.01,
    restSpeed: 2,
  });

  const [scope, animate] = useAnimate()
  useMotionValueEvent(scrollClampSecondAnimation, "change", (latest) => {
    if(latest < 0.35){
      animate(scope.current, {x: "3%"})
    }else {
      animate(scope.current, {x: "-120%"})
    }
  })
  return (
    <section ref={secondAnimationContainerRef} className="relative h-[400vh] snap-start snap-always">
      {/* used with navbar in header */}
      <div id="quienesSomos" className="absolute top-[122vh]"></div>
      <div id="servicios" className="absolute top-[225vh]"></div>
      <div id="contacto" className="absolute top-[285vh]"></div>
      <div className="sticky top-16 md:top-[6.5rem] overflow-hidden z-10">
        <div className="w-[2.9vw] h-[75vh] absolute left-0 top-0 bg-white z-50"></div>
        <motion.div
          ref={scope}
          key={'where'}
          className="text-[#202020] w-4/5 md:w-3/4 lg:w-1/2 2xl:w-[40%] absolute z-40 left-6 md:left-16 top-[20%] lg:left-28 lg:top-28"
        >
          <h3 className="text-3xl md:text-5xl 3xl:text-7xl font-semibold mb-4  ">
            ¿En dónde estamos?
          </h3>
          <p className="md:text-xl 3xl:text-3xl w-full ">
            En el lugar donde llevamos tu negocio a{" "}
            <span className="font-bold">nuevos horizontes</span> en el mundo
            digital. En esta era, ser una navegante web es esencial, y nosotros
            somos tu faro en este viaje.
          </p>
        </motion.div>
        <AboutUs scrollClampSecondAnimation={scrollClampSecondAnimation} />
        <Services scrollClampSecondAnimation={scrollClampSecondAnimation} />
        <Contact scrollClampSecondAnimation={scrollClampSecondAnimation} />
        <ExperienceFaro scrollYProgress={scrollClampSecondAnimation} />
      </div>
    </section>
  );
};

export default SecondAnimation;
