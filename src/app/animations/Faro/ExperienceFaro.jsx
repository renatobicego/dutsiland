import { Loader } from "@react-three/drei";
import R3FLoader from "../R3FLoader";
import Faro from "./Faro";
import { Canvas } from "@react-three/fiber";
const ExperienceFaro = ({ scrollYProgress }) => {
  return (
    <div className="mx-auto !w-[93vw] !h-[87vh] lg:!h-[83vh] relative">
      <Canvas
        shadows
        key={2}
        flat
        className="w-full h-full"
        camera={{
          fov: 45,
          near: 0.01,
          far: 200,
          position: [-0.1, 0.2, 1.4],
        }}
      >
        <Faro scrollYProgress={scrollYProgress} />
      </Canvas>
      <R3FLoader background={"bg-[#D3ECFF]"} />
    </div>
  );
};

export default ExperienceFaro;
