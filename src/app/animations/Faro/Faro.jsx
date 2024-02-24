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
    widthScreen < 1020 && widthScreen > 767
      ? [0, 0.23, 0.46, 0.68, 0.85, 0.98]
      : [0, 0.176, 0.35, 0.53, 0.785, 0.98];

  const scale = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [3, widthScreen < 1020 ? 5 : 3, 4, widthScreen < 1020 ? 12 : 9, 3, 3]
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
        <pointLight intensity={2} position={[-1, 1, 0]} color={"#FFF9C5"} />
      </Suspense>
    </>   
  );
};

export default Faro;
