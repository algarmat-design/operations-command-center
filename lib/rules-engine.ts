import type { Alert, Insights, OperationalData, Recommendation } from "./types";

export function generateInsights(data: OperationalData): Insights {
  const alerts: Alert[] = [];
  const recommendations: Recommendation[] = [];

  const kpi = (id: string) => data.kpis.find((k) => k.id === id);
  const conv = kpi("conversion");
  const sla = kpi("sla");
  const rev = kpi("revenue");
  const inc = kpi("incidents");
  const mttr = kpi("mttr");
  const ret = kpi("retention");
  const ops = data.itOps;

  // --- IT Operations / ITIL-driven alerts ---

  if (ops.p1 > 0) {
    alerts.push({
      id: "p1-active",
      title: `P1 incident active — ${ops.p1} open`,
      detail: "Major Incident Management procedure required. Executive communications cadence every 30 minutes per ITIL playbook.",
      severity: "critical",
      source: "Incident Management",
      createdMinutesAgo: 12,
    });
    recommendations.push({
      id: "rec-p1",
      action: "Declare Major Incident — single Incident Commander, merge war rooms",
      rationale: "Correlated P1/P2s fragment the response. A single IC unifies decisions and removes duplicated effort.",
      impact: "Cut MTTR ~40% on correlated incidents; clear exec comms line",
      effort: "low",
      priority: "high",
      owner: "Incident Commander / IT Ops Lead",
    });
  }

  if (inc && inc.rawValue >= 8) {
    alerts.push({
      id: "incidents-high",
      title: `${inc.rawValue} active incidents — ${(inc.rawValue / 5).toFixed(1)}× threshold`,
      detail: "Backlog suggests a common upstream cause (infrastructure, recent change, or vendor). Problem Management should open a record.",
      severity: "critical",
      source: "ITIL · Incident Mgmt",
      createdMinutesAgo: 8,
    });
    recommendations.push({
      id: "rec-problem",
      action: "Open a Problem record and assign a Problem Manager",
      rationale: "Repeated incidents with similar symptoms point to a root cause that Incident Mgmt alone cannot fix.",
      impact: "Stops recurrence; removes 25–40% of future ticket volume",
      effort: "medium",
      priority: "high",
      owner: "Problem Manager",
    });
  }

  if (ops.failedChanges > 0) {
    alerts.push({
      id: "failed-changes",
      title: `${ops.failedChanges} failed change${ops.failedChanges > 1 ? "s" : ""} this week`,
      detail: "Change Advisory Board review recommended. Check CAB pre-approval quality and rollback rehearsal completeness.",
      severity: "warning",
      source: "Change Management",
      createdMinutesAgo: 180,
    });
    recommendations.push({
      id: "rec-cab",
      action: "Tighten CAB gate: mandatory rollback test + peer review on all normal changes",
      rationale: "Failed changes are preventable; most trace back to untested rollback paths.",
      impact: "Reduce change failure rate below 2% (DORA benchmark: elite)",
      effort: "low",
      priority: "medium",
      owner: "Change Manager",
    });
  }

  if (sla && sla.rawValue < 90) {
    alerts.push({
      id: "sla-breach",
      title: `Service Desk SLA breached — ${sla.rawValue.toFixed(1)}% vs 95% target`,
      detail: "Tier-1 response times slipping. Ticket volume vs. staffed capacity is out of balance.",
      severity: sla.rawValue < 85 ? "critical" : "warning",
      source: "Service Desk",
      createdMinutesAgo: 30,
    });
    recommendations.push({
      id: "rec-sla",
      action: "Reallocate 2 Tier-3 agents to Tier-1 for 48h; spin up overflow queue",
      rationale: "Tier-3 capacity has slack; Tier-1 is the bottleneck driving the breach.",
      impact: "Restore SLA within 24h, protect CSAT",
      effort: "low",
      priority: "high",
      owner: "Service Desk Manager",
    });
    recommendations.push({
      id: "rec-selfservice",
      action: "Publish top-5 knowledge articles covering 60% of current ticket drivers",
      rationale: "High-volume ticket drivers are repeatable and deflectable with proper self-service.",
      impact: "20–30% ticket deflection within 2 weeks, compounding",
      effort: "medium",
      priority: "medium",
      owner: "Knowledge Manager",
    });
  }

  if (mttr && mttr.rawValue > 240) {
    alerts.push({
      id: "mttr-high",
      title: `MTTR elevated — ${(mttr.rawValue / 60).toFixed(1)}h vs 3h target`,
      detail: "Investigate runbook coverage and on-call escalation paths.",
      severity: "warning",
      source: "ITIL · Incident Mgmt",
      createdMinutesAgo: 60,
    });
    recommendations.push({
      id: "rec-runbooks",
      action: "Run a runbook audit on top-10 recurring incident categories",
      rationale: "Missing or outdated runbooks force engineers to rediscover the fix each time.",
      impact: "~35% MTTR reduction on repeated categories",
      effort: "medium",
      priority: "medium",
      owner: "SRE / On-call Lead",
    });
  }

  if (ops.ticketDeltaPct > 50) {
    alerts.push({
      id: "ticket-surge",
      title: `Ticket volume up ${ops.ticketDeltaPct.toFixed(0)}% — possible incident precursor`,
      detail: "Request/Incident spike that has not yet tripped the SLA alarm. Early warning signal.",
      severity: "warning",
      source: "Service Desk",
      createdMinutesAgo: 45,
    });
    recommendations.push({
      id: "rec-swarm",
      action: "Swarm review on top-5 ticket categories today — are they symptoms of one root cause?",
      rationale: "Volume spikes without severity often mean an underlying issue users are routing around.",
      impact: "Catch a P2 before it becomes a P1",
      effort: "low",
      priority: "medium",
      owner: "IT Ops / Problem Manager",
    });
  }

  // --- Commercial / Funnel alerts ---

  if (conv && conv.deltaPct <= -15) {
    alerts.push({
      id: "conv-drop",
      title: `Conversion dropped ${Math.abs(conv.deltaPct).toFixed(1)}% vs prior period`,
      detail: "Step-3 (Proposal → Closed-Won) is the primary leak point.",
      severity: "critical",
      source: "Funnel analytics",
      createdMinutesAgo: 42,
    });
    recommendations.push({
      id: "rec-conv",
      action: "Same-day diagnostic on proposal-stage objections (pricing, legal, scope)",
      rationale: "Abandonment spiked at the commercial hand-off — often a contract or pricing friction, not product fit.",
      impact: "Recover ~20% of lost conversions within 2 weeks",
      effort: "medium",
      priority: "high",
      owner: "Head of Revenue Ops",
    });
  }

  if (rev && rev.deltaPct <= -10) {
    alerts.push({
      id: "rev-decline",
      title: `Revenue down ${Math.abs(rev.deltaPct).toFixed(1)}% MoM`,
      detail: "Review campaign ROI and re-activate highest-CAC-efficient channel.",
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

  if (data.churn.accountsAtRisk >= 10) {
    alerts.push({
      id: "churn-risk",
      title: `${data.churn.accountsAtRisk} accounts flagged churn-risk`,
      detail: `$${(data.churn.estimatedMrrAtRisk / 1000).toFixed(1)}K MRR at risk; ${data.churn.inactiveOver30Days} inactive >30 days.`,
      severity: "warning",
      source: "CSM platform",
      createdMinutesAgo: 60,
    });
    recommendations.push({
      id: "rec-churn",
      action: "White-glove retention play on top-10 at-risk accounts",
      rationale: "Exec outreach to at-risk accounts converts at ~55% when triggered early.",
      impact: `Defend ~$${Math.round(
        (data.churn.estimatedMrrAtRisk * 0.55) / 1000,
      )}K MRR`,
      effort: "medium",
      priority: "high",
      owner: "Head of Customer Success",
    });
  }

  // --- Growth-phase pre-emptive signals ---

  if (sla && sla.rawValue > 90 && sla.rawValue < 95 && rev && rev.deltaPct > 20) {
    recommendations.push({
      id: "rec-scale",
      action: "Approve +3 Tier-1 agents and +1 delivery lead this cycle",
      rationale: "Revenue growth is outpacing support capacity — pre-empt a breach before CSAT drops.",
      impact: "Avoid a 2-month capacity trough and protect NPS",
      effort: "medium",
      priority: "medium",
      owner: "COO / People Ops",
    });
  }

  if (ret && ret.deltaPct > 1.5 && rev && rev.deltaPct > 10) {
    recommendations.push({
      id: "rec-expand",
      action: "Launch upsell motion on the top retention cohort",
      rationale: "Retention and revenue compounding — expansion motion has the highest ROI right now.",
      impact: "Lift ACV by ~12% on the qualified base",
      effort: "medium",
      priority: "medium",
      owner: "Head of Growth",
    });
  }

  // --- Fallbacks so the panels are never empty ---

  if (alerts.length === 0) {
    alerts.push({
      id: "ops-green",
      title: "All ITIL controls and business KPIs within target bands",
      detail: "No active breaches. Continue weekly Service Review cadence and monthly KPI dashboards to C-level.",
      severity: "info",
      source: "Rules engine",
      createdMinutesAgo: 5,
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "rec-review",
      action: "Use this calm window for a quarterly architecture & tech-debt review",
      rationale: "Low-incident periods are the cheapest time to invest in resilience.",
      impact: "Compounds future reliability and delivery speed",
      effort: "low",
      priority: "low",
      owner: "IT Leadership",
    });
  }

  return { alerts, recommendations };
}
