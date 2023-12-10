
import Faro from "./Faro";
import { Canvas } from "@react-three/fiber";
const ExperienceFaro = ({ scrollYProgress }) => {

  return (
    <div
      className="my-4 mx-auto !w-[93vw] !h-[75vh]"
  
    >
      <Canvas
        shadows
        key={2}
        flat
        className="w-full h-fullr"
        camera={{
          fov: 45,
          near: 0.01,
          far: 200,
          position: [-0.1, 0.2, 1.4],
        }}
      >
        <Faro scrollYProgress={scrollYProgress}/>
      </Canvas>
    </div>
  );
};

export default ExperienceFaro;
