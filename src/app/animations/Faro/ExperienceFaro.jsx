import { useTransform, motion } from "framer-motion";
import Faro from "./Faro";
import { Canvas } from "@react-three/fiber";
const ExperienceFaro = ({ scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return (
    <motion.div
      className="my-4 mx-auto !w-[93vw] !h-[75vh]"
    //   style={{ opacity }}
    >
      <Canvas
        shadows
        key={2}
        className="w-full h-full"
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, 0],
        }}
      >
        <Faro scrollYProgress={scrollYProgress} />
      </Canvas>
    </motion.div>
  );
};

export default ExperienceFaro;
