# Content migration and preservation

The user selected direction 1 and explicitly required no data loss and use of all original website images. Preservation is broader than publication: source content remains available even where unsupported POC claims must not be displayed as facts.

## Source snapshots

- [Original-site HTML](content-baseline/original-site.html): captured original website content.
- [POC source snapshot](content-baseline/poc-source.json): ten original application/layout/section source files, including all original copy, statistics, reviews and form implementation.
- [Image provenance](image-provenance.json): 31 original-site assets, their source URLs, responsive source variants and SHA-256 checksums (`sha256` for source bytes and `storedSha256` for the stored asset). Origin metadata was embedded after acquisition; source and stored hashes therefore differ while image pixels remain unchanged. Responsive variants represent the same image, not additional unique project photos.

## Homepage content mapping

| Material | Implemented location and treatment |
| --- | --- |
| 23 original project photos | `data/original-projects.json`; all available in the portfolio with filters and enlarged image view |
| Six service illustrations | All six retained on disk; four used by the remaining service cards |
| Leaf logo and favicon | Original-site image directory; header branding and layout icon metadata |
| Six POC services | Original six retained in the source snapshot; four active services in `data/services.json` after explicit owner feedback. Removed services are no longer promoted on the page. |
| Contact/address/KvK and 18 work-area towns | Original-site information in `data/business.json`; contact and footer |
| POC form fields | Name, phone, email, subject, message and consent retained; mailto draft replaces simulated success |
| Section anchors | `diensten`, `over-ons`, `portfolio`, `reviews`, `contact` retained; original-site aliases also retained where implemented |
| About and branding | Original passion-for-green statement and factual service summary; consistent public name Van de Voort Tuinen |
| Unsupported POC reviews, counts, hours and response promises | Preserved in the POC snapshot; omitted from live factual claims. Reviews section explicitly explains that verified reviews are unavailable |
| POC legal placeholders | Source preserved; live footer uses working section navigation rather than nonfunctional legal links |

Source wording retained in service descriptions is not independent proof of certification or other credentials. New business claims still require evidence. Existing legacy assets remain; source preservation does not require publishing unsupported POC content.

## Scope and limitations

The snapshot is a recoverable content baseline for the captured original homepage and ten POC source files; it is not a full backup of an external WordPress installation or customer database. The 31 assets comprise 23 projects, six illustrations, one logo and one favicon. No image subset is the approved final gallery.

This record documents source mapping, not an accessibility or deployment certification. The form requires the visitor's email application and has no backend delivery confirmation. Validation results belong in the implementation delivery report.


