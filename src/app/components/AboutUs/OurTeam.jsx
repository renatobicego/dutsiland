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
    area: ["Frontend", "WebGL", "Diseño UI"],
    linkedin: "https://www.linkedin.com/in/renatobicego/",
  },
];

const OurTeam = () => {
  return (
    <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2">
      {team.map((member, i) => (
        <div
          key={i}
          className="group relative rounded-xl sm:rounded-2xl h-72 sm:h-80 md:h-72 lg:h-80 2xl:h-96 overflow-hidden"
        >
          {/* Photo */}
          <Image
            src={member.image}
            width={500}
            height={500}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            quality={60}
            alt={`Foto de ${member.name}`}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
            {/* Areas */}
            <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
              {member.area.map((area, j) => (
                <span
                  key={j}
                  className="bg-white/10 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] text-white/70 sm:text-xs"
                >
                  {area}
                </span>
              ))}
            </div>

            {/* Name + LinkedIn */}
            <div className="flex justify-between items-end">
              <p className="font-semibold text-white text-base sm:text-lg md:text-xl leading-tight">
                {member.name}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${member.name}`}
                className="flex flex-shrink-0 justify-center items-center bg-white/10 hover:bg-white/20 backdrop-blur-sm ml-3 rounded-full w-8 sm:w-9 h-8 sm:h-9 transition-colors"
              >
                <Image
                  alt="LinkedIn"
                  width={16}
                  height={16}
                  src="/icons/LinkedIn.png"
                  className="w-3.5 sm:w-4 h-3.5 sm:h-4"
                />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurTeam;
