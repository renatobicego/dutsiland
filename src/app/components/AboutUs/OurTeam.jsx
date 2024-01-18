import Image from "next/image";
const team = [
  {
    name: "Maximiliano Cattaneo Cvetic",
    image: "/aboutus/maxi.jpeg",
    area: ["Backend", "Infraestructura"],
  },
  {
    name: "Renato Bicego",
    image: "/aboutus/pp2.jpg",
    area: ["Frontend", `UX`, "WebGL"],
  },
];

const OurTeam = ({hidden}) => {
  return (
    <div className={` ${hidden ? 'hidden w-full md:grid' : 'grid w-[90%] mx-auto py-14'} grid grid-cols-1 md:grid-cols-2 gap-6`}>
      {team.map((member, i) => (
        <div
          className="w-full h-56 flex flex-col justify-end items-start rounded-lg overflow-hidden relative 
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
            <p className="md:text-lg 2xl:text-xl 3xl:text-2xl font-semibold">
              {member.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurTeam;
