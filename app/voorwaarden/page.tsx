import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import business from "@/data/business.json";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gebruiksvoorwaarden | Van de Voort Tuinen",
  description: "Voorwaarden voor het gebruik van de website van Van de Voort Tuinen.",
  alternates: { canonical: absoluteUrl("/voorwaarden") },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="approved-site">
      <Header />
      <main id="main" className="service-page poc-container legal-page">
        <nav aria-label="Broodkruimel" className="service-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Gebruiksvoorwaarden</span>
        </nav>
        <h1>Gebruiksvoorwaarden</h1>

        <article className="legal-content">
          <section>
            <h2>Gebruik van deze website</h2>
            <p>
              Deze website wordt aangeboden door Van de Voort Tuinen, een
              eenmanszaak met KvK-nummer {business.kvk}, gevestigd aan
              {" "}{business.address}, {business.postcode} {business.city}. U mag de
              website gebruiken voor persoonlijk, normaal bezoek en om informatie
              over onze diensten of projecten te bekijken.
            </p>
          </section>

          <section>
            <h2>Informatie en opdrachten</h2>
            <p>
              We stellen de informatie op deze website zorgvuldig samen, maar
              kunnen niet garanderen dat alle informatie altijd volledig of
              actueel is. Foto’s geven voorbeelden van eerder werk en vormen geen
              toezegging dat een project, materiaal of resultaat identiek zal
              zijn. Werkzaamheden, planning en prijs worden per aanvraag
              besproken. Voor een opdracht gelden de afspraken in de afzonderlijke
              offerte of overeenkomst.
            </p>
          </section>

          <section>
            <h2>Foto’s, teksten en ander materiaal</h2>
            <p>
              De teksten, foto’s, logo’s en andere materialen op deze website
              kunnen beschermd zijn door auteursrecht of andere rechten. Gebruik
              of verspreid materiaal niet opnieuw zonder toestemming van de
              rechthebbende, behalve waar de wet dat toestaat. Materiaal van derde
              partijen blijft van die partijen.
            </p>
          </section>

          <section>
            <h2>Google Maps en reviews</h2>
            <p>
              Op de pagina met Google-reviews tonen we drie handmatig
              geselecteerde korte fragmenten uit openbare reviews op het profiel.
              Deze selectie is niet volledig en kan verouderen; de volledige en
              actuele reviews staan op Google. De korte fragmenten zijn niet
              inhoudelijk aangepast. Het gebruik van Google Maps-content valt ook onder de
              {" "}
              <a href="https://cloud.google.com/maps-platform/terms" target="_blank" rel="noreferrer">
                Google Maps Platform-voorwaarden
              </a>
              {" "}en het{ " " }
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                privacybeleid van Google
              </a>
              . De manier waarop we persoonsgegevens verwerken staat in onze
              {" "}
              <Link href="/privacy">privacyverklaring</Link>.
            </p>
          </section>

          <section>
            <h2>Links naar andere websites</h2>
            <p>
              Deze website kan links bevatten naar externe websites, waaronder
              Google Maps. De inhoud, beschikbaarheid en privacypraktijken van die
              websites vallen onder de verantwoordelijkheid van hun eigen
              aanbieders.
            </p>
          </section>

          <section>
            <h2>Beschikbaarheid en aansprakelijkheid</h2>
            <p>
              We proberen de website beschikbaar en veilig te houden, maar kunnen
              tijdelijke onderbrekingen of fouten niet volledig uitsluiten. Voor
              zover wettelijk toegestaan zijn we niet aansprakelijk voor schade
              die uitsluitend ontstaat door het gebruik van algemene
              website-informatie of tijdelijke onbeschikbaarheid. Dit beperkt
              geen rechten die u op grond van dwingend recht heeft.
            </p>
          </section>

          <section>
            <h2>Contact en wijzigingen</h2>
            <p>
              Vragen over deze voorwaarden kunt u sturen naar
              {" "}<a href={`mailto:${business.email}`}>{business.email}</a> of
              telefonisch stellen via {business.phone}. We kunnen deze
              voorwaarden aanpassen wanneer de website of de gebruikte diensten
              veranderen. De meest recente versie staat op deze pagina.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
