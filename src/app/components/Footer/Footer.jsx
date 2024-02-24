import TermsAndConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import Image from "next/image";

const Footer = () => {
  return (
    <section
      className="w-full px-[3.5vw] flex items-center justify-between py-4 lg:py-2 snap-start z-10  overflow-hidden left-0 relative
      "
    >
      <div className="w-full h-full lg:w-3/5 bg-rojo/60 lg:bg-rojo/90 absolute left-0 top-0 z-10"></div>
      <nav className="relative z-20 flex items-center gap-3 max-md:ml-[2%] lg:ml-[5.5%] 2xl:ml-[3.5%]"> 
        <a
          href="https://www.linkedin.com/company/dutsiland"
          target="_blank"
          className="w-6 xs:w-7 md:w-8"
        >
          <Image
            src={"/icons/Linkedin.png"}
            width={100}
            height={100}
            alt="Perfil de linkedin"
          />
        </a>
        <a
          href="https://www.instagram.com/dutsiland.estudio/"
          target="_blank"
          className="w-6 xs:w-7 md:w-8"
        >
          <Image
            src={"/icons/Instagram.png"}
            width={100}
            height={100}
            alt="Perfil de Instagram"
          />
        </a>
      </nav>
      <nav className="relative z-20">
        <ul
          className="flex items-center gap-4 max-md:flex-wrap md:gap-6 text-xs lg:text-sm 2xl:text-base 
        lg:gap-10 3xl:text-lg uppercase text-right"
        >
          <TermsAndConditions />
          <PrivacyPolicy />
        </ul>
      </nav>
    </section>
  );
};

export default Footer;
