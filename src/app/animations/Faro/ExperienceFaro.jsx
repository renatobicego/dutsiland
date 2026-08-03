"use client";
import { MotionCanvas } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import * as THREE from "three";
import { useMemo } from "react";
import { extend } from "@react-three/fiber";
import Faro from "./Faro";
import PostEffects from "./PostEffects";
import { isMobile, isTablet } from "react-device-detect";
import R3FLoader from "../R3FLoader";

/**
 * Canvas fijo full-viewport. Una sola instancia del faro + post-processing.
 * La cámara y el modelo se mueven con scrollYProgress (ya manejado en Faro/Camera).
 * Las secciones de la web tapan/revelan el canvas con sus propios fondos.
 */
const ExperienceFaro = ({ scrollYProgress, eventSource }) => {
  useMemo(() => extend(THREE), []);

  return (
    <MotionConfig transition={{ type: "spring", mass: 5 }}>
      <MotionCanvas
        shadows
        eventSource={eventSource}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.45,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ width: "100vw", height: "100vh" }}
        className="!z-0 !fixed !inset-0 overflow-hidden [&>canvas]:!pointer-events-none"
      >
        <Faro scrollYProgress={scrollYProgress} />
        {!(isMobile || isTablet) && <PostEffects />}
      </MotionCanvas>
      <R3FLoader background="bg-negro" />
    </MotionConfig>
  );
};

export default ExperienceFaro;
