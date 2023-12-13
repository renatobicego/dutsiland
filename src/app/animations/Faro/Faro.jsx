import {
  OrbitControls,
  Stage,
  shaderMaterial,
  useGLTF,
} from "@react-three/drei";
import React, { useMemo, useRef, useState } from "react";
import seaVertexShader from "./vertex.glsl";
import seaFragmentShader from "./fragment.glsl";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";
import { useMotionValue, useTransform } from "framer-motion";
// const SeaMaterialBlue = shaderMaterial(
//   {
//     uTime: 0,
//     uColorStart: new THREE.Color("#ffffff"),
//     uColorEnd: new THREE.Color("#000000"),
//     uBigWavesElevation: 0.02,
//     uBigWavesFrequency: new THREE.Vector2(2, 1),
//     uBigWavesSpeed: 0.3,
//     uSmallWavesElevation: 0.01,
//     uSmallWavesFrequency: 4,
//     uSmallWavesSpeed: 0.2,
//     uSmallWavesIteration: 8,
//     uDepthColor: new THREE.Color("#5C82A4"),
//     uSurfaceColor: new THREE.Color("#88B1CD"),
//     uColorOffset: 0.3,
//     uColorMultiplier: 5,
//   },
//   seaVertexShader,
//   seaFragmentShader
// );

// extend({ SeaMaterialBlue });

const Faro = ({ scrollYProgress }) => {
  const scene = useMemo(() => {
    const { scene } = useGLTF("/lighthouse_on_island.glb");
    // scene.traverse(function (node) {
    //   if (node.isMesh) {
    //     node.receiveShadow = true;
    //     node.castShadow = true;
    //   }
    // });
    return scene;
  }, []);
  // const seaMaterialBlue = useRef();

  const xCamPos = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [2.5, -0.1, 0.06]
  );
  const yCamPos = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [0.4, 0.2, 0.02]
  );
  const zCamPos = useTransform(scrollYProgress, [0, 0.2, 0.4], [1.6, 1.4, 0.4]);
  const xCamRot = useTransform(scrollYProgress, [0.2, 0.4], [0, -Math.PI / 5]);
  const yCamRot = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [Math.PI / 2, 0, -Math.PI / 7]
  );
  const zCamRot = useTransform(scrollYProgress, [0.2, 0.4], [0, -Math.PI / 9]);

  useFrame((state, delta) => {
    // if (seaMaterialBlue.current) {
    //   seaMaterialBlue.current.uTime += delta;
    // }
    const newCameraPosition = new THREE.Vector3(
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
        preset="portrait"
        intensity={1}
      />
      <color attach={"background"} args={["#D3ECFF"]} />
      
      <primitive position={[0.6, 0, 0.5]} object={scene} />
      <directionalLight
        intensity={1}
        position={[-3, 1, 0]}
        color={"white"}
      />
      {/* <OrbitControls /> */}
    </>
  );
};

export default Faro;
