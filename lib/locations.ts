import business from "@/data/business.json";
import { projects, type Project } from "@/lib/projects";

export type Location = {
  name: string;
  slug: string;
  inWorkArea: boolean;
  projects: Project[];
};

export function locationSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function locationHref(name: string) {
  return `/hovenier/${locationSlug(name)}`;
}

const verifiedProjects = projects.filter(
  (project) => project.status === "confirmed" && project.contentStatus === "verified",
);

export const locations: Location[] = [
  ...new Set([...business.workArea, ...verifiedProjects.map((project) => project.city)]),
]
  .map((name) => ({
    name,
    slug: locationSlug(name),
    inWorkArea: business.workArea.includes(name),
    projects: verifiedProjects.filter((project) => project.city === name),
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug, "nl"));

// Pages without local projects would be near-duplicates, so they stay out of the index.
export function isIndexable(location: Location) {
  return location.projects.length > 0;
}
