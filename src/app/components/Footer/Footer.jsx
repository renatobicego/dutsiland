import TermsAndConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = () => {
  return (
    <section
      className="w-full px-[3.5vw] flex items-center justify-end py-4 lg:py-2 snap-start z-10  overflow-hidden left-0 relative
      "
    >
      <div className="w-full h-full lg:w-3/5 bg-rojo/60 lg:bg-rojo/90 absolute left-0 top-0 z-10"></div>
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
