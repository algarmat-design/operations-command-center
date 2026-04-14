import Link from "next/link";
import { KpiCard } from "@/components/kpi-card";
import { AlertsPanel } from "@/components/alerts-panel";
import { RecommendationsPanel } from "@/components/recommendations";
import { FunnelChart } from "@/components/funnel-chart";
import { ProjectsPanel } from "@/components/projects-panel";
import { CampaignsPanel } from "@/components/campaigns-panel";
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

      {/* Executive framing */}
      <section className="mb-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.07] via-emerald-500/[0.02] to-transparent p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Built for C-level leadership
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-200 sm:text-[15px]">
          This dashboard illustrates how I approach operations as a Senior IT Director. It consolidates the signals a
          CEO, COO or CTO needs to stay informed and make decisions — IT operations health, delivery portfolio, and
          commercial efficiency — and pairs every metric with a clear recommended action. The goal is not to produce
          more reports, but to shorten the distance between data and a well-reasoned decision.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Use the scenario switch above to see how the system reacts to Normal, Crisis and Growth operating states.
        </p>
      </section>

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

      {/* KPI grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.kpis.map((k) => (
          <KpiCard key={k.id} kpi={k} />
        ))}
      </section>

      {/* IT Ops snapshot strip */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <OpsStat label="Open tickets" value={data.itOps.openTickets.toString()} delta={`${data.itOps.ticketDeltaPct > 0 ? "+" : ""}${data.itOps.ticketDeltaPct.toFixed(0)}% WoW`} good={data.itOps.ticketDeltaPct <= 0} />
        <OpsStat label="P1 open" value={data.itOps.p1.toString()} good={data.itOps.p1 === 0} />
        <OpsStat label="P2 open" value={data.itOps.p2.toString()} good={data.itOps.p2 < 4} />
        <OpsStat label="Changes / wk" value={data.itOps.changesThisWeek.toString()} good />
        <OpsStat label="Failed changes" value={data.itOps.failedChanges.toString()} good={data.itOps.failedChanges === 0} />
        <OpsStat label="SLA compliance" value={`${data.itOps.slaCompliancePct.toFixed(1)}%`} good={data.itOps.slaCompliancePct >= 95} />
      </section>

      {/* Alerts + Recommendations */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AlertsPanel alerts={alerts} />
        <RecommendationsPanel items={recommendations} />
      </div>

      {/* Projects + Campaigns */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
        <ProjectsPanel projects={data.projects} />
        <CampaignsPanel campaigns={data.campaigns} />
      </div>

      {/* Marketing funnel */}
      <section className="mt-8 rounded-2xl border border-white/5 bg-[var(--surface)] p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Marketing → Deals Funnel
            </h2>
            <p className="text-xs text-slate-500">
              How effective campaigns are at turning reach into closed-won clients — tracked month over month so the
              acquired customer list grows predictably.
            </p>
          </div>
          <Link href="/workflow" className="text-xs text-emerald-300 hover:text-emerald-200">
            View workflow →
          </Link>
        </div>
        <FunnelChart steps={data.funnel} />
      </section>
    </div>
  );
}

function OpsStat({ label, value, delta, good }: { label: string; value: string; delta?: string; good: boolean }) {
  return (
    <div className="rounded-xl border border-white/5 bg-[var(--surface)] p-3">
      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`mt-1 text-lg font-semibold ${good ? "text-white" : "text-rose-300"}`}>{value}</p>
      {delta && <p className={`text-[10px] ${good ? "text-emerald-300" : "text-rose-300"}`}>{delta}</p>}
    </div>
  );
}
