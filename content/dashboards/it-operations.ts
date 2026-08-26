import type { Incident, Insight, MetricSpec } from "./types.ts";
import { MONTHS } from "./types.ts";

/**
 * Synthetic ITIL v4 service-operations data.
 *
 * SLA attainment and MTTR are authored to move in opposite directions across
 * the twelve months — as resolution time falls, attainment rises. A dashboard
 * where those two drift apart is a dashboard nobody checked.
 */

/** Percentage of tickets resolved within their SLA target. */
export const slaAttainment = [
  0.912, 0.918, 0.924, 0.921, 0.933, 0.939, 0.944, 0.949, 0.952, 0.958, 0.962, 0.967,
];
/** Mean time to restore, in hours. */
export const mttr = [6.8, 6.5, 6.2, 6.4, 5.8, 5.5, 5.2, 4.9, 4.7, 4.4, 4.2, 3.9];
/** Mean time to acknowledge, in hours. Always at or below MTTR by definition. */
export const mtta = [1.9, 1.8, 1.7, 1.8, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8];

/** Incident counts by severity, oldest month first. */
export const incidentsBySeverity = {
  P1: [4, 3, 3, 5, 2, 2, 2, 1, 2, 1, 1, 1],
  P2: [14, 13, 12, 16, 11, 11, 10, 9, 9, 8, 8, 7],
  P3: [58, 55, 54, 61, 52, 50, 49, 47, 46, 44, 43, 41],
  P4: [96, 94, 91, 103, 89, 87, 85, 84, 82, 80, 79, 77],
} as const;

export const totalIncidents = MONTHS.map(
  (_, i) =>
    incidentsBySeverity.P1[i] +
    incidentsBySeverity.P2[i] +
    incidentsBySeverity.P3[i] +
    incidentsBySeverity.P4[i],
);

export const changeSuccessRate = [
  0.941, 0.948, 0.952, 0.938, 0.956, 0.961, 0.965, 0.969, 0.971, 0.974, 0.977, 0.981,
];
export const firstContactResolution = [
  0.612, 0.624, 0.631, 0.618, 0.648, 0.659, 0.667, 0.678, 0.686, 0.694, 0.703, 0.714,
];
/** Availability of the five services tagged business-critical. */
export const criticalAvailability = [
  0.9962, 0.9968, 0.9971, 0.9954, 0.9976, 0.998, 0.9983, 0.9986, 0.9987, 0.999, 0.9991, 0.9993,
];
export const ticketBacklog = [284, 271, 262, 298, 254, 241, 228, 214, 203, 191, 182, 171];
/** Fully loaded cost per ticket, USD. */
export const costPerTicket = [31.4, 30.8, 30.1, 32.6, 29.4, 28.6, 27.9, 27.1, 26.4, 25.7, 25.1, 24.3];

/** Open backlog split by age band. Sums to the latest backlog figure. */
export const backlogAging = [
  { bucket: "0–2 days", count: 78 },
  { bucket: "3–7 days", count: 51 },
  { bucket: "8–14 days", count: 26 },
  { bucket: "15–30 days", count: 11 },
  { bucket: "30+ days", count: 5 },
];

export const activeIncidents: readonly Incident[] = [
  {
    id: "INC-4471",
    severity: "P1",
    title: "Card authorization latency above 900ms in EU region",
    service: "Payment gateway",
    owner: "M. Torres",
    openedHoursAgo: 1.4,
    slaHours: 4,
  },
  {
    id: "INC-4468",
    severity: "P2",
    title: "Batch settlement reconciliation lagging by two cycles",
    service: "Settlement engine",
    owner: "K. Raghavan",
    openedHoursAgo: 5.2,
    slaHours: 8,
  },
  {
    id: "INC-4462",
    severity: "P2",
    title: "SSO token refresh failing for a single tenant",
    service: "Identity platform",
    owner: "D. Okafor",
    openedHoursAgo: 7.8,
    slaHours: 8,
  },
  {
    id: "INC-4455",
    severity: "P3",
    title: "Document ingestion queue depth above threshold",
    service: "Document intelligence",
    owner: "S. Bianchi",
    openedHoursAgo: 19.5,
    slaHours: 24,
  },
  {
    id: "INC-4449",
    severity: "P3",
    title: "Reporting exports timing out over 50k rows",
    service: "Analytics",
    owner: "J. Whitfield",
    openedHoursAgo: 26.0,
    slaHours: 24,
  },
];

const pct = (n: number, d = 1) => `${(n * 100).toFixed(d)}%`;
const last = <T,>(a: readonly T[]) => a[a.length - 1];
const prev = <T,>(a: readonly T[]) => a[a.length - 2];

export const headline: readonly MetricSpec[] = [
  {
    id: "sla",
    label: "SLA attainment",
    value: pct(last(slaAttainment)),
    unit: "% of tickets within target",
    delta: `+${((last(slaAttainment) - prev(slaAttainment)) * 100).toFixed(1)} pp`,
    tone: "good",
    target: "≥ 95.0%",
    context: "Above target for six straight months, tracking the fall in MTTR.",
    series: slaAttainment,
  },
  {
    id: "mttr",
    label: "MTTR",
    value: `${last(mttr).toFixed(1)}h`,
    unit: "hours to restore",
    delta: `${(last(mttr) - prev(mttr)).toFixed(1)}h`,
    tone: "good",
    target: "≤ 4.0h",
    context: "Down 43% across the year. Runbook automation did most of this, not headcount.",
    series: mttr,
  },
  {
    id: "mtta",
    label: "MTTA",
    value: `${last(mtta).toFixed(1)}h`,
    unit: "hours to acknowledge",
    delta: `${(last(mtta) - prev(mtta)).toFixed(1)}h`,
    tone: "good",
    target: "≤ 1.0h",
    context: "Acknowledgement is now under an hour — the on-call rotation change landed.",
    series: mtta,
  },
  {
    id: "change-success",
    label: "Change success rate",
    value: pct(last(changeSuccessRate)),
    unit: "% of changes without rollback",
    delta: `+${((last(changeSuccessRate) - prev(changeSuccessRate)) * 100).toFixed(1)} pp`,
    tone: "good",
    target: "≥ 95.0%",
    context: "December's dip was the freeze-period backlog released in one window.",
    series: changeSuccessRate,
  },
  {
    id: "fcr",
    label: "First-contact resolution",
    value: pct(last(firstContactResolution)),
    unit: "% resolved on first touch",
    delta: `+${((last(firstContactResolution) - prev(firstContactResolution)) * 100).toFixed(1)} pp`,
    tone: "warn",
    target: "≥ 75.0%",
    context: "Improving steadily but still short of target — the knowledge base lags the product.",
    series: firstContactResolution,
  },
  {
    id: "availability",
    label: "Critical service availability",
    value: pct(last(criticalAvailability), 2),
    unit: "% uptime, 5 services",
    tone: "good",
    target: "≥ 99.90%",
    context: "99.93% is roughly 29 minutes of downtime in a month across all five services.",
    series: criticalAvailability,
  },
  {
    id: "backlog",
    label: "Ticket backlog",
    value: `${last(ticketBacklog)}`,
    unit: "open tickets",
    delta: `${last(ticketBacklog) - prev(ticketBacklog)}`,
    tone: "good",
    target: "≤ 200",
    context: "Down 40% from the December peak, with only 5 tickets older than 30 days.",
    series: ticketBacklog,
  },
  {
    id: "cost-per-ticket",
    label: "Cost per ticket",
    value: `$${last(costPerTicket).toFixed(2)}`,
    unit: "USD, fully loaded",
    delta: `-$${(prev(costPerTicket) - last(costPerTicket)).toFixed(2)}`,
    tone: "good",
    target: "≤ $26.00",
    context: "Falling because first-contact resolution rose, not because service was cut.",
    series: costPerTicket,
  },
];

export const insights: readonly Insight[] = [
  {
    tone: "critical",
    title: "One incident is already past its SLA clock",
    body: "INC-4449 has been open 26 hours against a 24-hour P3 target. Reporting exports are not business-critical, but a breached SLA on a low-severity ticket is usually a routing problem rather than a capacity one — it sat unassigned, then got picked up late. Check the queue rules before adding people.",
  },
  {
    tone: "warn",
    title: "First-contact resolution is the constraint on cost per ticket",
    body: "FCR at 71.4% against a 75% target is the single biggest lever left. Every point of FCR removes roughly 1.6 tickets per hundred from second-line, and second-line costs about four times first-line. Closing that 3.6-point gap is worth more than any further tooling spend.",
  },
  {
    tone: "good",
    title: "The December spike was a change-window artefact, not a regression",
    body: "P1s tripled and change success fell to 93.8% in December, then both recovered immediately. That is the signature of a release freeze followed by a single large window — the fix is to stagger the post-freeze batch, not to tighten change control, which is already at 98.1%.",
  },
  {
    tone: "good",
    title: "MTTA fell faster than MTTR, which is the right order",
    body: "Acknowledgement dropped 58% while restoration dropped 43%. Getting the right person looking sooner is what makes every downstream number move; a team that improves MTTR without improving MTTA is usually just working harder on the same broken triage.",
  },
  {
    tone: "neutral",
    title: "Aging is healthy — 75% of the backlog is under a week old",
    body: "129 of 171 open tickets are less than seven days old and only 5 are past thirty days. A backlog that is large but young is a throughput question; a backlog that is small but old is a competence or ownership question. This one is the former, and it is shrinking.",
  },
];

export { MONTHS };
