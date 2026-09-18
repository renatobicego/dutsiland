import type { Metadata } from "next";
import { site } from "@/content/site";
import PageShell from "@/components/PageShell";
import ContactForm from "@/components/ContactForm";
import { ArrowDiagonal, DIcon } from "@/components/Button";

const title = `Contacto`;

export const metadata: Metadata = {
  title,
  description: site.contact.intro,
  alternates: { canonical: "/contacto" },
  openGraph: {
    title,
    description: site.contact.intro,
    url: `${site.url}/contacto`,
    siteName: site.name,
    locale: "es_AR",
    type: "website",
  },
};

export default function ContactPage() {
  const c = site.contact;

  return (
    <PageShell id="pg-contacto">
      <main className="project">
        <section className="project-hero" data-set-section="dark">
          <div className="project-hero__shape">
            <div className="project-hero__inner">
              <p className="section-kicker section-kicker--light">
                <DIcon />
                <span>{c.kicker}</span>
              </p>
              <h1 className="project-title split-words">{c.title}</h1>
              <p className="project-lead">{c.intro}</p>

              <div className="project-links">
                <a
                  href={`mailto:${site.email}`}
                  className="project-link btn-underlined"
                  data-cursor-style="hovered"
                >
                  <span>{site.email}</span>
                  <ArrowDiagonal />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" data-set-section="">
          <div className="project-block" data-reveal>
            <ContactForm />
          </div>
        </section>
      </main>
    </PageShell>
  );
}
