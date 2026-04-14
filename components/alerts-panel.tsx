import type { Alert } from "@/lib/types";

const sevStyles: Record<Alert["severity"], string> = {
  info: "border-sky-500/30 bg-sky-500/5 text-sky-300",
  warning: "border-amber-500/30 bg-amber-500/5 text-amber-300",
  critical: "border-rose-500/40 bg-rose-500/10 text-rose-300",
};

function formatAge(mins: number): string {
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  return `${h}h ago`;
}

export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <section className="rounded-2xl border border-white/5 bg-[var(--surface)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Incidents & Bottlenecks</h2>
          <p className="text-xs text-slate-500">Auto-detected by the rules engine</p>
        </div>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-slate-400">{alerts.length}</span>
      </div>

      <ul className="space-y-3">
        {alerts.map((a) => (
          <li key={a.id} className={`rounded-xl border p-4 ${sevStyles[a.severity]}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{a.title}</p>
                <p className="mt-1 text-xs text-slate-300">{a.detail}</p>
              </div>
              <span className="shrink-0 text-[10px] uppercase tracking-wide opacity-80">{a.severity}</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
              <span>{a.source}</span>
              <span>·</span>
              <span>{formatAge(a.createdMinutesAgo)}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
