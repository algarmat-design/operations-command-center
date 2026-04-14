import Link from "next/link";
import { KpiCard } from "@/components/kpi-card";
import { AlertsPanel } from "@/components/alerts-panel";
import { RecommendationsPanel } from "@/components/recommendations";
import { FunnelChart } from "@/components/funnel-chart";
import { ScenarioSwitcher } from "@/components/scenario-switcher";
import { getScenario } from "@/lib/mock-data";
import { generateInsights } from "@/lib/rules-engine";
import type { ScenarioKey } from "@/lib/types";

function parseScenario(v: string | string[] | undefined): ScenarioKey {
  const s = Array.isArray(v) ? v[0] : v;
  if (s === "crisis" || s === "growth") return s;
  return "normal";
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string }>;
}) {
  const params = await searchParams;
  const scenario = parseScenario(params.scenario);
  const data = getScenario(scenario);
  const { alerts, recommendations } = generateInsights(data);

  const lastRefreshed = new Date().toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">Operations Command Center</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {data.scenarioLabel}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">{data.scenarioDescription}</p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <ScenarioSwitcher current={scenario} />
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
          >
            View my Resume
            <span aria-hidden>→</span>
          </Link>
        </div>
      </header>

      <div className="mb-5 flex items-center gap-3 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live · rules engine active
        </span>
        <span>·</span>
        <span>Last refreshed {lastRefreshed}</span>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.kpis.map((k) => (
          <KpiCard key={k.id} kpi={k} />
        ))}
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AlertsPanel alerts={alerts} />
        <RecommendationsPanel items={recommendations} />
      </div>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-white/5 bg-[var(--surface)] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Conversion Funnel</h2>
              <p className="text-xs text-slate-500">Last 30 days · cross-business line</p>
            </div>
            <Link href="/workflow" className="text-xs text-emerald-300 hover:text-emerald-200">
              View workflow →
            </Link>
          </div>
          <FunnelChart steps={data.funnel} />
        </div>

        <div className="rounded-2xl border border-white/5 bg-[var(--surface)] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Team SLAs</h2>
          <p className="mb-4 text-xs text-slate-500">First-response minutes</p>
          <ul className="space-y-3">
            {data.teams.map((t) => {
              const healthy = t.sla <= t.slaTarget;
              return (
                <li key={t.team} className="text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200">{t.team}</span>
                    <span className={healthy ? "text-emerald-300" : "text-rose-300"}>
                      {t.sla}m / {t.slaTarget}m
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full ${healthy ? "bg-emerald-500/60" : "bg-rose-500/60"}`}
                      style={{ width: `${Math.min(100, (t.sla / t.slaTarget) * 100)}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
