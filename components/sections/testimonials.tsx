"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import googleBusiness from "@/data/google-business.json";
import {
  googlePlaceReviewsSchema,
  type GooglePlaceReviews,
} from "@/lib/google-reviews";
export function Testimonials() {
  const section = useRef<HTMLElement>(null);
  const [place, setPlace] = useState<GooglePlaceReviews | null>(null);
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setStatus("loading");
      try {
        const response = await fetch("/api/google-reviews", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok || result.status !== "ready") {
          setStatus("unavailable");
          return;
        }
        const parsed = googlePlaceReviewsSchema.safeParse(result.place);
        if (!parsed.success) throw new Error("Invalid reviews");
        setPlace(parsed.data);
        setStatus("ready");
      } catch {
        if (!controller.signal.aborted) setStatus("unavailable");
      }
    }
    // Request billable data only when the visitor reaches this section.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          void load();
        }
      },
      { rootMargin: "200px" },
    );
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, []);
  return (
    <section ref={section} id="reviews" className="poc-review poc-container">
      <h2>Ervaringen van klanten</h2>
      {!place ? (
        <>
          <p role="status">
            {status === "idle" || status === "loading"
              ? "Klantreviews worden geladen…"
              : "Klantreviews zijn hier op dit moment niet beschikbaar. Bekijk onze projectfoto’s om een indruk van het werk te krijgen."}
          </p>
          <a href={googleBusiness.mapsUrl} target="_blank" rel="noopener noreferrer">Lees onze reviews op Google Maps</a>
          <Link href="#portfolio">Bekijk ons werk</Link>
        </>
      ) : (
        <>
          <div className="google-review-summary">
            <p>{place.displayName.text}</p>
            {place.rating !== undefined && (
              <p>
                <strong>
                  {place.rating.toLocaleString("nl-NL", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  / 5
                </strong>
                {place.userRatingCount !== undefined && (
                  <>
                    {" "}
                    · {place.userRatingCount.toLocaleString("nl-NL")}{" "}
                    beoordelingen
                  </>
                )}
              </p>
            )}
            <a
              href={place.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bekijk alle beoordelingen op Google Maps
            </a>
          </div>
          <p>
            Maximaal vijf reviews, door Google gerangschikt op relevantie.
            Teksten worden in de oorspronkelijke taal getoond.
          </p>
          <div className="google-review-grid">
            {place.reviews.map((review) => (
              <article className="google-review" key={review.name}>
                <div className="google-review-author">
                  {review.authorAttribution.photoUri && (
                    <img
                      src={review.authorAttribution.photoUri}
                      width={40}
                      height={40}
                      alt={`Profielfoto van ${review.authorAttribution.displayName}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div>
                    {review.authorAttribution.uri ? (
                      <a
                        href={review.authorAttribution.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {review.authorAttribution.displayName}
                      </a>
                    ) : (
                      <strong>{review.authorAttribution.displayName}</strong>
                    )}
                    <p>{review.relativePublishTimeDescription}</p>
                  </div>
                </div>
                <div
                  className="google-review-stars"
                  aria-label={`${review.rating} van 5 sterren`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      aria-hidden="true"
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                {review.originalText || review.text ? (
                  <blockquote
                    lang={(review.originalText ?? review.text)?.languageCode}
                  >
                    {(review.originalText ?? review.text)?.text}
                  </blockquote>
                ) : (
                  <p>Beoordeling zonder geschreven toelichting.</p>
                )}
                <a
                  href={review.googleMapsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bekijk review op Google Maps
                </a>
              </article>
            ))}
          </div>
          {place.reviews.length === 0 && (
            <p>
              Google heeft voor deze locatie geen geschreven reviews
              meegeleverd.
            </p>
          )}
          <span className="google-maps-attribution" translate="no">
            Google Maps
          </span>
          {place.attributions.map((item, i) => (
            <p key={i}>
              {item.providerUri ? (
                <a href={item.providerUri}>{item.provider}</a>
              ) : (
                item.provider
              )}
            </p>
          ))}
        </>
      )}
    </section>
  );
}
