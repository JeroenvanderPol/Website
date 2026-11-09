import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import services from "@/data/services.json";
import { absoluteUrl, isPreview } from "@/lib/site";
import { isIndexable, locations } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return [];
  const allProjectCopyVerified = projects.every(
    (project) => project.status === "confirmed" && project.contentStatus === "verified",
  );
  return [
    "/",
    "/contact",
    "/privacy",
    "/reviews",
    ...(allProjectCopyVerified ? ["/projecten"] : []),
    ...services.map((service) => `/diensten/${service.slug}`),
    ...locations.filter(isIndexable).map((location) => `/hovenier/${location.slug}`),
    ...projects
      .filter((project) => project.status === "confirmed" && project.contentStatus === "verified")
      .map((project) => `/projecten/${project.slug}`),
  ]
    .map((path) => ({ url: absoluteUrl(path) }));
}
