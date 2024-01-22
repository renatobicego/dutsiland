"use client";

import { Canvas } from "@react-three/fiber";
import Tormenta from "./Tormenta";
import R3FLoader from "../R3FLoader";

const ExperienceTormenta = ({ scrollYProgress }) => {
  return (
    <div className=" mx-auto !w-[93vw] h-[80svh] md:h-[75vh] absolute top-0 ">
      <Canvas
        key={1}
        className="w-full h-full absolute right-0 rounded-[70px] lg:!rounded-[100px]"
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [3, 0.15, 0],
        }}
      >
        <Tormenta  scrollYProgress={scrollYProgress} />
      </Canvas>
      <R3FLoader background={"bg-[#202020]"}/>
    </div>
  );
};

export default ExperienceTormenta;
