import type { ActiveProject } from "@/lib/types";

const statusStyle: Record<ActiveProject["status"], string> = {
  "on-track": "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  "at-risk": "bg-amber-500/10 text-amber-300 border-amber-500/30",
  delayed: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  mvp: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  launched: "bg-violet-500/10 text-violet-300 border-violet-500/30",
};

const statusLabel: Record<ActiveProject["status"], string> = {
  "on-track": "On Track",
  "at-risk": "At Risk",
  delayed: "Delayed",
  mvp: "MVP",
  launched: "Launched",
};

export function ProjectsPanel({ projects }: { projects: ActiveProject[] }) {
  return (
    <section className="rounded-2xl border border-white/5 bg-[var(--surface)] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Active Projects</h2>
          <p className="text-xs text-slate-500">Portfolio view — status, PM, progress and budget</p>
        </div>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300">
          {projects.length} active
        </span>
      </div>

      <ul className="space-y-3">
        {projects.map((p) => (
          <li key={p.code} className="rounded-xl border border-white/5 bg-[var(--surface-2)]/60 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-medium tracking-wider text-slate-500">{p.code}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusStyle[p.status]}`}>
                    {statusLabel[p.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-white">{p.name}</p>
                <p className="text-[11px] text-slate-400">PM · {p.pm} · Next: {p.nextMilestone}</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4">
              <Bar label="Progress" value={p.progressPct} colorHealthy={p.progressPct >= p.budgetUsedPct} />
              <Bar label="Budget used" value={p.budgetUsedPct} colorHealthy={p.budgetUsedPct <= p.progressPct + 5} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Bar({ label, value, colorHealthy }: { label: string; value: number; colorHealthy: boolean }) {
  const barColor = colorHealthy ? "bg-emerald-500/60" : value > 90 ? "bg-rose-500/60" : "bg-amber-500/60";
  const textColor = colorHealthy ? "text-emerald-300" : value > 90 ? "text-rose-300" : "text-amber-300";
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-400">{label}</span>
        <span className={textColor}>{value}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div className={`h-full ${barColor}`} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}
