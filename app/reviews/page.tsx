import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { GoogleReviewCards } from "@/components/sections/google-review-cards";
import googleBusiness from "@/data/google-business.json";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Google reviews | Van de Voort Tuinen",
  description:
    "Bekijk een transparant gelabelde selectie van openbare Google-reviews van Van de Voort Tuinen.",
  alternates: { canonical: absoluteUrl("/reviews") },
};

export default function GoogleReviewsPage() {
  return (
    <div className="approved-site">
      <Header />
      <main id="main" className="service-page poc-container google-review-page">
        <nav aria-label="Broodkruimel" className="service-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Google reviews</span>
        </nav>
        <h1>Uitgelichte Google-reviews</h1>
        <p className="google-review-intro">
          Een selectie van drie volledige reviews. Dit is geen volledige lijst;
          bekijk alle actuele reviews op Google.
        </p>
        <GoogleReviewCards />
        <a
          className="service-text-link google-review-profile-link"
          href={googleBusiness.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Lees alle reviews op Google Maps
        </a>
      </main>
      <Footer />
    </div>
  );
}