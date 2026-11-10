import { ChevronDown } from "lucide-react";
import { homepageFaq } from "@/data/faq";
import { absoluteUrl } from "@/lib/site";

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": absoluteUrl("/#veelgestelde-vragen"),
  mainEntity: homepageFaq.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function Faq() {
  return (
    <section
      id="veelgestelde-vragen"
      className="poc-section poc-container poc-faq"
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
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
