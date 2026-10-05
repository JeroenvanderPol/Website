# Product

## Google reviews integration status

The reviews section now has a prepared server-side Google Places connection and a direct link to the matched business listing. Live review display awaits `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`. It displays at most five Google-selected reviews with attribution and links, or an honest unavailable state. Do not replace this with archived POC testimonials. See [setup instructions](docs/ai/google-reviews-setup.md) for activation, costs, policy pages and validation requirements.

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily Dutch-speaking homeowners planning garden, paving, lawn or extension-related work. Business inquiries are welcome without inventing a separate commercial offering.

## Product Purpose

Present garden and groundwork services, let visitors assess completed work and make discussing a project straightforward. Success is a relevant quotation inquiry or direct phone conversation.

## Positioning

Combine garden work with practical groundwork: preparing the site, laying paving and lawns, and maintaining gardens. This is the agreed proposition, not a verified claim of unique competitive advantage.

## Operating Context

Visitors compare services and project photographs before making contact, including on mobile. The original website is https://vandevoortgrondwerken.nl/; the POC is published at https://v0-vandevoort-grondwerken-data.vercel.app/. Working-tree implementation does not establish deployment status.

## Capabilities and Constraints

- Next.js App Router, TypeScript, Tailwind CSS, shadcn/Radix and pnpm.
- Homepage: hero, four services, about, portfolio with all 23 original photographs, reviews notice, contact and footer. Filtering and enlarged image viewing remain.
- Contact preserves name, phone, email, subject, message and consent. It prepares a mailto draft; the visitor sends it in an email program. No backend delivery or success confirmation exists.
- Original-site contact details, address, KvK and all 18 work-area towns are captured in `data/business.json`.
- POC testimonials, statistics, opening hours and response promises are not verified evidence and are omitted from live factual claims. Service wording copied from the source does not independently verify certification.
- Preserve the existing domain unless a verified business change requires updating it.

## Brand Commitments

- Preserve the leaf logo and use **all original website images**, as explicitly requested: 23 project photos, six service illustrations, logo and favicon. This supersedes the earlier selective-curation preference.
- Preserve all source content in recoverable baselines; unsupported claims remain archived rather than being presented as facts.
- Public-facing naming is **Van de Voort Tuinen**, matching the logo and original website identity. Grondwerk remains a service; this does not establish a different legal entity or authorize a domain change.
- Use practical, clear Dutch and retain the familiar green POC identity, visible logo, service cards and accessible contact options.

## Evidence on Hand

- User-confirmed audience, proposition, direction 1 choice and complete-image/content preservation requirement.
- [Image provenance](docs/ai/image-provenance.json) records source URLs and hashes for all 31 source assets. Captions describe visible content without invented customers, dates or locations.
- [Content migration](docs/ai/content-migration.md) maps live content and snapshots of the original website and POC application source.
- Original website facts are source-backed; POC assertions are not automatically verified by their presence in code.

## Product Principles

1. Make the residential offer clear while welcoming business inquiries.
2. Demonstrate work through authentic photographs and factual descriptions.
3. Keep quotations and calling straightforward on mobile.
4. Keep identity and service terminology consistent across visible copy, accessible labels and metadata.
5. Preserve source data without promoting unsupported placeholders into verified claims.

## Design Selection

The user selected **direction 1: POC verfijnd** after three development-only comparisons. The selection gate is satisfied and the selected direction is implemented at `/`. [DESIGN.md](DESIGN.md) records the implemented system; [homepage brief](docs/ai/homepage-brief.md) records its composition. Other previews and archived refinements are not approved alternatives.

## Service feedback applied

The owner feedback removes the standalone services Aanbouwen uitgraven and Bestrating aanleggen from all rendered sections and metadata. Four active services and portfolio filters share `data/services.json`: Tuin aanleggen, Tuinonderhoud, Sloopwerkzaamheden and Gras aanleggen. All 23 photographs remain; former paving/groundwork images are grouped under garden construction. No photo is asserted to show demolition; that filter has an honest empty state. All six source illustrations are retained on disk, with only the four active-service illustrations displayed. Original removed text remains recoverable in the source snapshots. The experience/statistics card remains absent pending verified figures; it can fit the existing design.
