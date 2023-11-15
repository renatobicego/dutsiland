"use client"

import { Canvas} from "@react-three/fiber"
import Tormenta from "./Tormenta"
import { useTransform } from "framer-motion";
import { useControls } from "leva";

const Experience = ({scrollYProgress}) => {

  return (
    <Canvas
      shadows
      className="my-4 mx-auto !w-[93vw] !h-[75vh]"
      camera={ {
          fov: 45,
          near: 0.1,
          far: 200,
          position: [ 0, 1.5, 1 ]
      } }
    >
      <Tormenta scrollYProgress={scrollYProgress}/>
    </Canvas>
  )
}

export default Experience