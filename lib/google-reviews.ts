import { z } from "zod";

const httpsUrl = z
  .string()
  .url()
  .refine((url) => new URL(url).protocol === "https:");
const localizedText = z.object({
  text: z.string(),
  languageCode: z.string().optional(),
});
export const googlePlaceReviewsSchema = z.object({
  displayName: localizedText,
  rating: z.number().min(1).max(5).optional(),
  userRatingCount: z.number().int().nonnegative().optional(),
  googleMapsUri: httpsUrl,
  reviews: z
    .array(
      z.object({
        name: z.string(),
        rating: z.number().min(1).max(5),
        originalText: localizedText.optional(),
        text: localizedText.optional(),
        relativePublishTimeDescription: z.string().optional(),
        googleMapsUri: httpsUrl,
        authorAttribution: z.object({
          displayName: z.string(),
          uri: httpsUrl.optional(),
          photoUri: httpsUrl.optional(),
        }),
      }),
    )
    .max(5)
    .default([]),
  attributions: z
    .array(z.object({ provider: z.string(), providerUri: httpsUrl.optional() }))
    .default([]),
});
export type GooglePlaceReviews = z.infer<typeof googlePlaceReviewsSchema>;
