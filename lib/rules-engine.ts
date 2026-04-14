import type { Alert, Insights, OperationalData, Recommendation } from "./types";

export function generateInsights(data: OperationalData): Insights {
  const alerts: Alert[] = [];
  const recommendations: Recommendation[] = [];

  const kpi = (id: string) => data.kpis.find((k) => k.id === id);
  const conv = kpi("conversion");
  const sla = kpi("sla");
  const rev = kpi("revenue");
  const inc = kpi("incidents");
  const prod = kpi("productivity");
  const ret = kpi("retention");

  if (conv && conv.deltaPct <= -15) {
    alerts.push({
      id: "conv-drop",
      title: `Conversion dropped ${Math.abs(conv.deltaPct).toFixed(1)}% vs prior period`,
      detail: "Highest abandonment recorded at funnel step 3 (Proposal → Closed Won).",
      severity: "critical",
      source: "Funnel analytics",
      createdMinutesAgo: 42,
    });
    recommendations.push({
      id: "rec-conv",
      action: "Run a same-day diagnostic on funnel step 3",
      rationale: "Abandonment jumped at proposal stage — likely pricing, contract, or legal friction.",
      impact: "Recover ~20% of lost conversions within 2 weeks",
      effort: "medium",
      priority: "high",
      owner: "Head of Revenue Ops",
    });
  }

  if (sla && sla.rawValue > 120 * 1.25) {
    alerts.push({
      id: "sla-breach",
      title: `Support SLA breached — current ${formatMinutes(sla.rawValue)} vs target 2h`,
      detail: "Tier 1 queue backlog increased after last deploy.",
      severity: sla.rawValue > 180 ? "critical" : "warning",
      source: "Service desk",
      createdMinutesAgo: 18,
    });
    recommendations.push({
      id: "rec-sla",
      action: "Reallocate 2 agents from Tier 3 to Tier 1 queue for 48h",
      rationale: "Tier 3 volume is within SLA with slack; Tier 1 is the bottleneck.",
      impact: "Restore SLA within 24h, prevent retention loss",
      effort: "low",
      priority: "high",
      owner: "Support Lead",
    });
  }

  if (rev && rev.deltaPct <= -10) {
    alerts.push({
      id: "rev-decline",
      title: `Revenue down ${Math.abs(rev.deltaPct).toFixed(1)}% MoM`,
      detail: "Consulting pipeline stalled; hospitality and imports cannot offset the gap.",
      severity: "critical",
      source: "Finance",
      createdMinutesAgo: 120,
    });
    recommendations.push({
      id: "rec-rev",
      action: "Trigger win-back campaign on top-50 dormant accounts",
      rationale: "Reacquisition is 5× cheaper than net-new at this pipeline stage.",
      impact: "Recover $180K–$240K in 30 days",
      effort: "medium",
      priority: "high",
      owner: "Marketing & Sales",
    });
  }

  if (inc && inc.rawValue >= 8) {
    alerts.push({
      id: "incidents-high",
      title: `${inc.rawValue} active incidents — 2.2× threshold`,
      detail: "Payment gateway P1 + 3 downstream dependencies.",
      severity: "critical",
      source: "Incident mgmt",
      createdMinutesAgo: 8,
    });
    recommendations.push({
      id: "rec-inc",
      action: "Declare major-incident posture: merge war rooms, single IC",
      rationale: "Dependent incidents need unified command to avoid duplicated work.",
      impact: "Cut MTTR by ~40% on correlated incidents",
      effort: "low",
      priority: "high",
      owner: "Incident Commander",
    });
  }

  if (data.churn.accountsAtRisk >= 10) {
    alerts.push({
      id: "churn-risk",
      title: `${data.churn.accountsAtRisk} accounts flagged churn-risk`,
      detail: `$${(data.churn.estimatedMrrAtRisk / 1000).toFixed(1)}K MRR at risk; ${
        data.churn.inactiveOver30Days
      } inactive >30d.`,
      severity: "warning",
      source: "CSM platform",
      createdMinutesAgo: 60,
    });
    recommendations.push({
      id: "rec-churn",
      action: "Launch white-glove retention play on top-10 at-risk accounts",
      rationale: "CSM capacity is available; direct exec outreach converts at ~55%.",
      impact: `Defend ~$${Math.round(data.churn.estimatedMrrAtRisk * 0.55 / 1000)}K MRR`,
      effort: "medium",
      priority: "high",
      owner: "Head of Customer Success",
    });
  }

  if (prod && prod.rawValue < 80) {
    alerts.push({
      id: "prod-drop",
      title: `Team productivity below target (${prod.rawValue})`,
      detail: "Context-switching and incident drain are depressing throughput.",
      severity: "warning",
      source: "Delivery analytics",
      createdMinutesAgo: 240,
    });
    recommendations.push({
      id: "rec-prod",
      action: "Freeze non-critical roadmap for 2 sprints; focus on stability",
      rationale: "Sustaining-mode focus restores throughput faster than adding headcount.",
      impact: "Return to >85 index in 3–4 weeks",
      effort: "low",
      priority: "medium",
      owner: "Engineering Directors",
    });
  }

  // Growth-phase signal: everything looks healthy but SLA is drifting
  if (sla && sla.rawValue > 120 && sla.rawValue < 180 && rev && rev.deltaPct > 20) {
    recommendations.push({
      id: "rec-scale",
      action: "Approve +3 Tier 1 agents and +1 delivery lead this cycle",
      rationale: "Revenue growth is outpacing support/delivery capacity — pre-empt breach.",
      impact: "Avoid a 2-month capacity trough and protect NPS",
      effort: "medium",
      priority: "medium",
      owner: "COO / People Ops",
    });
  }

  if (ret && ret.deltaPct > 1.5 && rev && rev.deltaPct > 10) {
    recommendations.push({
      id: "rec-expand",
      action: "Open an upsell play on the top retention cohort",
      rationale: "Retention + revenue both compounding — expansion motion has highest ROI right now.",
      impact: "Lift ACV by ~12% on qualified base",
      effort: "medium",
      priority: "medium",
      owner: "Head of Growth",
    });
  }

  // Fallback: positive operational signal
  if (alerts.length === 0) {
    alerts.push({
      id: "ops-green",
      title: "All core KPIs within target bands",
      detail: "No breaches detected. Continue weekly monitoring cadence.",
      severity: "info",
      source: "Rules engine",
      createdMinutesAgo: 5,
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "rec-review",
      action: "Use this calm window for quarterly architecture review",
      rationale: "Low-incident periods are the best time to invest in resilience and tech debt.",
      impact: "Compounds future reliability and delivery speed",
      effort: "low",
      priority: "low",
      owner: "IT Leadership",
    });
  }

  return { alerts, recommendations };
}

function formatMinutes(m: number): string {
  const h = Math.floor(m / 60);
  const mm = Math.round(m % 60);
  return `${h}h ${mm}m`;
}
