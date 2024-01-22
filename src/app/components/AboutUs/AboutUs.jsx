
import OurTeamModal from './OurTeamModal'
const AboutUs = () => {
  return (
    <section
        className="w-[93%] mx-auto snap-always snap-start flex flex-col scroll-mt-[5vh] h-full justify-evenly 
      items-start relative text-white">
        <div
          className="bg-[#B34D4D] rounded-[70px] lg:!rounded-[100px] 
        w-full h-5/6 absolute max-auto bottom-10  -z-10"
        ></div>
        <h3 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl ml-12">
          Bienvenido a Dutsiland
        </h3>
        <div className="w-1/3 self-end mr-40">
          <h6 className="md:text-xl 3xl:text-3xl mb-6">
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
