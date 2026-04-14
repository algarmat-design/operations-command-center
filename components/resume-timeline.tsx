import type { ResumeRole } from "@/lib/types";

export function ResumeTimeline({ roles }: { roles: ResumeRole[] }) {
  return (
    <ol className="relative space-y-10 border-l border-white/10 pl-8">
      {roles.map((r) => (
        <li key={`${r.company}-${r.title}`} className="relative">
          <span className="absolute -left-[37px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/50 bg-[var(--background)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold text-white">{r.title}</h3>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-300">{r.company}</span>
          </div>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{r.period}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">{r.summary}</p>
          <ul className="mt-4 space-y-2">
            {r.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
