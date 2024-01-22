"use client";
import { MotionCanvas } from "framer-motion-3d";
import R3FLoader from "../R3FLoader";
import Faro from "./Faro";
import { MotionConfig, motion, useTransform } from "framer-motion";
const ExperienceFaro = ({ scrollYProgress }) => {
  console.log(scrollYProgress)
  const sectionBreakpoints = [0.22, 0.397, 0.592, 0.783, 1]
  const left = useTransform(scrollYProgress, sectionBreakpoints, ["8%", "7%", "7%", "7%", "3.5%"]);
  const top = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    ["140vh", "195vh", "272vh", "272vh", "449vh"]
  );
  const width = useTransform(
    scrollYProgress,
    [0, ...sectionBreakpoints],
    ["93vw", "40%", "86%", "25%", "25%", "93.1vw"]
  );
  const height = useTransform(
    scrollYProgress,
    [0, ...sectionBreakpoints],
    ["75vh", "50%", "70%", "70%", "50%", "72vh"]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    sectionBreakpoints,
    ["24px", "40px", "40px", "40px", "100px"]
  );

  return (
    <MotionConfig transition={{ type: "spring", mass: 5}}>
      <motion.div
        style={{ left, top, height, width, borderRadius }}
        className="w-2/5 h-1/2 absolute overflow-hidden"
      >
        <MotionCanvas
          shadows
          key={2}
          flat 
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%" }}
        >
          <Faro scrollYProgress={scrollYProgress} />
        </MotionCanvas>
        <R3FLoader background={"bg-[#D3ECFF]"} />
      </motion.div>
    </MotionConfig>
  );
};

export default ExperienceFaro;
