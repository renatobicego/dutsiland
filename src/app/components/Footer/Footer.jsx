import TermsAndConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = () => {
  return (
    <section className="w-full px-[3.5vw] mx-auto flex items-center justify-end py-4 md:py-2 md:h-16 snap-start z-10">
      <nav>
        <ul className="flex items-center gap-4 max-md:flex-wrap md:gap-6 text-xs lg:text-sm 2xl:text-base 
        lg:gap-10 3xl:text-lg uppercase text-right">
          <TermsAndConditions />
          <PrivacyPolicy />
        </ul>
      </nav>
    </section>
  );
};

export default Footer;
