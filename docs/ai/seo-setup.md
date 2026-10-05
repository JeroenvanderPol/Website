# Services and search setup

## Project pages (POC)

Each original photo now has a `/projecten/[slug]` page using a shared template and shared linked cards. The owner explicitly authorized fictional descriptions and cities for the POC. Every current record is `mock`: visible disclaimer, noindex and excluded from sitemap. Confirmed project records automatically enter the sitemap and receive WebPage/ImageObject/BreadcrumbList structured data; previews remain excluded. Do not change status until the actual project details are verified. See `README-PROJECTEN.md` and the `project-toevoegen` skill for owner maintenance. This supersedes the earlier note that project pages await implementation.

The homepage remains a single scrolling page. Its service cards and footer link to four statically rendered routes under `/diensten/`: `tuin-aanleggen`, `tuinonderhoud`, `sloopwerkzaamheden`, `gras-aanleggen`. Header navigation and quotation links return to homepage anchors. All original portfolio photos remain on the homepage.

Slugs and shared labels live in `data/services.json`; additional service copy lives in `data/service-details.ts`. Existing original descriptions remain in the JSON. No project dates, locations, customer outcomes, certifications or statistics were added as verified facts. Project detail pages await owner-provided grouping and descriptions.

`lib/site.ts` owns the canonical production origin, https://vandevoortgrondwerken.nl. Each page has a self-canonical URL, Dutch title and description, and Open Graph metadata. JSON-LD supplies sourced LocalBusiness details plus Service and BreadcrumbList on service pages. No review or rating markup is published.

`/sitemap.xml` lists only the homepage and four services. No invented last-modified dates. `/robots.txt` references the production sitemap and excludes API and design-preview paths. Vercel preview builds emit noindex metadata, disallow crawling, and an empty sitemap. These controls do not make previews private; use Vercel deployment protection if privacy is required. A Vercel production deployment on a temporary hostname still needs deployment protection or a redirect when the real domain is connected.

## On release

- Connect and verify the existing production domain in Vercel; redirect alternate hosts to it. Keep existing anchors. Inventory any existing indexed path URLs before changing hosting and redirect obsolete paths individually if needed.
- Verify the production origin in Google Search Console and Bing Webmaster Tools; submit `/sitemap.xml` after deployment and inspect the service URLs. Account verification is not performed by repository changes.
- Check production robots, canonical tags, HTTP status codes and schema with Search Console URL Inspection / Google's Rich Results Test. Structured data does not guarantee enhanced results or ranking.
- Keep the business name, contact details and service descriptions consistent with the business profiles. Maintain useful copy and confirmed project information; do not generate duplicated city pages.

## Validation performed

TypeScript check and production Webpack build passed. Local HTTP checks returned 200 for all five public pages, robots and sitemap, and 404 for an unknown service. Unique service canonicals and one h1 per page were checked. Desktop and 390px mobile service layout inspected, including the cross-page contact anchor.
