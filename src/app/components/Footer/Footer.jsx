import TermsAndConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = () => {
  return (
    <section className="w-[93vw] mx-auto flex items-center justify-end py-4 md:py-2 pr-3.5 md:h-16 bg-white">
      <nav>
        <ul className="flex items-center gap-4 max-md:flex-wrap md:gap-6 text-xs lg:gap-10 lg:text-lg uppercase text-right">
          <TermsAndConditions />
          <PrivacyPolicy />
        </ul>
      </nav>
    </section>
  );
};

export default Footer;
