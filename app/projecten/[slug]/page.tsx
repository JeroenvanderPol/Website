import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ProjectImage } from "@/components/projects/project-image";
import { projects, coverPhoto } from "@/lib/projects";
import { absoluteUrl, isPreview } from "@/lib/site";
import services from "@/data/services.json";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
async function getProject(params: Props["params"]) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return project;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params);
  const copyVerified = project.status === "confirmed" && project.contentStatus === "verified";
  const title = copyVerified
    ? `${project.title} in ${project.city} | Van de Voort Tuinen`
    : `Projectfoto's | Van de Voort Tuinen`;
  const description = copyVerified
    ? project.summary
    : "Bekijk projectfoto's van Van de Voort Tuinen. De projectgegevens worden gecontroleerd.";
  return { title: { absolute: title }, description,
    alternates: { canonical: absoluteUrl(`/projecten/${project.slug}`) },
    robots: { index: copyVerified && !isPreview, follow: !isPreview },
    ...socialMetadata(title, description, absoluteUrl(`/projecten/${project.slug}`)),
  };
}
export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params);
  const copyVerified = project.status === "confirmed" && project.contentStatus === "verified";
  const service = services.find((item) => item.title === project.category);
  const related = projects.filter((item) => item.id !== project.id && item.tags.some(tag => project.tags.includes(tag))).slice(0, 3);
  const url = absoluteUrl(`/projecten/${project.slug}`);
  return <div className="approved-site"><Header /><main id="main" className="service-page poc-container project-detail">
    {project.status === "confirmed" && project.contentStatus === "verified" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebPage", "@id": url, url, name: `${project.title} in ${project.city}`, description: project.summary,
      primaryImageOfPage: { "@type": "ImageObject", contentUrl: absoluteUrl(coverPhoto(project).src), caption: coverPhoto(project).alt },
      about: { "@type": "Service", name: project.category, provider: { "@id": absoluteUrl("/#business") } },
      breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: project.title, item: url },
      ] },
    }).replace(/</g, "\\u003c") }} />}
    <nav className="service-breadcrumb" aria-label="Broodkruimel"><Link href="/">Home</Link><span>/</span><Link href="/projecten">Ons werk</Link><span>/</span><span aria-current="page">{copyVerified ? project.title : "Projectfoto's"}</span></nav>
    {project.status !== "confirmed" && <aside className="project-mock"><strong>Voorbeeldproject voor de POC</strong><p>De foto's komen uit het oorspronkelijke portfolio. De plaats {project.city}, de projectbeschrijving en eventuele groepering van foto's zijn voorbeelden en moeten nog door de klant worden bevestigd of aangepast.</p></aside>}
    {copyVerified ? <>
      <h1>{project.title} in {project.city}</h1>
      <p className="service-lead">{project.summary}</p>
    </> : <>
      <h1>Projectfoto's</h1>
      <aside className="project-copy-review"><strong>Projectgegevens worden gecontroleerd</strong><p>Deze foto's tonen echt werk. De projecttitel, plaats en beschrijving worden bijgewerkt.</p></aside>
    </>}
    <div className="project-detail-tags">{project.tags.map(tag => <span className="project-badge" key={tag}>{tag}</span>)}</div>
    <ProjectImage images={project.images} coverImageId={project.coverImageId} />
    <section className="service-preparation"><h2>Ook plannen voor uw tuin?</h2><p>Bespreek uw wensen en de situatie in uw tuin met Van de Voort Tuinen.</p><div className="service-actions"><Link className="poc-button" href="/#contact">Offerte aanvragen</Link>{service && <Link className="service-text-link" href={`/diensten/${service.slug}`}>Meer over {service.title.toLowerCase()}</Link>}</div></section>
    {related.length > 0 && <section className="service-work"><h2>Meer uit ons portfolio</h2><ProjectGrid projects={related} /></section>}
    <Link className="service-text-link" href="/projecten">Terug naar al het werk</Link>
  </main><Footer /></div>;
}
