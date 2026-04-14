import type { Recommendation } from "@/lib/types";

const priorityStyle: Record<Recommendation["priority"], string> = {
  high: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  medium: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  low: "bg-sky-500/10 text-sky-300 border-sky-500/30",
};

const effortStyle: Record<Recommendation["effort"], string> = {
  low: "text-emerald-300",
  medium: "text-amber-300",
  high: "text-rose-300",
};

export function RecommendationsPanel({ items }: { items: Recommendation[] }) {
  return (
    <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.04] to-[var(--surface)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Recommended Actions</h2>
          <p className="text-xs text-slate-500">Generated from KPIs + alerts — {items.length} suggestions</p>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
          Auto
        </span>
      </div>

      <ol className="space-y-4">
        {items.map((r, i) => (
          <li key={r.id} className="rounded-xl border border-white/5 bg-[var(--surface-2)]/60 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-semibold text-emerald-300">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{r.action}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${priorityStyle[r.priority]}`}>
                    {r.priority}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{r.rationale}</p>
                <div className="mt-3 grid grid-cols-1 gap-2 text-[11px] sm:grid-cols-3">
                  <div>
                    <span className="text-slate-500">Impact: </span>
                    <span className="text-slate-200">{r.impact}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Effort: </span>
                    <span className={effortStyle[r.effort]}>{r.effort}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Owner: </span>
                    <span className="text-slate-200">{r.owner}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
