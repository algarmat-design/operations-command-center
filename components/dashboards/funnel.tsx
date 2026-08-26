import type { FunnelStep } from "@/content/dashboards/types";

const fmt = new Intl.NumberFormat("en-US");

/**
 * Marketing-to-deals funnel, carried over from the retired /workflow route.
 * Div bars rather than SVG — each row is a labelled block of text with a
 * proportional rule under it, which reads better than a shaped funnel and
 * reflows without any coordinate math.
 */
export function Funnel({ steps }: { steps: readonly FunnelStep[] }) {
  const max = Math.max(...steps.map((s) => s.count));

  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, i) => {
        const pct = (step.count / max) * 100;
        const conversion = i === 0 ? null : (step.count / steps[i - 1].count) * 100;

        return (
          <li key={step.label} className="flex flex-col gap-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-semibold text-text">{step.label}</p>
              <p className="num flex items-baseline gap-3 text-sm">
                <span className="font-semibold text-text">{fmt.format(step.count)}</span>
                {conversion !== null && (
                  <span className="text-xs text-text-faint">{conversion.toFixed(1)}% of previous</span>
                )}
              </p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken">
              <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs leading-relaxed text-text-muted">{step.note}</p>
          </li>
        );
      })}
    </ol>
  );
}
