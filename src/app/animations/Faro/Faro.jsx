import { Stage } from "@react-three/drei";
import { Suspense } from "react";
import { useTransform } from "framer-motion";
import useWindowSize from "../../utils/useWindowSize";
import Model from "./Model";
import Camera from "./Camera";

const Faro = ({ scrollYProgress }) => {
  // Breakpoints of the animation based in Scroll progress
  const { width: widthScreen } = useWindowSize();
  const sectionBreakpoints =
    widthScreen < 1020
      ? [0.27, 0.492, 0.617, 0.81, 1]
      : [0.196, 0.392, 0.589, 0.785, 0.98];

  const scale = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [3, 4, 10, 2, 10]
  );

  return (
    <>
      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment="city"
        preset="rembrandt"
        intensity={0.2}
      />
      <color attach={"background"} args={["#D3ECFF"]} />
      <Camera
        sectionBreakpoints={sectionBreakpoints}
        scrollYProgress={scrollYProgress}
      />
      <Suspense fallback={null}>
        <Model scaleModel={scale} position={[0.6, 0, 0.5]} />
        <pointLight intensity={7} position={[-1, 1, 0]} color={"#FFF9C5"} />
      </Suspense>
      <mesh rotation-y={1.5} position={[-10, 4, -2]}>
        <circleGeometry />
        <meshBasicMaterial color={"#FFF9C5"} />
      </mesh>
    </>
  );
};

export default Faro;
