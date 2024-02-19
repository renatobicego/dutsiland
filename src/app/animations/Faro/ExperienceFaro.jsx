
"use client";
import { MotionCanvas } from "framer-motion-3d";
import { MotionConfig} from "framer-motion";
import * as THREE from "three";
import { forwardRef, useMemo } from "react";
import { extend } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { ref } from "yup";
import Faro from "./Faro";

const ExperienceFaro = ({ eventSource, scrollYProgress, ref1, ref2, ref3, ref4 }) => {
  useMemo(() => extend(THREE), []);

  return (
    <MotionConfig transition={{ type: "spring", mass: 5 }}>
      <MotionCanvas
        shadows
        key={2}
        eventSource={eventSource}
        flat
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
        className="[&>canvas]:!h-full [&>canvas]:!object-cover !fixed left-0 top-0 overflow-hidden [&>canvas]:!pointer-events-none"
      >
        <View key={1} track={ref1}>
          <Faro scrollYProgress={scrollYProgress}/>
        </View>
        <View key={2} track={ref2}>
          <Faro scrollYProgress={scrollYProgress}/>
        </View>
        <View key={3} track={ref3}>
          <Faro scrollYProgress={scrollYProgress}/>
        </View>
        <View key={4} track={ref4}>
          <Faro scrollYProgress={scrollYProgress}/>
        </View>
      </MotionCanvas>
    </MotionConfig>
  );
};

export default ExperienceFaro;
