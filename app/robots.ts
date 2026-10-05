import type { MetadataRoute } from "next";
import { absoluteUrl, isPreview } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return isPreview
    ? { rules: { userAgent: "*", disallow: "/" } }
    : {
        rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/design-directions/"] },
        sitemap: absoluteUrl("/sitemap.xml"),
      };
}
