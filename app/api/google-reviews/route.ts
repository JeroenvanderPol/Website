import { googlePlaceReviewsSchema } from "@/lib/google-reviews";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store, max-age=0" };

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  if (!key || !placeId)
    return Response.json({ status: "not-configured" }, { headers });
  try {
    // Fixed server-configured listing; never proxy arbitrary places or expose the key.
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=nl`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "displayName,rating,userRatingCount,googleMapsUri,reviews,attributions",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) throw new Error("Google Places unavailable");
    const parsed = googlePlaceReviewsSchema.safeParse(await response.json());
    if (!parsed.success) throw new Error("Unexpected Google Places response");
    return Response.json({ status: "ready", place: parsed.data }, { headers });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503, headers });
  }
}
