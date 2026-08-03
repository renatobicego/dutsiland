import TermsAndConditions from "./TermsConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className="z-10 relative flex sm:flex-row flex-col justify-between items-center gap-3 sm:gap-4 bg-negro py-5 sm:py-6 border-white/5 border-t w-full text-white/40 section-padding"
      role="contentinfo"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <a
          href="https://www.linkedin.com/company/dutsiland"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn de Dutsiland"
          className="opacity-50 hover:opacity-100 w-6 sm:w-7 h-6 sm:h-7 transition-opacity"
        >
          <Image
            src="/icons/LinkedIn.png"
            width={28}
            height={28}
            alt="LinkedIn"
          />
        </a>
        <a
          href="https://www.instagram.com/dutsiland.estudio/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de Dutsiland"
          className="opacity-50 hover:opacity-100 w-6 sm:w-7 h-6 sm:h-7 transition-opacity"
        >
          <Image
            src="/icons/Instagram.png"
            width={28}
            height={28}
            alt="Instagram"
          />
        </a>
      </div>

      <p className="text-[10px] sm:text-xs">
        {new Date().getFullYear()} Estudio Dutsiland. Todos los derechos
        reservados.
      </p>

      <nav aria-label="Enlaces legales">
        <ul className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-wider">
          <TermsAndConditions />
          <PrivacyPolicy />
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
