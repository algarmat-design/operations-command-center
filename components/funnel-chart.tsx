import type { FunnelStep } from "@/lib/types";

export function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const max = Math.max(...steps.map((s) => s.count));
  return (
    <div className="space-y-4">
      {steps.map((s, i) => {
        const pct = (s.count / max) * 100;
        const conv = i === 0 ? 100 : (s.count / steps[i - 1].count) * 100;
        return (
          <div key={s.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-200">{s.label}</span>
              <span className="text-slate-400">
                {s.count.toLocaleString()} · {conv.toFixed(1)}%
              </span>
            </div>
            <div className="h-6 overflow-hidden rounded-lg bg-white/5">
              <div
                className="h-full rounded-lg bg-gradient-to-r from-emerald-500/70 to-emerald-400/40"
                style={{ width: `${pct}%` }}
              />
            </div>
            {s.note && <p className="mt-1 text-[11px] text-slate-500">{s.note}</p>}
          </div>
        );
      })}
    </div>
  );
}
