# Muzzammil Ahmed — Portfolio

Personal site for a Data Engineer · BI Developer · Data & AI Consultant: live at
<https://muzzammilahmed2.github.io>.

**Stack:** Next.js 15 (App Router, TypeScript, static export) · Tailwind CSS 4.1 · GSAP + ScrollTrigger · Lenis · SplitType.
**Theme:** *Aura* — cinematic black `#050507`, electric blue `#5B9DFF`, cyan `#22D3EE`, fire-orange `#FF9D4D` edge;
Space Grotesk / Inter / JetBrains Mono.

## Run locally

Needs Node 18.18+ (CI uses Node 20). Tailwind is pinned to 4.1.x because later 4.x releases need Node 20.

```bash
npm ci
cp .env.example .env.local   # optional: fill in what you need
npm run dev                  # http://localhost:3000
```

Check a production build exactly as GitHub Pages gets it:

```bash
npm run lint && npx tsc --noEmit
STATIC_EXPORT=1 npm run build   # writes ./out
npx serve out                   # http://localhost:3000
```

## Edit content

- **All copy** lives in [`src/data/content.ts`](src/data/content.ts): hero, about stats, BankSphere, PlantMind,
  client projects, skills, experience, certifications and services. The CV is the source of truth: don't add
  claims, numbers or client names that aren't in it.
- **Case-study list** (static params, share images): [`src/data/work.ts`](src/data/work.ts) is derived from `content.ts`.
- **Screenshots:** `public/projects/banksphere/` and `public/projects/plantmind/`. How to add BankSphere media:
  [`docs/media-guide.md`](docs/media-guide.md).
- **Photo:** add `public/me.jpg` and the hero shows it automatically.
- **CV:** `public/Muzzammil-Ahmed-CV.pdf` (a copy with the phone number removed). The download links appear only
  when the file exists.
- **Share images** are rendered at build time from [`src/app/og/[file]/route.tsx`](src/app/og/%5Bfile%5D/route.tsx).

## Deploy (GitHub Pages)

Every push to `main` runs [`.github/workflows/pages.yml`](.github/workflows/pages.yml): `npm ci`, a static
build with `STATIC_EXPORT=1`, then deploy to GitHub Pages. Nothing else to do.

### Repo variables

Settings → **Secrets and variables** → **Actions** → **Variables** tab → **New repository variable**:

| Name | Value | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID (after `/f/`) | Contact form posts to Formspree. Empty: opens the visitor's email app. |
| `NEXT_PUBLIC_CF_BEACON_TOKEN` | Cloudflare Web Analytics token | Loads the cookie-free analytics beacon. Empty: no analytics. |

Re-run the workflow (Actions → Deploy to GitHub Pages → Run workflow) after changing a variable.

**Formspree:** sign up at <https://formspree.io> → New form → copy the ID from `https://formspree.io/f/<ID>`.

**Cloudflare Web Analytics:** dash.cloudflare.com → Analytics & Logs → Web Analytics → Add a site →
enter `muzzammilahmed2.github.io` → choose the JavaScript snippet and copy the `token` value from it.

### Vercel (optional)

The site also builds on Vercel without `STATIC_EXPORT`. Import the repo, add the same variables plus
`NEXT_PUBLIC_SITE_URL`. On Node 18 the Vercel CLI needs `vercel@41`.

<!--
### Custom domain (prepared, not active)

To serve the site from e.g. muzzammilahmed.dev:
1. Add a file `public/CNAME` containing just the domain:  muzzammilahmed.dev
2. DNS at your registrar:
   - apex (muzzammilahmed.dev): four A records → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
     (and AAAA → 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153)
   - www: CNAME → muzzammilahmed2.github.io
3. Repo Settings → Pages → Custom domain → enter the domain → tick "Enforce HTTPS" once the certificate is issued.
4. In pages.yml change NEXT_PUBLIC_SITE_URL to https://muzzammilahmed.dev so canonicals, sitemap and share images use it.
-->

## Accessibility and motion

- Everything is readable with `prefers-reduced-motion`; the intro loader (≈1.1 s, first visit per session) is skipped
  then and on touch screens.
- Entrances slide from behind a mask rather than fading, so text keeps full contrast on every frame.
- Checked with axe-core at 1440×900 and 390×844 on every page.

## Licence

The **source code** is MIT licensed, see [`LICENSE`](LICENSE).
**Content and CV © Muzzammil Ahmed. All rights reserved.** That covers the text, CV, photos, screenshots, videos
and project descriptions (everything in `src/data/` and `public/`).
