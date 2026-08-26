import Link from "next/link";
import type { ReactNode } from "react";
import type { DashboardMeta } from "@/content/types";
import type { Insight } from "@/content/dashboards/types";
import { dashboards, identity } from "@/content/profile";
import { Badge, Eyebrow } from "@/components/ui/primitives";

/**
 * Every dashboard opens with the same three things, above the fold and before
 * any number: the synthetic-data disclaimer, who the board is for, and the
 * business question it answers. A non-technical reader has to be able to tell
 * what the board is for without being able to read the metrics.
 */
export function DashboardShell({
  meta,
  insights,
  children,
}: {
  meta: DashboardMeta;
  insights: readonly Insight[];
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="border-b border-line px-5 pb-8 pt-6 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <DemoDataBanner />

          <nav aria-label="Dashboards" className="flex flex-wrap items-center gap-1">
            <Link
              href="/dashboards"
              className="rounded-md px-2.5 py-1.5 text-[13px] text-text-muted hover:bg-surface-sunken hover:text-text"
            >
              All dashboards
            </Link>
            <span aria-hidden="true" className="text-text-faint">
              /
            </span>
            {dashboards.map((d) => (
              <Link
                key={d.slug}
                href={`/dashboards/${d.slug}`}
                aria-current={d.slug === meta.slug ? "page" : undefined}
                className={`rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                  d.slug === meta.slug
                    ? "bg-accent-quiet font-semibold text-accent"
                    : "text-text-muted hover:bg-surface-sunken hover:text-text"
                }`}
              >
                {d.shortTitle}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Eyebrow>{meta.framework}</Eyebrow>
              <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">{meta.title}</h1>
            </div>

            <dl className="flex flex-col gap-2 border-l-2 border-accent pl-4">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="num w-52 shrink-0 text-[11px] uppercase tracking-[0.16em] text-text-faint">
                  Audience
                </dt>
                <dd className="text-sm text-text">{meta.audience}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="num w-52 shrink-0 text-[11px] uppercase tracking-[0.16em] text-text-faint">
                  The question it answers
                </dt>
                <dd className="max-w-[65ch] text-sm text-text">{meta.question}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="num w-52 shrink-0 text-[11px] uppercase tracking-[0.16em] text-text-faint">
                  Measurement period
                </dt>
                <dd className="num max-w-[65ch] text-sm text-text">{meta.period}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="px-5 py-10 sm:px-8">
        <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-12">{children}</div>
      </div>

      <div className="border-t border-line px-5 py-12 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Eyebrow>How to read this</Eyebrow>
            <h2 className="text-2xl">What I would say in the room</h2>
            <p className="max-w-[65ch] text-sm leading-relaxed text-text-muted">
              The numbers above are instrumentation. This is the part that is actually the job —
              what the pattern means, what it does not mean, and what I would do about it.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {insights.map((ins) => (
              <li
                key={ins.title}
                className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-line bg-surface p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={ins.tone}>{TONE_LABEL[ins.tone]}</Badge>
                  <h3 className="text-base leading-snug text-text">{ins.title}</h3>
                </div>
                <p className="max-w-[75ch] text-sm leading-relaxed text-text-muted">{ins.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Section header for a dashboard. Boards were using a bare eyebrow as a section
 * title, which read as a throwaway label rather than a heading — this gives each
 * block a real, scannable h2.
 */
export function BoardSection({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex min-w-0 flex-col gap-5">
      <header className="flex flex-col gap-1.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-xl md:text-2xl">{title}</h2>
        {lede && <p className="max-w-[70ch] text-sm leading-relaxed text-text-muted">{lede}</p>}
      </header>
      {children}
    </section>
  );
}

const TONE_LABEL = {
  good: "Working",
  warn: "Watch",
  critical: "Act now",
  neutral: "Context",
} as const;

export function DemoDataBanner() {
  return (
    <div
      role="note"
      className="flex flex-col gap-1.5 rounded-md border border-warn/30 bg-warn-quiet px-4 py-3.5 text-sm"
    >
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-text">
        <strong className="font-bold text-warn">Example dashboard — demo data.</strong>
        <span className="text-text-muted">
          Synthetic figures built to illustrate the instrumentation. No employer data.
        </span>
      </p>
      <p className="max-w-[80ch] leading-relaxed text-text-muted">
        These four boards are worked examples by {identity.name}, built to demonstrate business
        acumen: what to measure, who to measure it for, and what to conclude from the reading.
        The numbers are invented; the judgment is the point.
      </p>
    </div>
  );
}
