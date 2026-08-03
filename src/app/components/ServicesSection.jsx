"use client";
import { motion } from "framer-motion";
import useClient from "../utils/useClient";

const servicesList = [
  {
    title: "Diseño Web",
    description:
      "Creamos interfaces elegantes e innovadoras donde la usabilidad está al servicio de una experiencia inmersiva.",
    items: [
      "Arquitectura de la Información",
      "Prototipado UI/UX",
      "Diseño de Interfaz",
      "Diseño Responsive",
    ],
  },
  {
    title: "Desarrollo Web",
    description:
      "Integramos experiencia visual con funcionalidad robusta y arquitectura escalable.",
    items: [
      "Web Interactiva 3D / WebGL",
      "Landing Pages",
      "Ecommerce",
      "APIs & Backend",
    ],
  },
];

const ServicesSection = () => {
  const isClient = useClient();

  if (!isClient) return null;

  return (
    <section
      id="servicios"
      className="relative flex flex-col justify-center bg-negro w-full min-h-screen overflow-hidden text-white snap-always snap-start"
      aria-labelledby="services-heading"
    >
      <div className="py-16 sm:py-20 w-full section-padding">
        {/* Heading */}
        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16">
          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="block mb-3 sm:mb-4 font-medium text-rojo text-xs sm:text-sm uppercase tracking-widest"
            >
              Lo que hacemos
            </motion.span>
            <h2 id="services-heading" className="heading-lg">
              Hagámoslo
              <br />
              Juntos
            </h2>
          </div>
          <p className="max-w-md text-white/50 lg:text-right body-md">
            Ayudamos a convertir tu idea inicial en una solución digital de
            vanguardia, donde el único límite es nuestra imaginación conjunta.
          </p>
        </div>

        {/* Service cards */}
        <div className="gap-4 sm:gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2">
          {servicesList.map((service, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-negro-light hover:bg-negro-mid p-6 sm:p-8 md:p-10 border border-white/[0.06] rounded-2xl md:rounded-3xl transition-colors duration-300"
            >
              <h3 className="mb-2 sm:mb-3 font-semibold text-white group-hover:text-rojo-light text-lg sm:text-xl md:text-2xl lg:text-3xl transition-colors">
                {service.title}
              </h3>
              <p className="mb-5 text-white/50 body-sm">
                {service.description}
              </p>
              <ul className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                {service.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-white/70 text-xs sm:text-sm"
                  >
                    <span className="flex-shrink-0 bg-rojo rounded-full w-1 h-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
