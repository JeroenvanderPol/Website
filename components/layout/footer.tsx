import Link from "next/link";
import business from "@/data/business.json";
import services from "@/data/services.json";
import { Phone, Mail, MapPin } from "lucide-react";
export function Footer() {
  return (
    <footer className="poc-footer">
      <div className="poc-container">
        <div className="poc-footer-grid">
          <div>
            <h2>Van de Voort Tuinen</h2>
            <p>Het is onze passie om al het groen te laten stralen!</p>
            <a className="footer-contact-row" href="tel:+31683259762"><Phone aria-hidden="true" size={18} /><span>{business.phone}</span></a>
            <a className="footer-contact-row" href={`mailto:${business.email}`}><Mail aria-hidden="true" size={18} /><span>{business.email}</span></a>
            <address className="footer-contact-row"><MapPin aria-hidden="true" size={18} /><span>
              {business.address}
              <br />
              {business.postcode} {business.city}
            </span></address>
            <p>KvK: {business.kvk}</p>
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
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
