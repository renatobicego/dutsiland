import OurTeamModal from "./OurTeamModal";
import { motion, useTransform } from "framer-motion";
import useWindowSize from "../../utils/useWindowSize";
import { forwardRef, useEffect, useState } from "react";
import { isBrowser, isMobile, isTablet } from "react-device-detect";
import useClient from "../../utils/useClient";
const AboutUs = forwardRef(({ scrollYProgress }, ref) => {
  const isClient = useClient(); 
  const { width: widthScreen } = useWindowSize(); 
  const pathLength = useTransform(
    scrollYProgress, 
    widthScreen < 1020 && widthScreen > 768
      ? [0, 0.07, 0.2, 0.25, 0.27] 
      : [0, 0.05, 0.13, 0.16, 0.196],
    [0, 0, 0.1, 0.5, 1]
  );

  if (isClient) {
    return ( 
      <section
        id="quienesSomos"
        className={`w-full mx-auto snap-always snap-start flex flex-col h-full
      justify-center lg:justify-evenly overflow-hidden max-lg:pb-[40%] ${
        isMobile && "bg-rojo/50"
      }
      items-start relative text-white gap-2 xs:gap-3 sm::gap-6`}
      >
        <div
          className="bg-rojo 
        w-full h-full absolute mx-auto top-0  -z-10"
        ></div>
        <motion.svg
          viewBox="0 0 1787 935"
          fill="none"
          className="top-0 right-0 !w-[100vw] absolute -z-[5]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M1784.26 133.936L2.21387 931M1785.06 133.279L1784.79 133.348M1784.79 133.348L1783.95 133.565M1784.79 133.348L1785.13 133.318M1784.79 133.348L1783.07 133.501M1783.95 133.565L2.21387 594.231M1783.95 133.565L1785.11 133.65M1783.95 133.565L1783.07 133.501M1783.07 133.501L2.28975 291.77M1783.07 133.501L2.27024 4.00684"
            stroke="white"
            style={{ pathLength, strokeWidth: "2px", width: "100%" }}
          />
        </motion.svg>

        <h3 className="title-size mx-5 xs:mx-6 sm:mx-8 md:ml-12 max-md:landscape:mt-0 max-lg:drop-shadow-lg">
          Bienvenido a Dutsiland
        </h3>
        <div className="lg:w-1/3 lg:self-end mx-5 xs:mx-6 sm:mx-8 md:mx-12 lg:mx-0 lg:mr-32 2xl:mr-40">
          <h6 className="text-xs xs:text-sm md:text-xl 3xl:text-3xl mb-6 max-lg:drop-shadow-lg">
            Somos un estudio de desarrollo que hace realidad tus ideas, construyendo
            experiencias web sobresalientes y empujando los límites de nuestra
            creatividad para resolver problemas de negocio.
          </h6>
          <OurTeamModal />
        </div>
        {isBrowser && !isTablet && (
          <div
            className="max-lg:mx-auto mt-4 md:mt-10 w-[90%] md:w-[88%] h-[45svh] md:h-1/2 relative lg:absolute lg:left-[5%] lg:bottom-11 
      lg:w-[47%] lg:h-1/2 rounded-3xl"
            ref={ref}
          >
            <div className="max-lg:hidden w-full h-full rounded-3xl z-20 absolute -left-0.5 top-0 ring-[12px]  ring-rojo"></div>
          </div>
        )}
      </section>
    ); 
  }
});

export default AboutUs;
