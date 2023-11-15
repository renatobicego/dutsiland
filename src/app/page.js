"use client"
import { useRef } from "react";
import Experience from "./R3F/Experience";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion"

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const scrollClamp = useSpring(scrollYProgress,{ stiffness: 100, damping: 25, mass: 0.1, velocity: 1 , restSpeed: 0.5})

  const x = useTransform(scrollClamp, [0, 1], ["4%", "-100%"]);

  return (
    <main className="w-full h-full relative pt-[8rem]">
      <section ref={targetRef} className="relative h-[200vh]">
        <div className="sticky top-36 overflow-hidden">
          <motion.div 
            style={{x}}
            className="w-[200vw] absolute h-[75vh] flex items-center left-0 top-0 z-40 gap-[60vw]">
            <h3 className="relative text-6xl uppercase text-white font-thin w-[37.5%]">
              En el mar, la tempestad es un desafío para los <span className="font-medium">navegantes</span> 
            </h3>
            <h3 className="relative text-6xl uppercase text-white font-thin w-[37.5%]">
              En la tierra, los <span className="font-medium">faros</span> buscan una barca al cual iluminar
            </h3>
          </motion.div>
          <Experience scrollYProgress={scrollClamp}/>
        </div>
      </section>
    </main>
  )
}
