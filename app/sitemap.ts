import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import services from "@/data/services.json";
import { absoluteUrl, isPreview } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return [];
  return ["/", ...services.map((service) => `/diensten/${service.slug}`), ...projects.filter((project) => project.status === "confirmed").map((project) => `/projecten/${project.slug}`)]
    .map((path) => ({ url: absoluteUrl(path) }));
}
