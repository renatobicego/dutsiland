import OurTeamModal from "./OurTeamModal";
import { faroExperienceTunnel } from "../../animations/Faro/ExperienceFaro";
import { motion, useTransform } from "framer-motion";
import useWindowSize from "../../utils/useWindowSize";
const AboutUs = ({ scrollYProgress }) => {
  const { width: widthScreen } = useWindowSize();
  const pathLength = useTransform(
    scrollYProgress,
    widthScreen < 1020 && widthScreen > 768 ? [0, 0.07, 0.2, 0.25, 0.27] : [0, 0.05, 0.13, 0.16, 0.196],
    [0, 0, 0.1, 0.5, 1] 
  );

  return ( 
    <section
      className="w-full mx-auto snap-always snap-start flex flex-col h-full
      justify-center md:justify-start lg:justify-evenly overflow-hidden
      items-start relative text-white gap-3 xs:gap-4 sm::gap-6"
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
