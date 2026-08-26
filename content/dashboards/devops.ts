import type { DoraMetric, Insight, MetricSpec } from "./types.ts";
import { MONTHS } from "./types.ts";

/**
 * Synthetic DORA and pipeline data.
 *
 * The four DORA values are stored in their normalized units (see dora.ts); the
 * `display` string is the human reading of the same number. Bands are computed
 * at render time from `value`, never stored.
 */

/** Deploys per day. */
export const deployFrequency = [0.6, 0.7, 0.8, 0.7, 1.0, 1.2, 1.4, 1.6, 1.9, 2.1, 2.4, 2.8];
/** Hours from commit to production. */
export const leadTime = [72, 66, 61, 68, 52, 45, 39, 34, 29, 25, 21, 18];
/** Fraction of deployments requiring remediation. */
export const changeFailureRate = [
  0.121, 0.115, 0.108, 0.126, 0.098, 0.091, 0.084, 0.078, 0.071, 0.064, 0.058, 0.049,
];
/** Hours to restore service after a failed change. */
export const timeToRestore = [5.4, 5.1, 4.8, 5.6, 4.2, 3.8, 3.4, 2.9, 2.5, 2.1, 1.7, 1.4];

export const doraMetrics: readonly DoraMetric[] = [
  {
    id: "deployment-frequency",
    label: "Deployment frequency",
    value: deployFrequency[deployFrequency.length - 1],
    display: "2.8 / day",
    unit: "deployments per day",
    context: "From weekly releases to multiple deploys a day, without adding engineers.",
    series: deployFrequency,
    higherIsBetter: true,
  },
  {
    id: "lead-time",
    label: "Lead time for changes",
    value: leadTime[leadTime.length - 1],
    display: "18 h",
    unit: "hours, commit to production",
    context: "Under a day. Trunk-based development and a faster pipeline did this jointly.",
    series: leadTime,
    higherIsBetter: false,
  },
  {
    id: "change-failure-rate",
    label: "Change failure rate",
    value: changeFailureRate[changeFailureRate.length - 1],
    display: "4.9%",
    unit: "% of deployments needing remediation",
    context: "Failure rate fell while deploy frequency quadrupled — the trade-off was not paid.",
    series: changeFailureRate,
    higherIsBetter: false,
  },
  {
    id: "time-to-restore",
    label: "Time to restore service",
    value: timeToRestore[timeToRestore.length - 1],
    display: "1.4 h",
    unit: "hours to restore",
    context: "Just outside the Elite threshold of one hour. Rollback automation is the gap.",
    series: timeToRestore,
    higherIsBetter: false,
  },
];

/** Minutes for a full pipeline run. */
export const pipelineDuration = [28.4, 27.1, 26.2, 27.8, 23.6, 21.9, 20.4, 18.8, 17.2, 15.9, 14.6, 13.2];
export const buildSuccessRate = [
  0.882, 0.891, 0.897, 0.874, 0.908, 0.916, 0.923, 0.931, 0.938, 0.944, 0.951, 0.958,
];
export const testCoverage = [
  0.612, 0.628, 0.641, 0.639, 0.664, 0.678, 0.691, 0.703, 0.716, 0.728, 0.741, 0.754,
];

/** Open vulnerabilities by severity at the close of each month. */
export const vulnerabilities = {
  Critical: [6, 5, 4, 7, 3, 2, 2, 1, 1, 0, 0, 0],
  High: [24, 22, 19, 26, 17, 15, 13, 11, 9, 8, 6, 5],
  Medium: [68, 64, 61, 71, 57, 54, 51, 48, 45, 42, 39, 36],
  Low: [142, 138, 134, 147, 129, 125, 121, 118, 114, 111, 108, 104],
} as const;

/** Percentage of days each environment was green. */
export const environmentStability = [
  { environment: "Production", values: [0.981, 0.984, 0.986, 0.972, 0.989, 0.991, 0.993, 0.994, 0.995, 0.996, 0.997, 0.998] },
  { environment: "Staging", values: [0.942, 0.948, 0.951, 0.928, 0.958, 0.963, 0.968, 0.971, 0.974, 0.978, 0.981, 0.984] },
  { environment: "Preview", values: [0.891, 0.897, 0.902, 0.878, 0.914, 0.921, 0.928, 0.934, 0.939, 0.945, 0.951, 0.956] },
];

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
const last = <T,>(a: readonly T[]) => a[a.length - 1];
const prev = <T,>(a: readonly T[]) => a[a.length - 2];

export const secondary: readonly MetricSpec[] = [
  {
    id: "pipeline-duration",
    label: "Pipeline duration",
    value: `${last(pipelineDuration).toFixed(1)} min`,
    unit: "minutes per full run",
    delta: `${(last(pipelineDuration) - prev(pipelineDuration)).toFixed(1)} min`,
    tone: "good",
    target: "≤ 15 min",
    context: "Halved across the year. Under fifteen minutes is where engineers stop context-switching.",
    series: pipelineDuration,
  },
  {
    id: "build-success",
    label: "Build success rate",
    value: pct(last(buildSuccessRate)),
    unit: "% of builds passing",
    delta: `+${((last(buildSuccessRate) - prev(buildSuccessRate)) * 100).toFixed(1)} pp`,
    tone: "good",
    target: "≥ 95.0%",
    context: "Flaky-test quarantine removed most of the noise below 92%.",
    series: buildSuccessRate,
  },
  {
    id: "test-coverage",
    label: "Test coverage",
    value: pct(last(testCoverage)),
    unit: "% of lines covered",
    delta: `+${((last(testCoverage) - prev(testCoverage)) * 100).toFixed(1)} pp`,
    tone: "warn",
    target: "≥ 80.0%",
    context: "Rising 1.2 points a month. Useful as a direction, dangerous as a goal.",
    series: testCoverage,
  },
  {
    id: "critical-vulns",
    label: "Open critical vulnerabilities",
    value: `${last(vulnerabilities.Critical)}`,
    unit: "count, critical severity",
    tone: "good",
    target: "0",
    context: "Zero for three consecutive months; five highs remain in the remediation queue.",
    series: vulnerabilities.Critical,
  },
];

export const insights: readonly Insight[] = [
  {
    tone: "good",
    title: "Throughput and stability improved together",
    body: "Deploy frequency went from 0.6 to 2.8 per day while change failure rate fell from 12.1% to 4.9%. The conventional reading is that speed costs stability; here it bought it, because smaller and more frequent changes are individually less risky. That is the argument to make when someone proposes slowing releases down to be safer.",
  },
  {
    tone: "warn",
    title: "Time to restore is the one metric still short of Elite",
    body: "At 1.4 hours the team sits in the High band, just past the one-hour Elite threshold. Every other DORA metric is Elite. The gap is not detection — MTTA is already under an hour — it is that rollback still requires a human decision. Automating the rollback trigger for failed canaries is the single change that moves this.",
  },
  {
    tone: "warn",
    title: "Treat test coverage as a signal, not a target",
    body: "Coverage at 75.4% against an 80% target is the metric on this board most likely to be gamed. Coverage that rises while change failure rate also rises means tests are being written to touch lines rather than to catch defects. Here both moved the right way, so the number is currently telling the truth — keep checking that pairing rather than the coverage figure alone.",
  },
  {
    tone: "good",
    title: "Pipeline duration is the hidden driver of lead time",
    body: "Lead time fell 75% and pipeline duration fell 54% over the same period. Roughly two-thirds of the lead-time improvement traces to the pipeline getting faster rather than to process change. This is the cheapest remaining lever in most organizations and the one least often funded.",
  },
  {
    tone: "neutral",
    title: "December is visible in every series, and that is expected",
    body: "Change failure rate, build success and every environment degraded in December, then recovered. A dashboard where the holiday release freeze is invisible is a dashboard that is smoothing its data. Leaving the spike in place is what makes the rest of the trend believable.",
  },
];

export { MONTHS };
