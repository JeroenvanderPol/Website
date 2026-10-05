import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
              width={70}
              height={56}
              className="poc-service-icon"
            />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            
            <div className="service-card-actions">
            <Link href={`/diensten/${service.slug}`} className="service-detail-link">
              Meer over {service.title.toLowerCase()} <ArrowUpRight size={16} />
            </Link>
            
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
