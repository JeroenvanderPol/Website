import records from "@/data/original-projects.json";

export type Project = {
  id: number; slug: string; src: string; alt: string; title: string;
  category: string; city: string; status: "mock" | "confirmed";
  contentStatus: "needs-review" | "verified";
  summary: string; request: string; approach: string; result: string;
  tags: string[]; coverImageId: string; images: ProjectPhoto[];
};

export type ProjectPhoto = { id: string; src: string; alt: string; thumbnail: string; width: number; height: number };

export function coverPhoto(project: Project): ProjectPhoto {
  const photo = project.images.find((image) => image.id === project.coverImageId);
  if (!photo) throw new Error(`Missing cover image for ${project.slug}`);
  return photo;
}

export const projects = records as Project[];
