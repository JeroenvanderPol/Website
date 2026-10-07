import Image from "next/image";
import Link from "next/link";
import { coverPhoto, type Project } from "@/lib/projects";

export function ProjectGrid({ projects, className = "project-grid" }: { projects: Project[]; className?: string }) {
  return <div className={className}>{projects.map((project) => {
    const cover = coverPhoto(project);
    const copyVerified = project.status === "confirmed" && project.contentStatus === "verified";
    return (
    <Link className="project-tile" href={`/projecten/${project.slug}`} key={project.id}>
      <div className="project-photo"><Image src={cover.thumbnail} alt={cover.alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
        <div className="project-badges">{project.tags.map(tag => <span className="project-badge" key={tag}>{tag}</span>)}</div>
      </div>
      <div className="project-caption"><h3>{copyVerified ? project.title : "Projectfoto"}</h3>
        <p className="project-location">{copyVerified ? project.city : "Projectgegevens worden gecontroleerd"}</p>
        <span className="project-open">Bekijk project →</span>
      </div>
    </Link>
  ); })}</div>;
}
