import { validateContact } from "@/lib/contact";
import { deliverContactMessage } from "@/lib/contact-delivery";

export async function POST(request: Request) {
  const reply = (body: unknown, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  if (!request.headers.get("content-type")?.includes("application/json")) return reply({ status: "invalid-request" }, 415);
  // Bound the actual stream, not just the optional Content-Length header.
  const reader = request.body?.getReader();
  if (!reader) return reply({ status: "invalid-request" }, 400);
  let size = 0;
  let body = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return reply({ status: "too-large" }, 413); }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    const result = validateContact(JSON.parse(body));
    if (!result.data) return reply({ status: "invalid", errors: result.errors }, 400);
    const delivery = await deliverContactMessage(result.data);
    return reply(delivery, delivery.status === "sent" ? 200 : 503);
  } catch {
    return reply({ status: "unavailable" }, 400);
  }
}
