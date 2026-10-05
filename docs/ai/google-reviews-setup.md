# Google reviews connection

The integration uses Google Places API (New), Place Details. It is prepared but cannot fetch genuine reviews until the business listing and credentials are configured.

The user-provided Google search identified Van de Voort Tuinen at Hondsklauw 20, 5271 CN Sint-Michielsgestel, telephone 06 83259762. The matching observed Maps feature ID is `0x47c6e94540e48b67:0x75675c97c6f25817`; a direct link is stored in `data/google-business.json` and displayed even before API activation. This Maps feature ID is not the Places API Place ID. Resolve that listing through the Place ID finder or an authorized Places lookup once the key is available.

## Owner setup

1. Confirm the business listing and obtain its Place ID using Google's Place ID finder. Check the website/telephone match this business before using it.
2. Create/select an owner-controlled Google Cloud project, enable billing and **Places API (New)**, then create an API key restricted to that API. For a server key, use IP restrictions only when the hosting has fixed outbound IPs; browser HTTP-referrer restrictions do not work for these server calls.
3. Put the following in ignored `.env.local` for local development, and in Vercel environment settings for the intended deployment environments. Never use a `NEXT_PUBLIC_` variable or commit the actual key:

   ```dotenv
   GOOGLE_PLACES_API_KEY=your_server_side_key
   GOOGLE_PLACE_ID=the_confirmed_business_place_id
   ```

4. Restart the local server; redeploy after changing Vercel environment variables. Check the listing name, aggregate rating, author/source links and review text against the actual Google listing.
5. Set API quotas and billing alerts in Google Cloud. Reviews use a paid Places field tier; verify current prices before enabling production traffic. The endpoint always targets this one business. Add hosting-level rate limiting for `/api/google-reviews` before public launch to limit automated billable requests.
6. Google requires publicly accessible website Terms of Use and Privacy Policy incorporating the applicable Google terms/privacy references. Add owner-approved pages before going live; the current site does not have them. Account/billing acceptance stays with the owner.

## Behavior

- The API supplies at most five reviews selected by relevance, not all reviews or a guaranteed latest-first list. The interface labels this and links to the full listing.
- Review texts are rendered as plain text, with original language preferred, rating, author attribution/avatar/profile link, date, individual review link and provider attributions.
- The API key stays in the server route. Response validation rejects malformed data and non-HTTPS attribution links. Provider errors and keys are never returned to visitors.
- Fetch occurs once when the review section approaches the viewport. Google content is not written to disk, database, Next data cache or CDN cache. No synthetic reviews are shipped.
- Missing configuration, provider failures and empty review results have honest fallback states; the rest of the homepage remains usable.
- Integration cannot be called live-tested until valid credentials and the correct Place ID are supplied.

## References

- [Places setup and credentials](https://developers.google.com/maps/documentation/places/web-service/get-api-key)
- [Place IDs](https://developers.google.com/maps/documentation/places/web-service/place-id)
- [Place Details fields and billing tiers](https://developers.google.com/maps/documentation/places/web-service/place-details)
- [Attribution, caching and policy requirements](https://developers.google.com/maps/documentation/places/web-service/policies)
- [All reviews through Business Profile API](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list): a separate owner-authorized integration, requiring OAuth and Business Profile API access.
