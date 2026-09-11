import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { site } from '@/content/site'
import type { Project, ProjectDetail } from '@/content/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Cookies from '@/components/Cookies'
import ScrollTop from '@/components/ScrollTop'
import DMark from '@/components/DMark'
import ProjectView from '@/components/ProjectView'
import ProjectExperience from '@/components/ProjectExperience'

type Params = { slug: string }

type WithDetail = Project & { detail: ProjectDetail }

const conFicha = (p: Project): p is WithDetail => Boolean(p.detail)

// Solo se generan las fichas escritas. Un proyecto sin `detail` es una tarjeta de la
// marquesina y nada más, así que su URL no existe.
export function generateStaticParams(): Params[] {
  return site.projects.filter(conFicha).map((p) => ({ slug: p.slug }))
}

function buscar(slug: string): WithDetail | undefined {
  return site.projects.filter(conFicha).find((p) => p.slug === slug)
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = buscar(params.slug)
  if (!project) return { title: site.name }
  const title = `${project.name} — ${site.shortName}`
  return {
    title,
    description: project.lead,
    openGraph: {
      title,
      description: project.lead,
      url: `${site.url}/proyectos/${project.slug}`,
      siteName: site.name,
      locale: 'es_AR',
      type: 'article',
      images: [{ url: project.cover }],
    },
  }
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = buscar(params.slug)
  if (!project) notFound()

  // El siguiente de la lista, y si es el último vuelve al primero
  const conFichas = site.projects.filter(conFicha)
  const i = conFichas.findIndex((p) => p.slug === project.slug)
  const next = conFichas[(i + 1) % conFichas.length] ?? project

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

      <Header base="/" />

      <div id="main-transition">
        <div id="smooth-wrapper" className="container-wrapper">
          <div className="wrapper" id="pg-project" data-scroll-container>
            <ProjectView project={project} next={next} />
            <Footer base="/" />
          </div>
        </div>
      </div>

      <ScrollTop />
      <Cookies />
      <ProjectExperience />
    </>
  )
}
