# GanJiang desktop download page

Static page at `/apps/index.html`, served by the existing website. No Node server, build,
publisher backend, or OSS credentials are needed. Open `index.html` directly or
serve the homepage repository with a static HTTP server.

The home, team and download pages load `site-chrome.css` for a shared 1440px content
limit, responsive gutters, header and footer. The header uses the same 30px logo
and GanJiang wordmark on all three pages.

## Languages

`locales.en.js` translates the Chinese source copy. `i18n.js` updates text nodes and
accessible labels without replacing interactive controls. `apps.js` redraws
dynamic estimates, menu labels and the selected case when the language changes.
The language toggle uses the homepage's `gan-jiang-language` preference and its
English default. Storage is optional, so switching also works in restricted file
or private browsing contexts. Keep English copy in sync with Chinese edits.

## Set the download center URL

Edit `downloads.js` and set `window.GANJIANG_DOWNLOADS.url` to the public HTTPS URL
of the download center on the other domain. The single download button and the
hero/footer download actions then navigate to that same destination in the current
tab. The URL is initially empty, keeping the main entry visibly pending.

The other site owns Mac/Windows selection, package versions, system requirements,
and installer links. This page deliberately does not duplicate those controls or
metadata. All homepage entry links use the explicit `apps/index.html` filename so
they work when opened directly from disk as well as through an HTTP server. Return
links use `../index.html#home` to show the homepage content rather than its entrance.

The configuration is public client-side code. Use public package URLs, never
access keys, private credentials, or temporary secrets. An unsupported URL scheme
or a URL containing an embedded username/password keeps the button disabled.

## Credits

`credits.js` contains the reference calculation, and `apps.js` connects it to the
form. Rules are based on `publisher/干将XRD功能积分与费用估算.md`, with the user's
subsequent confirmed corrections taking precedence. The source checkout stays
ignored by the parent repository.

- Every account receives 20,000 complimentary credits. RMB 9.9 purchases 990
  credits, and periodic community events offer additional credits.
- Figures are reference estimates, not live account balances or billing data.
- Tool credits and model usage are separate. RMB can purchase credits; credits
  can only be consumed within the account and cannot be converted back to RMB.
- FullProf costs 2,000 credits for the first round and 100 per additional round,
  up to 30 rounds and 4,900 credits total, with no additional validation fee.
  It is estimated at its maximum; users do not choose its cloud round count.
- WPEM uses 3 or 4 submitted computations, optionally 2 extra trials, plus one
  final validation.
- Single- and multiple-CIF simulation both cost 100 credits per submitted task,
  regardless of the number of CIFs in that task.
- Candidate, peak-shift, combination and WPEM / GSAS-II final refinement
  validations cost 20 credits each.
- Counts describe repeated submissions/validations, not internal iterations.

## USD cost reference

`money.js` holds the verified exchange-rate snapshot: **2026-10-14, 1 USD =
6.6923 CNY**, from [CurrencyBeacon](https://www.currencybeacon.com/rates/USD/CNY).
At 990 credits per RMB 9.9, the conversion is `credits / 100 / 6.6923` USD.
Totals are converted before rounding; rounded line items may differ by a cent
from the displayed total. Model fees are excluded and credits cannot be redeemed
for cash. The site displays the rate; the date and source are retained in the
configuration and this README, not shown on the page. It does not claim a live quote.

The estimator, breakdown, refinement choices, top-up amount and reference table
use the same conversion. Update the date, rate and source together in `money.js`
when refreshing the quote. Also refresh the initial HTML values for visitors
without JavaScript; active JavaScript recalculates all `data-usd-credits` fields.

## Reviewer and editor support

The section beneath the download center explains complimentary access for article
reviewers and editors. Users register and sign in with an anonymous email address,
then send the article number from that same address to `bincao@hkust-gz.edu.cn`.
The team credits the corresponding account for review use at no charge. The page
asks users to preserve anonymity throughout registration, login, and contact.
The email link opens the user's mail client; it does not submit or send anything.

## Case visual

The three SVGs in `assets/` use the existing `assets/science/egypt-data.js` dataset.
Observed and calculated curves come from that dataset; phase curves were already
reconstructed there from exported peak parameters. Extrema-preserving sampling
reduces vector size. Phase profiles are independently normalized and vertically
offset. Rwp 13.08% belongs only to this case. The preview is explicitly labeled as
a workflow illustration, not a screenshot of the desktop client.

The scrolling tool strip uses eight original SVG marks drawn for this page, not
official vendor logos. Its duplicate list is hidden from assistive technology.
Hover or the pause control stops scrolling; reduced-motion preferences switch to
a manually scrollable list.

## Local checks

```sh
node --check apps/credits.js
node --check apps/apps.js
node --check apps/downloads.js
node --test apps/credits.test.cjs apps/i18n.test.cjs apps/money.test.cjs
```

No deployment or repository push is performed by this page.
