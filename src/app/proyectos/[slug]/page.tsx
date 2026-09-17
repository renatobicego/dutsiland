import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import type { Project, ProjectDetail } from "@/content/site";
import PageShell from "@/components/PageShell";
import ProjectView from "@/components/ProjectView";

type Params = { slug: string };

// En Next 16 los params de una página llegan como Promise (Async Request APIs)
type PageProps = { params: Promise<Params> };

type WithDetail = Project & { detail: ProjectDetail };

const conFicha = (p: Project): p is WithDetail => Boolean(p.detail);

// Solo se generan las fichas escritas. Un proyecto sin `detail` es una tarjeta del
// índice y nada más, así que su URL no existe.
export function generateStaticParams(): Params[] {
  return site.projects.filter(conFicha).map((p) => ({ slug: p.slug }));
}

function buscar(slug: string): WithDetail | undefined {
  return site.projects.filter(conFicha).find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = buscar(slug);
  if (!project) return { title: site.name };
  const title = `${project.name} — ${site.shortName}`;
  return {
    title,
    description: project.lead,
    alternates: { canonical: `/proyectos/${project.slug}` },
    // Los casos de demostración no deben indexarse: son inventados. Se ven en el sitio
    // (para mostrarlo completo por rubro) pero le pedimos a Google que no los liste.
    robots: project.demo ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description: project.lead,
      url: `${site.url}/proyectos/${project.slug}`,
      siteName: site.name,
      locale: "es_AR",
      type: "article",
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = buscar(slug);
  if (!project) notFound();

  // El siguiente de la lista, y si es el último vuelve al primero
  const conFichas = site.projects.filter(conFicha);
  const i = conFichas.findIndex((p) => p.slug === project.slug);
  const next = conFichas[(i + 1) % conFichas.length] ?? project;

  return (
    <PageShell id="pg-project">
      <ProjectView project={project} next={next} />
    </PageShell>
  );
}
