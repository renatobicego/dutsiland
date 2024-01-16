"use client";

import { useEffect, useState } from "react";

function useWindowSize() {
  const isClient = typeof window === "object";

  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  useEffect(() => {
    if (!isClient) {
      return; // If running on the server, do nothing
    }

    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]); // Include isClient in the dependency array

  return windowSize;
}

export default useWindowSize;
