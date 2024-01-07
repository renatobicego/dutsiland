import React from "react";
import { motion, useTransform } from "framer-motion";
import Image from "next/image";
const team = [
  {
    name: "Maximiliano Cattaneo",
    image: "/aboutus/maxi.jpeg",
    area: ["Backend"],
  },
  {
    name: "Renato Bicego",
    image: "/aboutus/pp2.jpg",
    area: ["Frontend", `UX`, "WebGL"],
  },
];
const AboutUs = ({ scrollClampSecondAnimation }) => {
  const opacityAboutUs = useTransform(
    scrollClampSecondAnimation,
    [0.37, 0.4, 0.45, 0.48],
    [0, 1, 1, 0]
  );

  const zIndex = useTransform(
    scrollClampSecondAnimation,
    [0.37, 0.4, 0.45, 0.48],
    [0, 50, 50, 0]
  );
  return (
    <motion.div
      style={{ opacity: opacityAboutUs, zIndex }}
      className="w-[85%] md:w-1/2 2xl:w-[45%] absolute top-1/2 -translate-y-1/2 lg:left-[10%] z-50 p-10 gap-6 bg-[#6087A9]/60
                   flex flex-col items-start left-1/2 -translate-x-1/2 lg:-translate-x-0 text-white rounded-lg overflow-hidden"
    >
      <h4 className={`text-3xl md:text-4xl lg:text-5xl font-semibold`}>
        ¿Quiénes somos?
      </h4>
      <p className={`text-base lg:text-lg w-full`}>
        Dutsiland es un estudio de desarrollo que impulsa la evolución de
        negocios en la web, proporcionando las herramientas y soluciones
        esenciales para establecer una fuerte presencia en internet y alcanzar
        el máximo potencial de tu negocio.
      </p>
      <div className="w-full grid grid-cols-2 gap-6">
        {team.map((member, i) => (
          <div
            className="w-full h-56 flex flex-col justify-end items-start rounded-lg overflow-hidden relative hover:scale-[1.02] transition-all duration-200"
            key={i}
          >
            <Image
              src={member.image}
              width={400}
              height={400}
              className="w-full object-fill  absolute left-0 top-0"
              quality={30}
              alt={"Foto de " + member.name}
            />
            <div
              className="flex flex-col items-start w-full h-full justify-end text-white relative z-10 p-5
             from-[#202020] bg-gradient-to-t hover:to-90% transition-all duration-200"
            >
              <ul className="text-sm flex mb-1 gap-2 list-disc list-inside ml-1">
                {member.area.map((area, i) => (
                  <li key={i} className={`${i === 0 ? "list-none" : ""}`}>
                    <span className={`relative -left-1`}>
                      {area}
                    </span>
                  </li>
                ))}
              </ul>
              <hr className="w-full opacity-30" />
              <p className="text-xl font-semibold">{member.name}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutUs;
