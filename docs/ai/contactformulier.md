# Contactformulier en Strato SMTP

Het formulier verstuurt JSON naar `POST /api/contact`. Browser en server gebruiken dezelfde validatie: naam, geldig e-mailadres, bericht en bevestiging dat de privacyverklaring is gelezen zijn verplicht. Bericht maximaal 1000 tekens; overige tekstvelden maximaal 100. De server begrenst aanvragen ook op 16 KiB.

## Configuratie

De mail wordt via Nodemailer en de Strato SMTP-server verzonden. Stel deze variabelen in `.env.local` in voor lokale ontwikkeling en als server-side environment variables in Vercel voor productie:

| Variabele | Betekenis |
| --- | --- |
| `STRATO_SMTP_HOST` | SMTP-hostnaam uit de Strato-mailinstellingen |
| `STRATO_SMTP_PORT` | `465` voor implicit TLS of `587` voor STARTTLS |
| `STRATO_SMTP_SECURE` | `true` bij poort `465`; `false` bij poort `587` |
| `STRATO_SMTP_USER` | Volledige Strato-mailboxnaam voor SMTP-authenticatie |
| `STRATO_SMTP_PASS` | Wachtwoord/app-wachtwoord voor die mailbox |
| `STRATO_SMTP_FROM` | Afzenderadres dat deze Strato-mailbox mag gebruiken |

Gebruik voor hostnaam, poort, TLS en wachtwoord de actuele instellingen van de betreffende Strato-mailbox; zet geen wachtwoorden in Git of frontendcode. De ontvanger is het bedrijfsadres uit `data/business.json` (`info@vandevoortgrondwerken.nl`). Het formulieradres van de bezoeker wordt alleen als `Reply-To` gebruikt.

## Verzendgedrag

`lib/contact-delivery.ts` leest de `STRATO_SMTP_*`-variabelen op de server, verstuurt platte tekst en meldt alleen succes nadat Nodemailer de mailserveracceptatie heeft bevestigd. Ontbrekende of ongeldige SMTP-configuratie en SMTP-storingen geven een generieke HTTP 503; foutdetails en formuliergegevens worden niet aan de bezoeker of logs blootgesteld. Ongeldige aanvragen blijven 4xx-responses.

## Spamfilter en noodstop

Het formulier bevat een verborgen `website`-honeypot. De API accepteert alleen een lege tekenreeks en weigert een ingevulde, ontbrekende of ongeldige waarde vóórdat e-mail wordt verstuurd. Dit vangt eenvoudige bots, maar is geen rate limiter: een script dat de API rechtstreeks aanroept kan het veld leeg laten.

De Vercel-noodstop blokkeert formulierinzendingen met een Firewall-regel: **Request Path → Equals → `/api/contact`** en via **AND** **Method → Equals → `POST`**, met actie **Deny**. Houd de regel uitgeschakeld zolang het formulier beschikbaar moet zijn; een actieve regel blokkeert ook echte inzendingen. Zet de regel bij spam aan en schakel hem weer uit als de spam voorbij is.

Er is bewust geen externe CAPTCHA-, Redis- of betaalde rate-limitdienst toegevoegd. Vercel biedt WAF-rate limiting op Hobby met usage-based kosten; deze site gebruikt dat niet standaard. Er is ook geen persistente idempotency-opslag: de knop voorkomt dubbelklikken in dezelfde browser, maar een herhaalde aanvraag na een time-out kan theoretisch een dubbele mail opleveren.

De privacyverklaring op `/privacy` is door de klant goedgekeurd. Contactaanvragen die niet tot een opdracht leiden worden uiterlijk 12 maanden na het laatste contact uit de mailbox en archiefmap verwijderd. De gebruiksvoorwaardenpagina is afzonderlijk en blijft een concept totdat de goedkeuring daarvan is bevestigd. De reviewweergave gebruikt statische fragmenten en doet geen Google Places API-verzoeken.

## Productiecontrole

1. De Vercel-noodstop en productie-SMTP-instellingen zijn door de eigenaar geconfigureerd. Controleer bij wijzigingen dat de zes `STRATO_SMTP_*`-waarden alleen in de bedoelde Vercel-omgeving staan.
2. De domeinbeheerder controleert SPF/DKIM volgens de instructies van Strato en inspecteert bestaande DNS-records voordat die worden gewijzigd.
3. Verstuur na een geautoriseerde productie-deploy een test via het formulier en controleer ontvangst in `info@vandevoortgrondwerken.nl`; gebruik beantwoorden om te bevestigen dat de bezoeker als Reply-To is ingesteld.
4. Voer de afgesproken opschoning van de mailbox en archiefmap uiterlijk 12 maanden na het laatste contact uit. De privacyverklaring is goedgekeurd; houd de WAF-noodstop beschikbaar.
