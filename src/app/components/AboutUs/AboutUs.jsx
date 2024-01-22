
import OurTeamModal from './OurTeamModal'
const AboutUs = () => {
  return (
    <section
        className="w-[93%] mx-auto snap-always snap-start flex flex-col scroll-mt-10 lg:scroll-mt-[5vh] h-[100svh] 
        md:h-full justify-start lg:justify-evenly 
      items-start relative text-white max-lg:gap-6">
        <div
          className="bg-[#B34D4D] rounded-[55px] md:rounded-[70px] lg:!rounded-[100px] 
        w-full h-[90%] lg:h-5/6 absolute mx-auto top-6 md:top-16 lg:top-0 lg:bottom-10  -z-10"
        ></div>
        <h3 className="title-size ml-8 md:ml-12 max-lg:mt-[20%]">
          Bienvenido a Dutsiland
        </h3>
        <div className="lg:w-1/3 lg:self-end mx-8 md:mx-12 lg:mx-0 lg:mr-32 2xl:mr-40">
          <h6 className="max-sm:text-sm md:text-xl 3xl:text-3xl mb-6">
            Somos un estudio que hace realidad tus ideas, construyendo
            experiencias web sobresalientes y empujando los límites de nuestra
            creatividad para resolver problemas de negocio.
          </h6>
          <OurTeamModal />
        </div>
      </section>
  );
};

export default AboutUs;
