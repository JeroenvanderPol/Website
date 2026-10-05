import { socialMetadata } from "@/lib/social-metadata";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${siteUrl}/` },
  ...socialMetadata("Van de Voort Tuinen | Tuinontwerp, Aanleg & Onderhoud", "Tuinaanleg, tuinonderhoud, gras aanleggen en bestrating aanleggen vanuit Sint-Michielsgestel.", `${siteUrl}/`),
};

export default function Home() {
  return (
    <div className="approved-site">
      <Header />
      <main id="main">
        <Hero />
        <div className="relative z-20 bg-background">
          <Services />
          <About />
          <Portfolio />
          <Testimonials />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
