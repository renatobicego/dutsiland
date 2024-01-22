"use client";

import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

function useMousePosition() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const windowSize = useWindowSize();

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({
        x: event.clientX / windowSize.width - 0.5,
        y: event.clientY / windowSize.height - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [windowSize]); // Empty array ensures that effect is only run on mount
  return mousePos;
}

export default useMousePosition;
