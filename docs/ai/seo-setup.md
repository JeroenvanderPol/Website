# Services and search setup

## Project pages (POC)

Each real project has a `/projecten/[slug]` page using a shared template and linked cards, plus a filterable `/projecten` overview. The owner confirms the projects are real but says current titles, locations and descriptions need correction. `status` records that the project is real; `contentStatus` remains `needs-review` until its copy is checked. Pending pages are `noindex`, omit project JSON-LD and stay out of the sitemap. Once every project copy is verified, `/projecten` enters the sitemap; verified detail pages enter individually. Preview deployments remain excluded. See `README-PROJECTEN.md` for the fields to correct and the verification flag.

The homepage remains a single scrolling page. Its service cards and footer link to four statically rendered routes under `/diensten/`: `tuin-aanleggen`, `tuinonderhoud`, `sloopwerkzaamheden`, `gras-aanleggen`. Header navigation and quotation links return to homepage anchors. All original portfolio photos remain on the homepage.

Slugs and shared labels live in `data/services.json`; additional service copy lives in `data/service-details.ts`. Existing original descriptions remain in the JSON. No project dates, locations, customer outcomes, certifications or statistics were added as verified facts. Project detail pages await owner-provided grouping and descriptions.

`lib/site.ts` owns the canonical production origin, https://vandevoortgrondwerken.nl. Each page has a self-canonical URL, Dutch title and description, and Open Graph metadata. JSON-LD supplies sourced LocalBusiness details plus Service and BreadcrumbList on service pages. No review or rating markup is published.

`/sitemap.xml` lists the homepage and four services, adding the project overview and verified project details when their copy is approved. No invented last-modified dates. `/robots.txt` references the production sitemap and excludes API and design-preview paths. Vercel preview builds emit noindex metadata, disallow crawling, and an empty sitemap. These controls do not make previews private; use Vercel deployment protection if privacy is required. A Vercel production deployment on a temporary hostname still needs deployment protection or a redirect when the real domain is connected.

## On release

- Connect and verify the existing production domain in Vercel; redirect alternate hosts to it. Keep existing anchors. Inventory any existing indexed path URLs before changing hosting and redirect obsolete paths individually if needed.
- Verify the production origin in Google Search Console and Bing Webmaster Tools; submit `/sitemap.xml` after deployment and inspect the service URLs. Account verification is not performed by repository changes.
- Check production robots, canonical tags, HTTP status codes and schema with Search Console URL Inspection / Google's Rich Results Test. Structured data does not guarantee enhanced results or ranking.
- Keep the business name, contact details and service descriptions consistent with the business profiles. Maintain useful copy and confirmed project information; do not generate duplicated city pages.

## Validation performed

TypeScript check and production Webpack build passed. Local HTTP checks returned 200 for all five public pages, robots and sitemap, and 404 for an unknown service. Unique service canonicals and one h1 per page were checked. Desktop and 390px mobile service layout inspected, including the cross-page contact anchor.
