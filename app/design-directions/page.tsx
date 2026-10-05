import Link from "next/link";
import styles from "./directions.module.css";
const options = [
  {
    id: "poc",
    title: "POC verfijnd",
    summary: "Het vertrouwde vertrekpunt",
    body: "Behoud de grote foto, centrale boodschap en herkenbare opbouw. Maak tekst leesbaarder, breng rust en laat onnodige effecten weg.",
    trade: "De kleinste verandering. Vertrouwd, maar minder onderscheidend.",
  },
  {
    id: "garden",
    title: "De tuin centraal",
    summary: "Het resultaat krijgt de ruimte",
    body: "Een ruime, lichte presentatie met een brede tuinpanorama en een beeldend projectoverzicht. Diensten ondersteunen het werk.",
    trade:
      "Meer aandacht voor fotografie. Vraagt om een sterke selectie beelden.",
  },
  {
    id: "practical",
    title: "Helder & praktisch",
    summary: "Snel zien wat er mogelijk is",
    body: "Een diepgroene basis, een compact aanbod en duidelijke routes voor de vier tuindiensten. Contact blijft dichtbij.",
    trade: "Directer en zakelijker. Minder nadruk op de sfeer van de tuin.",
  },
];
export default function Directions() {
  return (
    <main className={styles.board}>
      <header className={styles.boardHeader}>
        <div>
          <h1>Welke richting past bij Van de Voort?</h1>
          <p>
            Richting 1 is gekozen: POC verfijnd. De drie voorstellen blijven
            hier beschikbaar ter vergelijking.
          </p>
        </div>
        <Link href="/">Bekijk de gekozen homepage</Link>
      </header>
      <div className={styles.options}>
        {options.map((o, i) => (
          <article className={styles.option} key={o.id}>
            <div className={styles.optionText}>
              <span>RICHTING {i + 1}</span>
              <h2>{o.title}</h2>
              <strong>{o.summary}</strong>
              <p>{o.body}</p>
            </div>
            <Link
              className={styles.thumbLink}
              href={`/design-directions/${o.id}`}
              aria-label={`Open volledige preview: ${o.title}`}
            >
              <div className={styles.thumb}>
                <iframe
                  title={`Voorbeeld ${o.title}`}
                  src={`/design-directions/${o.id}?embed=1`}
                  tabIndex={-1}
                  loading="eager"
                />
              </div>
            </Link>
            <div className={styles.optionBottom}>
              <p>{o.trade}</p>
              <Link href={`/design-directions/${o.id}`}>
                Bekijk richting {i + 1}
              </Link>
            </div>
          </article>
        ))}
      </div>
      <footer className={styles.boardFooter}>
        Gekozen: richting 1 — POC verfijnd. Bekijk de uitgewerkte homepage met
        alle originele projectfoto’s.
      </footer>
    </main>
  );
}
