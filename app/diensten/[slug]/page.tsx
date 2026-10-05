import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import services from "@/data/services.json";
import business from "@/data/business.json";
import { projects as photos } from "@/lib/projects";
import { ProjectGrid } from "@/components/projects/project-grid";
import { serviceDetails } from "@/data/service-details";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const title = `${service.title} in regio Sint-Michielsgestel | Van de Voort Tuinen`;
  const description = serviceDetails[slug].intro;
  const url = absoluteUrl(`/diensten/${slug}`);
  return { title: { absolute: title }, description, alternates: { canonical: url },
    ...socialMetadata(title, description, url) };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const content = serviceDetails[slug];
  const relatedPhotos = photos.filter((photo) => photo.tags.includes(service.title)).slice(0, 3);
  const url = absoluteUrl(`/diensten/${slug}`);
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, name: service.title, description: content.intro,
      url, provider: { "@id": absoluteUrl("/#business") }, areaServed: business.workArea },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: service.title, item: url },
    ] },
  ] };
  return (
    <div className="approved-site">
      <Header />
      <main id="main" className="service-page poc-container">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <nav aria-label="Broodkruimel" className="service-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
        <div className="service-intro">
          <div>
            <h1>{service.title}</h1>
            <p className="service-lead">{content.intro}</p>
            <p>Vanuit {business.city}, voor tuinen in onder meer Den Bosch, Rosmalen en Vught.</p>
            <div className="service-actions"><Link className="poc-button" href="/#contact">Offerte aanvragen</Link><a className="service-text-link" href="tel:+31683259762">Bel direct</a></div>
          </div>
          <Image className="service-illustration" src={service.icon} alt="" width={160} height={130} />
        </div>
        <div className="service-body">
          <section aria-labelledby="service-offer">
            <h2 id="service-offer">{content.heading}</h2>
            {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </section>
          <section className="service-preparation" aria-labelledby="service-plans">
            <h2 id="service-plans">Uw plannen bespreken</h2>
            <p>{content.preparation}</p>
            <p>De omvang van het werk, de situatie ter plaatse en de bereikbaarheid bepalen mede wat er nodig is. Neem contact op voor een offerte voor uw situatie.</p>
            <Link className="service-text-link" href="/#contact">Vertel ons over uw tuin</Link>
          </section>
        </div>
        {relatedPhotos.length > 0 && <section className="service-work" aria-labelledby="service-work">
          <h2 id="service-work">Een kijkje in ons werk</h2>
          <ProjectGrid projects={relatedPhotos} />
          <Link className="service-text-link" href="/#portfolio">Bekijk het volledige portfolio</Link>
        </section>}
        <section className="service-area" aria-labelledby="service-area">
          <h2 id="service-area">Ons werkgebied</h2>
          <p>Van de Voort Tuinen is gevestigd in {business.city}. Ons werkgebied omvat {business.workArea.join(", ")}. Neem contact op om uw locatie en werkzaamheden te bespreken.</p>
        </section>
        <nav className="service-related" aria-label="Andere diensten"><h2>Ook voor uw tuin</h2>{services.filter((item) => item.slug !== slug).map((item) => <Link className="service-text-link" key={item.slug} href={`/diensten/${item.slug}`}>{item.title}</Link>)}<Link href="/#diensten" className="service-text-link">Alle diensten op de homepage</Link></nav>
      </main>
      <Footer />
    </div>
  );
}
