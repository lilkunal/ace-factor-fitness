# Ace Factor Fitness

Multi-page gym website for **Ace Factor Fitness**, Aligarh, Uttar Pradesh.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · react-router-dom · anime.js

**Live:** https://lilkunal.github.io/ace-factor-fitness/ (GitHub Pages)

## Local dev

```bash
npm install
npm run dev
```

→ http://localhost:5175

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, about, facilities, testimonials |
| `/plans` | Membership plans & pricing |
| `/coaches` | Coach listing |
| `/coaches/shivam-sharma` | Shivam Sharma profile |
| `/coaches/kapil-singh` | Kapil Singh profile |
| `/coaches/mr-shrivastava` | Mr. Shrivastava profile |
| `/gallery` | Gym photo & video gallery |
| `/wellness` | Nutrition & wellness tips |
| `/contact` | Contact form & location |

## Deploy (GitHub Pages)

```bash
npm run deploy
```

Builds with `base: /ace-factor-fitness/` and pushes `dist/` to `gh-pages` branch.

Or manually:

```bash
npm run build:pages
# Upload dist/ to GitHub Pages
```

## Coach data

Scrape Instagram profiles:

```bash
pip install instaloader
python scripts/fetch_coaches.py
```

Output: `public/media/coaches/{username}/` + `manifest.json`

## Animations

SVGator-inspired motion effects (see [SVGator animation examples](https://www.svgator.com/blog/website-animation-examples-and-effects/)):

| Effect | Where |
|--------|-------|
| SVG stroke path draw-on-load | Hero hexagon accent, PageHero accent |
| Expressive typography stagger | Hero "LEGACY" character reveal |
| Nav underline slide | Header NavLink hover/active |
| Scroll-triggered fade/slide | Sections, pricing cards, coach cards (anime.js) |
| Pricing card glow pulse | Pro / "Most Popular" plan |
| Button hover/click micro-interactions | `.btn-power`, `.btn-outline`, CTA links |
| Ambient floating hexagon divider | Between home page sections |
| Counter number animation | Hero stats (existing, enhanced) |

All animations respect `prefers-reduced-motion`. Stack: anime.js v4 + lightweight CSS — no GSAP.

## Business

- **Address:** 14/161, Achal Rd, opp. D S College, Aligarh, UP 202001
- **Phone:** 090455 12346
- **Instagram:** [@ace_factor_fitness](https://www.instagram.com/ace_factor_fitness/)
