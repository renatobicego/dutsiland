
import WorkCard from "./WorkCard";

const servicesList = [
  {
    ariaLabel: "Disenio Web",
    title: "Diseño Web",
    text: `Una experiencia de usuario eficiente e inmersiva es la forma de captar la atención y transmitir un mensaje claro. Por eso creemos, ante todo, que la usabilidad está al servicio del diseño. Y que todo diseño debe ser elegante e innovador.`,
    list: [
      "Diseño de interfaz de usuario",
      "Prototipado de aplicación web",
      "Diseño responsive",
      "Arquitectura de la información",
      "Diseño de identidad visual",
    ],
  },
  {
    ariaLabel: "Backend/Frontend",
    title: "Desarrollo Web",
    text: `Nuestro enfoque holístico para el desarrollo de aplicaciones web integra la
    experiencia visual junto con la funcionalidad lógica y nna arquitectura escalable y mantenible,
     maximizando el valor de su producto.`,
    list: [
      "Desarrollo de APIs",
      "Desarrollo de interfaces de usuario",
      "Organización e implementación de bases de datos",
      "Desarrollo de Ecommerce",
    ],
  },
  {
    ariaLabel: "Web Interactiva",
    title: "Web Interactiva / 3D",
    text: `Fusionamos innovación y creatividad para construir landing pages
    sobresalientes, combinando animaciones y modelos 3D para lograr una
    experiencia única, ¡como nuestra propia web!`,
    list: [],
  },
  {
    ariaLabel: "Soporte Tecnico",
    title: "Soporte Técnico",
    text: `Ofrecemos soluciones sólidas y eficientes para mantener sus
    operaciones en perfecto funcionamiento, permitiéndote centrarte en
    lo que haces mejor.`,
    list: [
      "Mantenimiento y actualización de aplicaciones web",
      "Diagnóstico y arreglo de errores",
    ],
  },
];

const works = [
  {
    coverImage: "/mimpronts.png",
    coverLogo: "/mimprontaLofo.png",
    bg: "bg-[#004282]",
    title: "Mimpronta",
    fields: ["Diseño UI Responsive", "Desarrollo de Web App"],
    text: `Mimpronta, una agencia de impacto ambiental, se acercó a nosotros con la tarea de diseñar y desarrollar su landing page con el objetivo de promover sus servicios. Con un enfoque en la plasmación de su identidad visual, trabajamos arduamente de la mano
    de los diseñadores para lograr un resultado que no solo fuera funcional, sino también estéticamente sobresaliente.`,
    link: "https://mimpronta.com/",
    images: ["/2.png", "/1.png", "/3.png", "/5.png", "/4.png"],
    imagesRoot: "/works/mimpronta",
  },
  {
    coverImage: "/bsas.avif",
    coverLogo: "/logo.png",
    bg: "bg-[#263238]",
    title: "Wonder Ventures",
    fields: ["Diseño UI", "Desarrollo de Web App"],
    text: `Wonder Ventures es nuestro proyecto integrador final de la carrera Certified Tech Developer de Digital House. 
    Es una plataforma de reservas de experiencias turísticas, donde nos centramos en proporcionar una interfaz intuitiva y fácil de usar, además
    de la implementación de un sistema robusto de gestión de contenido que permita la fácil actualización de información sobre destinos, actividades y disponibilidad.`,
    link: "http://wonderventures3.s3-website-us-east-1.amazonaws.com/",
    images: ["/2.png", "/1.png", "/3.png", "/4.png"],
    imagesRoot: "/works/wonder",
  },
  {
    coverImage: "/ama.jpg",
    coverLogo: "/logo.png",
    bg: "bg-[#6C2F2F]",
    title: "Asociación Mendocina de Atletismo",
    fields: [
      "Diseño UI Responsive",
      "Desarrollo de Web App",
      "Investigación de experiencia de usuario",
    ],
    text: `La Asociación Mendocina de Atletismo confió en nosotros para diseñar y desarrollar su aplicación web con el propósito de establecer un nuevo espacio en la web para la publicación de noticias y la gestión de su sistema de inscripciones y federaciones. Iniciamos el proyecto basándonos en los valiosos insights y puntos de dolor recopilados durante la etapa de investigación.
    El objetivo fue crear una plataforma que destacara por su facilidad de uso y simplicidad, considerando que gran parte de los usuarios pertenecen al grupo demográfico de personas mayores. Con este enfoque, nos propusimos eliminar obstáculos innecesarios en la navegación y proporcionar una experiencia intuitiva para que los usuarios pudieran acceder rápidamente a la información que necesitan.`,
    link: "https://amamendoza.vercel.app/",
    images: ["/2.png", "/1.png", "/3.png", "/4.png"],
    imagesRoot: "/works/ama",
  },
];
const Services = () => {
  return (
    <>
      <section
        className="w-[93%] mx-auto scroll-mt-[15vh] snap-always snap-start flex flex-col h-full justify-center gap-10 
      items-start relative text-white"
      >
        <div
          className="bg-dorado rounded-[70px] lg:!rounded-[100px] 
        w-full h-[190%] absolute mx-auto top-0 -z-10"
        ></div>
        <h3 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl ml-[10%]">
          Hagámoslo Juntos
        </h3>
        <h6 className="md:text-xl 3xl:text-3xl w-2/5 ml-[10%]">
          Estamos aquí para hacer realidad tus sueños. Ayudamos a convertir su
          idea inicial en una solución digital de vanguardia, donde el único
          límite es nuestra imaginación conjunta.
        </h6>
      </section>
      <section className="ml-10 scroll-mt-[15vh] snap-always snap-start h-4/5 w-3/5 mx-[5vw] flex flex-col justify-center float-right text-white gap-6">
        <h4 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-semibold">
          Nuestros Servicios
        </h4>
        <div className="flex w-full flex-wrap">
          {servicesList.map((service, i) => (
            <div key={i} className="w-1/2 pr-6 pb-6">
              <h6 className="font-semibold md:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl">
                {service.title}
              </h6>
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
