import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectIndex } from "@/components/projects/project-index";
import { projects } from "@/lib/projects";
import { absoluteUrl, isPreview } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Ons werk | Van de Voort Tuinen";
const description = "Bekijk de projectfoto's van Van de Voort Tuinen en filter het overzicht op dienst.";
const allProjectCopyVerified = projects.every(
  (project) => project.status === "confirmed" && project.contentStatus === "verified",
);
const indexable = allProjectCopyVerified && !isPreview;
const url = absoluteUrl("/projecten");

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  robots: { index: indexable, follow: !isPreview },
  ...socialMetadata(title, description, url),
};

export default function ProjectsPage() {
  return (
    <div className="approved-site">
      <Header />
      <main id="main" className="service-page poc-container projects-index">
        <nav aria-label="Broodkruimel" className="service-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Ons werk</span>
        </nav>
        <header className="projects-index-intro">
          <h1>Ons werk</h1>
          <p>Bekijk de projectfoto's en filter het overzicht op de dienst.</p>
        </header>
        <ProjectIndex />
      </main>
      <Footer />
    </div>
  );
}