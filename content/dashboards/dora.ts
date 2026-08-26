import type { DoraBand, DoraMetricId } from "./types.ts";

/**
 * DORA performance bands.
 *
 * Bands are COMPUTED from the value, never authored alongside it, so a label can
 * never contradict the number it sits next to. Thresholds follow the published
 * DORA / State of DevOps definitions.
 *
 * Units, normalized so every metric is a single comparable number:
 *   deployment-frequency  deploys per day
 *   lead-time             hours from commit to production
 *   change-failure-rate   fraction of deployments requiring remediation
 *   time-to-restore       hours to restore service
 */

const BANDS: Record<DoraMetricId, { band: DoraBand; test: (v: number) => boolean }[]> = {
  "deployment-frequency": [
    { band: "Elite", test: (v) => v >= 1 }, // on-demand, multiple per day
    { band: "High", test: (v) => v >= 1 / 7 }, // between once per day and once per week
    { band: "Medium", test: (v) => v >= 1 / 30 }, // between once per week and once per month
    { band: "Low", test: () => true },
  ],
  "lead-time": [
    { band: "Elite", test: (v) => v < 24 }, // less than one day
    { band: "High", test: (v) => v < 24 * 7 }, // less than one week
    { band: "Medium", test: (v) => v < 24 * 30 }, // less than one month
    { band: "Low", test: () => true },
  ],
  "change-failure-rate": [
    { band: "Elite", test: (v) => v <= 0.05 },
    { band: "High", test: (v) => v <= 0.1 },
    { band: "Medium", test: (v) => v <= 0.15 },
    { band: "Low", test: () => true },
  ],
  "time-to-restore": [
    { band: "Elite", test: (v) => v < 1 }, // less than one hour
    { band: "High", test: (v) => v < 24 }, // less than one day
    { band: "Medium", test: (v) => v < 24 * 7 }, // less than one week
    { band: "Low", test: () => true },
  ],
};

export function band(metric: DoraMetricId, value: number): DoraBand {
  return BANDS[metric].find((b) => b.test(value))!.band;
}

/** Elite and High read as healthy; Medium warrants attention; Low is a problem. */
export function bandTone(b: DoraBand): "good" | "warn" | "critical" {
  if (b === "Elite" || b === "High") return "good";
  if (b === "Medium") return "warn";
  return "critical";
}
