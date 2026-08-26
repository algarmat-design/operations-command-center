import type { MetricSpec, Tone } from "@/content/dashboards/types";
import { Sparkline } from "@/components/charts/sparkline";

const TONE_TEXT: Record<Tone, string> = {
  good: "text-good",
  warn: "text-warn",
  critical: "text-critical",
  neutral: "text-text-muted",
};

const TONE_VAR: Record<Tone, string> = {
  good: "var(--good)",
  warn: "var(--warn)",
  critical: "var(--critical)",
  neutral: "var(--text-muted)",
};

export function MetricCard({ metric }: { metric: MetricSpec }) {
  return (
    <article className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-5">
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-text-muted">{metric.label}</h3>
        {metric.delta && (
          <span className={`num shrink-0 text-xs font-medium ${TONE_TEXT[metric.tone]}`}>{metric.delta}</span>
        )}
      </header>

      <p className="num text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-none text-text">{metric.value}</p>

      <p className="num text-[11px] uppercase tracking-[0.14em] text-text-faint">
        {metric.unit}
        {metric.target ? ` · target ${metric.target}` : ""}
      </p>

      {metric.series && (
        <Sparkline values={metric.series} color={TONE_VAR[metric.tone]} label={`${metric.label} trend`} />
      )}

      <p className="mt-auto border-t border-line pt-3 text-[13px] leading-relaxed text-text-muted">
        {metric.context}
      </p>
    </article>
  );
}

export function MetricGrid({ metrics }: { metrics: readonly MetricSpec[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m) => (
        <MetricCard key={m.id} metric={m} />
      ))}
    </div>
  );
}
