import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "./Cookies";
import DMark from "./DMark";
import PageExperience from "./PageExperience";

export type PageShellProps = {
  /** Id del contenedor que mueve el scroll suave. Uno por página. */
  id: string;
  children: ReactNode;
};

// El armazón que comparten todas las páginas que no son la home: preloader, cursor,
// header, el contenedor del scroll suave, footer y la experiencia GSAP.
export default function PageShell({ id, children }: PageShellProps) {
  return (
    <>
      <div id="loader">
        <div className="flex-center align-self-center w-100">
          <div className="container-lottie">
            <DMark className="d-mark--loader" />
          </div>
        </div>
      </div>

      <div className="cursor-wrapper" id="wrapper-cursor">
        <div />
      </div>

      <Header />

      <div id="main-transition">
        <div id="smooth-wrapper" className="container-wrapper">
          <div className="wrapper" id={id} data-scroll-container>
            {children}
            <Footer />
          </div>
        </div>
      </div>

      <Cookies />
      <PageExperience content={`#${id}`} />
    </>
  );
}
