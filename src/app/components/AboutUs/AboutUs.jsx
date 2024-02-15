import OurTeamModal from "./OurTeamModal";
import { faroExperienceTunnel } from "../../animations/Faro/ExperienceFaro";
import { motion, useTransform } from "framer-motion";
import useWindowSize from "../../utils/useWindowSize";
const AboutUs = ({ scrollYProgress }) => {
  const pathLength = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4, 0.8, 1],
    [0, 0.015, 0.15, 0.3, 1]
  );

  return (
    <section
      className="w-full mx-auto snap-always snap-start flex flex-col h-full
      justify-center md:justify-start lg:justify-evenly
      items-start relative text-white gap-3 xs:gap-4 sm::gap-6"
    >
      <div
        className="bg-rojo 
        w-full h-full absolute mx-auto top-0  -z-10"
      ></div>
      <motion.svg
        height="2763"
        viewBox="0 0 1810 2763"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="top-0 right-0 w-screen absolute -z-[5]"
      >
        <motion.path
          d="M1797.26 133.936L15.2139 931L1797.26 1775.5L15.2139 2406.5L1780.5 2758.5L15.2139 2118.5L1798.13 1981.5M1798.06 133.279L15.2139 594.231L1798.06 1031.5L15.2897 1881M1798.13 133.318L15.2897 291.77M1798.11 133.65L15.2702 4.00684M1798.13 1214L15.2139 1401.5L1797.26 2338L15.2139 2740"
          stroke="white"
          style={{ pathLength, strokeWidth: "2px" }}
        />
      </motion.svg>

      <h3 className="title-size mx-5 xs:mx-6 sm:mx-8 md:ml-12 md:max-lg:mt-[20%] max-md:landscape:mt-0">
        Bienvenido a Dutsiland
      </h3>
      <div className="lg:w-1/3 lg:self-end mx-5 xs:mx-6 sm:mx-8 md:mx-12 lg:mx-0 lg:mr-32 2xl:mr-40">
        <h6 className="text-xs xs:text-sm md:text-xl 3xl:text-3xl mb-6">
          Somos un estudio que hace realidad tus ideas, construyendo
          experiencias web sobresalientes y empujando los límites de nuestra
          creatividad para resolver problemas de negocio.
        </h6>
        <OurTeamModal />
      </div>
      <div
        className="max-lg:mx-auto mt-4 md:mt-10 w-[90%] md:w-[88%] h-[40svh] md:h-1/2 lg:absolute lg:left-[5%] lg:bottom-11 
      lg:w-[47%] lg:h-1/2 rounded-3xl overflow-hidden"
      >
        <faroExperienceTunnel.Out />
      </div>
    </section>
  );
};

export default AboutUs;
