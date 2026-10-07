"use client";

import { useState } from "react";
import { ProjectGrid } from "@/components/projects/project-grid";
import { projects } from "@/lib/projects";
import services from "@/data/services.json";

export function ProjectIndex() {
  const [filter, setFilter] = useState("Alle");
  const shown = projects.filter(
    (project) => filter === "Alle" || project.tags.includes(filter),
  );

  return (
    <div className="projects-index-content">
      <div className="project-filters" aria-label="Projecten filteren">
        {["Alle", ...services.map((service) => service.title)].map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="project-index-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projecten"}
      </p>
      {shown.length > 0 ? (
        <ProjectGrid projects={shown} />
      ) : (
        <p className="project-index-empty" role="status">
          Er zijn geen projecten gekoppeld aan deze dienst.
        </p>
      )}
    </div>
  );
}