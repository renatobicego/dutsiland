import React from "react";
import { motion, useTransform } from "framer-motion";
import OurTeam from './OurTeam'
import OurTeamModal from './OurTeamModal'
const AboutUs = ({ scrollClampSecondAnimation }) => {
  const opacityAboutUs = useTransform(
    scrollClampSecondAnimation,
    [0.37, 0.4, 0.5, 0.52],
    [0, 1, 1, 0]
  );

  const zIndex = useTransform(
    scrollClampSecondAnimation,
    [0.37, 0.4, 0.5, 0.52],
    [0, 50, 50, 0]
  );
  return (
    <motion.div
      style={{ opacity: opacityAboutUs, zIndex }}
      className="w-[85%] h-auto md:w-3/4 lg:w-[55%] 2xl:w-[45%] absolute top-1/2 -translate-y-1/2 lg:left-[10%] z-50 p-6 md:p-10 
                    gap-6 bg-[#6087A9]/60
                   flex flex-col items-start left-1/2 -translate-x-1/2 lg:-translate-x-0 text-white rounded-lg
                   overflow-y-auto md:overflow-hidden"
    >
      <h4 className={`title-second-animation`}>
        ¿Quiénes somos?
      </h4>
      <p className={`subtitle-second-animation w-full`}>
        Dutsiland es un estudio de desarrollo que impulsa la evolución de
        negocios en la web, proporcionando las herramientas y soluciones
        esenciales para establecer una fuerte presencia en internet y alcanzar
        el máximo potencial de tu negocio.
      </p>
      <OurTeam hidden={true}/>
      <OurTeamModal />
    </motion.div>
  );
};

export default AboutUs;
