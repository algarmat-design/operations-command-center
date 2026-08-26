import * as d from "@/content/dashboards/roadmap";
import type { Rag } from "@/content/dashboards/types";
import { Gantt } from "@/components/charts/gantt";
import { ChartFrame } from "@/components/charts/chart-frame";
import { BarSeries } from "@/components/charts/bar-series";
import { TimeSeries } from "@/components/charts/time-series";
import { BoardSection } from "@/components/dashboards/dashboard-shell";
import { Badge, Eyebrow, Stat } from "@/components/ui/primitives";

const RAG_TONE: Record<Rag, "good" | "warn" | "critical"> = {
  green: "good",
  amber: "warn",
  red: "critical",
};
const RAG_LABEL: Record<Rag, string> = { green: "On track", amber: "At risk", red: "Off track" };

const usd = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(2)}M` : `$${Math.round(n)}K`;

export function RoadmapBoard() {
  const nameById = new Map(d.initiatives.map((i) => [i.id, i.name]));

  return (
    <>
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={`${d.initiatives.length}`} label="Initiatives across four lanes" size="md" />
        <Stat value={usd(d.totalInvestment)} label="Total investment committed" size="md" />
        <Stat value={usd(d.totalBenefit)} label="Expected annualized benefit" size="md" />
        <Stat value={`${d.portfolioRatio.toFixed(2)}×`} label="Portfolio benefit to cost" size="md" />
      </section>

      <BoardSection
        eyebrow="The plan"
        title="Four quarters, four lanes, twelve initiatives"
        lede="Sequencing and dependencies are the content here — the bars are only how it is drawn."
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="num text-[13px] font-bold uppercase tracking-[0.12em] text-text-muted">
            Status
          </span>
          <Badge tone="good">{d.ragCounts.green} on track</Badge>
          <Badge tone="warn">{d.ragCounts.amber} at risk</Badge>
          <Badge tone="critical">{d.ragCounts.red} off track</Badge>
        </div>

        <ChartFrame
          id="gantt"
          title="Four-quarter roadmap with dependencies"
          unit="quarters; investment in USD thousands"
          minWidth={792}
          description="Arrows are hard dependencies — the target initiative cannot complete until its source does. The colored cap on the left edge of each bar is RAG status; the accent fill is not a status color."
          table={{
            columns: ["Initiative", "Lane", "Quarters", "Status", "Owner", "Investment", "Benefit", "Depends on"],
            rows: d.initiatives.map((i) => [
              i.name,
              d.lanes.find((l) => l.id === i.lane)?.label ?? i.lane,
              i.startQ === i.endQ ? `Q${i.startQ}` : `Q${i.startQ}–Q${i.endQ}`,
              RAG_LABEL[i.rag],
              i.owner,
              usd(i.investment),
              usd(i.benefit),
              i.deps.length ? i.deps.map((x) => nameById.get(x)).join(", ") : "—",
            ]),
          }}
        >
          <Gantt lanes={d.lanes} initiatives={d.initiatives} quarters={[...d.QUARTERS]} />
        </ChartFrame>
      </BoardSection>

      <section className="grid gap-8 lg:grid-cols-2">
        <ChartFrame
          id="investment-by-lane"
          title="Investment and benefit by lane"
          unit="USD thousands"
          minWidth={480}
          description="AI & Automation carries the largest investment and the largest return. Platform carries the largest dependency load, which no benefit column ever shows."
          table={{
            columns: ["Lane", "Investment", "Expected benefit", "Ratio"],
            rows: d.investmentByLane.map((l) => [
              l.lane,
              usd(l.investment),
              usd(l.benefit),
              `${(l.benefit / l.investment).toFixed(2)}×`,
            ]),
          }}
        >
          <BarSeries
            categories={d.investmentByLane.map((l) => l.lane)}
            series={[
              { id: "inv", label: "Investment", values: d.investmentByLane.map((l) => l.investment), color: "var(--series-3)" },
              { id: "ben", label: "Benefit", values: d.investmentByLane.map((l) => l.benefit), color: "var(--series-1)" },
            ]}
            mode="grouped"
            orientation="horizontal"
            valueFormat={usd}
            height={220}
            width={560}
          />
        </ChartFrame>

        <ChartFrame
          id="cumulative-benefit"
          title="Cumulative benefit unlocked"
          unit="USD thousands, annualized"
          minWidth={480}
          description="The curve steps rather than slopes because benefit is counted when an initiative completes, not while it is in flight. Half the program's value lands in Q4 — which is exactly why the Q4 dependency chain matters."
          table={{
            columns: ["Quarter", "Investment in quarter", "Cumulative benefit unlocked"],
            rows: d.QUARTERS.map((q, i) => [q, usd(d.investmentByQuarter[i]), usd(d.cumulativeBenefit[i])]),
          }}
        >
          <TimeSeries
            labels={[...d.QUARTERS]}
            series={[
              { id: "benefit", label: "Cumulative benefit", values: d.cumulativeBenefit, color: "var(--series-1)", kind: "area" },
              { id: "invest", label: "Investment per quarter", values: d.investmentByQuarter, color: "var(--series-4)", kind: "dashed" },
            ]}
            yFormat={usd}
            width={560}
            height={220}
            yMin={0}
          />
        </ChartFrame>
      </section>

      <section className="flex min-w-0 flex-col gap-5 border-t border-line pt-10">
        <div className="flex flex-col gap-1.5">
          <Eyebrow>Initiative detail</Eyebrow>
          <h2 className="text-xl md:text-2xl">Every initiative, and why it is where it is</h2>
        </div>

        <ol className="flex flex-col divide-y divide-line border-y border-line">
          {d.initiatives.map((i) => (
            <li key={i.id} className="grid gap-x-8 gap-y-3 py-5 md:grid-cols-[minmax(0,18rem)_1fr]">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={RAG_TONE[i.rag]}>{RAG_LABEL[i.rag]}</Badge>
                  <span className="num text-[11px] uppercase tracking-[0.14em] text-text-faint">
                    {i.startQ === i.endQ ? `Q${i.startQ}` : `Q${i.startQ}–Q${i.endQ}`}
                  </span>
                </div>
                <h3 className="text-base leading-snug text-text">{i.name}</h3>
                <p className="num text-xs text-text-faint">
                  {d.lanes.find((l) => l.id === i.lane)?.label} · {i.owner}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="max-w-[70ch] text-sm leading-relaxed text-text-muted">{i.note}</p>
                <p className="num text-xs text-text-faint">
                  {usd(i.investment)} invested · {usd(i.benefit)} expected benefit ·{" "}
                  {(i.benefit / i.investment).toFixed(2)}× ·{" "}
                  {i.deps.length
                    ? `depends on ${i.deps.map((x) => nameById.get(x)).join(", ")}`
                    : "no dependencies"}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
