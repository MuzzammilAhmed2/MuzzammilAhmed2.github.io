# Muzzammil Ahmed — Portfolio

Next.js 15 (App Router, TypeScript) · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Framer Motion · SplitType.
Theme: **Midnight Ledger** (dark, teal accent, Space Grotesk / Inter / JetBrains Mono).

## Run it locally (Zorin OS / Linux)

```bash
cd "/media/muzzammilahmed/New Volume/portfolio/site"
npm install
cp .env.example .env.local     # then edit it
npm run dev                    # http://localhost:3000
```

Production check:

```bash
npm run build && npm start
```

## Edit content

All copy lives in **`src/data/content.ts`** — projects, stats, skills, experience, certifications, services.
The CV is the source of truth; keep it that way.

## Add BankSphere screenshots & recording

Drop files into `public/projects/banksphere/` using the names in that folder's `README.md`
(`kyc.png`, `detective.png`, … `demo.mp4`). They replace the diagrams automatically — no code changes.

## Contact form (Formspree — free tier)

1. Sign up at https://formspree.io with your email.
2. **New form** → copy the ID from the endpoint `https://formspree.io/f/<ID>`.
3. Put it in `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID=<ID>` and in Vercel → Project → Settings → Environment Variables.

Without an ID the form opens the visitor's mail app with the message pre-filled, so it never silently fails.

## Deploy to Vercel

1. Push this `site` folder to a GitHub repo (e.g. `portfolio`).
2. https://vercel.com → **Add New Project** → import the repo → Deploy (defaults are fine).
3. Add env vars `NEXT_PUBLIC_SITE_URL` (your Vercel / custom domain) and `NEXT_PUBLIC_FORMSPREE_ID`, then redeploy.

## What's in it

- Loader with 0→100 counter (once per session; skipped with reduced motion)
- SplitType + GSAP word/char reveals, scramble-on-hover nav links
- Custom cursor (mouse devices only) — grows on links, shows "View" on project cards
- Magnetic buttons, Lenis smooth scroll, Framer Motion page transitions
- BankSphere section pins while 8 features change on scroll
- Horizontal project gallery driven by vertical scroll (vertical stack on phones)
- Mask/scale image reveals, animated gradient + grain hero
- Only `transform` / `opacity` animated; everything readable with `prefers-reduced-motion`
- SEO: metadata, Open Graph / Twitter images (generated), JSON-LD Person, sitemap.xml, robots.txt
- Case-study pages at `/work/<slug>`
