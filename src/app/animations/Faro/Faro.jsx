import { Stage, useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTransform } from "framer-motion";
import useWindowSize from "../../utils/useWindowSize";
const Faro = ({ scrollYProgress }) => {
  const scene = useMemo(() => {
    const { scene } = useGLTF("/lighthouse_on_island.glb");
    return scene;
  }, []);
  // Breakpoints of the animation based in Scroll progress
  const sectionBreakpoints = [0, 0.2, 0.4, 0.45, 0.7, 0.75, 1];
  const screenSize = useWindowSize();
  // Camera positions
  const xCamPos = useTransform(scrollYProgress, sectionBreakpoints, [
    2.5,
    screenSize.width > 1000 ? -0.1 : 0.25,
    screenSize.width > 1000 ? 0.06 : 0.15,
    screenSize.width > 1000 ? 0.06 : 0.15,
    screenSize.width > 1500 ? 0.42 : screenSize.width > 1000 ? 0.5 : 0.55,
    screenSize.width > 1500 ? 0.42 : screenSize.width > 1000 ? 0.5 : 0.55,
    0.8,
  ]);
  const yCamPos = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    [0.4, 0.2, 0.02, 0.02, 0.32, 0.32, 0.02]
  );
  const zCamPos = useTransform(scrollYProgress, sectionBreakpoints, [
    1.6,
    1.4,
    screenSize.width > 1000 ? 0.4 : 0.45,
    screenSize.width > 1000 ? 0.4 : 0.45,
    0.7,
    0.7,
    0.45,
  ]);
  // Camera rotations
  const xCamRot = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.45, 0.7],
    [0, -Math.PI / 5, -Math.PI / 5, 0]
  );
  const yCamRot = useTransform(scrollYProgress, sectionBreakpoints, [
    Math.PI / 2,
    0,
    -Math.PI / 7,
    -Math.PI / 7,
    0,
    0,
    Math.PI / 2,
  ]);
  const zCamRot = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.45, 0.7],
    [0, -Math.PI / 9, -Math.PI / 9, 0]
  );
  const newCameraPosition = new THREE.Vector3()
  useFrame((state, delta) => {
    // Update camera position
    newCameraPosition.set(
      xCamPos.current,
      yCamPos.current,
      zCamPos.current
    );
    state.camera.position.copy(newCameraPosition);
    state.camera.rotation.y = yCamRot.current;
    state.camera.rotation.x = xCamRot.current;
    state.camera.rotation.z = zCamRot.current;
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

      <primitive position={[0.6, 0, 0.5]} object={scene} />
      <mesh rotation-y={1.5} position={[-10, 4, -2]}>
        <circleGeometry />
        <meshBasicMaterial color={"#FFF9C5"} />
      </mesh>
      <pointLight intensity={7} position={[-1, 1, 0]} color={"#FFF9C5"} />
    </>
  );
};

export default Faro;
