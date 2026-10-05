import type { ContactMessage } from "./contact";

// Server-side integration point. Do not return success until a mail provider
// has accepted delivery. Never log message contents or email addresses.
export async function deliverContactMessage(_message: ContactMessage): Promise<{ status: "not-configured" | "sent" }> {
  return { status: "not-configured" };
}
