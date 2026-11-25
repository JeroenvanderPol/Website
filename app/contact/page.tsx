import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Contact } from "@/components/sections/contact";
import { absoluteUrl } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Contact | Van de Voort Tuinen";
const description =
  "Neem contact op met Van de Voort Tuinen voor uw tuin, gazon of onderhoud.";
const url = absoluteUrl("/contact");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  ...socialMetadata(title, description, url),
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