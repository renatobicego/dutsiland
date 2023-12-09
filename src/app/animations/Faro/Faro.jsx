import { OrbitControls, shaderMaterial, useGLTF } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import seaVertexShader from "./vertex.glsl";
import seaFragmentShader from "./fragment.glsl";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";
const SeaMaterialBlue = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
    uBigWavesElevation: 0.02,
    uBigWavesFrequency: new THREE.Vector2(2, 1),
    uBigWavesSpeed: 0.3,
    uSmallWavesElevation: 0.01,
    uSmallWavesFrequency: 4,
    uSmallWavesSpeed: 0.2,
    uSmallWavesIteration: 8,
    uDepthColor: new THREE.Color("#5C82A4"),
    uSurfaceColor: new THREE.Color("#88B1CD"),
    uColorOffset: 0.3,
    uColorMultiplier: 5,
  },
  seaVertexShader,
  seaFragmentShader
);

extend({ SeaMaterialBlue });
const Faro = () => {
  const scene = useMemo(() => {
    const { scene } = useGLTF("/lighthousee.glb");
    scene.traverse(function (node) {
      if (node.isMesh) {
        node.receiveShadow = true;
        node.castShadow = true;
      }
    });
    return scene;
  }, []);
  const seaMaterialBlue = useRef();
  useFrame((state, delta) => {
    if (seaMaterialBlue.current) {
      seaMaterialBlue.current.uTime += delta;
    }
  });
  return (
    <>
      <mesh rotation={[-1.6, 0, 1.5]} position={[0, -0.15, 0]}>
        <planeGeometry args={[30, 30, 512, 512]} />
        <seaMaterialBlue ref={seaMaterialBlue} />
      </mesh>
      <color attach={"background"} args={["#D3ECFF"]} />
      <primitive position={[0.6, 0, 0.5]} object={scene} />
      <directionalLight
        intensity={4}
        castShadow
        position={[-3, 1, 0]}
        color={"white"}
        shadow-normalBias={0.04}
      />
      <directionalLight position={[3, 1, 1]} color={"white"} intensity={0.4} />
      <ambientLight color={"#FFF6DF"} intensity={0.5} />
      {/* <OrbitControls /> */}
    </>
  );
};

export default Faro;
