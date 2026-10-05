# Contactformulier instellen

Het formulier verstuurt JSON naar `POST /api/contact`. Browser en server gebruiken dezelfde validatie: naam, geldig e-mailadres, bericht en toestemming zijn verplicht. Bericht maximaal 1000 tekens; overige tekstvelden maximaal 100. De server begrenst aanvragen ook op 16 KiB.

## Huidige POC

`lib/contact-delivery.ts` is het aansluitpunt voor mailbezorging. Deze functie doet nu niets: geen e-mail, opslag of logging van persoonsgegevens. Een geldige aanvraag krijgt HTTP 503 met `not-configured`. De bezoeker ziet dat verzending nog niet beschikbaar is en behoudt de tekst. Alleen een daadwerkelijke bevestiging van een toekomstige mailprovider mag de succesmelding activeren.

## Nog nodig voor echte verzending

1. De klant kiest een maildienst of bestaande zakelijke SMTP-dienst en geeft het ontvangstadres door.
2. De domeinbeheerder verifieert het afzenderdomein met de DNS-records die de maildienst opgeeft (onder andere SPF/DKIM).
3. De beheerder zet de geheime providergegevens in de serveromgeving van de hosting. Geen sleutels in frontendcode of Git.
4. De ontwikkelaar implementeert `deliverContactMessage`: gebruik een geverifieerd afzenderadres, het klantadres als ontvanger en het ingevulde e-mailadres uitsluitend als Reply-To. Gebruik platte tekst of escape inhoud bij HTML-mail.
5. Vóór activering: server-side spam-/ratebeperking, providerfoutafhandeling en bescherming tegen dubbele verzending toevoegen. Test ontvangst, mislukte bezorging en limieten op de productieomgeving.

De huidige POC verstuurt niets en vereist daarom nog geen provideraccount. Eventuele mailkosten hangen af van de gekozen dienst.
