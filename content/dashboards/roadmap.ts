import type { Initiative, Insight, Lane } from "./types.ts";

/**
 * Synthetic four-quarter transformation roadmap.
 *
 * Investment and benefit are thousands of USD. `benefit` is expected annualized
 * benefit, counted as unlocked in the quarter an initiative completes — which is
 * why the cumulative curve steps rather than slopes.
 */

export const QUARTERS = ["Q1", "Q2", "Q3", "Q4"] as const;

export const lanes: readonly Lane[] = [
  { id: "platform", label: "Platform" },
  { id: "security", label: "Security & Compliance" },
  { id: "ai", label: "AI & Automation" },
  { id: "cost", label: "Cost & Efficiency" },
];

export const initiatives: readonly Initiative[] = [
  {
    id: "p1",
    lane: "platform",
    name: "Payments platform hardening",
    startQ: 1,
    endQ: 2,
    rag: "green",
    owner: "M. Torres",
    investment: 340,
    benefit: 512,
    deps: [],
    note: "Latency, idempotency and retry semantics in the authorization path. Everything downstream assumes this lands.",
  },
  {
    id: "p2",
    lane: "platform",
    name: "Multi-region failover",
    startQ: 2,
    endQ: 3,
    rag: "amber",
    owner: "M. Torres",
    investment: 280,
    benefit: 190,
    deps: ["p1"],
    note: "Amber on cost, not delivery — the second region roughly doubles baseline infrastructure spend.",
  },
  {
    id: "p3",
    lane: "platform",
    name: "Legacy monolith decomposition",
    startQ: 3,
    endQ: 4,
    rag: "amber",
    owner: "D. Okafor",
    investment: 420,
    benefit: 310,
    deps: ["p2"],
    note: "The largest single investment on the board and the one most likely to slip past Q4.",
  },
  {
    id: "s1",
    lane: "security",
    name: "SOC 2 Type II readiness",
    startQ: 1,
    endQ: 2,
    rag: "green",
    owner: "K. Raghavan",
    investment: 165,
    benefit: 240,
    deps: [],
    note: "Benefit is deal velocity in enterprise segments, not cost avoidance.",
  },
  {
    id: "s2",
    lane: "security",
    name: "Continuous compliance monitoring",
    startQ: 2,
    endQ: 3,
    rag: "green",
    owner: "K. Raghavan",
    investment: 145,
    benefit: 210,
    deps: ["s1"],
    note: "Replaces the manual evidence-gathering cycle. Pays for itself in audit preparation time alone.",
  },
  {
    id: "s3",
    lane: "security",
    name: "PCI DSS 4.0 re-certification",
    shortName: "PCI DSS 4.0 re-cert",
    startQ: 4,
    endQ: 4,
    rag: "amber",
    owner: "K. Raghavan",
    investment: 120,
    benefit: 180,
    deps: ["s2", "p1"],
    note: "Non-negotiable date. Amber because it depends on platform hardening completing on schedule.",
  },
  {
    id: "a1",
    lane: "ai",
    name: "Document intelligence rollout",
    startQ: 1,
    endQ: 2,
    rag: "green",
    owner: "S. Bianchi",
    investment: 210,
    benefit: 468,
    deps: [],
    note: "Highest benefit-to-investment ratio on the board at 2.2×. Human-in-the-loop review layer included.",
  },
  {
    id: "a2",
    lane: "ai",
    name: "Agent-assisted service desk",
    startQ: 2,
    endQ: 3,
    rag: "amber",
    owner: "J. Whitfield",
    investment: 190,
    benefit: 325,
    deps: ["a1"],
    note: "Benefit is first-contact resolution, which is the binding constraint on cost per ticket.",
  },
  {
    id: "a3",
    lane: "ai",
    name: "Underwriting decision support",
    startQ: 3,
    endQ: 4,
    rag: "red",
    owner: "S. Bianchi",
    investment: 340,
    benefit: 520,
    deps: ["a2", "s3"],
    note: "Red: cannot ship before PCI re-certification closes, and that leaves no float in Q4.",
  },
  {
    id: "c1",
    lane: "cost",
    name: "Cloud cost remediation",
    startQ: 1,
    endQ: 1,
    rag: "green",
    owner: "D. Okafor",
    investment: 96,
    benefit: 289,
    deps: [],
    note: "Fastest payback on the board. Rightsizing, reserved capacity and orphaned-resource cleanup.",
  },
  {
    id: "c2",
    lane: "cost",
    name: "Vendor consolidation",
    startQ: 2,
    endQ: 3,
    rag: "green",
    owner: "M. Torres",
    investment: 64,
    benefit: 175,
    deps: ["c1"],
    note: "Five overlapping tools down to two, renegotiated at the renewal date rather than mid-term.",
  },
  {
    id: "c3",
    lane: "cost",
    name: "FinOps chargeback model",
    startQ: 3,
    endQ: 4,
    rag: "amber",
    owner: "D. Okafor",
    investment: 88,
    benefit: 145,
    deps: ["c2", "p3"],
    note: "Needs the monolith split before spend can be attributed to a product line at all.",
  },
];

export const totalInvestment = initiatives.reduce((s, i) => s + i.investment, 0);
export const totalBenefit = initiatives.reduce((s, i) => s + i.benefit, 0);
export const portfolioRatio = totalBenefit / totalInvestment;

export const investmentByLane = lanes.map((l) => ({
  lane: l.label,
  investment: initiatives.filter((i) => i.lane === l.id).reduce((s, i) => s + i.investment, 0),
  benefit: initiatives.filter((i) => i.lane === l.id).reduce((s, i) => s + i.benefit, 0),
}));

/** Annualized benefit unlocked by the close of each quarter. Steps, not slopes. */
export const cumulativeBenefit = QUARTERS.map((_, idx) =>
  initiatives.filter((i) => i.endQ <= idx + 1).reduce((s, i) => s + i.benefit, 0),
);

/** Investment committed in each quarter, spread evenly across the quarters spanned. */
export const investmentByQuarter = QUARTERS.map((_, idx) =>
  Math.round(
    initiatives
      .filter((i) => i.startQ <= idx + 1 && i.endQ >= idx + 1)
      .reduce((s, i) => s + i.investment / (i.endQ - i.startQ + 1), 0),
  ),
);

export const ragCounts = {
  green: initiatives.filter((i) => i.rag === "green").length,
  amber: initiatives.filter((i) => i.rag === "amber").length,
  red: initiatives.filter((i) => i.rag === "red").length,
};

export const insights: readonly Insight[] = [
  {
    tone: "critical",
    title: "Underwriting decision support has no float in Q4",
    body: "It cannot start delivery until PCI 4.0 re-certification closes, and re-certification itself depends on platform hardening. That is a three-link chain landing in a single quarter with the largest AI investment on the board attached to it. Either pull re-certification forward into Q3 or move underwriting to Q1 of next year — do not plan for both to land in December.",
  },
  {
    tone: "warn",
    title: "Q3 and Q4 carry two-thirds of the investment",
    body: "The roadmap is back-loaded: eight of twelve initiatives are still in flight in Q3. That concentration is what turns a single slip into a cascade, because the same four owners appear on every late lane. The sequencing question for the PMO is not whether each initiative is fundable, it is whether the owners are double-booked.",
  },
  {
    tone: "good",
    title: "The cheapest initiative has the best return",
    body: "Cloud cost remediation returns 3.0× on $96K and completes in Q1. Funding the fast, cheap, unblocked work first is what pays for the expensive platform work later — and it is the item most often deferred because it does not look strategic on a slide.",
  },
  {
    tone: "neutral",
    title: "Platform is the dependency root for three lanes",
    body: "Payments hardening blocks PCI re-certification, which blocks underwriting; monolith decomposition blocks the chargeback model. Platform work rarely has a benefit number that competes with AI work, which is exactly why it gets cut — and why cutting it silently reprices everything downstream.",
  },
  {
    tone: "good",
    title: "Portfolio-level return justifies the whole program",
    body: `$${totalBenefit}K of expected annualized benefit against $${totalInvestment}K invested — ${portfolioRatio.toFixed(2)}× at portfolio level. That is the number a board approves. The per-initiative spread, from 3.0× down to 0.7×, is the number a PMO has to manage.`,
  },
];
