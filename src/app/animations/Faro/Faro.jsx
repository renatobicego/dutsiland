import { Environment, Preload } from "@react-three/drei";
import { Suspense } from "react";
import { useTransform } from "framer-motion";
import useWindowSize from "../../utils/useWindowSize";
import Model from "./Model";
import Camera from "./Camera";

const Faro = ({ scrollYProgress }) => {
  const { width: widthScreen } = useWindowSize();
  const sectionBreakpoints =
    widthScreen < 1020 && widthScreen > 767
      ? [0, 0.23, 0.46, 0.68, 0.85, 0.98]
      : [0, 0.176, 0.35, 0.53, 0.785, 0.98];

  const scale = useTransform(scrollYProgress, sectionBreakpoints, [
    widthScreen < 1020 ? 5 : 3,
    widthScreen < 1020 ? 5 : 3,
    widthScreen < 1020 ? 6.5 : 4,
    widthScreen < 1020 ? 12 : 9,
    widthScreen < 1020 ? 8 : widthScreen > 1700 ? 5 : 3,
    widthScreen < 1020 ? 5 : widthScreen > 1700 ? 5 : 3,
  ]);

  return (
    <>
      {/* Warm environment so materials pick up sepia bounce light */}
      <Environment preset="sunset" background={false} />

      {/* Muted warm background, like the Sketchfab viewer */}
      <color attach="background" args={["#C8B8C8"]} />

      {/* Key light: warm, casts the defined shadows */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={2.2}
        color="#FFF0D4"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />

      {/* Cool fill on the opposite side to keep shadows readable */}
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.6}
        color="#E8D8F0"
      />

      <pointLight intensity={1.2} position={[-1, 1.5, 0]} color="#FFE8B0" />
      <ambientLight intensity={0.35} color="#E8E0F0" />

      <Camera
        sectionBreakpoints={sectionBreakpoints}
        scrollYProgress={scrollYProgress}
      />
      <Suspense fallback={null}>
        <Model scaleModel={scale} position={[0.6, 0, 0.5]} />
        <Preload all />
      </Suspense>
    </>
  );
};

export default Faro;
