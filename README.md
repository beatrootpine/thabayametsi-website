# thabayametsi.com

Land site for Thaba Ya Metsi Private Game Reserve. Built by Beatroot Pineapple from the
"Website Copy, Wireframes & SEO" document (28 Sep 2026 revision).

## Stack
- Astro 5, fully static: every page renders its full text without JavaScript.
- Fonts self-hosted (Cormorant Garamond for headlines, Source Sans 3 for body), latin subset.
- Images: responsive WebP (480/960/1440/1920), lazy below the fold, hero preloaded.
- Hosting: Vercel (`vercel.json` sets clean URLs, no trailing slash, caching, `/sitemap.xml`).
- Forms: `/api/enquiry` Vercel function. Honeypot + minimum fill time, no visible CAPTCHA.

## Run
    npm install
    npm run dev        # http://localhost:4321
    npm run build      # output in dist/

## Deploy (Vercel)
1. Push this folder to a GitHub repo and import it in Vercel (framework: Astro).
2. Environment variables for the forms:
   - `RESEND_API_KEY`, `OFFICE_EMAIL`, `FROM_EMAIL` (sends each enquiry to the office inbox)
   - `SHEET_WEBHOOK_URL` (optional: a Google Apps Script web app that appends rows to a sheet)
3. Domain: `www.thabayametsi.com` as primary, apex redirecting to www.
   Add `noindex` (Vercel > Settings > Deployment Protection, or the `noindex` prop) on staging until launch.

## Replace before launch
- `photos-raw/` placeholders (Unsplash + Wikimedia Commons) with the commissioned shoot.
  Drop new WebP/JPEG files named by subject into `../photos-raw`, then `node scripts/images.mjs`.
- `public/img/stud-and-wildlife-logo.svg` is a stand-in. Replace with the real Stud & Wildlife mark.
- `src/data/site.ts`: office phone, email, postal address, The Maravi contacts, Instagram URL.
- Every yellow "confirm" highlight on the site (`class="tbc"`) is an open [confirm] item from the brief:
  Sepedi species names, sable herd start year, biosphere membership, helipad coordinates,
  the R101 turn and gravel distance, bird list PDF, commitments, solar set-up, Boran society status,
  pronunciation recording, fact-sheet PDF, Companies Act / FAIS review of the Stud & Wildlife page.
- Journal entries in `src/content/journal/` are launch drafts (`draft: true`): the field guide fills the
  bracketed figures, then sets `draft: false`.

## SEO and AI readiness
- One H1 per page, titles and metas from the brief, canonical URLs, OpenGraph 1200x630 per page.
- JSON-LD on every page: Organization + LandmarksOrAttraction, LodgingBusiness (The Maravi),
  Stud & Wildlife Organization, WebSite; BreadcrumbList on inner pages; FAQPage on Home;
  Article on journal entries; ImageObject on heroes.
- `public/llms.txt`, `public/robots.txt` (no AI crawlers blocked), sitemap via @astrojs/sitemap.
- Outbound links to The Maravi carry `data-track` attributes for analytics click events.
