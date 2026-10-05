# Direction 1 validation

Validated locally on 2026-09-16. No deployment was performed.

- TypeScript: `node node_modules/typescript/bin/tsc --noEmit` passed.
- Production build: `node node_modules/next/dist/bin/next build --webpack` passed. Type checking was run separately because Next configuration skips it during builds.
- Desktop at 1440px and mobile at 390px: inspected rendered page; no horizontal overflow. Captures exclude the native 15px scrollbar.
- Gallery: all 23 photos present; Bestrating filter returns seven; the final photo opens in the image dialog and Escape dismisses it.
- Mobile navigation: opens, Escape closes from the toggle and returns focus to it.
- Form: empty submission is blocked; name, email, message and consent are required. No test email was sent. The form prepares a mailto draft and cannot confirm delivery.
- Asset provenance: 31 raster files have embedded origin metadata; all stored SHA-256 checksums match the manifest.
- `git diff --check` passed.
- Independent Impeccable finish review: `ship`, with no material fixes, covering desktop/mobile captures and the selected direction.

ESLint is not installed/configured, so no lint pass is claimed. Service wording is retained from source material; certification wording has not been independently verified. See the [preservation record](content-migration.md) for archived POC claims and source coverage.
