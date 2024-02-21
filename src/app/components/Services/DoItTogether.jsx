import { forwardRef } from "react";
import { BrowserView, isBrowser, isMobile, isTablet } from "react-device-detect";

const DoItTogether = forwardRef(({ ...props }, ref) => {
  return (
    <section
      id="servicios"
      className={`w-full mx-auto snap-always snap-start flex flex-col h-full md:h-1/2 ${isMobile && 'bg-dorado/70'}
        lg:h-full justify-center gap-10 items-center lg:items-start relative text-white md:max-lg:pt-12`}
    >
      <div
        className="bg-dorado
        w-full h-[200%] absolute mx-auto top-0 -z-10"
      ></div>
      <h3 className="title-size md:max-lg:text-7xl lg:ml-[10%] max-lg:text-center max-sm:mx-auto drop-shadow-lg">
        Hagámoslo Juntos
      </h3>
      <h6 className="max-sm:text-sm max-lg:text-center md:text-xl 3xl:text-3xl mx-[5%] lg:w-2/5 md:mx-[10%] lg:mb-6 2xl:mb-4 drop-shadow-lg">
        Estamos aquí para hacer realidad tus sueños. Ayudamos a convertir su
        idea inicial en una solución digital de vanguardia, donde el único
        límite es nuestra imaginación conjunta.
      </h6>
      {(isBrowser && !isTablet) && (
        <div
          ref={ref}
          className="absolute left-[3.5%] md:top-[20%] lg:top-28 w-[93%] h-3/4  "
        >
          <div
            className=" max-lg:hidden w-full h-full rounded-[40px] md:rounded-[50px] lg:rounded-[60px] 
        z-20 absolute -left-0.5 top-0 ring-[25px]  ring-dorado"
          ></div>
        </div>
      )}
    </section>
  );
});

export default DoItTogether;
