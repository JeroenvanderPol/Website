# Contactformulier en Strato SMTP

Het formulier verstuurt JSON naar `POST /api/contact`. Browser en server gebruiken dezelfde validatie: naam, geldig e-mailadres, bericht en toestemming zijn verplicht. Bericht maximaal 1000 tekens; overige tekstvelden maximaal 100. De server begrenst aanvragen ook op 16 KiB.

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

## Productiecontrole

1. Configureer alle zes variabelen in Vercel voor de juiste omgeving en herstart/herdeploy de server nadat waarden zijn aangepast.
2. Controleer de SPF/DKIM-instellingen voor het afzenderdomein volgens de instructies van Strato.
3. Verstuur een test via het formulier en controleer ontvangst in `info@vandevoortgrondwerken.nl`; gebruik beantwoorden om te bevestigen dat de bezoeker als Reply-To is ingesteld.
4. Test ontbrekende configuratie en SMTP-storingen. Activeer productiegebruik pas nadat server-side spam-/ratebeperking en bescherming tegen dubbele verzending zijn geregeld; een procesgeheugen-teller is niet voldoende voor serverless hosting.
