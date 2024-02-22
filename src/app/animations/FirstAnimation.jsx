
import ExperienceTormenta from "./Tormenta/ExperienceTormenta";
const FirstAnimation = () => {
  return (
    <section
      className="relative flex flex-col justify-end items-center gap-10 md:gap-20 
      h-full w-full snap-always snap-start text-white z-10"
    >
      <div className="self-start z-10 ml-5 sm:ml-10 md:ml-20 lg:ml-28 mb-10">
        <h3 className="relative first-animation-text w-[80%] md:w-[60%]">
          En el mar, la tempestad es un desafío para los{" "}
          <span className="font-medium">navegantes</span>
        </h3>
        <h3 className="relative first-animation-text w-[80%] md:w-[60%]">
          En la tierra, los <span className="font-medium">faros</span> buscan
          una barca a la cual iluminar
        </h3>
      </div>
      <ExperienceTormenta /> 
      <div
        className="animate-bounce font-normal mb-6
        flex items-center gap-2 text-xs md:text-sm 2xl:text-base"
      >
        Deslizar para explorar
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default FirstAnimation;
