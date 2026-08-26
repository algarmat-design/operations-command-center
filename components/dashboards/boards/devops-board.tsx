import * as d from "@/content/dashboards/devops";
import { band, bandTone } from "@/content/dashboards/dora";
import { MONTHS } from "@/content/dashboards/types";
import type { DoraMetric } from "@/content/dashboards/types";
import { MetricGrid } from "@/components/dashboards/metric-card";
import { ChartFrame } from "@/components/charts/chart-frame";
import { ChartLegend, TimeSeries } from "@/components/charts/time-series";
import { BarSeries } from "@/components/charts/bar-series";
import { Sparkline } from "@/components/charts/sparkline";
import { BoardSection } from "@/components/dashboards/dashboard-shell";
import { Badge } from "@/components/ui/primitives";

const pct1 = (n: number) => `${(n * 100).toFixed(1)}%`;

/**
 * The band is computed from the value at render time — never stored beside it —
 * so the label and the number cannot disagree.
 */
function DoraCard({ metric }: { metric: DoraMetric }) {
  const b = band(metric.id, metric.value);
  const tone = bandTone(b);
  const toneVar = tone === "good" ? "var(--good)" : tone === "warn" ? "var(--warn)" : "var(--critical)";

  return (
    <article className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-5">
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-text-muted">{metric.label}</h3>
        <Badge tone={tone}>{b}</Badge>
      </header>

      <p className="num text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none text-text">
        {metric.display}
      </p>
      <p className="num text-[11px] uppercase tracking-[0.14em] text-text-faint">{metric.unit}</p>

      <Sparkline values={metric.series} color={toneVar} label={`${metric.label} over twelve months`} />

      <p className="mt-auto border-t border-line pt-3 text-[13px] leading-relaxed text-text-muted">
        {metric.context}
      </p>
    </article>
  );
}

export function DevopsBoard() {
  const vulnSeries = [
    { id: "crit", label: "Critical", values: [...d.vulnerabilities.Critical], color: "var(--critical)" },
    { id: "high", label: "High", values: [...d.vulnerabilities.High], color: "var(--warn)" },
    { id: "med", label: "Medium", values: [...d.vulnerabilities.Medium], color: "var(--series-2)" },
    { id: "low", label: "Low", values: [...d.vulnerabilities.Low], color: "var(--line-strong)" },
  ];

  const envSeries = d.environmentStability.map((e, i) => ({
    id: e.environment,
    label: e.environment,
    values: e.values,
    color: `var(--series-${i + 1})`,
  }));

  return (
    <>
      <BoardSection
        eyebrow="The four DORA metrics"
        title="Throughput and stability, read as one trade-off"
        lede="Each metric is tagged with its published performance band. The bands are computed from the values rather than written next to them, so a label here can never contradict its number."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.doraMetrics.map((m) => (
            <DoraCard key={m.id} metric={m} />
          ))}
        </div>
      </BoardSection>

      <section className="grid gap-8 lg:grid-cols-2">
        <ChartFrame
          id="throughput"
          title="Deployment frequency against change failure rate"
          unit="deployments per day, and % of deployments failing"
          description="Deploys per day rose 4.7× while the failure rate more than halved. The conventional trade-off between speed and stability was not paid here — smaller, more frequent changes are individually less risky."
          table={{
            columns: ["Month", "Deploys/day", "Change failure rate", "Lead time", "Time to restore"],
            rows: MONTHS.map((m, i) => [
              m,
              d.deployFrequency[i].toFixed(1),
              pct1(d.changeFailureRate[i]),
              `${d.leadTime[i]}h`,
              `${d.timeToRestore[i].toFixed(1)}h`,
            ]),
          }}
        >
          <TimeSeries
            labels={MONTHS}
            series={[
              { id: "df", label: "Deploys per day", values: d.deployFrequency, color: "var(--series-1)", kind: "area" },
              { id: "cfr", label: "Change failure rate (%)", values: d.changeFailureRate.map((v) => v * 100), color: "var(--critical)", kind: "dashed" },
            ]}
            yFormat={(n) => n.toFixed(1)}
          />
        </ChartFrame>

        <div className="flex min-w-0 flex-col gap-3">
          <ChartFrame
            id="pipeline"
            title="Pipeline duration and build success"
            unit="minutes per run, and % of builds passing"
            description="Pipeline duration halved across the year. Roughly two-thirds of the lead-time improvement traces to this rather than to process change — it is usually the cheapest lever and the least funded."
            table={{
              columns: ["Month", "Pipeline duration", "Build success", "Test coverage"],
              rows: MONTHS.map((m, i) => [
                m,
                `${d.pipelineDuration[i].toFixed(1)} min`,
                pct1(d.buildSuccessRate[i]),
                pct1(d.testCoverage[i]),
              ]),
            }}
          >
            <TimeSeries
              labels={MONTHS}
              series={[
                { id: "dur", label: "Pipeline minutes", values: d.pipelineDuration, color: "var(--series-3)" },
                { id: "build", label: "Build success (%)", values: d.buildSuccessRate.map((v) => v * 100), color: "var(--good)" },
                { id: "cov", label: "Test coverage (%)", values: d.testCoverage.map((v) => v * 100), color: "var(--series-4)", kind: "dashed" },
              ]}
              yFormat={(n) => n.toFixed(0)}
            />
          </ChartFrame>
          <ChartLegend
            series={[
              { id: "dur", label: "Pipeline minutes", values: [], color: "var(--series-3)" },
              { id: "build", label: "Build success (%)", values: [], color: "var(--good)" },
              { id: "cov", label: "Test coverage (%)", values: [], color: "var(--series-4)" },
            ]}
          />
        </div>
      </section>

      <BoardSection
        eyebrow="Secondary delivery signals"
        title="What sits underneath the DORA numbers"
        lede="Pipeline health and security debt. These are the levers; the four above are the outcome."
      >
        <MetricGrid metrics={d.secondary} />
      </BoardSection>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-3">
          <ChartFrame
            id="vulns"
            title="Open vulnerabilities by severity"
            unit="open finding count at month close"
            description="Critical findings reached zero three months ago and stayed there. The five remaining highs are the queue that matters; the low count is noise that should never drive a decision."
            table={{
              columns: ["Month", "Critical", "High", "Medium", "Low"],
              rows: MONTHS.map((m, i) => [
                m,
                d.vulnerabilities.Critical[i],
                d.vulnerabilities.High[i],
                d.vulnerabilities.Medium[i],
                d.vulnerabilities.Low[i],
              ]),
            }}
          >
            <BarSeries
              categories={[...MONTHS]}
              series={vulnSeries}
              mode="stacked"
              valueFormat={(n) => `${Math.round(n)}`}
            />
          </ChartFrame>
          <ChartLegend series={vulnSeries} />
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <ChartFrame
            id="environments"
            title="Environment stability"
            unit="% of days green"
            description="Preview environments are always the least stable and that is acceptable — the number to defend is production, which has not been below 99% since December."
            table={{
              columns: ["Month", ...d.environmentStability.map((e) => e.environment)],
              rows: MONTHS.map((m, i) => [m, ...d.environmentStability.map((e) => pct1(e.values[i]))]),
            }}
          >
            <TimeSeries labels={MONTHS} series={envSeries} yFormat={(n) => `${(n * 100).toFixed(0)}%`} />
          </ChartFrame>
          <ChartLegend series={envSeries} />
        </div>
      </section>
    </>
  );
}
