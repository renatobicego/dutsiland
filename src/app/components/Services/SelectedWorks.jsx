import { isMobile } from "react-device-detect";
import WorkCard from "./WorkCard";
import useClient from "../../utils/useClient";

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
  {
    coverImage: "/cucha1.webp",
    coverLogo: "/logo.png",
    bg: "bg-[#252B42]",
    title: "Cucha Repuestos",
    fields: ["Diseño UI Responsive", "Desarrollo de Web App"],
    text: `Cucha Repuestos, una destacada empresa en la venta de repuestos para camiones Iveco, optó por modernizar su operación mediante la digitalización. Nos enorgullece haber sido elegidos como su aliado en esta emocionante transformación. El resultado es un sitio web de última generación que refleja el compromiso y la excelencia de Cucha Repuestos con sus clientes. Con esta plataforma digital, la empresa está preparada para explorar nuevos horizontes y atender las necesidades de sus clientes de forma más eficiente que nunca.`,
    link: "https://cucharepuestos.com/",
    images: ["/1.png", "/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg", "/6.png"],
    imagesRoot: "/works/cucha",
  },
  {
    coverImage: "/coverImage.png",
    coverLogo: "/logo.png",
    bg: "bg-[#F2EAE7]",
    title: "Medialuna Medias",
    fields: ["Diseño UI Responsive", "Desarrollo de Web App"],
    text: `Medialuna Medias, un emprendimiento de venta de medias de distintos estilos, nos eligió para desarrollar su catálogo online con el objetivo de modernizar y organizar su negocio. El resultado final fue una plataforma enfocada en el diseño colorido e ilustrado, y una funcionalidad de búsqueda y categorización óptima para la catalogación de productos`,
    link: "https://medialunamedias.vercel.app/",
    images: ["/mockup.png", "/figma.png", "/1.png", "/2.png"],
    imagesRoot: "/works/medialuna",
  },
  {
    coverImage: "/mobile.png",
    coverLogo: "/logo.png",
    bg: "bg-[#F9C48E]",
    title: "Mahatu Consultorios",
    fields: ["Desarrollo de Web App"],
    text: `Junto con Mahatu Consultorios, desarrollamos un sistema que le permitió evolucionar y agilizar sus procesos, incrementando el valor de la organización, la calidad de atención de sus profesionales y su comodidad.
      El sistema es capaz de
      👨‍💻 Gestión de turnos online.
      📊 Análisis y control de facturación e información de obras sociales.
      📆 Gestionar el calendario de cada profesional.
      🗒️ Gestión de pacientes mediante su ficha informativa.
      ✔ Registro de anotaciones por turno.`,
    images: ["/desktop.png", "/mobile.png", "/tablet.png", "/desktop2.png"],
    imagesRoot: "/works/mahatu",
  },
];
const SelectedWorks = () => {
  const isClient = useClient();
  if (isClient) {
    return (
      <section
        id="trabajos"
        className={`w-full mx-auto snap-always snap-start flex flex-col min-h-full
        justify-center gap-6 items-start relative text-white py-[15vh] lg:py-[20vh] ${
          isMobile && "bg-negro/50"
        }`}
      >
        <div
          className="bg-negro
                w-full h-full absolute top-0 -z-10"
        ></div>
        <div className="mx-[8%] flex flex-col gap-4 ">
          <h4 className="subtitle-size font-semibold max-lg:drop-shadow-lg">
            Proyectos Destacados
          </h4>
          <p className="max-sm:text-sm md:text-xl 3xl:text-3xl max-lg:drop-shadow-lg">
            Una selección de nuestros trabajos más apasionantes
          </p>
        </div>
        <div className="gap-4 w-5/6 md:gap-6 2xl:gap-8 mx-auto grid grid-cols-1 md:px-2 py-4 lg:grid-cols-2">
          {works.map((work, i) => (
            <WorkCard key={i} data={work} />
          ))}
          <div
            className={`w-full h-[22vh] md:h-[20vh] lg:h-[40vh] 2xl:h-[46vh] rounded-3xl hover:scale-[1.03]  transition-all duration-500 
        relative border-dashed border-2 border-spacing-4 flex items-center justify-center flex-col gap-6`}
          >
            <h6 className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl">
              Tu Próximo Proyecto
            </h6>
            <button className="button button-animation-red bg-white text-negro">
              <a href="/#contacto">Házlo Realidad</a>
            </button>
          </div>
        </div>
      </section>
    );
  }
};

export default SelectedWorks;
