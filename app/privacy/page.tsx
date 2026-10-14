import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import business from "@/data/business.json";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacyverklaring | Van de Voort Tuinen",
  description: "Lees hoe Van de Voort Tuinen met persoonsgegevens omgaat.",
  alternates: { canonical: absoluteUrl("/privacy") },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="approved-site">
      <Header />
      <main id="main" className="service-page poc-container privacy-page">
        <nav aria-label="Broodkruimel" className="service-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Privacyverklaring</span>
        </nav>
        <h1>Privacyverklaring</h1>
        <p className="privacy-draft-note" role="note">
          Concept voor eigenaarcontrole. Controleer vóór publieke ingebruikname
          vooral de bewaartermijn en of de archiefmap volgens deze termijn wordt
          opgeschoond.
        </p>

        <article className="privacy-content">
          <section>
            <h2>Wie is verantwoordelijk?</h2>
            <p>
              Van de Voort Tuinen is een eenmanszaak, ingeschreven bij de Kamer
              van Koophandel onder nummer {business.kvk}. Het correspondentieadres
              is {business.address}, {business.postcode} {business.city}. U kunt
              contact opnemen via <a href={`mailto:${business.email}`}>{business.email}</a> of {business.phone}.
            </p>
          </section>

          <section>
            <h2>Welke gegevens gebruiken we?</h2>
            <p>
              Als u het contactformulier invult, verwerken we uw naam, e-mailadres
              en bericht. Uw telefoonnummer en onderwerp zijn optioneel. De
              verplichte gegevens zijn nodig om uw aanvraag te kunnen behandelen;
              zonder naam, e-mailadres of bericht kunnen we niet reageren. De
              website gebruikt uw gegevens niet voor nieuwsbrieven of ongevraagde
              reclame.
            </p>
          </section>

          <section>
            <h2>Waarom en op welke grondslag?</h2>
            <p>
              We gebruiken uw gegevens om uw vraag te beantwoorden en, als u
              daarom vraagt, uw project of offerte te bespreken. Voor een
              offerteaanvraag is de grondslag het nemen van stappen op uw verzoek
              vóór het sluiten van een overeenkomst. Voor andere vragen is de
              grondslag ons gerechtvaardigd belang om op zakelijke berichten te
              reageren. Het verplichte vinkje bij het formulier bevestigt dat u
              deze verklaring hebt gelezen; het is niet de grondslag voor de
              verwerking.
            </p>
          </section>

          <section>
            <h2>Wie ontvangt uw gegevens?</h2>
            <p>
              Een formulierbericht wordt via de Strato-maildienst bezorgd op
              {" "}
              <a href={`mailto:${business.email}`}>{business.email}</a>. De
              berichten worden in de mailbox behandeld en kunnen daar in een
              archiefmap worden bewaard. De website wordt gehost door Vercel; dit
              platform verwerkt ook technische verzoekgegevens die nodig zijn
              voor het leveren en beveiligen van de website.
            </p>
            <p>
              In productie gebruikt de site Vercel Web Analytics voor
              geaggregeerde bezoekstatistieken. Volgens Vercel gebruikt deze
              analytics geen cookies en geen persoonlijke identificatoren. Als
              Google Places-reviews worden geactiveerd, doet de server daarvoor
              verzoeken aan Google. Uw contactformuliergegevens worden niet met
              die reviewverzoeken meegestuurd. Bekijk ook het{ " " }
              <a href="https://cloud.google.com/maps-platform/terms" target="_blank" rel="noreferrer">
                Google Maps Platform-voorwaarden
              </a>
              {" "}en het{ " " }
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                privacybeleid van Google
              </a>
              . Bekijk ook onze <Link href="/voorwaarden">gebruiksvoorwaarden</Link>.
            </p>
            <p>
              Controleer vóór definitieve publicatie in de actuele
              leveranciersvoorwaarden of Vercel, Strato of Google gegevens
              buiten de Europese Economische Ruimte verwerken en welke passende
              waarborgen daarvoor gelden.
            </p>
          </section>

          <section>
            <h2>Hoe lang bewaren we gegevens?</h2>
            <p>
              Voorgesteld beleid: contactaanvragen die niet tot een opdracht
              leiden verwijderen we uiterlijk 12 maanden na het laatste contact
              uit de mailbox en de archiefmap. Gegevens die nodig zijn voor een
              uitgevoerde opdracht of wettelijke administratie bewaren we apart
              zolang dat daarvoor noodzakelijk of wettelijk verplicht is. De
              eigenaar moet bevestigen dat de archiefmap volgens dit beleid wordt
              opgeschoond voordat deze verklaring als definitief wordt gebruikt.
            </p>
          </section>

          <section>
            <h2>Uw rechten</h2>
            <p>
              U kunt vragen om inzage, correctie of verwijdering van uw gegevens,
              of om beperking van de verwerking. Waar de wet dat toestaat, kunt u
              bezwaar maken of vragen om overdracht van gegevens. Stuur uw verzoek
              naar <a href={`mailto:${business.email}`}>{business.email}</a>. U
              kunt ook een klacht indienen bij de
              {" "}
              <a href="https://autoriteitpersoonsgegevens.nl/" target="_blank" rel="noreferrer">
                Autoriteit Persoonsgegevens
              </a>
              .
            </p>
          </section>

          <section>
            <h2>Browseropslag en wijzigingen</h2>
            <p>
              De site kan lokale browseropslag gebruiken voor de weergavevoorkeur.
              Er worden door deze site geen advertentiecookies geplaatst. Deze
              verklaring kan worden aangepast wanneer de werkwijze of gebruikte
              diensten veranderen.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}