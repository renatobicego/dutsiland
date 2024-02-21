"use client";
import ExperienceFaro from "./animations/Faro/ExperienceFaro";
import FirstAnimation from "./animations/FirstAnimation";
import Header from "./components/Header/Header";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Services from "./components/Services/Services";
import SelectedWorks from "./components/Services/SelectedWorks";
import AboutUs from "./components/AboutUs/AboutUs";
import Contact from "./components/Contact";
import useRefs from "react-use-refs";
import DoItTogether from "./components/Services/DoItTogether";

export default function Home() {
  const [ref, ref1, ref2, ref3, ref4] = useRefs();

  // Set up scroll animations
  const { scrollYProgress: scrollToClamp } = useScroll({
    container: ref,
  });

  const scrollYProgress = useSpring(scrollToClamp, {
    stiffness: 500,
    damping: 100,
  });

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log(latest)
  // })
  return (
    <>
      <Header scrollYProgress={scrollYProgress} />
      <main
        ref={ref}
        className="w-full relative h-[100svh] overflow-x-hidden overflow-y-scroll snap-y  scroll-smooth touch-auto"
      >
        <FirstAnimation />
        <ExperienceFaro
          eventSource={ref}
          ref1={ref1}
          ref2={ref2}
          ref3={ref3}
          ref4={ref4}
          scrollYProgress={scrollYProgress}
        />
        <AboutUs scrollYProgress={scrollYProgress} ref={ref1} />
        <DoItTogether ref={ref2} />
        <Services ref={ref3} />
        <SelectedWorks />
        <Contact ref={ref4} />
      </main>
    </>
  );
}
