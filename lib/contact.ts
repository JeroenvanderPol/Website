export type ContactField = "name" | "phone" | "email" | "subject" | "message" | "privacyAcknowledged";
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactMessage = Record<Exclude<ContactField, "privacyAcknowledged">, string>;

export function validateContact(input: unknown): { errors: ContactErrors; data?: ContactMessage } {
  const source = input && typeof input === "object" && !Array.isArray(input)
    ? input as Record<string, unknown> : {};
  const errors: ContactErrors = {};
  const values = {} as ContactMessage;
  for (const field of ["name", "phone", "email", "subject", "message"] as const) {
    const raw = source[field];
    const limit = field === "message" ? 1000 : 100;
    values[field] = typeof raw === "string" ? raw.trim() : "";
    if (typeof raw !== "string") errors[field] = "Vul een geldige tekst in.";
    else if (raw.length > limit) errors[field] = `Gebruik maximaal ${limit} tekens.`;
    else if (["name", "email", "message"].includes(field) && !values[field]) errors[field] = "Dit veld is verplicht.";
    else if (field !== "message" && /[\r\n\x00]/.test(raw)) errors[field] = "Gebruik één regel tekst.";
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Vul een geldig e-mailadres in.";
  if (source.privacyAcknowledged !== true) errors.privacyAcknowledged = "Bevestig dat u de privacyverklaring hebt gelezen.";
  return Object.keys(errors).length ? { errors } : { errors, data: values };
}
