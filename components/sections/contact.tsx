"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Building2,
  ClipboardList,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Send,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import business from "@/data/business.json";
import { validateContact, type ContactErrors, type ContactField } from "@/lib/contact";
export function Contact({ standalone = false }: { standalone?: boolean }) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const pending = useRef(false);
  function fieldProps(field: ContactField) {
    return { "aria-invalid": !!errors[field], "aria-describedby": errors[field] ? `${field}-error` : undefined };
  }
  function error(field: ContactField) {
    return errors[field] ? <p className="contact-error" id={`${field}-error`}>{errors[field]}</p> : null;
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending.current) return;
    const form = e.currentTarget;
    const f = new FormData(form);
    const payload = { name: f.get("name"), phone: f.get("phone"), email: f.get("email"), subject: f.get("subject"), message: f.get("message"), privacyAcknowledged: f.get("privacyAcknowledged") === "on", website: f.get("website") };
    const validation = validateContact(payload);
    setErrors(validation.errors);
    setNotice("");
    if (!validation.data) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(validation.errors)[0]}"]`)?.focus();
      return;
    }
    pending.current = true;
    setSending(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
      const result = await response.json();
      if (response.ok && result.status === "sent") {
        setNotice("Bedankt! Uw bericht is verstuurd.");
        form.reset();
        setMessage("");
      } else if (result.status === "invalid") {
        setErrors(result.errors);
        form.querySelector<HTMLElement>(`[name="${Object.keys(result.errors)[0]}"]`)?.focus();
      } else {
        setNotice(result.status === "not-configured"
          ? "Versturen via dit formulier is nog niet beschikbaar. Uw bericht is niet verstuurd of opgeslagen. Bel of e-mail ons gerust; uw tekst blijft hieronder staan."
          : "Versturen is niet gelukt. Probeer het later opnieuw of neem telefonisch contact op. Uw tekst blijft staan.");
      }
    } catch {
      setNotice("We konden de verzending niet bevestigen. Uw tekst blijft staan. Probeer het later opnieuw of bel ons.");
    } finally {
      pending.current = false;
      setSending(false);
    }
  }
  return (
    <section
      id="contact"
      className={`poc-contact${standalone ? " poc-contact-page" : ""}`}
    >
      <span id="Contact-opnemen" className="poc-anchor" />
      <div className="poc-container poc-contact-grid">
        <div className="poc-contact-copy">
          {standalone && (
            <Link
              href="/"
              className="poc-contact-brand"
              aria-label="Van de Voort Tuinen - home"
            >
              <Image
                src="/images/original-site/logo.png"
                alt="Van de Voort Tuinen"
                width={300}
                height={80}
                priority
              />
            </Link>
          )}
          <div className="poc-contact-eyebrow">
            <span>Contact</span>
          </div>
          <h2>
            Vertel ons
            <br />
            {" "}over uw <span>plannen.</span>
          </h2>
          <p className="poc-contact-intro">
            Een nieuwe tuin, een groen gazon of hulp bij het onderhoud? Neem
            contact met ons op.
          </p>
          <a className="poc-contact-link" href="tel:+31683259762">
            <span className="poc-contact-icon">
              <Phone aria-hidden="true" size={20} />
            </span>
            <span>{business.phone}</span>
          </a>
          <a className="poc-contact-link" href={`mailto:${business.email}`}>
            <span className="poc-contact-icon">
              <Mail aria-hidden="true" size={20} />
            </span>
            <span>{business.email}</span>
          </a>
          <address className="poc-contact-address">
            <span className="poc-contact-icon">
              <MapPin aria-hidden="true" size={20} />
            </span>
            <span>
              {business.address}
              <br />
              {business.postcode} {business.city}
            </span>
          </address>
          <div className="poc-contact-kvk">
            <span className="poc-contact-icon">
              <Building2 aria-hidden="true" size={20} />
            </span>
            <span>KvK: {business.kvk}</span>
          </div>
        </div>
        <form onSubmit={submit} className="poc-form" noValidate aria-busy={sending}>
          <div className="poc-form-heading">
            <span className="poc-form-heading-icon">
              <Send aria-hidden="true" size={22} />
            </span>
            <div>
              <h3>Neem contact met ons op</h3>
              <p>
                Stel uw vraag of vertel ons over uw plannen. Velden met * zijn
                verplicht.
              </p>
            </div>
          </div>
          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px" }}>
            <Label htmlFor="website">Website</Label>
            <Input id="website" name="website" autoComplete="off" tabIndex={-1} />
          </div>
          <div className="poc-form-row">
            <div>
              <Label htmlFor="name">Naam *</Label>
              <div className="poc-input-icon">
                <UserRound aria-hidden="true" size={18} />
                <Input id="name" name="name" autoComplete="name" placeholder="Uw naam" required maxLength={100} {...fieldProps("name")} />
              </div>
              {error("name")}
            </div>
            <div>
              <Label htmlFor="phone">Telefoon</Label>
              <div className="poc-input-icon">
                <Phone aria-hidden="true" size={18} />
                <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Uw telefoonnummer" maxLength={100} {...fieldProps("phone")} />
              </div>
              {error("phone")}
            </div>
          </div>
          <div>
            <Label htmlFor="email">E-mail *</Label>
            <div className="poc-input-icon">
              <Mail aria-hidden="true" size={18} />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Uw e-mailadres"
                maxLength={100}
                {...fieldProps("email")}
                required
              />
            </div>
            {error("email")}
          </div>
          <div>
            <Label htmlFor="subject">Onderwerp</Label>
            <div className="poc-input-icon">
              <ClipboardList aria-hidden="true" size={18} />
              <Input id="subject" name="subject" placeholder="Uw onderwerp" maxLength={100} {...fieldProps("subject")} />
            </div>
            {error("subject")}
          </div>
          <div>
            <div className="contact-message-label"><Label htmlFor="message">Bericht *</Label><span id="message-count">{message.length}/1000</span></div>
            <div className="poc-textarea-icon">
              <Pencil aria-hidden="true" size={18} />
              <Textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-count message-error" : "message-count"}
                required
                placeholder="Vertel ons over uw project of vraag..."
              />
            </div>
            {error("message")}
          </div>
          <label className="poc-consent">
            <input type="checkbox" name="privacyAcknowledged" required {...fieldProps("privacyAcknowledged")} />
            Ik heb de <Link href="/privacy">privacyverklaring</Link> gelezen. *
          </label>
          {error("privacyAcknowledged")}
          <button className="poc-button" type="submit" disabled={sending}>
            <Send aria-hidden="true" size={18} />
            {sending ? "Bezig met versturen…" : "Bericht versturen"}
            <ArrowRight aria-hidden="true" size={18} />
          </button>
          <p role="status" aria-live="polite">{notice}</p>
        </form>
      </div>
    </section>
  );
}
