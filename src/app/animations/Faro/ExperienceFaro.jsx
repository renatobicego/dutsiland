// "use client";
// import { MotionCanvas } from "framer-motion-3d";
// import R3FLoader from "../R3FLoader";
// import Faro from "./Faro";
// import { MotionConfig, motion, useTransform } from "framer-motion";
// import useWindowSize from "../../utils/useWindowSize";
// const ExperienceFaro = ({ scrollYProgress }) => {
//   // const { width: widthScreen, height: heightScreen } = useWindowSize();
//   // const sectionBreakpoints =
//   //   widthScreen < 1020
//   //     ? [0.271, 0.498, 0.622, 0.82, 0.98]
//   //     : [0.22, widthScreen > 1749 ? 0.41 : 0.397, 0.592, 0.783, 1];
//   // const left = useTransform(
//   //   scrollYProgress,
//   //   [0, ...sectionBreakpoints],
//   //   ["3%", "8%", "7%", widthScreen < 1020 ? "7.1%" : "7%", "3.5%", "3.5%"]
//   // );

//   // const top = useTransform(
//   //   scrollYProgress,
//   //   widthScreen < 1020
//   //     ? [0.271, 0.498, 0.622, 0.73, 0.82, 0.98]
//   //     : [0.22, 0.397, 0.592, 0.73, 0.783, 1],
//   //   widthScreen < 1020
//   //     // ? ["144svh", "197.8svh", "296svh", "300vh", "300vh", "405svh"]
//   //     ? ["42.5vh", "11.5vh", "50vh", "40vh", "20vh", "14vh"]
//   //     // : ["140vh", "195vh", "272vh", "272vh", "370vh", "449vh"]
//   //     : ["42vh", widthScreen > 1749 ? "19.5vhs" :  `22vh`, "14.2vh", "40vh", "20vh", widthScreen > 1749 ? "11vh" : "14vh"]
//   // );
//   // const width = useTransform(
//   //   scrollYProgress,
//   //   [0, ...sectionBreakpoints],
//   //   [
//   //     "93vw",
//   //     widthScreen < 1020 ? "84%" : "40%",
//   //     "86%",
//   //     widthScreen < 1020 ? "85.5%" : "25%",
//   //     "93.1vw",
//   //     "93.1vw",
//   //   ]
//   // );
//   // const height = useTransform(
//   //   scrollYProgress,
//   //   [0, ...sectionBreakpoints],
//   //   widthScreen < 1020
//   //     ? ["90svh", "45svh", `42svh`, "35svh", "72svh", "55svh"]
//   //     : ["75vh", "50%", "70%", "70%", "72vh", widthScreen > 1749 ? "80vh" : "72vh"]
//   // );

//   // const borderRadius = useTransform(scrollYProgress, sectionBreakpoints, [
//   //   widthScreen < 1020 ? "40px" : "24px",
//   //   "40px",
//   //   "40px",
//   //   "40px",
//   //   "100px",
//   // ]);

//   // const opacity = useTransform(
//   //   scrollYProgress,
//   //   widthScreen < 1020
//   //     ? [0.15, 0.271, 0.498, 0.622, 0.69, 0.9, 0.98]
//   //     : [0.15, 0.22, 0.397, 0.592, 0.65, 0.9, 1],
//   //   ["0", "1", "1", "1", "0", "0", "1"]
//   // );

//   const { width: widthScreen, height: heightScreen } = useWindowSize();
//   const sectionBreakpoints =
//     widthScreen < 1020 && widthScreen > 767
//       ? [0, 0.246, 0.492, 0.589, 0.785, 0.98]
//       : [0, 0.196, 0.392, 0.589, 0.785, 0.98];
//   const left = useTransform(scrollYProgress, sectionBreakpoints, [
//     "0%",
//     widthScreen < 1020 ? "5%" : "4%",
//     widthScreen < 1020 ? "5%" : "7%",
//     "3%",
//     "3.5%",
//     "0%",
//   ]);

//   const top = useTransform(
//     scrollYProgress,
//     sectionBreakpoints,
//     widthScreen < 1020
//       ? // ? ["144svh", "197.8svh", "296svh", "300vh", "300vh", "405svh"]
//         ["42.5vh", heightScreen < 830 ? (heightScreen < 750 ? "50vh" : "45vh") : "40vh", "10vh", "10vh", "20vh", "0vh"]
//       : // : ["140vh", "195vh", "272vh", "272vh", "370vh", "449vh"]
//         ["0vh", `45vh`, "14.2vh", "15vh", "20vh", "0vh"]
//   );
//   const width = useTransform(scrollYProgress, sectionBreakpoints, [
//     "100vw",
//     widthScreen < 1020 ? "89vw" : "48vw",
//     widthScreen < 1020 ? "89vw" : "86vw",
//     widthScreen < 1020 ? "85.5%" : "28vw",
//     "93.1vw",
//     "100vw",
//   ]);
//   const height = useTransform(
//     scrollYProgress,
//     sectionBreakpoints,
//     widthScreen < 1020
//       ? ["90svh",  heightScreen < 830 ? "47svh" : "55svh", widthScreen < 768 ? "85svh" : `35svh`, "35svh", "72svh", "100svh"]
//       : ["100vh", "50vh", "70vh", "77vh", "72vh", "100vh"]
//   );

//   const borderRadius = useTransform(scrollYProgress, sectionBreakpoints, [
//     "40px",
//     widthScreen < 1020 ? "40px" : "24px",
//     "40px",
//     "40px",
//     "40px",
//     "0px",
//   ]);

//   const opacity = useTransform(
//     scrollYProgress,
//     widthScreen < 1020 && widthScreen > 767
//       ? [0.2, 0.246, 0.5, 0.53, 0.92, 0.98]
//       : [0.15, 0.196, 0.589, 0.64, 0.92, 0.98],
//     ["0", "1", "0", "0", "0", "1"]
//   );

//   return (
//     <MotionConfig transition={{ type: "spring", mass: 5 }}>
//       <motion.div
//         style={{ left, top, height, width, borderRadius, opacity }}
//         className="fixed top-0 left-0 overflow-hidden"
//       >
//         <MotionCanvas
//           shadows
//           key={2}
//           flat
//           dpr={[1, 2]}
//           style={{ width: "100%", height: "100%" }}
//           className="[&>canvas]:!h-full [&>canvas]:!object-cover"
//         >
//           <Faro scrollYProgress={scrollYProgress} />
//         </MotionCanvas>
//       </motion.div>
//     </MotionConfig>
//   );
// };

// export default ExperienceFaro;

"use client";
import { MotionCanvas } from "framer-motion-3d";
import Faro from "./Faro";
import { MotionConfig, motion, useTransform } from "framer-motion";
import * as THREE from 'three'
import tunnel from "tunnel-rat";
import { useMemo } from "react";
import { extend } from "@react-three/fiber";
export const faroExperienceTunnel = tunnel();
const ExperienceFaro = ({ scrollYProgress }) => {
  useMemo(() => extend(THREE), []);
  return (
    <faroExperienceTunnel.In>
      <MotionConfig transition={{ type: "spring", mass: 5 }}>
          <MotionCanvas
            shadows
            key={2}
            flat
            dpr={[1, 2]}
            style={{ width: "100%", height: "100%" }}
            className="[&>canvas]:!h-full [&>canvas]:!object-cover bg-field white"
          >
            <Faro scrollYProgress={scrollYProgress} />
          </MotionCanvas>
      </MotionConfig>
    </faroExperienceTunnel.In>
  );
};

export default ExperienceFaro;
