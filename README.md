# alvarogarcia.space

Personal brand site for **Alvaro Garcia — IT Senior Director**, built for
recruiters and hiring managers. Live at [alvarogarcia.space](https://alvarogarcia.space).

In under ten seconds the landing page answers: who this is, what he does, which
roles he fits, and where to download the CV. The dashboards are supporting
evidence, not the product.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind v4
(CSS-first, no config file) · npm · deployed on Vercel.

Zero runtime dependencies beyond `next`, `react` and `react-dom`. No charting
library — every chart is hand-written SVG. No UI library. One client component.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Landing: hero, proof strip, capabilities, role fit, dashboards, projects, career, contact |
| `/capabilities` | The eight capabilities in full, with evidence and the complete skill inventory |
| `/dashboards` | Index of the four demo boards, plus how to read them |
| `/dashboards/executive` | C-level financials — MRR, margin, EBITDA, budget variance, unit economics, marketing funnel |
| `/dashboards/it-operations` | ITIL v4 service operations — SLA, MTTR/MTTA, severity mix, backlog aging, live incident queue |
| `/dashboards/devops` | DORA delivery metrics with computed performance bands, pipeline health, vulnerabilities |
| `/dashboards/roadmap` | Four-quarter transformation roadmap with dependency connectors, investment and benefit views |
| `/resume` | CV rendered from `content/profile.ts` |
| `/resume/print` | Print layout; the source `resume:pdf` prints to `public/resume.pdf` |
| `/workflow` | 308 redirect to `/dashboards/executive` (legacy route) |

All dashboard data is synthetic and labelled as such on every board.

## Content model

`content/profile.ts` is the single source of truth for CV text, metrics and
contact details. The web resume, the print layout and the PDF all render from
it, so they cannot drift apart.

Updating the CV is: edit `content/profile.ts` → `npm run resume:pdf` → commit.

`content/dashboards/*` holds the synthetic datasets. Ratios are derived from
their inputs by pure functions rather than authored, and `npm run check:data`
asserts the results reconcile.

## Design system

Semantic tokens in `app/globals.css`, consumed as Tailwind utilities. Light and
dark are both defined unconditionally through CSS `light-dark()` — no color
exists inside a media query or a `[data-theme]` block, which the token audit in
`check:data` verifies. The teal brand accent never signals status; that is what
`--good` / `--warn` / `--critical` are for.

Type: Chivo (display) · Public Sans (body) · JetBrains Mono (data, tabular figures).

## Commands

```bash
npm run dev           # development server
npm run build         # production build
npm run lint          # Next 16 no longer lints during build — run this separately
npm run check:data    # data coherence + design-token audit
npm run resume:pdf    # rebuild and regenerate public/resume.pdf via Playwright
npm run check:layout  # horizontal-overflow + keyboard checks (needs a server on :4322)
```

### Regenerating the PDF

```bash
npm run resume:pdf
```

Requires Chromium once: `npx playwright install chromium`. Chromium embeds a
creation timestamp, so `public/resume.pdf` shows a git diff on every run even
when the content is identical — regenerate deliberately, not casually.

### Deployment note

Set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` in the Vercel project environment
variables (all environments). Playwright is a devDependency used only by the
local PDF and layout scripts; without this, every deploy downloads ~140MB of
Chromium it will never use.

## Contact

algarmat@gmail.com · [linkedin.com/in/algarmat](https://www.linkedin.com/in/algarmat) · Guadalajara, Mexico
