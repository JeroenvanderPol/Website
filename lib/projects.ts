import records from "@/data/original-projects.json";

export type Project = {
  id: number; slug: string; src: string; alt: string; title: string;
  category: string; city: string; status: "mock" | "confirmed";
  contentStatus: "needs-review" | "verified";
  summary: string;
  // Optional details; leave empty ("" or []) when unknown.
  period?: string; materials?: string[]; area?: string;
  tags: string[]; coverImageId: string; images: ProjectPhoto[];
};

export type ProjectFact = { label: string; value: string };

export function projectFacts(project: Project): ProjectFact[] {
  const facts = [
    { label: "Uitgevoerd", value: project.period?.trim() },
    { label: "Materialen", value: project.materials?.map((material) => material.trim()).filter(Boolean).join(", ") },
    { label: "Oppervlakte", value: project.area?.trim() },
  ];
  return facts.filter((fact): fact is ProjectFact => Boolean(fact.value));
}

export type ProjectPhoto = { id: string; src: string; alt: string; thumbnail: string; width: number; height: number };

export function coverPhoto(project: Project): ProjectPhoto {
  const photo = project.images.find((image) => image.id === project.coverImageId);
  if (!photo) throw new Error(`Missing cover image for ${project.slug}`);
  return photo;
}

export const projects = records as Project[];
