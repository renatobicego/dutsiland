"use client";
import { MotionCanvas } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";
import * as THREE from "three";
import { forwardRef, useMemo } from "react";
import { extend } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { ref } from "yup";
import Faro from "./Faro";
import { isMobile, isTablet } from "react-device-detect";
import R3FLoader from "../R3FLoader";

const ExperienceFaro = ({
  eventSource,
  scrollYProgress,
  ref1,
  ref2,
  ref3,
  ref4,
}) => {
  useMemo(() => extend(THREE), []);

  return (
    <MotionConfig transition={{ type: "spring", mass: 5 }}>
      <MotionCanvas
        shadows
        key={2}
        eventSource={eventSource}
        flat
        style={{ width: "100vw", height: "100vh" }}
        className=" !fixed !left-0 !top-0 !right-0 !bottom-0
         overflow-hidden [&>canvas]:!pointer-events-none"
      >
        {isMobile || isTablet ? (
          <Faro scrollYProgress={scrollYProgress} />
        ) : (
          <>
            <View key={1} track={ref1}>
              <Faro scrollYProgress={scrollYProgress} />
            </View>
            <View key={2} track={ref2}>
              <Faro scrollYProgress={scrollYProgress} />
            </View>
            <View key={3} track={ref3}>
              <Faro scrollYProgress={scrollYProgress} />
            </View>
            <View key={4} track={ref4}>
              <Faro scrollYProgress={scrollYProgress} />
            </View>
          </>
        )}
        
      </MotionCanvas>
      <R3FLoader background={"bg-[#202020]"}/>
    </MotionConfig>
  );
};

export default ExperienceFaro;
