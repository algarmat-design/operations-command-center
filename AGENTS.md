<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions

## Content lives in `content/`, and only there

`content/profile.ts` is the single source of truth for everything the site says
about Alvaro — CV text, metrics, contact details. `/resume`, `/resume/print` and
`public/resume.pdf` all render from it, so they cannot disagree.

`experience`, `credentials` and `skills` are transcribed **verbatim** from the
resume PDF. Do not paraphrase, re-date or embellish them.

Never hardcode CV text, a metric or a contact detail in a component. Verify with:

```bash
grep -rniE "algarmat|3128-8999|Credit Pros|Rackspace|Payclip|Morgan Stanley" \
  app components scripts --include='*.ts' --include='*.tsx'   # must be empty
```

Alista Consulting is deliberately absent from the site. Its technical work is
represented through `projects` and `capabilities`, never as an employer.

## Design tokens only

Colors come from the semantic tokens in `app/globals.css`, consumed as Tailwind
utilities (`bg-surface`, `text-text-muted`, `border-line`, `text-good`).

- No raw palette classes (`text-slate-400`), no arbitrary values (`bg-[var(--x)]`).
- No `dark:` variants. Light and dark flip through CSS `light-dark()`, so **no
  color may be defined inside an `@media` block or a `[data-theme]` block** —
  `npm run check:data` asserts this mechanically.
- The teal accent is brand. It must never signal status. Status is
  `--good` / `--warn` / `--critical` only.

Chart primitives never choose a color; `color` is a required prop.

## Server components by default

`components/theme-toggle.tsx` is the only `'use client'` file. Do not add
`error.tsx` (it would force a second client component) — the site is fully
static with no request-time data.

## Scripts

- `npm run check:data` — data coherence + the token audit. Run after touching
  anything in `content/dashboards/`.
- `npm run resume:pdf` — regenerates `public/resume.pdf` via Playwright.
- `npm run check:layout` — horizontal-overflow and keyboard checks; needs a
  server running on port 4322.

`scripts/*.mts` are `.mts` on purpose: `package.json` has no `"type": "module"`,
so a `.ts` file would be treated as CommonJS by Node's type stripping.

**Never add a `prebuild` or `postbuild` hook.** That is the one change that
would pull Playwright into the Vercel build, which has no browser.

## Vercel

`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` must be set as an environment variable on
all environments, or every deploy downloads ~140MB of Chromium it cannot use.
