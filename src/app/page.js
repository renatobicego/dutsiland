"use client";
import ExperienceFaro from "./animations/Faro/ExperienceFaro";
import FirstAnimation from "./animations/FirstAnimation";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useRef } from "react";
import {
  useScroll, useSpring,
} from "framer-motion";
import Services from "./components/Services/Services";
import SelectedWorks from "./components/Services/SelectedWorks";
import AboutUs from "./components/AboutUs/AboutUs";
import Contact from "./components/Contact";

export default function Home() {
  const containerRef = useRef(null);

  // Set up scroll animations
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // const scrollYProgress = useSpring(scrollToClamp, {
  //   stiffness: 500,
  //   damping: 25,
  // });

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log(latest)
  // })

  return (
    <>
      <Header scrollYProgress={scrollYProgress}/>
      <main
        ref={containerRef}
        className="w-full relative h-[100svh] overflow-x-hidden overflow-y-scroll snap-y  scroll-smooth"
      >
        <FirstAnimation />
        <ExperienceFaro scrollYProgress={scrollYProgress} />
        <AboutUs scrollYProgress={scrollYProgress} />
        <Services />
        <SelectedWorks />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
