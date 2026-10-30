import Link from "next/link";
import Image from "next/image";
import business from "@/data/business.json";
import services from "@/data/services.json";
export function Footer() {
  return (
    <footer className="poc-footer">
      <div className="poc-container">
        <div className="poc-footer-grid">
          <div className="poc-footer-brand-column">
            <div className="poc-footer-brand">
              <Image
                src="/images/original-site/logo.png"
                alt="Van de Voort Tuinen"
                width={300}
                height={80}
              />
            </div>
          </div>
          <div>
            <h2>Diensten</h2>
            {services.map((s) => (
              <Link href={`/diensten/${s.slug}`} key={s.title}>
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h2>Werkgebied</h2>
            <ul className="poc-areas">
              {business.workArea.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="poc-footer-bottom">
          <p>© {new Date().getFullYear()} Van de Voort Tuinen</p>
          <nav aria-label="Footernavigatie">
            <Link href="/#diensten">Diensten</Link>
            <Link href="/#over-ons">Over ons</Link>
            <Link href="/#portfolio">Ons werk</Link>
            <Link href="/#reviews">Reviews</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacyverklaring</Link>
            <Link href="/voorwaarden">Gebruiksvoorwaarden</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
