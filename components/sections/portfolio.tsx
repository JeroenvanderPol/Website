"use client";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/project-grid";
import services from "@/data/services.json";
export function Portfolio() {
  const [filter, setFilter] = useState("Alle");
  const shown = projects.filter(
    (p) => filter === "Alle" || p.tags.includes(filter),
  );
  return (
    <section id="portfolio" className="poc-section poc-container">
      <span id="Portfolio" className="poc-anchor" aria-hidden="true" />
      <div className="poc-heading">
        <h2>
          Bekijk
          <br />
          ons werk.
        </h2>
        <p>
          Van een nieuw gazon tot een complete tuin. Bekijk onze {projects.length} projecten en foto's van
          ons werk.
        </p>
      </div>
      <div className="project-filters" aria-label="Projecten filteren">
        {["Alle", ...services.map((service) => service.title)].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} projecten zichtbaar
      </p>
      {shown.length === 0 && (
        <p className="poc-heading" role="status">
          Er zijn nog geen foto's beschikbaar voor deze dienst. Bekijk alle
          foto's of neem contact op om uw plannen te bespreken.
        </p>
      )}
      <ProjectGrid projects={shown} />
    </section>
  );
}
