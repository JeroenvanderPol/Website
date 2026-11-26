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
import { isIndexable, locations, type Location } from "@/lib/locations";
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

function formatList(items: string[]) {
  if (items.length < 2) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} en ${items.at(-1)}`;
}

function getLocationServices(location: Location) {
  const projectServices = services.filter((service) =>
    location.projects.some((project) => project.tags.includes(service.title)),
  );
  return projectServices.length > 0 ? projectServices : services;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = await getLocation(params);
  const projectCount = location.projects.length;
  const projectLabel = projectCount === 1 ? "tuinproject" : "tuinprojecten";
  const localServices = getLocationServices(location).map((service) =>
    service.title.toLowerCase(),
  );
  const serviceList = formatList(localServices);
  const title = location.inWorkArea
    ? `Hovenier en tuinaanleg in ${location.name} | Van de Voort Tuinen`
    : `Tuinprojecten in ${location.name} | Van de Voort Tuinen`;
  const description =
    projectCount > 0
      ? location.inWorkArea
        ? `Bekijk ${projectCount} ${projectLabel} in ${location.name}, met werk aan ${serviceList}. Van de Voort Tuinen is gevestigd in ${business.city}.`
        : `Bekijk ${projectCount} afgeronde ${projectLabel} in ${location.name}, met werk aan ${serviceList} van Van de Voort Tuinen.`
      : `Hovenier in ${location.name}? Van de Voort Tuinen uit ${business.city} helpt met ${formatList(serviceTitles)}. Bekijk ons werk en neem contact op.`;
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
  const localServices = getLocationServices(location);
  const localServiceNames = localServices.map((service) => service.title.toLowerCase());
  const localServiceList = formatList(localServiceNames);
  const projectCount = location.projects.length;
  const projectLabel = projectCount === 1 ? "project" : "projecten";
  const url = absoluteUrl(`/hovenier/${location.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      ...(location.inWorkArea && projectCount > 0
        ? [
            {
              "@type": "Service",
              "@id": `${url}#service`,
              name: `${formatList(localServices.map((service) => service.title))} in ${name}`,
              serviceType: localServices.map((service) => service.title),
              url,
              provider: { "@id": absoluteUrl("/#business") },
              areaServed: { "@type": "City", name },
            },
          ]
        : []),
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
          <span aria-current="page">
            {location.inWorkArea ? `Hovenier ${name}` : `Projecten in ${name}`}
          </span>
        </nav>
        <h1 className="location-title">
          {location.inWorkArea
            ? `Hovenier en tuinaanleg in ${name}`
            : `Tuinprojecten in ${name}`}
        </h1>
        <p className="service-lead">
          {location.inWorkArea
            ? `Zoekt u een hovenier voor tuinaanleg of onderhoud in ${name}? Van de Voort Tuinen uit ${business.city} helpt met ${formatList(serviceTitles)}.`
            : `Deze pagina toont ${projectCount} afgeronde ${projectLabel} in ${name}. De projecten laten werk aan ${localServiceList} zien. Neem contact op om te bespreken of we uw plannen kunnen aannemen.`}
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
          <h2 id="location-services">
            {location.inWorkArea ? `Onze diensten in ${name}` : "Onze diensten"}
          </h2>
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
          <h2 id="location-contact">
            {location.inWorkArea
              ? `Plannen voor uw tuin in ${name}?`
              : `Plannen bespreken?`}
          </h2>
          <p>
            {location.inWorkArea
              ? "Vertel ons hoe u de tuin wilt gebruiken en welke werkzaamheden u zoekt. Foto's van de huidige situatie en globale afmetingen helpen om uw plannen te bespreken."
              : `Neem contact op om te bespreken of Van de Voort Tuinen uw plannen in ${name} kan aannemen.`}
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
