# Project context

## Service vector illustrations

Revised after owner feedback: simplified geometric silhouettes replace the initial overlapping paths. All four use an 80×80 viewBox, 2.2px rounded strokes in #326f39 and pale #edf2e9 fills. Verified at 56px and 200px, with transparent edge clearance checked on rasterization.

The four active services use hand-authored SVG line icons in `public/images/services/`, referenced centrally by `data/services.json`. They retain the original plant, spade, paving and grass motifs with consistent green strokes and transparent backgrounds. Both overview cards and detail pages use these resolution-independent assets. Original PNG illustrations remain archived unchanged.

## Latest service correction

Owner corrected the earlier removal request: Bestrating aanleggen replaces Sloopwerkzaamheden as the third active service. Four active categories are now Tuin aanleggen, Tuinonderhoud, Bestrating aanleggen and Gras aanleggen. Paving-related project records have the restored tag; metadata, service routes, filters, footer and customer skill follow the correction. Historical source archives remain intact. Service card links share a bottom-aligned action group.

## Brand assets and detail badges

The original logo PNG already has transparency; its header container now has a transparent background. `public/images/brand/leaves-source.png` is an image-generated isolation of the two leaves from the original logo, with 32px/48px favicon and 180px Apple icon exports referenced in root metadata. Original assets remain intact. Project-detail tags are non-interactive spans without underlines; overlay badges are unchanged.

## Project galleries and thumbnails

Projects have `images` (id/src/alt/thumbnail/width/height), `coverImageId` and multiple `tags` matching service titles. The homepage uses a scroll-snap slider; `/projecten` filters by service, and service selections filter by all tags. Shared cards load only the cover thumbnail and overlay badges; detail galleries load the selected original and thumbnail selectors. `node scripts/generate-project-thumbnails.cjs` (also `pnpm images:thumbnails`) creates max-640×480 WebP files using Sharp bundled with Next.js, preserving original bytes, and syncs legacy src/alt/category aliases. Commit generated files. The owner confirms all 23 projects are real, but current titles, locations and narratives need review. `contentStatus` separates real-project status from copy verification; pending copy is not indexed. All original records and images remain. The customer skill and Dutch README cover project maintenance.

## Service pages and SEO

Portfolio and service excerpts share `components/projects/project-grid.tsx`, linking to `/projecten/[slug]`. All 23 real projects have detail routes and a filterable `/projecten` overview. Current project copy is pending owner review; pending pages receive `noindex`, omit project JSON-LD and stay outside the sitemap. After copy verification, the overview and verified detail pages are eligible for indexing. `lib/projects.ts` defines the model; `data/original-projects.json` owns records and copy status. A detail page retains image enlargement. The repository skill `.agents/skills/project-toevoegen/SKILL.md` guides owner additions and corrections; see `README-PROJECTEN.md` for correcting these records. Existing photo ids/src/alt/title/category are preserved. Counts are dynamic.

The homepage remains a scrolling overview. Four static `/diensten/[slug]` pages add service-specific information, portfolio excerpts and contact links returning to `/#contact`. Service cards and footer link to these routes; the header still links to homepage sections. `data/service-details.ts` contains additional copy. Sitemap, robots, canonical URLs and LocalBusiness/Service/BreadcrumbList JSON-LD are implemented. See [SEO setup](seo-setup.md) for deployment and Search Console steps. Project copy must be checked in `data/original-projects.json` before indexing. The customer has chosen not to activate live reviews.

## Google reviews

`app/api/google-reviews/route.ts` is a dynamic, non-cached server proxy for one configured Google Places listing. `components/sections/testimonials.tsx` requests it as the section approaches the viewport. Missing credentials do not block the homepage. Live Google data has not yet been tested; setup is in [google-reviews-setup.md](google-reviews-setup.md). Five mocked server tests cover missing configuration, success, malformed links, upstream failure and network failure: `node --test tests/google-reviews.test.cjs`.

## Purpose and sources

This is the Next.js proof-of-concept rebuild of Van de Voort Grondwerken's Dutch website, presented publicly as **Van de Voort Tuinen**. The user selected direction 1, **POC verfijnd**, and required retention of all original-site imagery and recoverable source content.

- POC: https://v0-vandevoort-grondwerken-data.vercel.app/
- Original: https://vandevoortgrondwerken.nl/
- v0 project: https://v0.app/chat/projects/prj_OYhbz5QGBFrT82rPwbVfSoaLkwgh

[PRODUCT.md](../../PRODUCT.md) is the product authority; [DESIGN.md](../../DESIGN.md) records the implemented system and [homepage-brief.md](homepage-brief.md) records the selected composition. This describes the working tree, not deployment status.

## Architecture

| Location | Purpose |
| --- | --- |
| `app/page.tsx` | Header, hero, services, about, portfolio, reviews notice, contact and footer |
| `app/layout.tsx` | Dutch metadata, original favicon, Geist fonts, theme provider and production analytics |
| `app/globals.css` | Active Tailwind v4 theme and shared styles |
| `app/approved-poc.css` | Selected direction, primarily scoped to `.approved-site`; imported by root layout |
| `components/sections/` and `components/layout/` | Homepage content and interactive components |
| `components/ui/` | Existing shadcn/Radix primitives |
| `data/services.json` | All four services, POC descriptions/features and original-site descriptions |
| `data/original-projects.json` | All 23 original-site project photos and gallery labels |
| `data/business.json` | Original contact/address/KvK and 18 work-area towns |
| `public/images/original-site/` | 31 original source assets |
| `app/design-directions/` | Three historical development-only previews; direction 1 selected |
| `.agents/skills/` | Repository-local skills |

Use `package.json` and `pnpm-lock.yaml` for package versions. `styles/globals.css` is not imported by the root layout.

## Current visual implementation

The familiar green leaf identity, centered photographic hero and service cards are retained. Desktop hero height is 600px with white 60px display text; mobile uses 540px and 42px. Pale sections and white rounded cards provide a calmer POC refinement. The approved homepage has a scoped light palette even though the shared theme provider still supports system themes.

All original-site images are used: 23 gallery photos, six service illustrations, logo and favicon. The original services retain their descriptions and features and expose original-site detail text. All established section anchors remain. `reviews` now identifies an honest notice about unavailable verified reviews, with a portfolio link.

## Preservation and factual boundaries

[Image provenance](image-provenance.json) records URLs, responsive variants and SHA-256 hashes. [Content migration](content-migration.md) records the original HTML and ten-file POC source snapshot. No unsupported review, statistic, opening-hour or response-time claim is promoted into a verified business fact. Source service wording remains source wording, not independent evidence of certification. Do not delete archived source material or reduce the image set during later refinements.

## Current limitations

- The contact form prepares a mailto draft after native field validation. The visitor must send it; no backend or delivery confirmation exists.
- Next.js ignores TypeScript build errors and disables image optimization. Run the separate type check.
- The lint script references ESLint, but the dependency and configuration are absent. No automated test suite is configured.
- Preview routes return notFound in production. The previous unselected refinement remains a local archive, not design authority.
- Shared theme and UI primitive behavior still require appropriate light/dark and keyboard checks after changes; this document is not a visual QA certificate.

The earlier restored-baseline and pending-selection notices are superseded by the user's direction 1 selection.

## Service feedback applied

The owner feedback removes the standalone services Aanbouwen uitgraven and Bestrating aanleggen from all rendered sections and metadata. Four active services and portfolio filters share `data/services.json`: Tuin aanleggen, Tuinonderhoud, Sloopwerkzaamheden and Gras aanleggen. All 23 photographs remain; former paving/groundwork images are grouped under garden construction. No photo is asserted to show demolition; that filter has an honest empty state. All six source illustrations are retained on disk, with only the four active-service illustrations displayed. Original removed text remains recoverable in the source snapshots. The experience/statistics card remains absent pending verified figures; it can fit the existing design.
