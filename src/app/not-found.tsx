import type { Metadata } from "next";
import { site } from "@/content/site";
import PageShell from "@/components/PageShell";
import Button, { DIcon } from "@/components/Button";

const title = "Página no encontrada";
const description =
  "La página que buscás no existe o se movió. Volvé al inicio o escribinos.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

// Página 404: reutiliza el armazón y la portada oscura del resto del sitio.
// Como no es una ruta navegable, no lleva canonical y se marca noindex.
export default function NotFound() {
  return (
    <PageShell id="pg-404">
      <main className="project">
        <section className="project-hero" data-set-section="dark">
          <div className="project-hero__shape">
            <div className="project-hero__inner">
              <p className="section-kicker section-kicker--light">
                <DIcon />
                <span>ERROR 404</span>
              </p>
              <h1 className="project-title split-words">
                Esta página no existe
              </h1>
              <p className="project-lead">{description}</p>

              <div className="project-links">
                <Button href="/">Volver al inicio</Button>
                <Button href="/contacto">Hablá con nosotros</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
