const servicesList = [
  {
    ariaLabel: "Disenio Web",
    title: "Diseño Web",
    text: `Una experiencia de usuario eficiente e inmersiva es la forma de captar la atención y transmitir un mensaje claro. Por eso creemos, ante todo, que la usabilidad está al servicio del diseño. Y que todo diseño debe ser elegante e innovador.`,
    list: [
      "Arquitectura de la Información",
      "Prototipado de Aplicación Web",
      "Diseño de Interfaz de Usuario",
      "Diseño de Identidad Visual",
      "Diseño Responsive",
    ],
  },
  {
    ariaLabel: "Backend/Frontend",
    title: "Desarrollo Web",
    text: `Nuestro enfoque holístico para el desarrollo de aplicaciones web integra la
    experiencia visual junto con la funcionalidad lógica y una arquitectura escalable y mantenible,
     maximizando el valor de su producto.`,
    list: [
      "Web Interactiva 3D - WebGL",
      "Desarrollo de Landing Page",
      "Desarrollo de Ecommerce",
      "Desarrollo de APIs",
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
        className="w-[93%] mx-auto scroll-mt-[7vh] md:scroll-mt-[15vh] snap-always snap-start flex flex-col h-2/3 md:h-1/2 lg:h-full justify-center gap-10 
      items-start relative text-white"
      >
        <div
          className="bg-dorado rounded-[55px] md:rounded-[70px] lg:!rounded-[100px] 
        w-full h-[230%] md:h-[250%] lg:h-[190%] absolute mx-auto top-0 -z-10"
        ></div>
        <h3 className="title-size md:max-lg:text-7xl md:ml-[10%] max-md:text-center max-sm:mx-auto">Hagámoslo Juntos</h3>
        <h6 className="max-sm:text-sm max-lg:text-center md:text-xl 3xl:text-3xl mx-[5%] lg:w-2/5 md:mx-[10%] lg:mb-[5vh] 2xl:mb-10">
          Estamos aquí para hacer realidad tus sueños. Ayudamos a convertir su
          idea inicial en una solución digital de vanguardia, donde el único
          límite es nuestra imaginación conjunta.
        </h6>
      </section>
      <section className="max-lg:px-[9vw] lg:ml-10 scroll-mt-[15vh] snap-always snap-start h-5/6 md:h-3/4 lg:h-4/5 w-full lg:w-3/5 lg:mx-[5vw] flex 
      flex-col justify-start lg:justify-center lg:float-right text-white gap-6">
        <h4 className="subtitle-size">Nuestros Servicios</h4>
        <p className="max-sm:text-sm xl:text-lg 3xl:text-xl">
          La estrategia digital es un elemento clave de su transformación. Es
          este apoyo que te ofrecemos durante todo el proyecto para desarrollar
          su idea inicial en una ambiciosa solución digital.
        </p>
        <div className="flex w-full flex-wrap gap-4 md:gap-10">
          {servicesList.map((service, i) => (
            <div
              key={i}
              className="w-full md:w-[45%] p-6 md:p-10 bg-white text-negro rounded-3xl button-animation"
            >
              <h6 className="font-semibold text-sm md:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl mb-2">
                {service.title}
              </h6>
              <ul className="text-xs md:text-sm xl:text-base">
                {service.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
