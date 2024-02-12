import TermsAndConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = () => {
  return (
    <section className="w-[93vw] mx-auto flex items-center justify-end py-4 md:py-2 pr-3.5 md:h-16 snap-start relative z-10">
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
