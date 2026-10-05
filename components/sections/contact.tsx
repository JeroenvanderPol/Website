"use client";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import business from "@/data/business.json";
import { validateContact, type ContactErrors, type ContactField } from "@/lib/contact";
export function Contact() {
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
    const payload = { name: f.get("name"), phone: f.get("phone"), email: f.get("email"), subject: f.get("subject"), message: f.get("message"), consent: f.get("consent") === "on" };
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
    <section id="contact" className="poc-contact">
      <span id="Contact-opnemen" className="poc-anchor" />
      <div className="poc-container poc-contact-grid">
        <div>
          <h2>Vertel ons over uw plannen.</h2>
          <p>
            Een nieuwe tuin, een groen gazon of hulp bij het onderhoud? Neem
            contact met ons op.
          </p>
          <a className="poc-contact-link" href="tel:+31683259762">
            <Phone size={20} />
            {business.phone}
          </a>
          <a className="poc-contact-link" href={`mailto:${business.email}`}>
            <Mail size={20} />
            {business.email}
          </a>
          <address className="poc-contact-address">
            <MapPin aria-hidden="true" size={20} />
            <span>
            {business.address}
            <br />
            {business.postcode} {business.city}
            </span>
          </address>
          <p>KvK: {business.kvk}</p>
        </div>
        <form onSubmit={submit} className="poc-form" noValidate aria-busy={sending}>
          <h3>Neem contact met ons op</h3>
          <p>
            Stel uw vraag of vertel ons over uw plannen. Velden met * zijn verplicht.
          </p>
          <div className="poc-form-row">
            <div>
              <Label htmlFor="name">Naam *</Label>
              <Input id="name" name="name" autoComplete="name" required maxLength={100} {...fieldProps("name")} />
              {error("name")}
            </div>
            <div>
              <Label htmlFor="phone">Telefoon</Label>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={100} {...fieldProps("phone")} />
              {error("phone")}
            </div>
          </div>
          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={100}
              {...fieldProps("email")}
              required
            />
          </div>
          {error("email")}
          <div>
            <Label htmlFor="subject">Onderwerp</Label>
            <Input id="subject" name="subject" maxLength={100} {...fieldProps("subject")} />
            {error("subject")}
          </div>
          <div>
            <div className="contact-message-label"><Label htmlFor="message">Bericht *</Label><span id="message-count">{message.length}/1000</span></div>
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
            {error("message")}
          </div>
          <label className="poc-consent">
            <input type="checkbox" name="consent" required {...fieldProps("consent")} />
            Ik ga ermee akkoord dat mijn gegevens worden verwerkt om contact met
            mij op te nemen. *
          </label>
          {error("consent")}
          <button className="poc-button" type="submit" disabled={sending}>
            <Send aria-hidden="true" size={18} />
            {sending ? "Bezig met versturen…" : "Bericht versturen"}
          </button>
          <p role="status" aria-live="polite">{notice}</p>
        </form>
      </div>
    </section>
  );
}
