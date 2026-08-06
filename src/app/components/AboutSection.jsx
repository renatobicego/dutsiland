"use client";
import { motion, useTransform } from "framer-motion";
import useClient from "../utils/useClient";
import useWindowSize from "../utils/useWindowSize";
import OurTeamModal from "./AboutUs/OurTeamModal";

const AboutSection = ({ scrollYProgress }) => {
  const isClient = useClient();
  const { width: widthScreen } = useWindowSize();

  const pathLength = useTransform(
    scrollYProgress,
    widthScreen < 1020 && widthScreen > 768
      ? [0, 0.07, 0.2, 0.25, 0.27]
      : [0, 0.05, 0.13, 0.16, 0.196],
    [0, 0, 0.1, 0.5, 1],
  );

  if (!isClient) return null;

  return (
    <section
      id="nosotros"
      className="relative flex flex-col justify-center items-start w-full min-h-screen overflow-hidden text-white snap-always snap-start"
      aria-labelledby="about-heading"
    >
      {/* Animated lines SVG */}
      <motion.svg
        viewBox="0 0 1787 935"
        fill="none"
        className="top-0 right-0 absolute opacity-20 w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.path
          d="M1784.26 133.936L2.21387 931M1785.06 133.279L1784.79 133.348M1784.79 133.348L1783.95 133.565M1784.79 133.348L1785.13 133.318M1784.79 133.348L1783.07 133.501M1783.95 133.565L2.21387 594.231M1783.95 133.565L1785.11 133.65M1783.95 133.565L1783.07 133.501M1783.07 133.501L2.28975 291.77M1783.07 133.501L2.27024 4.00684"
          stroke="white"
          style={{ pathLength, strokeWidth: "2px" }}
        />
      </motion.svg>

      {/* Content — only on the left side */}
      <div className="z-10 relative flex flex-col gap-4 sm:gap-6 mx-auto py-16 sm:py-20 lg:py-0 w-full max-w-screen-2xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-rojo p-2 rounded-xl w-fit font-medium text-white text-xs sm:text-sm uppercase tracking-widest"
        >
          Quiénes somos
        </motion.span>
        <h2 id="about-heading" className="heading-lg">
          Tu faro en el
          <br />
          mundo digital
        </h2>
        <p className="mt-2 max-w-lg text-white/90 body-lg">
          Somos un estudio de desarrollo que hace realidad tus ideas,
          construyendo experiencias web sobresalientes y empujando los límites
          de nuestra creatividad para resolver problemas de negocio.
        </p>
        <p className="max-w-lg text-white/75 body-md">
          Combinamos diseño estratégico, desarrollo de vanguardia y una pasión
          por la innovación para crear productos digitales que destacan y
          generan resultados.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-4">
          <OurTeamModal />
          <a href="#servicios" className="btn-secondary">
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
