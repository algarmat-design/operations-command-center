/**
 * Coherence checks for the synthetic dashboards and the design tokens.
 *
 * Run with `npm run check:data`. No dependencies — Node 24 strips the types.
 * This is the only automated proof that the demo data is internally consistent;
 * a dashboard whose margin disagrees with its own revenue is worse than no
 * dashboard, because it invites someone to check the second number too.
 */
import { readFileSync } from "node:fs";
import * as exec from "../content/dashboards/executive.ts";
import * as ops from "../content/dashboards/it-operations.ts";
import * as devops from "../content/dashboards/devops.ts";
import { band } from "../content/dashboards/dora.ts";
import { initiatives, lanes, QUARTERS } from "../content/dashboards/roadmap.ts";
import { labelFits } from "../content/dashboards/roadmap-geometry.ts";

let failures = 0;

function check(name: string, ok: boolean, detail = "") {
  if (ok) {
    console.log(`  ok    ${name}`);
  } else {
    failures++;
    console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function close(a: number, b: number, eps = 1e-9) {
  return Math.abs(a - b) < eps;
}

/** Pearson correlation, used to assert two series move in opposite directions. */
function corr(a: readonly number[], b: readonly number[]) {
  const n = a.length;
  const ma = a.reduce((s, v) => s + v, 0) / n;
  const mb = b.reduce((s, v) => s + v, 0) / n;
  const num = a.reduce((s, v, i) => s + (v - ma) * (b[i] - mb), 0);
  const da = Math.sqrt(a.reduce((s, v) => s + (v - ma) ** 2, 0));
  const db = Math.sqrt(b.reduce((s, v) => s + (v - mb) ** 2, 0));
  return num / (da * db);
}

console.log("\nexecutive");
check(
  "EBITDA equals revenue minus COGS minus opex",
  exec.ebitda.every((v, i) => close(v, exec.mrr[i] - exec.cogs[i] - exec.opex[i])),
);
check(
  "gross margin reconciles with revenue and COGS",
  exec.grossMargin.every((v, i) => close(Number(v.toFixed(4)), Number(((exec.mrr[i] - exec.cogs[i]) / exec.mrr[i]).toFixed(4)))),
);
check("IT spend is a subset of opex", exec.itSpend.every((v, i) => v < exec.opex[i]));
check(
  "budget variance equals the sum of per-area variances",
  close(exec.budgetVariance, exec.budgetByArea.reduce((s, l) => s + (l.actual - l.budget), 0)),
);
check("LTV:CAC is derived, not authored", exec.ltvCacRatio.every((v, i) => close(v, exec.ltv[i] / exec.cac[i])));
check(
  "funnel counts decrease monotonically",
  exec.funnel.every((s, i) => i === 0 || s.count < exec.funnel[i - 1].count),
);
check(
  "portfolio ROI matches its components",
  close(exec.portfolioRoi, (exec.portfolioBenefit - exec.portfolioInvested) / exec.portfolioInvested),
);

console.log("\nit-operations");
check("MTTA never exceeds MTTR", ops.mtta.every((v, i) => v <= ops.mttr[i]));
const slaMttrCorr = corr(ops.slaAttainment, ops.mttr);
check(
  "SLA attainment and MTTR move in opposite directions",
  slaMttrCorr < -0.8,
  `correlation ${slaMttrCorr.toFixed(3)}`,
);
check(
  "severity counts sum to the reported total",
  ops.totalIncidents.every(
    (t, i) =>
      t ===
      ops.incidentsBySeverity.P1[i] +
        ops.incidentsBySeverity.P2[i] +
        ops.incidentsBySeverity.P3[i] +
        ops.incidentsBySeverity.P4[i],
  ),
);
check(
  "aging buckets sum to the latest backlog figure",
  ops.backlogAging.reduce((s, b) => s + b.count, 0) === ops.ticketBacklog[ops.ticketBacklog.length - 1],
  `${ops.backlogAging.reduce((s, b) => s + b.count, 0)} vs ${ops.ticketBacklog[ops.ticketBacklog.length - 1]}`,
);
check(
  "every rate series stays within 0..1",
  [ops.slaAttainment, ops.changeSuccessRate, ops.firstContactResolution, ops.criticalAvailability].every((s) =>
    s.every((v) => v >= 0 && v <= 1),
  ),
);

console.log("\ndevops");
for (const m of devops.doraMetrics) {
  check(`${m.id} band is computable and its series ends at the stated value`, close(m.value, m.series[m.series.length - 1]));
  console.log(`        band(${m.id}, ${m.value}) = ${band(m.id, m.value)}`);
}
check(
  "December regression is present in every quality series",
  devops.changeFailureRate[3] > devops.changeFailureRate[2] && devops.buildSuccessRate[3] < devops.buildSuccessRate[2],
);
check(
  "critical vulnerabilities never rise after reaching zero",
  (() => {
    const c = devops.vulnerabilities.Critical;
    const firstZero = c.indexOf(0);
    return firstZero === -1 || c.slice(firstZero).every((v) => v === 0);
  })(),
);

console.log("\nroadmap");
const ids = new Set(initiatives.map((i) => i.id));
check("every dependency id resolves", initiatives.every((i) => i.deps.every((d) => ids.has(d))));
check("startQ never exceeds endQ", initiatives.every((i) => i.startQ <= i.endQ));
check(
  "quarters stay within range",
  initiatives.every((i) => i.startQ >= 1 && i.endQ <= QUARTERS.length),
);
check(
  "every lane id is declared",
  initiatives.every((i) => lanes.some((l) => l.id === i.lane)),
);
// Text overlap inside a gantt bar is invisible until real data lands in it, so
// the fit is asserted here rather than trusted to a character-count rule of thumb.
const overflowing = initiatives.filter(
  (i) => !labelFits(i.shortName ?? i.name, i.endQ - i.startQ + 1),
);
check(
  "every gantt bar label fits the span it is drawn in",
  overflowing.length === 0,
  overflowing.map((i) => `${i.shortName ?? i.name} (Q${i.startQ}–Q${i.endQ})`).join(", "),
);
// The dependency semantics the gantt states: a target cannot COMPLETE until its
// source completes. Overlapping start quarters are legitimate and expected —
// underwriting runs alongside PCI re-certification, it just cannot ship first.
check(
  "no initiative completes before something it depends on",
  initiatives.every((i) => i.deps.every((d) => initiatives.find((x) => x.id === d)!.endQ <= i.endQ)),
);
check(
  "no dependency cycles",
  (() => {
    const seen = new Map<string, number>(); // 0 = visiting, 1 = done
    const byId = new Map(initiatives.map((i) => [i.id, i]));
    const walk = (id: string): boolean => {
      const state = seen.get(id);
      if (state === 0) return false;
      if (state === 1) return true;
      seen.set(id, 0);
      for (const d of byId.get(id)?.deps ?? []) if (!walk(d)) return false;
      seen.set(id, 1);
      return true;
    };
    return initiatives.every((i) => walk(i.id));
  })(),
);

console.log("\ndesign tokens");
{
  // Criterion 8, proven mechanically: no color may exist only inside a media
  // query or a [data-theme] block. Comments are stripped first so prose that
  // mentions "@media" is not mistaken for a rule.
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8").replace(
    /\/\*[\s\S]*?\*\//g,
    "",
  );
  const offenders: string[] = [];
  for (const m of css.matchAll(/(@media[^{]*|\[data-theme="[^"]+"\])\s*\{/g)) {
    let depth = 1;
    let i = m.index! + m[0].length;
    const start = i;
    while (depth > 0 && i < css.length) {
      if (css[i] === "{") depth++;
      else if (css[i] === "}") depth--;
      i++;
    }
    for (const hex of css.slice(start, i - 1).matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      offenders.push(`${m[1].trim().slice(0, 40)} → ${hex[0]}`);
    }
  }
  check("no color is defined inside @media or [data-theme]", offenders.length === 0, offenders.join("; "));
}

console.log(
  failures === 0 ? "\nAll checks passed.\n" : `\n${failures} check(s) failed.\n`,
);
process.exit(failures === 0 ? 0 : 1);
