"use client";

import { Canvas } from "@react-three/fiber";
import Tormenta from "./Tormenta";
import { useState } from "react";
import { useMotionValue } from "framer-motion";

const ExperienceTormenta = ({ scrollYProgress }) => {

  return (
    <div className="my-4 mx-auto !w-[93vw] !h-[75vh]">
      <Canvas
        key={1}
        className="w-full h-full"
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
