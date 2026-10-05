import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Phone } from "lucide-react";
import s from "../directions.module.css";
const names = {
  poc: "POC verfijnd",
  garden: "De tuin centraal",
  practical: "Helder & praktisch",
};
import services from "@/data/services.json";
export default async function Direction({
  params,
  searchParams,
}: {
  params: Promise<{ direction: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const { direction } = await params;
  const { embed } = await searchParams;
  if (!(direction in names)) notFound();
  const id = direction as keyof typeof names;
  return (
    <main className={`${s.site} ${s[id]}`}>
      {!embed && (
        <aside className={s.previewBar}>
          <Link href="/design-directions">Alle drie richtingen</Link>
          <span>Preview — {names[id]}</span>
          <Link href="/">Gekozen homepage</Link>
        </aside>
      )}
      <header className={s.nav}>
        <Link href="/design-directions" className={s.logo}>
          <Image
            src="/images/logo-original.png"
            alt="Van de Voort Tuinen"
            fill
            sizes="200px"
            priority
          />
        </Link>
        <nav aria-label="Voorbeeldnavigatie">
          <a href="#diensten">Diensten</a>
          <a href="#werk">Ons werk</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className={s.button} href="#contact">
          Offerte aanvragen <ArrowUpRight size={16} />
        </a>
      </header>
      <section className={s.hero}>
        <div className={s.heroText}>
          <h1>
            {id === "poc" ? (
              <>
                Uw tuin.
                <br />
                Onze handen.
              </>
            ) : id === "garden" ? (
              <>
                Meer ruimte
                <br />
                voor buiten.
              </>
            ) : (
              <>
                Tuinplannen?
                <br />
                Begin bij de basis.
              </>
            )}
          </h1>
          <p>
            Tuinaanleg, tuinonderhoud en een groen gazon.
            <br />
            Van de eerste voorbereiding tot het laatste groen.
          </p>
          <div className={s.actions}>
            <a className={s.button} href="#contact">
              Offerte aanvragen <ArrowUpRight size={17} />
            </a>
            <a className={s.call} href="#contact">
              <Phone size={16} /> Bel direct
            </a>
          </div>
        </div>
        <div className={s.heroImage}>
          <Image
            src={`/images/original-site/project-${id === "practical" ? "08" : "01"}.jpg`}
            alt={
              id === "practical"
                ? "Grond voorbereid voor de aanleg van een tuin"
                : "Tuin met gazon, beplanting en een terras"
            }
            fill
            priority
            sizes="100vw"
          />
        </div>
        {id === "garden" && (
          <div className={s.photoCaption}>
            Een plek om thuis te komen. Ook buiten.
          </div>
        )}
      </section>
      {id === "garden" && (
        <section id="werk" className={s.work}>
          <div className={s.sectionHeading}>
            <h2>Tuinen om in te leven.</h2>
            <p>Een selectie uit het werk van Van de Voort Tuinen.</p>
          </div>
          <div className={s.photos}>
            {["19", "02", "13"].map((n, i) => (
              <figure key={n}>
                <Image
                  src={`/images/original-site/project-${n}.jpg`}
                  alt={
                    [
                      "Terras en gazon bij een overkapping",
                      "Nieuw gazon en plantvakken",
                      "Klinkers in visgraatpatroon",
                    ][i]
                  }
                  width={900}
                  height={700}
                />
                <figcaption>
                  {
                    [
                      "Buiten wordt leefruimte",
                      "Een groene basis",
                      "Een terras met karakter",
                    ][i]
                  }
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <section id="diensten" className={s.services}>
        <div className={s.sectionHeading}>
          <h2>
            {id === "practical"
              ? "Wat wilt u aanpakken?"
              : "Van plan naar buitenruimte."}
          </h2>
          <p>Vier diensten voor aanleg en verzorging van uw tuin.</p>
        </div>
        <div className={s.serviceList}>
          {services.map(({ title, description: body }) => (
            <a key={title} href="#contact">
              <h3>
                {title}
                <ArrowUpRight size={20} />
              </h3>
              <p>{body}</p>
            </a>
          ))}
        </div>
      </section>
      {id !== "garden" && (
        <section id="werk" className={s.work}>
          <div className={s.sectionHeading}>
            <h2>
              {id === "poc"
                ? "Bekijk ons werk"
                : "Van voorbereiding tot resultaat."}
            </h2>
            <p>Projectfoto’s van de oorspronkelijke website.</p>
          </div>
          <div className={s.photos}>
            {["19", "13", "02"].map((n, i) => (
              <figure key={n}>
                <Image
                  src={`/images/original-site/project-${n}.jpg`}
                  alt={
                    [
                      "Tuin met terras en overkapping",
                      "Klinkers in visgraatpatroon",
                      "Nieuw gazon en plantvakken",
                    ][i]
                  }
                  width={900}
                  height={700}
                />
                <figcaption>
                  {["Tuinaanleg", "Tuin aanleggen", "Gras & beplanting"][i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <section id="contact" className={s.contact}>
        <div>
          <h2>Vertel ons over uw plannen.</h2>
          <p>Een nieuwe tuin, een groen gazon of hulp bij het onderhoud?</p>
        </div>
        <div>
          <a className={s.button} href="mailto:info@vandevoortgrondwerken.nl">
            Offerte aanvragen <ArrowUpRight size={17} />
          </a>
          <a className={s.call} href="tel:+31683259762">
            <Phone size={17} /> 06 83 25 97 62
          </a>
        </div>
      </section>
      <footer className={s.footer}>
        <strong>Van de Voort Tuinen</strong>
        <span>
          Tuinaanleg · Tuinonderhoud · Bestrating aanleggen · Gras aanleggen
        </span>
      </footer>
    </main>
  );
}
