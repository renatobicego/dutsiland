import { Stage, useGLTF, useScroll } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTransform } from "framer-motion";
import useWindowSize from "../../utils/useWindowSize";
import useMousePosition from "../../utils/useMousePos";
import Model from "./Model";
import { LayoutOrthographicCamera } from "framer-motion-3d";
const Faro = ({ scrollYProgress }) => {
  // Breakpoints of the animation based in Scroll progress
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const sectionBreakpoints = [0.22, 0.397, 0.592, 0.783, 1];
  const screenSize = useWindowSize();
  const mousePos = useMousePosition();

  // Camera positions
  const xCamPos = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [1.5, -1.3, 0, 0, -1]
    //[1.5, -1.3, 0, 0, 0]
  );
  const yCamPos = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [0.6, 3, 3, 0, 2.8]
    // [0.6, 3, 3, 0, 0.8]
  );
  const zCamPos = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [2, 0.4, -1.5, 0, 0]
  );
  // Camera rotations
  const xCamRot = useTransform(scrollYProgress, sectionBreakpoints, [
    -Math.PI / 8,
    -Math.PI / 2,
    -Math.PI / 2,
    0,
    0,
  ]);
  const yCamRot = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [0, 0, 0, 0, -Math.PI / 4]
    // [0, 0, 0, 0, 0]
  );
  const zCamRot = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [0, 0, 0, 0, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [2, 4, 10, 2, 10]
  );
  // const newCameraPosition = new THREE.Vector3();
  useFrame((state, delta) => {
    if (!cameraRef.current) {
      return;
    }
    // Update camera position
    // newCameraPosition.set(xCamPos.get(), yCamPos.get(), zCamPos.get());
    // cameraRef.current.position.copy(newCameraPosition);
    if (modelRef.current) {
      modelRef.current.scale.x = scale.get();
      modelRef.current.scale.y = scale.get();
      modelRef.current.scale.z = scale.get();
    }
    if (mousePos) {
      cameraRef.current.rotation.x = xCamRot.get() - mousePos.y * 0.1;
      cameraRef.current.rotation.y = yCamRot.get() - mousePos.x * 0.1;
      cameraRef.current.rotation.z = zCamRot.get();
    }
  });

  return (
    <>
      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment="city"
        preset="rembrandt"
        intensity={0.2}
      />
      <color attach={"background"} args={["#D3ECFF"]} />
      <LayoutOrthographicCamera
        ref={cameraRef}
        position={[xCamPos, yCamPos, zCamPos]}
        rotation={[0, 0, 0]}
        zoom={50}
      />
      <Suspense fallback={null}>
        <Model ref={modelRef} position={[0.6, 0, 0.5]} />
      </Suspense>
      <mesh rotation-y={1.5} position={[-10, 4, -2]}>
        <circleGeometry />
        <meshBasicMaterial color={"#FFF9C5"} />
      </mesh>
      <pointLight intensity={7} position={[-1, 1, 0]} color={"#FFF9C5"} />
    </>
  );
};

export default Faro;
