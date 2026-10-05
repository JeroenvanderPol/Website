export const siteUrl = "https://vandevoortgrondwerken.nl";

// Preview deployments must not compete with the customer's production domain.
export const isPreview = process.env.VERCEL_ENV === "preview";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
