import { ChevronDown } from "lucide-react";
import { homepageFaq } from "@/data/faq";

export function Faq() {
  return (
    <section
      id="veelgestelde-vragen"
      className="poc-section poc-container poc-faq"
      aria-labelledby="faq-heading"
    >
      <div className="poc-heading">
        <h2 id="faq-heading">Veelgestelde vragen</h2>
        <p>Antwoorden op vragen die we vaak krijgen over aanleg, onderhoud en werkwijze.</p>
      </div>
      <div className="poc-faq-list">
        {homepageFaq.map((faq) => (
          <details key={faq.question}>
            <summary>
              <h3>{faq.question}</h3>
              <ChevronDown size={20} aria-hidden="true" />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
