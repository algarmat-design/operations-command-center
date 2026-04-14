import Link from "next/link";
import { WorkflowDiagram } from "@/components/workflow-diagram";
import { getScenario } from "@/lib/mock-data";
import type { ScenarioKey } from "@/lib/types";

function parseScenario(v: string | string[] | undefined): ScenarioKey {
  const s = Array.isArray(v) ? v[0] : v;
  if (s === "crisis" || s === "growth") return s;
  return "normal";
}

export default async function WorkflowPage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string }>;
}) {
  const params = await searchParams;
  const scenario = parseScenario(params.scenario);
  const data = getScenario(scenario);

  const nodes = [
    { label: "Lead", count: data.funnel[0].count.toLocaleString(), health: "healthy" as const, note: "Inbound + outbound combined" },
    { label: "Qualification", count: data.funnel[1].count.toLocaleString(), health: "healthy" as const, note: "BANT + fit scoring" },
    { label: "Proposal", count: data.funnel[2].count.toLocaleString(), health: scenario === "crisis" ? "breach" as const : "healthy" as const, note: scenario === "crisis" ? "Step 3 abandonment +23%" : "Healthy win rate" },
    { label: "Closed Won", count: data.funnel[3].count.toLocaleString(), health: "healthy" as const, note: "New MRR + expansions" },
    { label: "Onboarding", count: "—", health: scenario === "growth" ? "watch" as const : "healthy" as const, note: "CS capacity" },
    { label: "Retention", count: `${data.kpis.find((k) => k.id === "retention")?.value}`, health: scenario === "crisis" ? "watch" as const : "healthy" as const, note: `${data.churn.accountsAtRisk} at-risk accounts` },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">Operational Workflow</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Lead → Retention Flow
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              End-to-end operational stages with current volume and health per step. Health is computed against
              targets by the same rules engine that powers the dashboard recommendations.
            </p>
          </div>
          <Link href="/" className="hidden rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/5 sm:inline-flex">
            ← Dashboard
          </Link>
        </div>
      </header>

      <WorkflowDiagram nodes={nodes} />

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <InfoCard title="What this shows" body="How I think about operations — every business I run (consulting, hospitality, imports) eventually reduces to a funnel with health gates." />
        <InfoCard title="Why it matters" body="Directors and VPs are paid to spot where the funnel leaks and who needs to act. Metrics alone are not enough." />
        <InfoCard title="How it works" body="A small rules engine (pure TS) scores each stage against targets and surfaces recommendations with estimated impact." />
      </section>
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[var(--surface)] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">{title}</p>
      <p className="mt-2 text-sm text-slate-300">{body}</p>
    </div>
  );
}
