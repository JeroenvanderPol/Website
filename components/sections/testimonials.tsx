import googleBusiness from "@/data/google-business.json";
import { GoogleReviewCards } from "@/components/sections/google-review-cards";

export function Testimonials() {
  return (
    <section id="reviews" className="poc-review poc-container">
      <h2>Ervaringen van klanten</h2>
      <GoogleReviewCards />
      <a
        className="service-text-link"
        href={googleBusiness.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Lees alle reviews op Google Maps
      </a>
    </section>
  );
}
