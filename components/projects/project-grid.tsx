import Image from "next/image";
import Link from "next/link";
import { coverPhoto, type Project } from "@/lib/projects";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return <div className="project-grid">{projects.map((project) => { const cover = coverPhoto(project); return (
    <Link className="project-tile" href={`/projecten/${project.slug}`} key={project.id}>
      <div className="project-photo"><Image src={cover.thumbnail} alt={cover.alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
        <div className="project-badges">{project.tags.map(tag => <span className="project-badge" key={tag}>{tag}</span>)}</div>
      </div>
      <div className="project-caption"><h3>{project.title}</h3>
        <p className="project-location">{project.status === "mock" ? `Voorbeeldproject · ${project.city} (fictief)` : project.city}</p>
        <span className="project-open">Bekijk project →</span>
      </div>
    </Link>
  ); })}</div>;
}
