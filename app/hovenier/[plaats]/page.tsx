import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectGrid } from "@/components/projects/project-grid";
import { ServiceCards } from "@/components/sections/services";
import services from "@/data/services.json";
import business from "@/data/business.json";
import { isIndexable, locations } from "@/lib/locations";
import { absoluteUrl, isPreview } from "@/lib/site";

type Props = { params: Promise<{ plaats: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return locations.map(({ slug }) => ({ plaats: slug }));
}

async function getLocation(params: Props["params"]) {
  const { plaats } = await params;
  const location = locations.find((item) => item.slug === plaats);
  if (!location) notFound();
  return location;
}

const serviceTitles = services.map((service) => service.title.toLowerCase());
const serviceList = `${serviceTitles.slice(0, -1).join(", ")} en ${serviceTitles.at(-1)}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = await getLocation(params);
  const title = `Hovenier & tuinaanleg ${location.name} | Van de Voort Tuinen`;
  const description = `Hovenier of tuinaanleg in ${location.name}? Van de Voort Tuinen uit ${business.city} helpt met ${serviceList}. Bekijk ons werk en vraag een offerte aan.`;
  const url = absoluteUrl(`/hovenier/${location.slug}`);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: isIndexable(location) && !isPreview, follow: !isPreview },
    ...socialMetadata(title, description, url),
  };
}

export default async function LocationPage({ params }: Props) {
  const location = await getLocation(params);
  const { name } = location;
  const isHome = name === business.city;
  const url = absoluteUrl(`/hovenier/${location.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Hovenier en tuinaanleg in ${name}`,
        serviceType: ["Hovenier", "Tuinaanleg"],
        url,
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: { "@type": "City", name },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: `Hovenier ${name}`, item: url },
        ],
      },
    ],
  };

  return (
    <div className="approved-site">
      <Header />
      <main id="main" className="service-page poc-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
        <nav aria-label="Broodkruimel" className="service-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Hovenier {name}</span>
        </nav>
        <h1 className="location-title">Hovenier en tuinaanleg in {name}</h1>
        <p className="service-lead">
          {isHome
            ? `Van de Voort Tuinen is gevestigd aan de ${business.address} in ${name}. Vanuit hier helpen we met ${serviceList}.`
            : `Zoekt u een hovenier voor tuinaanleg of onderhoud in ${name}? Van de Voort Tuinen uit ${business.city} helpt in ${name} met ${serviceList}.`}
        </p>
        <div className="service-actions">
          <Link className="poc-button" href="/#contact">
            Offerte aanvragen
          </Link>
          <a className="service-text-link" href={`tel:${business.phone.replace(/\s/g, "")}`}>
            Bel {business.phone}
          </a>
        </div>

        <section className="service-area" aria-labelledby="location-services">
          <h2 id="location-services">Onze diensten in {name}</h2>
          <div className="location-services">
            <ServiceCards />
          </div>
        </section>

        {location.projects.length > 0 ? (
          <section className="service-work" aria-labelledby="location-work">
            <h2 id="location-work">Ons werk in {name}</h2>
            <p>
              {location.projects.length === 1
                ? `Een project dat we in ${name} hebben uitgevoerd.`
                : `${location.projects.length} projecten die we in ${name} hebben uitgevoerd.`}
            </p>
            <ProjectGrid projects={location.projects} showProjectLink={false} />
          </section>
        ) : (
          <section className="service-work" aria-labelledby="location-work">
            <h2 id="location-work">Ons werk in de regio</h2>
            <p>Bekijk foto&apos;s van tuinen die we in de omgeving hebben aangelegd en onderhouden.</p>
            <Link className="service-text-link" href="/projecten">
              Bekijk al het werk
            </Link>
          </section>
        )}

        <section className="service-preparation service-area" aria-labelledby="location-contact">
          <h2 id="location-contact">Plannen voor uw tuin in {name}?</h2>
          <p>
            Vertel ons hoe u de tuin wilt gebruiken en welke werkzaamheden u zoekt. Foto&apos;s van de
            huidige situatie en globale afmetingen helpen om uw plannen te bespreken.
          </p>
          <Link className="service-text-link" href="/#contact">
            Vertel ons over uw tuin
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
