"use client";
import { MotionCanvas } from "framer-motion-3d";
import R3FLoader from "../R3FLoader";
import Faro from "./Faro";
import { MotionConfig, motion, useTransform } from "framer-motion";
import useWindowSize from "../../utils/useWindowSize";
const ExperienceFaro = ({ scrollYProgress }) => {
  const { width: widthScreen } = useWindowSize();
  const sectionBreakpoints =
    widthScreen < 1020
      ? [0.29, 0.5, 0.624, 0.82, 0.98]
      : [0.22, 0.397, 0.592, 0.783, 1];
  const left = useTransform(
    scrollYProgress,
    [0, ...sectionBreakpoints],
    ["3%", "8%", "7%", widthScreen < 1020 ? "7%" : "7%", "3.5%", "3.5%"]
  );

  const top = useTransform(
    scrollYProgress,
    widthScreen < 1020
      ? [0.29, 0.5, 0.624, 0.73, 0.82, 0.98]
      : [0.22, 0.397, 0.592, 0.73, 0.783, 1],
    widthScreen < 1020
      ? ["140vh", "191vh", "266.5vh", "300vh", "300vh", "385vh"]
      : ["140vh", "195vh", "272vh", "272vh", "370vh", "449vh"]
  );
  const width = useTransform(
    scrollYProgress,
    [0, ...sectionBreakpoints],
    [
      "93vw",
      widthScreen < 1020 ? "84%" : "40%",
      "86%",
      widthScreen < 1020 ? "85.5%" : "25%",
      "93.1vw",
      "93.1vw",
    ]
  );
  const height = useTransform(
    scrollYProgress,
    [0, ...sectionBreakpoints],
    widthScreen < 1020
      ? ["90vh", "43.5%", "35%", "27%", "72vh", "55vh"]
      : ["75vh", "50%", "70%", "70%", "72vh", "72vh"]
  );

  const borderRadius = useTransform(scrollYProgress, sectionBreakpoints, [
    widthScreen < 1020 ? "30px" : "24px",
    "40px",
    "40px",
    "40px",
    "100px",
  ]);

  const opacity = useTransform(
    scrollYProgress,
    widthScreen < 1020 ? [0.624, 0.65, 0.95, 0.98] : [0.592, 0.7, 0.95, 0.98],
    ["1", "0", "0", "1"]
  );

  return (
    <MotionConfig transition={{ type: "spring", mass: 5 }}>
      <motion.div
        style={{ left, top, height, width, borderRadius, opacity }}
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
