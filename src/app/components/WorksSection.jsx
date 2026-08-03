"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import useClient from "../utils/useClient";

const works = [
  {
    coverImage: "/works/mimpronta/mimpronts.png",
    title: "Mimpronta",
    tags: ["Diseño UI", "Desarrollo Web"],
    description:
      "Landing page para agencia de impacto ambiental con enfoque en identidad visual y funcionalidad.",
    link: "https://mimpronta.com/",
    color: "from-negro-mid to-negro",
  },
  {
    coverImage: "/works/ama/ama.webp",
    title: "Asociación Mendocina de Atletismo",
    tags: ["UI/UX Research", "Desarrollo Web"],
    description:
      "Plataforma web para gestión de inscripciones, federaciones y noticias deportivas.",
    link: "https://amamendoza.vercel.app/",
    color: "from-negro-mid to-negro",
  },
  {
    coverImage: "/works/cucha/cucha1.webp",
    title: "Cucha Repuestos",
    tags: ["Diseño UI", "Ecommerce"],
    description:
      "Digitalización completa de empresa de repuestos con catálogo online de última generación.",
    link: "https://cucharepuestos.com/",
    color: "from-negro-mid to-negro",
  },
  {
    coverImage: "/works/medialuna/coverImage.png",
    title: "Medialuna Medias",
    tags: ["Diseño UI", "Catálogo Online"],
    description: "Catálogo online con búsqueda y categorización de productos.",
    link: "https://medialunamedias.vercel.app/",
    color: "from-negro-mid to-negro",
  },
  {
    coverImage: "/works/mahatu/desktop.png",
    title: "Mahatu Consultorios",
    tags: ["Desarrollo Web", "Sistema de Gestión"],
    description:
      "Sistema de gestión de turnos, facturación y pacientes para consultorios médicos.",
    link: null,
    color: "from-negro-mid to-negro",
  },
  {
    coverImage: "/works/wonder/bsas.avif",
    title: "Wonder Ventures",
    tags: ["Diseño UI", "Plataforma"],
    description:
      "Plataforma de reservas de experiencias turísticas con gestión de contenido.",
    link: "http://wonderventures3.s3-website-us-east-1.amazonaws.com/",
    color: "from-negro-mid to-negro",
  },
];

const WorkCard = ({ work, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.08 }}
      className="group relative card-hover"
    >
      <div
        className={`relative w-full h-[240px] xs:h-[260px] sm:h-[280px] md:h-[320px] lg:h-[380px] 2xl:h-[420px] 
        bg-gradient-to-br ${work.color} overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.04]`}
      >
        {/* Cover image */}
        <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-500">
          <Image
            src={work.coverImage}
            alt={`Proyecto ${work.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Dark overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 md:p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-white/10 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full text-[10px] text-white/70 sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom info */}
          <div>
            <h3 className="mb-1 sm:mb-2 font-semibold text-white text-lg sm:text-xl md:text-2xl lg:text-3xl">
              {work.title}
            </h3>
            <p className="opacity-0 group-hover:opacity-100 mb-3 sm:mb-4 text-white/50 line-clamp-2 transition-opacity duration-300 body-sm">
              {work.description}
            </p>
            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 font-medium text-white/80 hover:text-rojo-light text-xs sm:text-sm transition-all translate-y-2 group-hover:translate-y-0 duration-300"
              >
                Ver proyecto
                <svg
                  className="w-3.5 sm:w-4 h-3.5 sm:h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const WorksSection = () => {
  const isClient = useClient();

  if (!isClient) return null;

  return (
    <section
      id="trabajos"
      className="relative bg-negro py-16 sm:py-20 lg:py-28 w-full text-white snap-always snap-start"
      aria-labelledby="works-heading"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-end gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="block mb-2 sm:mb-4 font-medium text-rojo text-xs sm:text-sm uppercase tracking-widest"
            >
              Portfolio
            </motion.span>
            <h2 id="works-heading" className="heading-md">
              Proyectos Destacados
            </h2>
          </div>
          <p className="max-w-sm text-white/40 body-sm sm:body-md">
            Una selección de nuestros trabajos más apasionantes
          </p>
        </div>

        {/* Grid */}
        <div className="gap-4 sm:gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2">
          {works.map((work, i) => (
            <WorkCard key={i} work={work} index={i} />
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center gap-4 sm:gap-6 border border-white/10 hover:border-rojo/30 border-dashed rounded-2xl md:rounded-3xl w-full h-[240px] xs:h-[260px] sm:h-[280px] md:h-[320px] lg:h-[380px] 2xl:h-[420px] transition-colors duration-300"
          >
            <h3 className="font-semibold text-white/40 text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Tu Próximo Proyecto
            </h3>
            <a href="#contacto" className="btn-accent">
              Hacelo Realidad
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
