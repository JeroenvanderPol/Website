# Three directions — direction 1 selected

The user reviewed the three local choices and selected **POC verfijnd**, direction 1. The homepage now implements that choice. The exact three-choice request and familiar green identity control this decision; code-first did not itself imply permission to choose a design.

| Preview | Composition | Status |
| --- | --- | --- |
| `/design-directions/poc` | Large photographic hero, centered copy, familiar service grouping | Selected; refined on `/` |
| `/design-directions/garden` | Open headline, wide garden panorama, asymmetric gallery before services | Unselected comparison |
| `/design-directions/practical` | Deep-green service-led opening, compact project image | Unselected comparison |

The implementation retains all original-site images and the existing POC service content, as required by the user's follow-up. Read [homepage-brief.md](homepage-brief.md) and [content-migration.md](content-migration.md) for the final contract. Preview composition is evidence of the choice, not a substitute for the finished homepage source.

## Process and isolation

Impeccable concept seed `bb4b2c37` was consulted during comparison. No telemetry outcome is asserted here. `app/design-directions/layout.tsx` returns notFound in production; preview CSS remains module-scoped. The previous unselected refinement is archived locally under `.impeccable/archive/unselected-refinement/` and is not imported by the application or authoritative for future work.
