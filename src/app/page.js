"use client";
import ExperienceFaro from "./animations/Faro/ExperienceFaro";
import Header from "./components/Header/Header";
import { useScroll, useSpring } from "framer-motion";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import WorksSection from "./components/WorksSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer/Footer";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);

  const { scrollYProgress: scrollToClamp } = useScroll({
    container: ref,
  });

  const scrollYProgress = useSpring(scrollToClamp, {
    stiffness: 500,
    damping: 100,
  });

  return (
    <>
      <Header scrollYProgress={scrollYProgress} />
      {/* Canvas fijo full-viewport — siempre montado, las secciones lo tapan/revelan */}
      <ExperienceFaro scrollYProgress={scrollYProgress} eventSource={ref} />
      <main
        ref={ref}
        className="w-full relative z-10 h-[100svh] overflow-x-hidden overflow-y-scroll scroll-smooth touch-auto"
      >
        <HeroSection />
        <AboutSection scrollYProgress={scrollYProgress} />
        <ServicesSection />
        <WorksSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
