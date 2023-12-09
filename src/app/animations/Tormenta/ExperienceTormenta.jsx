"use client";

import { Canvas } from "@react-three/fiber";
import Tormenta from "./Tormenta";
import { useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion";

const ExperienceTormenta = ({ scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  return (
    <motion.div
      className="my-4 mx-auto !w-[93vw] !h-[75vh]"
      style={{ opacity }}
    >
      <Canvas
        shadows
        key={1}
        className="w-full h-full"
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 0.15, 0],
        }}
      >
        <Tormenta scrollYProgress={scrollYProgress} />
      </Canvas>
    </motion.div>
  );
};

export default ExperienceTormenta;
