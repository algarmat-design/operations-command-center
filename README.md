# Operations Command Center

> A portfolio project by **Álvaro García** — IT Senior Director & Operator.

Executive dashboard that simulates how I run multi-business operations — KPIs, incident detection,
and an automated recommendations engine that turns metrics into actions.

**Live demo:** _(Vercel URL coming)_
**Resume:** [/resume](./app/resume/page.tsx) on the live site · [PDF](./public/resume.pdf)

---

## Why this exists

I'm applying to Director / Senior Director / VP-level IT roles. Beyond a résumé, I wanted a public
artifact that demonstrates the way I actually think: business-metric driven, systems-oriented, and
hands-on enough to ship code in 2026 using modern AI-assisted tooling.

This project was **designed, specified and shipped by me**, with Claude (Anthropic) as pair-programmer.
Architecture, KPI model, rules engine, and UX decisions are my own.

## What it demonstrates

- **Operator mindset** — the KPIs, alerts, and recommendations reflect real operational concerns
  (conversion drop, SLA breach, churn risk, capacity under growth).
- **Systems thinking** — a pure-TypeScript rules engine scores KPIs against targets and produces
  prioritized recommendations with impact/effort/owner annotations.
- **Hands-on execution** — Next.js 16 (App Router), TypeScript strict, Tailwind 4, server components,
  zero external UI libraries (custom charts in SVG).
- **AI-assisted delivery** — shipped end-to-end in hours by collaborating with Claude.

## Modules

| Route | What it shows |
| --- | --- |
| `/` | KPI dashboard, incident panel, recommendations, funnel, team SLAs |
| `/workflow` | Lead → Retention operational flow with per-stage health |
| `/resume` | Interactive résumé (not a PDF embed) — dynamic, minimalist |

The dashboard ships with three switchable scenarios (`?scenario=normal|crisis|growth`) so recruiters
can see the rules engine react to different operational states.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS 4** (custom theme tokens, no component library)
- **Inter** + **JetBrains Mono** via `next/font`
- **Server Components** for the rules engine (zero client JS in the data path)

## Architecture decisions

- **No backend** — mock data in TypeScript. The rules engine is a pure function; easy to unit-test,
  easy to swap for a real data source later.
- **No UI library** — custom KPI cards, sparklines, funnel and workflow diagrams in raw SVG/Tailwind.
  Keeps the bundle small and the aesthetic deliberate.
- **Scenarios via query params** — state lives in the URL (`?scenario=crisis`), no client state hook
  needed. Aligns with the server-component-first philosophy.
- **Dark UI** — slate-950 base, emerald accent for "healthy", amber for "watch", rose for "breach".

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build && npm run start
```

## Project structure

```
app/
  layout.tsx            # Shell: sidebar + mobile nav + footer
  page.tsx              # Dashboard
  workflow/page.tsx     # Operational workflow
  resume/page.tsx       # Interactive résumé
components/
  kpi-card.tsx  alerts-panel.tsx  recommendations.tsx
  funnel-chart.tsx  workflow-diagram.tsx
  sidebar.tsx  scenario-switcher.tsx  footer.tsx
  sparkline.tsx  resume-timeline.tsx
lib/
  types.ts              # Shared types
  mock-data.ts          # Three scenario datasets
  rules-engine.ts       # generateInsights(data) → { alerts, recommendations }
  resume-data.ts        # Résumé content
public/
  resume.pdf            # Downloadable PDF version
```

## Contact

- **Email** · [algarmat@gmail.com](mailto:algarmat@gmail.com)
- **LinkedIn** · [linkedin.com/in/algarmat](https://www.linkedin.com/in/algarmat)
- **WhatsApp** · +52 (33) 3128-8999

---

_Built by Álvaro García · Powered by Claude (Anthropic) · Next.js 16_
