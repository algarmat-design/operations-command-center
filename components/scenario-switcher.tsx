import Link from "next/link";
import type { ScenarioKey } from "@/lib/types";

const scenarios: { key: ScenarioKey; label: string; tone: string }[] = [
  { key: "normal", label: "Normal", tone: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300" },
  { key: "crisis", label: "Crisis", tone: "border-rose-500/30 bg-rose-500/5 text-rose-300" },
  { key: "growth", label: "Growth", tone: "border-sky-500/30 bg-sky-500/5 text-sky-300" },
];

export function ScenarioSwitcher({ current }: { current: ScenarioKey }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[var(--surface-2)] p-1 text-xs">
      {scenarios.map((s) => {
        const active = s.key === current;
        return (
          <Link
            key={s.key}
            href={s.key === "normal" ? "/" : `/?scenario=${s.key}`}
            className={`rounded-full px-3 py-1 transition ${
              active ? `border ${s.tone} font-semibold` : "text-slate-400 hover:text-white"
            }`}
            scroll={false}
          >
            {s.label}
          </Link>
        );
      })}
    </div>
  );
}
