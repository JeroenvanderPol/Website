import type { ContactMessage } from "./contact";
import nodemailer from "nodemailer";
import business from "../data/business.json";

type DeliveryResult = { status: "not-configured" | "unavailable" | "sent" };

type SmtpConfiguration = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;

function getSmtpConfiguration(): SmtpConfiguration | undefined {
  const host = process.env.STRATO_SMTP_HOST?.trim();
  const portValue = process.env.STRATO_SMTP_PORT?.trim();
  const secureValue = process.env.STRATO_SMTP_SECURE?.trim().toLowerCase();
  const user = process.env.STRATO_SMTP_USER?.trim();
  const pass = process.env.STRATO_SMTP_PASS;
  const from = process.env.STRATO_SMTP_FROM?.trim();
  const port = Number(portValue);

  if (!host || !Number.isInteger(port) || ![465, 587].includes(port) || !user || !pass || !from) return;
  if (secureValue !== "true" && secureValue !== "false") return;

  const secure = secureValue === "true";
  if ((port === 465) !== secure) return;

  return { host, port, secure, user, pass, from };
}

// Server-side integration point. Do not return success until a mail provider
// has accepted delivery. Never log message contents or email addresses.
export async function deliverContactMessage(message: ContactMessage): Promise<DeliveryResult> {
  const config = getSmtpConfiguration();
  if (!config) return { status: "not-configured" };

  try {
    transporter ??= nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      requireTLS: !config.secure,
      auth: { user: config.user, pass: config.pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transporter.sendMail({
      from: config.from,
      to: business.email,
      replyTo: message.email,
      subject: message.subject ? `Contactformulier: ${message.subject}` : "Nieuw bericht via het contactformulier",
      text: [
        `Naam: ${message.name}`,
        `Telefoon: ${message.phone || "-"}`,
        `Onderwerp: ${message.subject || "-"}`,
        "",
        message.message,
      ].join("\n"),
    });

    return { status: "sent" };
  } catch {
    return { status: "unavailable" };
  }
}
