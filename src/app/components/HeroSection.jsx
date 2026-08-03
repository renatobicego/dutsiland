"use client";
import { motion } from "framer-motion";
import ExperienceTormenta from "../animations/Tormenta/ExperienceTormenta";

const HeroSection = () => {
  return (
    <section
      className="relative flex flex-col justify-end items-start bg-negro w-full h-full overflow-hidden text-white snap-always snap-start"
      aria-label="Sección principal"
    >
      {/* 3D Background */}
      <ExperienceTormenta />

      {/* Content */}
      <div className="z-10 relative pb-20 sm:pb-24 md:pb-32 lg:pb-40 w-full section-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="mb-4 sm:mb-6 leading-[0.9] heading-xl">
            Experiencias
            <br />
            Digitales
          </h1>
          <p className="mb-6 sm:mb-8 max-w-xl text-white/60 body-lg">
            Diseñamos y desarrollamos soluciones web que transforman ideas en
            experiencias inmersivas e innovadoras.
          </p>
          <div className="flex xs:flex-row flex-col flex-wrap gap-3 sm:gap-4">
            <a href="#trabajos" className="btn-primary">
              Ver Proyectos
            </a>
            <a href="#contacto" className="btn-secondary">
              Iniciar Proyecto
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="bottom-6 sm:bottom-8 left-1/2 z-10 absolute flex flex-col items-center gap-2 -translate-x-1/2"
      >
        <span className="text-[10px] text-white/40 sm:text-xs uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="bg-gradient-to-b from-white/40 to-transparent w-[1px] h-6 sm:h-8"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
