import { Sparkline } from "./sparkline";
import type { Kpi } from "@/lib/types";

const statusStyles: Record<Kpi["status"], { badge: string; spark: string }> = {
  healthy: { badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30", spark: "#10b981" },
  watch: { badge: "bg-amber-500/10 text-amber-300 border-amber-500/30", spark: "#f59e0b" },
  breach: { badge: "bg-rose-500/10 text-rose-300 border-rose-500/30", spark: "#f43f5e" },
};

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const style = statusStyles[kpi.status];
  const delta = kpi.deltaPct;
  const deltaLabel = `${delta > 0 ? "+" : ""}${delta.toFixed(1)}%`;
  const deltaColor =
    kpi.status === "breach"
      ? "text-rose-300"
      : kpi.status === "watch"
        ? "text-amber-300"
        : "text-emerald-300";

  return (
    <div className="group relative rounded-2xl border border-white/5 bg-[var(--surface)] p-5 transition hover:border-white/10 hover:bg-[var(--surface-2)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{kpi.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{kpi.value}</p>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${style.badge}`}>
          {kpi.status}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs">
        <span className={`font-medium ${deltaColor}`}>{deltaLabel}</span>
        {kpi.target && <span className="text-slate-500">Target {kpi.target}</span>}
      </div>

      <div className="mt-4">
        <Sparkline values={kpi.sparkline} color={style.spark} />
      </div>

      <p className="mt-3 text-xs text-slate-400">{kpi.context}</p>
    </div>
  );
}
