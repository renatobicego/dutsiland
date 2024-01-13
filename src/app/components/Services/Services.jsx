import { Accordion, AccordionItem } from "@nextui-org/react";
import { motion, useMotionValueEvent } from "framer-motion";
import { useTransform } from "framer-motion";
import { useState } from "react";
import WorkCard from "./WorkCard";
import WorksModal from "./WorksModal";

// List of services
const servicesList = [
  {
    ariaLabel: "Disenio Web",
    title: "Diseño Web",
    text: `Nuestro diseño de interfaz utiliza elementos narrativos para crear una experiencia envolvente y atractiva. 
    También es funcional y accesible, para que todos puedan usarlo. Y, por supuesto, es útil para que su negocio logre sus objetivos.`,
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
    title: "Backend / Frontend",
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

//List of works
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

const Services = ({ scrollClampSecondAnimation }) => {
  // Change opacity animation
  const opacityServices = useTransform(
    scrollClampSecondAnimation,
    [0.67, 0.7, 0.8, 0.83],
    [0, 1, 1, 0]
  );
  // To avoid scrolling body when scrolling inside div
  const [overscroll, setOverscroll] = useState(false);
  // To avoid errors with other sections that have absolute position
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollClampSecondAnimation, "change", (latest) => {
    if (latest < 0.83 && latest > 0.7) {
      setOverscroll(true);
    } else {
      setOverscroll(false);
    }
    if (latest < 0.83 && latest > 0.67) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      style={{ opacity: opacityServices }}
      className="w-[85%] md:w-[80%] absolute z-40 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
      h-[90%] flex items-center flex-wrap-reverse lg:flex-nowrap content-center"
    >
      {visible && (
        <>
          <div
            className={`w-full lg:w-1/2 bg-[#202020]/30 h-auto md:max-h-[40%] lg:h-full lg:max-h-full md:rounded-b-lg lg:rounded-l-lg 
            hidden md:grid grid-cols-1 overflow-y-auto gap-4 px-4 py-6 md:p-10
         ${overscroll && "overscroll-contain"}`}
          >
            {works.map((work, i) => (
              <WorkCard key={i} data={work} />
            ))}
          </div>
          <div
            className={`${overscroll && "overscroll-contain"} bg-[#CE9F5D]/80
            services-container p-6 max-h-[90%] md:p-10 md:max-h-[60%] lg:max-h-full rounded-lg md:rounded-b-none relative
            text-white h-auto lg:h-full flex items-start flex-col w-full lg:w-1/2 md:rounded-t-lg lg:rounded-r-lg overflow-y-auto`}
          >
            <h4 className={`title-second-animation mb-4`}>¿Qué hacemos?</h4>
            <p className={`subtitle-second-animation w-full`}>
              Construimos experiencias web sobresalientes y resolvemos problemas
              de negocio a través de código.
            </p>
            <Accordion
              className={`dark w-full !px-0`}
              itemClasses={{
                indicator: "text-white",
                title: "text-base md:text-lg 2xl:text-xl",
              }}
            >
              {servicesList.map((service, i) => (
                <AccordionItem
                  key={i}
                  aria-label={service.ariaLabel}
                  className={`subtitle-second-animation font-semibold`}
                  title={service.title}
                >
                  {service.text}
                  <ul className="list-disc list-inside">
                    {service.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
            <WorksModal works={works} />
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Services;
