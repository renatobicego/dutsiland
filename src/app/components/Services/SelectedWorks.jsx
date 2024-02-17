import WorkCard from "./WorkCard";

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
const SelectedWorks = () => {
  return (
    <section
      id="trabajos"
      className="w-full mx-auto snap-always snap-start flex flex-col h-full
      justify-center gap-6 items-start relative text-white"
    >
      <div
        className="bg-negro
              w-full h-full absolute top-0 -z-10"
      ></div>
      <div className="mx-[8%] flex flex-col gap-4 ">
        <h4 className="subtitle-size font-semibold ">Proyectos Destacados</h4>
        <p className="max-sm:text-sm md:text-xl 3xl:text-3xl">
          Una selección de nuestros trabajos más apasionantes
        </p>
      </div>
      <div
        className="flex gap-4 w-5/6 mx-auto flex-shrink-0 overflow-y-auto overflow-x-hidden lg:overflow-x-auto 
      lg:overflow-y-hidden px-2 py-4 max-lg:flex-col max-h-[55%] md:max-h-[65%] lg:max-h-none"
      >
        {works.map((work, i) => (
          <WorkCard key={i} data={work} />
        ))}
      </div>
    </section>
  );
};

export default SelectedWorks;
