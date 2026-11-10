import business from "@/data/business.json";
import googleBusiness from "@/data/google-business.json";
import services from "@/data/services.json";
import { serviceDetails } from "@/data/service-details";
import { homepageFaq } from "@/data/faq";
import { isIndexable, locations } from "@/lib/locations";
import { projectFacts, projects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const serviceTitles = services.map((service) => service.title.toLowerCase());
  const serviceList = `${serviceTitles.slice(0, -1).join(", ")} en ${serviceTitles.at(-1)}`;
  const verifiedProjects = projects.filter(
    (project) => project.status === "confirmed" && project.contentStatus === "verified",
  );

  const lines = [
    `# ${business.name}`,
    "",
    `> Hoveniersbedrijf uit ${business.city} (Noord-Brabant) voor ${serviceList}. Eigenaar Randy werkt al tien jaar in tuinen.`,
    "",
    "## Contact",
    "",
    `- Adres: ${business.address}, ${business.postcode} ${business.city}`,
    `- Telefoon: ${business.phone}`,
    `- E-mail: ${business.email}`,
    `- KvK: ${business.kvk}`,
    `- [Offerte aanvragen](${absoluteUrl("/contact")})`,
    "",
    "## Diensten",
    "",
    ...services.map(
      (service) =>
        `- [${service.title}](${absoluteUrl(`/diensten/${service.slug}`)}): ${serviceDetails[service.slug]?.intro ?? service.description}`,
    ),
    "",
    "## Werkgebied",
    "",
    business.workArea.join(", "),
    "",
    ...locations
      .filter(isIndexable)
      .map((location) => `- [Hovenier en tuinaanleg in ${location.name}](${absoluteUrl(`/hovenier/${location.slug}`)})`),
    "",
    "## Projecten",
    "",
    ...verifiedProjects.map((project) => {
      const facts = projectFacts(project).map((fact) => `${fact.label.toLowerCase()}: ${fact.value}`);
      return `- [${project.title} in ${project.city}](${absoluteUrl(`/projecten/${project.slug}`)}): ${project.summary}${facts.length ? ` (${facts.join("; ")})` : ""}`;
    }),
    "",
    "## Veelgestelde vragen",
    "",
    ...homepageFaq.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    "",
    "## Reviews",
    "",
    `- [Uitgelichte Google-reviews](${absoluteUrl("/reviews")})`,
    `- [Alle reviews op Google Maps](${googleBusiness.mapsUrl})`,
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
