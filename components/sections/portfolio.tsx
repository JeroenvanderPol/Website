import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/project-grid";

const featuredProjectSlugs = [
  "tuin-tijdens-de-aanleg",
  "nieuw-aangeplante-border",
  "oprit-bij-de-woning",
  "gazon-met-ronde-plantvakken",
];

const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
  const project = projects.find((item) => item.slug === slug);
  return project ? [project] : [];
});

export function Portfolio() {
  return (
    <section id="portfolio" className="poc-section poc-container poc-portfolio">
      <span id="Portfolio" className="poc-anchor" aria-hidden="true" />
      <div className="poc-portfolio-layout">
        <div className="poc-portfolio-intro">
          <h2>Bekijk ons werk</h2>
          <p>Bekijk foto's van ons werk en ontdek onze projecten.</p>
          <div className="poc-portfolio-actions">
            <Link className="poc-portfolio-all" href="/projecten">Bekijk al het werk →</Link>
          </div>
        </div>
        <ProjectGrid projects={featuredProjects} className="project-grid poc-portfolio-grid" showProjectLink={false} />
      </div>
    </section>
  );
}
