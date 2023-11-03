"use client"

import { Canvas} from "@react-three/fiber"
import Texto from "./Texto"
import Tormenta from "./Tormenta"

const Experience = () => {
  return (
    <Canvas
      shadows
      className="my-4 mx-auto !w-[93%] !h-[75vh]"
      camera={ {
          fov: 45,
          near: 0.1,
          far: 200,
          position: [ 0, 1.5, 1 ]
      } }
    >
      <Tormenta />
    </Canvas>
  )
}

export default Experience