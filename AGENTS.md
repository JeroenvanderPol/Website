# Agent guide

## Project

This is the Next.js proof-of-concept rebuild of Van de Voort Grondwerken's Dutch website.
Read `docs/ai/project-context.md` for the site references, architecture, existing visual baseline, and known limitations. Read `docs/ai/README.md` for skill usage and maintenance.
Read `PRODUCT.md` for confirmed product facts and `docs/ai/homepage-brief.md` for the approved composition. The user selected direction 1, POC verfijnd, now implemented on the homepage. `DESIGN.md` records that approved system. Preserve all original-site images and recoverable source content; see `docs/ai/content-migration.md`. The other development-only previews are unselected alternatives.

## Working conventions

- Inspect the working tree before editing and preserve unrelated changes.
- Keep work focused on the user's request. Use the existing Next.js App Router, TypeScript, Tailwind CSS, and shadcn/Radix components.
- Use pnpm with `pnpm-lock.yaml`. Do not introduce a second lockfile.
- Keep server components by default; use client components where interaction or browser APIs require them.
- Reuse `components/ui/`, `lib/utils.ts` (`cn`), and the tokens in `app/globals.css`; the approved homepage uses scoped overrides in `app/approved-poc.css`. `styles/globals.css` is not the stylesheet imported by the root layout.
- Keep visible site copy in Dutch, including form messages, accessible labels, and metadata. Match the existing local formatting and import conventions.
- Preserve section anchors (`diensten`, `over-ons`, `portfolio`, `reviews`, `contact`) unless the task intentionally changes navigation.
- Verify business facts against owner-provided information or the original site. POC testimonials, numbers, service areas, and response-time promises are not verified evidence. Do not invent reviews or business claims.
- Keep credentials and personal/customer data out of code, prompts, logs, and committed agent files.

## Skills

- Project skills live in `.agents/skills/<skill-name>/SKILL.md` and are versioned with the repository.
- For UI design, redesign, critique, accessibility review, or polish, read `.agents/skills/impeccable/SKILL.md` and only the relevant references. Use its guidance within the user's requested scope and the project's factual context.
- Installation is not an instruction to redesign the site. Preserve the incumbent visual identity during refinement; follow the user's direction for a redesign.
- Keep upstream skill files intact. Put project-specific guidance here or in `docs/ai/`; record upstream versions and licenses when installing or updating skills.

## Validation

- Documentation/skill-only changes: check local links, skill frontmatter, referenced files, provenance, and `git diff --check`; an application build is unnecessary when application code is unchanged.
- Application changes: run `pnpm exec tsc --noEmit` and `pnpm build`. The current Next.js config ignores TypeScript build errors, so a successful build does not substitute for the separate type check.
- `pnpm lint` currently references ESLint, but ESLint and its configuration are absent. Report this limitation; do not claim lint passed. There is no configured automated test suite.
- For UI changes, inspect desktop and mobile behavior, keyboard navigation, focus, contrast, reduced motion, relevant light/dark states, navigation anchors, and changed form states. Report checks actually performed and any blockers.
- Summarize the outcome, validation, and remaining limitations. Update durable context when architecture or project decisions change.

## Delivery

The README describes automatic Vercel deployment on merges to `main` and direct commits from v0. Treat publishing, pushing, and merging as deployment-relevant actions and follow the user's authorization for them.

