"use client";

import { useEffect, useState } from "react";

function useWindowSize() {

  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width:  0,
    height: 0,
  });

  const [isClient, setIsClient] = useState(false)
 

  useEffect(() => {
    if(!isClient){
      setIsClient(true)
      return
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
