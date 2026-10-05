import Image from "next/image";
import Link from "next/link";
export function About() {
  return (
    <section id="over-ons" className="poc-about">
      <div className="poc-container poc-about-grid">
        <Image
          src="/images/original-site/project-19.jpg"
          alt="Tuin met gazon, zithoek en overkapping"
          width={1000}
          height={650}
        />
        <div>
          <h2>
            Passie voor groen.
            <br />
            Aandacht voor de basis.
          </h2>
          <p>Het is onze passie om al het groen te laten stralen!</p>
          <p>
            Bij Van de Voort Tuinen kunt u terecht voor tuinaanleg,
            tuinonderhoud, bestrating aanleggen en het aanleggen van gras. Van een
            nieuwe tuin tot de verzorging van uw gazon en beplanting.
          </p>
          <p>
            Heeft u een plan voor uw tuin of een vraag over de mogelijkheden?
            Neem contact op om uw wensen te bespreken. Ook zakelijke aanvragen
            zijn welkom.
          </p>
          <Link className="poc-button" href="#contact">
            Vertel ons over uw project
          </Link>
        </div>
      </div>
    </section>
  );
}
