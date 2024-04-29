import Image from "next/image";
const team = [
  {
    name: "Maximiliano Cattaneo Cvetic",
    image: "/aboutus/maxi.jpeg",
    area: ["Backend", "Infraestructura"],
    linkedin: "https://www.linkedin.com/in/mcvetic/",
  },
  {
    name: "Renato Bicego",
    image: "/aboutus/pp2.jpg",
    area: ["Frontend", "WebGL","Diseño UI"],
    linkedin: "https://www.linkedin.com/in/renatobicego/",
  },
];

const OurTeam = () => {
  return (
    <div
      className={` w-[90%] md:w-full mx-auto pb-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6`}
    >
      {team.map((member, i) => (
        <div
          className="w-full h-64 2xl:h-72 3xl:h-[370px] flex flex-col justify-end items-start rounded-lg overflow-hidden relative 
                  lg:hover:scale-[1.02] transition-all duration-200"
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
            <ul className="text-xs md:text-sm flex mb-1 gap-2 list-disc list-inside ml-1">
              {member.area.map((area, i) => (
                <li key={i} className={`${i === 0 ? "list-none" : ""}`}>
                  <span className={`relative -left-[1px] md:-left-1`}>
                    {area}
                  </span>
                </li>
              ))}
            </ul>
            <hr className="w-full opacity-30" />
            <p className="md:text-lg 2xl:text-xl 3xl:text-2xl font-semibold md:max-w-[90%]">
              {member.name}
            </p>
          </div>
          <a href={member.linkedin} target="_blank" className="absolute bottom-5 right-5 w-5 md:w-6 z-10">
            <Image alt="linkedin perfil" width={100} height={100} src={"/icons/LinkedIn.png"} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default OurTeam;
