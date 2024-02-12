import { useEffect, useState } from "react";

const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState(null);
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {

        if (isClient) {
            let lastScrollY = document.querySelector('main').scrollTop;
            const updateScrollDirection = () => {
                const scrollY = document.querySelector('main').scrollTop;
                const direction = scrollY > lastScrollY ? "down" : "up";
                if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                setScrollDirection(direction);
                }
                lastScrollY = scrollY > 0 ? scrollY : 0;
            };
            document.querySelector('main').addEventListener("scroll", updateScrollDirection); // add event listener
            return () => {
                document.querySelector('main').removeEventListener("scroll", updateScrollDirection); // clean up
            }   
        }else{
            setIsClient(true)
        }
    }, [scrollDirection, isClient]);
  
    return scrollDirection;
  };

export default useScrollDirection