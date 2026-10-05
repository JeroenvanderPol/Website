# Eindcontrole — 16 september 2026

- Alle 28 publieke inhoudsroutes geven HTTP 200 en hebben een unieke titel, beschrijving en eigen canonical. JSON-LD is parseerbaar.
- Sitemap bevat de homepage en vier diensten. De 23 mockprojecten hebben `noindex` en staan bewust niet in de sitemap. Bevestigde projecten worden automatisch opgenomen; hiervoor bestaat een regressietest.
- De gegenereerde HTML van alle 28 routes is gecontroleerd op één h1, kopniveaus zonder sprongen, dubbele IDs, ontbrekende alt-attributen, formulierlabels, geneste links/knoppen/formulieren en blokken binnen paragrafen. Geen fouten gevonden binnen deze controles.
- Footerkoppen zijn h2. Contactgegevens hebben decoratieve Lucide-iconen met `aria-hidden`; het adres gebruikt `address`.
- Desktop- en mobiele footer bekeken. Op 390px geen horizontale overflow. Mobiel menu opent met correcte `aria-expanded`, sluit met Escape en herstelt focus. De dienstenlink navigeert naar één correct fragment.
- Productiebuild, afzonderlijke TypeScript-controle en acht bestaande tests geslaagd. `git diff --check` zonder fouten.

Dit is een gerichte technische controle, geen volledige WCAG-certificering of Lighthouse-meting. Er is geen volledige HTML-validator of screenreadertest uitgevoerd. ESLint is niet geïnstalleerd/geconfigureerd; lint is dus niet als geslaagd aangemerkt.

Voor publicatie: fictieve projectgegevens laten bevestigen en de productie-URL/Search Console-inrichting uit `seo-setup.md` volgen. Het contactformulier opent een e-mailprogramma en verstuurt zelf geen berichten.
