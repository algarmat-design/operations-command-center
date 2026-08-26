import * as d from "@/content/dashboards/it-operations";
import { MONTHS } from "@/content/dashboards/types";
import { MetricGrid } from "@/components/dashboards/metric-card";
import { IncidentTable } from "@/components/dashboards/incident-table";
import { ChartFrame } from "@/components/charts/chart-frame";
import { ChartLegend, TimeSeries } from "@/components/charts/time-series";
import { BarSeries } from "@/components/charts/bar-series";
import { Gauge } from "@/components/charts/gauge";
import { BoardSection } from "@/components/dashboards/dashboard-shell";
import { Eyebrow } from "@/components/ui/primitives";

const pct1 = (n: number) => `${(n * 100).toFixed(1)}%`;
const hours = (n: number) => `${n.toFixed(1)}h`;

export function OpsBoard() {
  const severitySeries = [
    { id: "p1", label: "P1", values: [...d.incidentsBySeverity.P1], color: "var(--critical)" },
    { id: "p2", label: "P2", values: [...d.incidentsBySeverity.P2], color: "var(--warn)" },
    { id: "p3", label: "P3", values: [...d.incidentsBySeverity.P3], color: "var(--series-2)" },
    { id: "p4", label: "P4", values: [...d.incidentsBySeverity.P4], color: "var(--line-strong)" },
  ];

  const responseSeries = [
    { id: "mttr", label: "MTTR", values: d.mttr, color: "var(--series-3)" },
    { id: "mtta", label: "MTTA", values: d.mtta, color: "var(--series-2)" },
  ];

  return (
    <>
      <BoardSection
        eyebrow="Service health"
        title="Are we meeting what we committed to?"
        lede="Every metric carries its ITIL target. A number without a target is trivia."
      >
        <MetricGrid metrics={d.headline} />
      </BoardSection>

      <section className="grid gap-8 lg:grid-cols-2">
        <ChartFrame
          id="sla"
          title="SLA attainment"
          unit="% of tickets resolved within target"
          description="Above the 95% target for six consecutive months. Read this against the response times beside it — when attainment rises while MTTR stays flat, someone is re-classifying tickets rather than resolving them faster."
          table={{
            columns: ["Month", "SLA attainment", "MTTR", "MTTA"],
            rows: MONTHS.map((m, i) => [m, pct1(d.slaAttainment[i]), hours(d.mttr[i]), hours(d.mtta[i])]),
          }}
        >
          <TimeSeries
            labels={MONTHS}
            series={[
              {
                id: "sla",
                label: "SLA attainment",
                values: d.slaAttainment.map((v) => v * 100),
                color: "var(--good)",
                kind: "area",
              },
            ]}
            yFormat={(n) => `${n.toFixed(0)}%`}
          />
        </ChartFrame>

        <div className="flex min-w-0 flex-col gap-3">
          <ChartFrame
            id="response"
            title="Time to acknowledge and time to restore"
            unit="hours"
            description="MTTA fell 58% while MTTR fell 43%. Acknowledgement improving faster is the right order — it means triage got better, not that people worked harder."
            table={{
              columns: ["Month", "MTTA", "MTTR"],
              rows: MONTHS.map((m, i) => [m, hours(d.mtta[i]), hours(d.mttr[i])]),
            }}
          >
            <TimeSeries labels={MONTHS} series={responseSeries} yFormat={(n) => `${n.toFixed(1)}h`} />
          </ChartFrame>
          <ChartLegend series={responseSeries} />
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-3">
          <ChartFrame
            id="severity"
            title="Incidents by severity"
            unit="incident count per month"
            description="The December spike is a release-freeze artefact, left in place deliberately. A dashboard where the holiday freeze is invisible is a dashboard that is smoothing its data."
            table={{
              columns: ["Month", "P1", "P2", "P3", "P4", "Total"],
              rows: MONTHS.map((m, i) => [
                m,
                d.incidentsBySeverity.P1[i],
                d.incidentsBySeverity.P2[i],
                d.incidentsBySeverity.P3[i],
                d.incidentsBySeverity.P4[i],
                d.totalIncidents[i],
              ]),
            }}
          >
            <BarSeries
              categories={[...MONTHS]}
              series={severitySeries}
              mode="stacked"
              valueFormat={(n) => `${Math.round(n)}`}
            />
          </ChartFrame>
          <ChartLegend series={severitySeries} />
        </div>

        <ChartFrame
          id="aging"
          title="Open backlog by age"
          unit="ticket count"
          minWidth={440}
          description="129 of 171 open tickets are under a week old. A backlog that is large but young is a throughput problem; one that is small but old is an ownership problem."
          table={{
            columns: ["Age band", "Tickets", "Share of backlog"],
            rows: d.backlogAging.map((b) => [
              b.bucket,
              b.count,
              `${((b.count / d.backlogAging.reduce((s, x) => s + x.count, 0)) * 100).toFixed(1)}%`,
            ]),
          }}
        >
          <BarSeries
            categories={d.backlogAging.map((b) => b.bucket)}
            series={[
              {
                id: "count",
                label: "Tickets",
                values: d.backlogAging.map((b) => b.count),
                color: "var(--series-2)",
              },
            ]}
            orientation="horizontal"
            valueFormat={(n) => `${Math.round(n)}`}
            height={200}
            width={520}
          />
        </ChartFrame>
      </section>

      <BoardSection
        eyebrow="Rates against target"
        title="Three rates, each with its threshold marked"
        lede="The tick on each arc is the target. Amber means the gap is real, not that the number fell."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Change success rate",
              value: d.changeSuccessRate[d.changeSuccessRate.length - 1],
              target: 0.95,
              tone: "good" as const,
              min: 0.9,
            },
            {
              label: "First-contact resolution",
              value: d.firstContactResolution[d.firstContactResolution.length - 1],
              target: 0.75,
              tone: "warn" as const,
              min: 0.5,
            },
            {
              label: "Critical service availability",
              value: d.criticalAvailability[d.criticalAvailability.length - 1],
              target: 0.999,
              tone: "good" as const,
              min: 0.99,
            },
          ].map((g) => (
            <div
              key={g.label}
              className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-line bg-surface p-5"
            >
              <Gauge
                value={g.value}
                min={g.min}
                max={1}
                target={g.target}
                tone={g.tone}
                valueFormat={(n) => `${(n * 100).toFixed(g.label.includes("availability") ? 2 : 1)}%`}
                label={g.label}
                unit="% of total"
              />
              <p className="text-center text-sm font-semibold text-text">{g.label}</p>
            </div>
          ))}
        </div>
      </BoardSection>

      <section className="flex min-w-0 flex-col gap-5 border-t border-line pt-10">
        <div className="flex flex-col gap-1.5">
          <Eyebrow>Active queue</Eyebrow>
          <h2 className="text-xl md:text-2xl">Open incidents right now</h2>
          <p className="max-w-[65ch] text-sm leading-relaxed text-text-muted">
            Severity, owner and time remaining against the SLA target. One ticket is already past its
            clock — see the reading below.
          </p>
        </div>
        <IncidentTable incidents={d.activeIncidents} />
      </section>
    </>
  );
}
