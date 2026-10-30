import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Contact } from "@/components/sections/contact";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Van de Voort Tuinen",
  description:
    "Neem contact op met Van de Voort Tuinen voor uw tuin, gazon of onderhoud.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <div className="approved-site">
      <Header />
      <main id="main">
        <Contact standalone />
      </main>
      <Footer />
    </div>
  );
}