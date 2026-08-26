/**
 * Shapes for the four synthetic dashboards.
 *
 * Every figure in `content/dashboards/*` is invented to demonstrate the
 * instrumentation. None of it comes from an employer. Ratios are derived from
 * their inputs by pure functions rather than authored, so a margin can never
 * contradict the revenue and cost it is supposedly computed from.
 */

export type Tone = "good" | "warn" | "critical" | "neutral";
export type Rag = "green" | "amber" | "red";

/** Twelve month labels, oldest first. Shared by every series on every board. */
export const MONTHS = [
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
] as const;

export interface MetricSpec {
  readonly id: string;
  readonly label: string;
  /** Preformatted headline value, e.g. "$1.24M" or "94.8%". */
  readonly value: string;
  readonly unit: string;
  readonly delta?: string;
  readonly tone: Tone;
  readonly target?: string;
  readonly context: string;
  readonly series?: readonly number[];
}

/** Executive judgment ported from the previous site's rules engine. */
export interface Insight {
  readonly tone: Tone;
  readonly title: string;
  readonly body: string;
}

export interface FunnelStep {
  readonly label: string;
  readonly count: number;
  readonly note: string;
}

export interface Channel {
  readonly channel: string;
  readonly spend: number;
  readonly leads: number;
  readonly deals: number;
}

export interface BudgetLine {
  readonly area: string;
  readonly budget: number;
  readonly actual: number;
}

export interface Incident {
  readonly id: string;
  readonly severity: "P1" | "P2" | "P3" | "P4";
  readonly title: string;
  readonly service: string;
  readonly owner: string;
  readonly openedHoursAgo: number;
  readonly slaHours: number;
}

export type DoraMetricId =
  | "deployment-frequency"
  | "lead-time"
  | "change-failure-rate"
  | "time-to-restore";

export type DoraBand = "Elite" | "High" | "Medium" | "Low";

export interface DoraMetric {
  readonly id: DoraMetricId;
  readonly label: string;
  /** Normalized numeric value used to compute the band. See dora.ts for units. */
  readonly value: number;
  readonly display: string;
  readonly unit: string;
  readonly context: string;
  readonly series: readonly number[];
  /** Whether a rising series is an improvement — drives the trend wording. */
  readonly higherIsBetter: boolean;
}

export type LaneId = "platform" | "security" | "ai" | "cost";

export interface Lane {
  readonly id: LaneId;
  readonly label: string;
}

export interface Initiative {
  readonly id: string;
  readonly lane: LaneId;
  readonly name: string;
  /** Abbreviated label for the gantt bar when the full name will not fit its
   *  span. The full `name` is still used everywhere else. scripts/check-data.mts
   *  asserts that whichever label the bar renders actually fits. */
  readonly shortName?: string;
  readonly startQ: number;
  readonly endQ: number;
  readonly rag: Rag;
  readonly owner: string;
  /** Thousands of USD. */
  readonly investment: number;
  /** Thousands of USD of expected annualized benefit. */
  readonly benefit: number;
  readonly deps: readonly string[];
  readonly note: string;
}
