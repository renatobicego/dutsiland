import { Accordion, AccordionItem } from "@nextui-org/react";
import { MotionValue, motion, useMotionValueEvent } from "framer-motion";
import { useTransform } from "framer-motion";
import { useState } from "react";
import WorkCard from "./WorkCard";
import WorksModal from "./WorksModal";

// List of services
const servicesList = [
  {
    ariaLabel: "Disenio Web",
    title: "Diseño Web",
    text: `Impulsamos conexiones más profundas entre su negocio y sus clientes
    a través de un diseño de interfaz que va más allá de lo estético,
    impulsando la narrativa, la funcionalidad, la accesibilidad y la
    usabilidad.`,
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
    text: `Adoptamos un enfoque holístico para desarrollar aplicaciones web,
    conectando la experiencia visual junto con la funcionalidad lógica
    para maximizar el valor de su producto.`,
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
    operaciones en perfecto funcionamiento, permitiéndole centrarse en
    lo que hace mejor.`,
    list: [
      "Mantenimiento y actualización de aplicaciones web",
      "Diagnóstico y arreglo de errores",
    ],
  },
];

//List of works
const works = [
  {
    coverImage: "/works/mimpronta/mimpronts.png",
    coverLogo: "/works/mimpronta/mimprontaLofo.png",
    title: "Mimpronta",
    fields: ["Diseño UI Responsive", "Desarrollo Web"],
    text: `Mimpronta, una agencia de impacto ambiental, se acercó a nosotros con la tarea de diseñar y desarrollar su landing page con el objetivo de promover sus servicios. Con un enfoque en la plasmación de su identidad visual, trabajamos arduamente de la mano
    de los diseñadores para lograr un resultado que no solo fuera funcional, sino también estéticamente sobresaliente.`,
    link: "https://mimpronta.com/",
    images: ["/2.png", "/1.png", "/3.png", "/5.png", "/4.png"],
    imagesRoot: "/works/mimpronta",
  },
  {
    coverImage: "/works/mimpronta/mimpronts.png",
    coverLogo: "/works/mimpronta/mimprontaLofo.png",
    title: "Mimpronta",
    fields: ["Diseño UI Responsive", "Desarrollo Web"],
    text: `Mimpronta, una agencia de impacto ambiental, se acercó a nosotros con la tarea de diseñar y desarrollar su landing page con el objetivo de promover sus servicios. Con un enfoque en la plasmación de su identidad visual, trabajamos arduamente de la mano
    de los diseñadores para lograr un resultado que no solo fuera funcional, sino también estéticamente sobresaliente.`,
    link: "https://mimpronta.com/",
    images: ["/2.png", "/1.png", "/3.png", "/5.png", "/4.png"],
    imagesRoot: "/works/mimpronta",
  },
  {
    coverImage: "/works/mimpronta/mimpronts.png",
    coverLogo: "/works/mimpronta/mimprontaLofo.png",
    title: "Mimpronta",
    fields: ["Diseño UI Responsive", "Desarrollo Web"],
    text: `Mimpronta, una agencia de impacto ambiental, se acercó a nosotros con la tarea de diseñar y desarrollar su landing page con el objetivo de promover sus servicios. Con un enfoque en la plasmación de su identidad visual, trabajamos arduamente de la mano
    de los diseñadores para lograr un resultado que no solo fuera funcional, sino también estéticamente sobresaliente.`,
    link: "https://mimpronta.com/",
    images: ["/2.png", "/1.png", "/3.png", "/5.png", "/4.png"],
    imagesRoot: "/works/mimpronta",
  },
];

const Services = ({ scrollClampSecondAnimation }) => {
  const [openWorksMobile, setOpenWorksMobile] = useState(false);
  // Change opacity animation
  const opacityServices = useTransform(
    scrollClampSecondAnimation,
    [0.68, 0.7, 0.75, 0.77],
    [0, 1, 1, 0]
  );
  // To avoid scrolling body when scrolling inside div
  const [overscroll, setOverscroll] = useState(false);
  // To avoid errors with other sections that have absolute position
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollClampSecondAnimation, "change", (latest) => {
    if (latest < 0.77 && latest > 0.7) {
      setOverscroll(true);
    } else {
      setOverscroll(false);
      setOpenWorksMobile(false);
    }
    if (latest < 0.77 && latest > 0.68) {
      setVisible(true);
    } else {
      setVisible(false);
      setOpenWorksMobile(false);
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
            className={`${overscroll && "overscroll-contain"} 
            services-container p-6 max-h-[90%] md:p-10 md:max-h-[60%] lg:max-h-full rounded-lg md:rounded-b-none relative
             ${
               openWorksMobile ? "bg-transparent" : "bg-[#CE9F5D]/80"
             } transition-all duration-500
        text-white h-auto lg:h-full flex items-start flex-col w-full lg:w-1/2 md:rounded-t-lg lg:rounded-r-lg overflow-y-auto`}
          >
            <h4
              className={`text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ${
                openWorksMobile ? "opacity-0" : "opacity-100"
              } transition-all duration-500`}
            >
              ¿Qué hacemos?
            </h4>
            <p
              className={`text-base lg:text-lg w-full ${
                openWorksMobile ? "opacity-0" : "opacity-100"
              } transition-all duration-500`}
            >
              Construimos experiencias web sobresalientes y resolvemos problemas
              de negocio a través de código.
            </p>
            <Accordion
              className={`dark w-full !px-0`}
              itemClasses={{
                indicator: "text-white",
                title: "text-base md:text-lg lg:text-xl",
              }}
            >
              {servicesList.map((service, i) => (
                <AccordionItem
                  key={i}
                  aria-label={service.ariaLabel}
                  className={`text-sm md:text-base ${
                    openWorksMobile ? "opacity-0" : "opacity-100"
                  } transition-all duration-500`}
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
            <WorksModal
              works={works}
              open={openWorksMobile}
              setOpen={setOpenWorksMobile}
            />
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Services;
