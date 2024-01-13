import {
  CameraShake,
  Html,
  SpotLight,
  shaderMaterial,
} from "@react-three/drei";
import { BlendFunction } from "postprocessing";
import { extend, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import seaVertexShader from "./shaders/vertex.glsl";
import seaFragmentShader from "./shaders/fragment.glsl";
import * as THREE from "three";
import { EffectComposer } from "@react-three/postprocessing";
import Fog from "./Effects/Fog";
import Rain from "./Effects/Rain";
import { useTransform } from "framer-motion";
import useWindowSize from "../../utils/useWindowSize";
import FaroModel from "./FaroModel";
import R3FLoader from "../R3FLoader";

// Shader material uniforms
const SeaMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
    uBigWavesElevation: 0.15,
    uBigWavesFrequency: new THREE.Vector2(6, 3),
    uBigWavesSpeed: 0.6,
    uSmallWavesElevation: 0.1,
    uSmallWavesFrequency: 7,
    uSmallWavesSpeed: 0.2,
    uSmallWavesIteration: 8,
    uDepthColor: new THREE.Color("#000000"),
    uSurfaceColor: new THREE.Color("#2e2e2e"),
    uColorOffset: 0.57,
    uColorMultiplier: 1,
  },
  seaVertexShader,
  seaFragmentShader
);

extend({ SeaMaterial });

const Tormenta = ({ scrollYProgress }) => {
  const screenSize  = useWindowSize();
  const seaMaterial = useRef();
  const spotlightRef = useRef();
  const fogRef = useRef();
  const rainRef = useRef();
  const cameraShakeRef = useRef();

  // camera positions
  const zCameraP = useTransform(
    scrollYProgress,
    [0, 0.9],
    [0, screenSize.width > 1000 ? -5 : -6.1]
  );
  const yCameraP = useTransform(scrollYProgress, [0.45, 0.9], [0.15, 0.4]);
  const xCameraP = useTransform(scrollYProgress, [0.45, 0.9], [3, 4]);
  const cameraShakeIntensity = useTransform(
    scrollYProgress,
    [0, 0.6, 0.8],
    [1, 1, 0]
  );

  // rain effect
  const rainTexture = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/iChannel0.png");
    texture.repeat.x = 2;
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, []);

  const newCameraPosition = new THREE.Vector3();
  useFrame((state, delta) => {
    // Animate spotlight over lighthouse and update uniform
    if (seaMaterial.current && spotlightRef.current) {
      seaMaterial.current.uTime += delta;
      spotlightRef.current.target.position.x =
        Math.sin(seaMaterial.current.uTime * Math.PI * 0.25 - Math.PI) + 1.32;
      spotlightRef.current.target.position.z =
        Math.cos(seaMaterial.current.uTime * Math.PI * 0.25 - Math.PI) - 6.5;
      spotlightRef.current.target.position.y = 0.14;
    }

    // Set new camera position based in scroll
    newCameraPosition.set(xCameraP.current, yCameraP.current, zCameraP.current);
    state.camera.position.copy(newCameraPosition);
    cameraShakeRef.current?.setIntensity(cameraShakeIntensity.current);
  });

  return (
    <>
      <CameraShake
        ref={cameraShakeRef}
        maxPitch={0.25}
        maxRoll={0.15}
        maxYaw={0}
        pitchFrequency={0.4}
        rollFrequency={0.3}
        yawFrequency={0}
      />
      <color args={["#202020"]} attach="background" />
      <EffectComposer multisampling={8}>
        <Fog
          ref={fogRef}
          u_resolution={new THREE.Vector2(1428, 520)}
          blendFunction={BlendFunction.OVERLAY}
        />
        <Rain
          ref={rainRef}
          u_resolution={new THREE.Vector2(2048, 1048)}
          blendFunction={BlendFunction.LIGHTEN}
          rainTexture={rainTexture}
        />
      </EffectComposer>
      <Suspense fallback={null}>
        <ambientLight />
        <mesh rotation={[-1.6, 0, 1.5]}>
          <planeGeometry args={[30, 30, 512, 512]} />
          <seaMaterial ref={seaMaterial} />
        </mesh>
        <FaroModel />
        <SpotLight
          ref={spotlightRef}
          position={[1.32, 0.2, -6.5]}
          intensity={100}
          angle={Math.PI / 4}
          scale={0.1}
          distance={100}
          attenuation={40}
          decay={8}
        />
      </Suspense>
    </>
  );
};

export default Tormenta;
