import { forwardRef } from "react";

// import { faroExperienceTunnel } from "../../animations/Faro/ExperienceFaro";
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
const Services = forwardRef(({ ...props }, ref) => {
  return (
    <section
      className=" relative z-10 max-md:snap-start max-md:snap-always lg:snap-always lg:snap-start
       max-lg:px-[9vw] lg:mx-[5vw]
      h-full md:h-1/2 lg:h-full w-full lg:w-[55%]  flex 
      flex-col justify-center md:justify-start lg:justify-center lg:float-right text-white gap-6"
    >
      <h4 className="subtitle-size md:max-lg:mt-6">Nuestros Servicios</h4>
      <p className="max-sm:text-sm xl:text-lg 3xl:text-xl">
        La estrategia digital es un elemento clave de su transformación. Es este
        apoyo que te ofrecemos durante todo el proyecto para desarrollar su idea
        inicial en una ambiciosa solución digital.
      </p>
      <div className="flex w-full flex-wrap gap-4 md:gap-10">
        {servicesList.map((service, i) => (
          <div
            key={i}
            className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 bg-white/80 md:bg-white text-negro rounded-3xl button-animation"
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
      <div
        ref={ref}
        className="absolute md:max-lg:hidden  
        w-full h-full top-0 left-0 lg:-left-2/3 lg:top-28
        lg:w-3/5 lg:h-3/4 -z-10 lg:rounded-[40px]"
      >
        <div
          className="max-lg:hidden w-full h-full rounded-[40px] md:rounded-[50px] lg:rounded-[60px] 
        z-50 absolute -left-0.5 top-0 ring-[25px]  ring-dorado"
        ></div>
      </div>
    </section>
  );
});

export default Services;
