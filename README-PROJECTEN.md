# Foto's en projecten toevoegen

## Meerdere foto's en omslagfoto

Voeg gerust meerdere foto's tegelijk toe. Vertel welke bij hetzelfde project horen en welke de omslagfoto moet zijn (bijvoorbeeld "gebruik foto 2 voor het overzicht"). Die foto verschijnt in het portfolio en bij de diensten. Op de detailpagina kunnen bezoekers tussen alle foto's wisselen en een foto vergroten.

Een project kan meerdere diensttags hebben, bijvoorbeeld Tuin aanleggen en Gras aanleggen. De agent vraagt welke passen. Deze staan als groene badges op de foto; filters vinden het project onder iedere gekozen dienst.

De agent genereert automatisch kleine WebP-thumbnails voor alle foto's. U hoeft niets zelf te verkleinen. De volledige foto wordt pas geladen op de detailpagina; de originele bestanden blijven bewaard. Bij foto's toevoegen aan een bestaand project blijft de omslag gelijk, tenzij u een andere kiest.

Voorbeeld: **Gebruik $project-toevoegen. Deze drie foto's horen bij één tuin in Vught. Foto 2 is de omslag. Het gaat om tuinaanleg en gras aanleggen.**

U hoeft hiervoor geen code te openen of te wijzigen. Gebruik de AI-agent in Codex, met dit websiteproject geopend.

## Een nieuwe foto toevoegen

1. Open dit project in Codex en start een gesprek.
2. Voeg de foto toe als bijlage en typ:

   **Gebruik $project-toevoegen. Ik wil deze foto aan mijn website toevoegen.**

3. De agent stelt enkele korte vragen: waar was het project, wat wilde de klant, welke werkzaamheden zijn uitgevoerd en wat is het resultaat? Ook vraagt hij of de foto openbaar gebruikt mag worden. Korte antwoorden in uw eigen woorden zijn genoeg.
4. De agent maakt de projectpagina, schrijft de teksten en voegt de foto toe aan het portfolio en de juiste dienstcategorie. U krijgt een link om het resultaat te bekijken.
5. Bekijk het resultaat. U kunt gewoon antwoorden: “De plaats moet Vught zijn” of “Vermeld ook dat we het gazon hebben voorbereid”. De agent past het aan.

De website is daarmee lokaal aangepast. Online publiceren is een aparte stap via de afgesproken websitebeheerder of publicatiewerkwijze. Dit is geen uploadformulier op de publieke website: Codex met toegang tot dit project is nodig.

## Voorbeeld van een bericht

> Gebruik $project-toevoegen. Dit is een tuin in Rosmalen. De klant wilde een nieuw gazon. We hebben de ondergrond voorbereid en graszoden gelegd. De foto laat het eindresultaat zien en mag op de website. Vraag gerust wat je nog nodig hebt.

De agent bedenkt geen feiten die u niet heeft opgegeven. Exacte prijzen, afmetingen en datums zijn niet verplicht. Deel geen privé-adres of naam van een opdrachtgever als dat niet nodig is.

## Een bestaande voorbeeldpagina aanvullen

Alle 23 oorspronkelijke foto's hebben voorlopig een voorbeeldpagina. De foto's zijn echt; de plaatsnamen en verhalen zijn fictieve POC-inhoud. Deze pagina's zijn zichtbaar gemarkeerd en staan niet in de sitemap; zoekmachines krijgen `noindex`.

Typ bijvoorbeeld:

> Gebruik $project-toevoegen om het voorbeeld “Tuin met terras en beplanting” te vervangen door de echte gegevens. Dit werk was in Vught. Stel mij de vragen die je nodig hebt.

U kunt ook de link naar de pagina meesturen. Na bevestiging van de gegevens en het fotogebruik verdwijnt de voorbeeldmelding. De pagina komt automatisch in de sitemap voor de definitieve website. Op testversies blijft indexering uitgeschakeld. Opname in Google is niet gegarandeerd.

## Wat wordt automatisch geregeld?

- Een eigen detailpagina met foto, plaats, aanleiding, aanpak en resultaat.
- Dezelfde klikbare fotokaart in het portfolio en bij de diensten. Een dienstpagina toont een selectie van maximaal drie foto's; vraag de agent als een bepaalde foto daarin moet komen.
- Een vergrootbare foto op de detailpagina.
- Een paginatitel, korte zoekresultaatbeschrijving, afbeeldingsbeschrijving en links naar de dienst en het contactformulier.
- Een sitemapvermelding zodra de gegevens bevestigd zijn.

Hoort een foto bij bestaand werk? Geef de projectnaam of paginalink, zodat de agent de bestaande galerij uitbreidt en er geen dubbele projecten ontstaan.

## Als de skill niet in het menu verschijnt

Heropen het project of start een nieuw gesprek. U kunt ook typen:

**Lees `.agents/skills/project-toevoegen/SKILL.md` en help mij een projectfoto toe te voegen.**

De skill hoort bij deze repository. Op een andere computer moet dit project inclusief de map `.agents` beschikbaar zijn.
