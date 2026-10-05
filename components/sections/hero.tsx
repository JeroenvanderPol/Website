import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
export function Hero() {
  return (
    <section className="poc-hero">
      <Image
        src="/images/original-site/project-01.jpg"
        alt="Tuin met gazon, beplanting en terras bij de woning"
        fill
        priority
        sizes="100vw"
      />
      <div className="poc-hero-panel" aria-hidden="true" />
      <div className="poc-hero-shade" />
      <div className="poc-hero-copy">
        <h1>
          Uw tuin.
          <br />
          Onze handen.
        </h1>
        <p>
          Tuinaanleg, tuinonderhoud en een groen gazon.
          <br />
          {" "}Van de eerste voorbereiding tot het laatste groen.
        </p>
        <div className="poc-actions">
          <Link className="poc-button" href="#contact">
            Offerte aanvragen <ArrowUpRight size={18} />
          </Link>
          <a href="tel:+31683259762">
            <Phone size={17} /> Bel direct
          </a>
        </div>
      </div>
    </section>
  );
}
