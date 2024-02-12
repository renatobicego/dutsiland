"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import Tormenta from "./Tormenta";
import R3FLoader from "../R3FLoader";
import { useInView } from "framer-motion";
import { useRef } from "react";
const ExperienceTormenta = ({ scrollYProgress }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  return (
    <div ref={ref} className=" mx-auto w-screen h-full absolute top-0">
      <Canvas
        key={1}
        className="w-full h-full absolute right-0"
        frameloop={isInView ? 'always' : 'never'}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 0.15, 0],
        }}
      >
        <Tormenta scrollYProgress={scrollYProgress} />
      </Canvas>
      <R3FLoader background={"bg-[#202020]"}/>
    </div>
  );
};

export default ExperienceTormenta;
