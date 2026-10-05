import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import services from "@/data/services.json";
export function Services() {
  return (
    <section id="diensten" className="poc-section poc-container">
      <span id="Wat-doen-wij" className="poc-anchor" />
      <div className="poc-heading">
        <h2>Van plan naar buitenruimte.</h2>
        <p>Onze vier diensten voor uw tuin, overzichtelijk bij elkaar.</p>
      </div>
      <div className="poc-services">
        {services.map((service) => (
          <article key={service.title}>
            <Image
              src={service.icon}
              alt=""
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 90vw"
              className="poc-service-image"
            />
            <div className="poc-service-shade" aria-hidden="true" />
            <div className="poc-service-content">
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <Link
                href={`/diensten/${service.slug}`}
                className="poc-service-link"
                aria-label={`Meer over ${service.title}`}
              >
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
