"use client";

import { Canvas } from "@react-three/fiber";
import Tormenta from "./Tormenta";
import { useState } from "react";
import { useMotionValue } from "framer-motion";
const ExperienceTormenta = ({ scrollYProgress }) => {
  return (
    <div className=" mx-auto !w-[93vw] !h-[83vh] relative">
      <Canvas
        key={1}
        className="w-full h-full absolute right-0"
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 0.15, 0],
        }}
      >
        <Tormenta  scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
};

export default ExperienceTormenta;
