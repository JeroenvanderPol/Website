import type { Metadata } from "next";

// Assets must resolve on the deployed rebuild, even while the canonical
// business domain still serves the previous website.
const assetOrigin = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://v0-vandevoort-grondwerken-data.vercel.app";
export const socialImage = {
  url: `${assetOrigin}/share-image`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Van de Voort Tuinen — Tuinontwerp & aanleg met kwaliteit",
};
export function socialMetadata(title: string, description: string, url?: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: { title, description, url, siteName: "Van de Voort Tuinen", type: "website", locale: "nl_NL", images: [socialImage] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: socialImage.url, alt: socialImage.alt }] },
  };
}
