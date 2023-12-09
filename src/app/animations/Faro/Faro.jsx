import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";

const Faro = ({ scrollYProgress }) => {
  const scene = useMemo(() => {
    const { scene } = useGLTF("/lighthouse.glb");
    return scene;
  }, []);
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
      <ambientLight />
      {/* <primitive scale={3} object={scene} /> */}
    </>
  );
};

export default Faro;
