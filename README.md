# Sravanthi Panga — Portfolio

A personal portfolio for **Sravanthi Panga, Software Engineer**. It's a single continuous page in white, black, and gray, built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and Lenis.

All text comes from [`public/Sravanthi_Panga_Resume.pdf`](public/Sravanthi_Panga_Resume.pdf) and lives in one file: [`src/lib/data.ts`](src/lib/data.ts).

## Run it

**Live site:** https://sravanthipanga.github.io/portifolio/

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out (types + lint)
npm start          # preview ./out locally
```

## Hosting (GitHub Pages)

The site is a static export (`output: "export"` in `next.config.ts`). `.github/workflows/pages.yml` builds it and publishes it to GitHub Pages on every push to `main`. It sets `NEXT_PUBLIC_BASE_PATH=/portifolio` and `NEXT_PUBLIC_SITE_URL` for you.

One-time setup: in the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

All `/public` paths go through `asset()` in `src/lib/asset.ts`, so the site also works under a sub-path. To host it at a domain root (Vercel, Netlify, or a custom domain), leave `NEXT_PUBLIC_BASE_PATH` unset.

## Sections

| # | Section | Component | What it does |
|---|---|---|---|
| — | Navigation | `components/Navigation.tsx` | Initials mark that spins on hover. A frosted pill whose ink indicator slides under the active link. Scroll-progress bar. Full-screen mobile menu (Esc closes it, scroll is locked while open). |
| — | Hero | `components/hero/Hero.tsx` | Looping intro video, blended into the page with `mix-blend-mode: multiply`. Outlined ghost first name behind it. Tries to play with sound, falls back to muted, and unlocks sound on the first interaction. Pauses when under 35 % of the hero is visible. |
| 01 | About | `sections/About.tsx`, `ui/IdCard.tsx` | ID card on a lanyard with a damped pendulum swing and idle sway. Flips on hover, tap, or the "Flip card" button. |
| 02 | Skills | `sections/Skills.tsx`, `ui/TechLogo.tsx` | Every résumé skill as a periodic-table tile. Family filters, a diagonal wave reveal, and a sticky inspector showing the brand logo and where the skill appears in the résumé. |
| 03 | Work | `sections/Work.tsx`, `ui/MiniUI.tsx` | Expanding accordion of the projects named in the résumé (GEMMA, Atrium, Foundry pipelines, CEO app, Jakarta EE). Each has a grayscale CSS mock-up labelled "Illustrative UI". |
| 04 | Certifications | `sections/Certifications.tsx` | Numbered list. Each row floods with ink on hover or focus. |
| 05 | Experience | `sections/Experience.tsx` | Education and roles on one timeline. The spine draws as you scroll and stops light up as it reaches them. |
| 06 | Achievements | `sections/Achievements.tsx` | Pinned horizontal gallery of the measured results stated in the résumé. Numbers count up the first time they're seen. |
| 07 | Contact | `sections/Contact.tsx` | Letters hop on hover. Copy-email chip, phone/GitHub/LinkedIn links, a spinning "say hello" badge, and the footer. |

Shared pieces live in `src/lib/hooks.ts` (`useInView`, `useScrollProgress`, `prefersReducedMotion`), `src/lib/scroll.tsx` (Lenis plus `scrollToTarget`), and `components/ui/RevealObserver.tsx` (`.rv` / `.rv-mask` reveal on scroll). `prefers-reduced-motion` turns off smooth scrolling and decorative motion.

## Editing content

Change [`src/lib/data.ts`](src/lib/data.ts) only. The components just read from it. To update the résumé download, replace `public/Sravanthi_Panga_Resume.pdf`.

## Rebuilding the hero video

The raw intro video is kept at `media/intro.mp4`. The pipeline needs `ffmpeg` and Python 3 with `numpy`:

```bash
npm run hero                       # same as: python3 scripts/build-hero-assets.py
python3 scripts/build-hero-assets.py --src path/to/new.mp4 --crop 846:1058:559:21 --len 10 --fade 0.5
```

What the script does:

1. **Crop:** finds the person against the light backdrop, then crops tightly and centred, head to toe, at 768:960. Use `--crop W:H:X:Y` to override.
2. **Whiten:** applies `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` so the backdrop turns pure white and melts into the page.
3. **Loop:** plays from 0.5 s to 10 s and cross-fades the last 0.5 s back into the first 0.5 s. The picture uses `xfade`; the audio uses an equal-power, sample-accurate fade in numpy. Nothing is stretched or retimed, so lip sync is kept.
4. **Export:** `public/hero/hero.webm` (VP9 CRF 36 + Opus 80k) and `public/hero/hero.mp4` (H.264 CRF 24 slow + AAC 96k, `+faststart`).
5. **Stills:** `public/portrait-bust.webp` (480×600 head-to-shirt crop from the sharpest frame) and `public/og.jpg` (1200×630).

## Fonts

Self-hosted in `src/fonts` and loaded with `next/font/local`. All three are under the SIL Open Font License 1.1 (`src/fonts/LICENSE-OFL.txt`):

- Inter Tight (variable): display and body text
- Instrument Serif (regular and italic): the one italic accent word in each heading
- JetBrains Mono (variable): labels, indices, and numbers

## Logos: credits and licences

Brand logos are only used to identify the technologies listed in the résumé. They are trademarks of their owners.

- Most logos are **Devicon** "original" SVGs (MIT License): `public/logos/LICENSE-devicon.txt`.
- `palantir.svg`, `sumologic.svg`, `jmeter.svg`, and `springboot.svg` are **Simple Icons** paths (CC0 1.0): `public/logos/LICENSE-simple-icons.md`, `public/logos/DISCLAIMER-simple-icons.md`.
- Concept icons (APIs, patterns, testing, and so on) are hand-drawn line icons in `src/components/ui/TechLogo.tsx`.
