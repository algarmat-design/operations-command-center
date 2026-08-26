import * as d from "@/content/dashboards/executive";
import { MONTHS } from "@/content/dashboards/types";
import { MetricGrid } from "@/components/dashboards/metric-card";
import { Funnel } from "@/components/dashboards/funnel";
import { ChartFrame } from "@/components/charts/chart-frame";
import { ChartLegend, TimeSeries } from "@/components/charts/time-series";
import { BarSeries } from "@/components/charts/bar-series";
import { Eyebrow } from "@/components/ui/primitives";

const usd0 = (n: number) => `$${Math.round(n)}K`;
const pct1 = (n: number) => `${(n * 100).toFixed(1)}%`;

export function ExecutiveBoard() {
  const pnlSeries = [
    { id: "mrr", label: "Revenue", values: d.mrr, color: "var(--series-1)", kind: "area" as const },
    { id: "gp", label: "Gross profit", values: d.grossProfit, color: "var(--series-2)" },
    { id: "ebitda", label: "EBITDA", values: d.ebitda, color: "var(--series-4)" },
  ];

  const marginSeries = [
    { id: "gm", label: "Gross margin", values: d.grossMargin, color: "var(--series-1)" },
    { id: "em", label: "EBITDA margin", values: d.ebitdaMargin, color: "var(--series-4)" },
    { id: "it", label: "IT spend % of revenue", values: d.itSpendPctRevenue, color: "var(--series-3)", kind: "dashed" as const },
  ];

  return (
    <>
      <section className="flex flex-col gap-5">
        <Eyebrow>Headline</Eyebrow>
        <MetricGrid metrics={d.headline} />
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-3">
          <ChartFrame
            id="pnl"
            title="Revenue, gross profit and EBITDA"
            unit="USD thousands per month"
            description="Revenue grew 27% across twelve months while EBITDA more than doubled — the gap between the lines is the operating leverage."
            table={{
              columns: ["Month", "Revenue", "COGS", "Opex", "Gross profit", "EBITDA"],
              rows: MONTHS.map((m, i) => [
                m,
                usd0(d.mrr[i]),
                usd0(d.cogs[i]),
                usd0(d.opex[i]),
                usd0(d.grossProfit[i]),
                usd0(d.ebitda[i]),
              ]),
            }}
          >
            <TimeSeries labels={MONTHS} series={pnlSeries} yFormat={usd0} />
          </ChartFrame>
          <ChartLegend series={pnlSeries} />
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <ChartFrame
            id="margins"
            title="Margin structure and IT intensity"
            unit="% of revenue"
            description="IT spend as a share of revenue fell from 6.2% to 5.6% while absolute IT spend rose 13%. The function is scaling sub-linearly with the business."
            table={{
              columns: ["Month", "Gross margin", "EBITDA margin", "IT % of revenue"],
              rows: MONTHS.map((m, i) => [
                m,
                pct1(d.grossMargin[i]),
                pct1(d.ebitdaMargin[i]),
                pct1(d.itSpendPctRevenue[i]),
              ]),
            }}
          >
            <TimeSeries labels={MONTHS} series={marginSeries} yFormat={(n) => `${(n * 100).toFixed(0)}%`} />
          </ChartFrame>
          <ChartLegend series={marginSeries} />
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <ChartFrame
          id="budget"
          title="Budget vs. actual by area"
          unit="USD thousands, year to date"
          minWidth={480}
          description={`$${Math.abs(d.budgetVariance)}K under plan overall. Engineering delivery is the only line above budget.`}
          table={{
            columns: ["Area", "Budget", "Actual", "Variance"],
            rows: d.budgetByArea.map((l) => [
              l.area,
              usd0(l.budget),
              usd0(l.actual),
              `${l.actual - l.budget >= 0 ? "+" : ""}${usd0(l.actual - l.budget)}`,
            ]),
          }}
        >
          <BarSeries
            categories={d.budgetByArea.map((l) => l.area)}
            series={[
              { id: "budget", label: "Budget", values: d.budgetByArea.map((l) => l.budget), color: "var(--line-strong)" },
              { id: "actual", label: "Actual", values: d.budgetByArea.map((l) => l.actual), color: "var(--series-2)" },
            ]}
            mode="grouped"
            orientation="horizontal"
            valueFormat={usd0}
            height={220}
            width={560}
          />
        </ChartFrame>

        <ChartFrame
          id="unit-economics"
          title="Unit economics — LTV against CAC"
          unit="ratio, LTV divided by CAC"
          minWidth={480}
          description="CAC fell 14% while LTV rose 15%. Both moving the right way at once is what makes the ratio durable rather than a pricing artefact."
          table={{
            columns: ["Month", "CAC", "LTV", "LTV:CAC"],
            rows: MONTHS.map((m, i) => [
              m,
              `$${d.cac[i]}`,
              `$${d.ltv[i].toLocaleString("en-US")}`,
              `${d.ltvCacRatio[i].toFixed(2)}×`,
            ]),
          }}
        >
          <TimeSeries
            labels={MONTHS}
            series={[{ id: "ratio", label: "LTV:CAC", values: d.ltvCacRatio, color: "var(--series-1)", kind: "area" }]}
            yFormat={(n) => `${n.toFixed(1)}×`}
            width={560}
            height={220}
          />
        </ChartFrame>
      </section>

      <section className="flex flex-col gap-5">
        <Eyebrow>Project portfolio</Eyebrow>
        <div className="min-w-0 overflow-x-auto rounded-[var(--radius-card)] border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">Project portfolio investment against annualized benefit</caption>
            <thead>
              <tr className="bg-surface-sunken">
                {["Project", "Invested", "Annualized benefit", "Return"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="num px-4 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-text-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.portfolio.map((p) => (
                <tr key={p.name} className="border-t border-line">
                  <td className="px-4 py-3 text-text">{p.name}</td>
                  <td className="num px-4 py-3 text-text-muted">{usd0(p.invested)}</td>
                  <td className="num px-4 py-3 text-text-muted">{usd0(p.benefit)}</td>
                  <td className="num px-4 py-3 font-semibold text-good">
                    {(p.benefit / p.invested).toFixed(1)}×
                  </td>
                </tr>
              ))}
              <tr className="border-t border-line bg-surface-sunken">
                <td className="px-4 py-3 font-semibold text-text">Portfolio</td>
                <td className="num px-4 py-3 font-semibold text-text">{usd0(d.portfolioInvested)}</td>
                <td className="num px-4 py-3 font-semibold text-text">{usd0(d.portfolioBenefit)}</td>
                <td className="num px-4 py-3 font-semibold text-text">
                  {(d.portfolioBenefit / d.portfolioInvested).toFixed(1)}×
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-line pt-10">
        <div className="flex flex-col gap-2">
          <Eyebrow>Marketing to deals</Eyebrow>
          <h2 className="text-xl">Where revenue actually comes from</h2>
          <p className="max-w-[65ch] text-sm leading-relaxed text-text-muted">
            The funnel a CFO cares about is the one that ends in closed business, not the one that ends
            in impressions. Blended CAC across all four channels is ${d.blendedCac} per deal.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
          <Funnel steps={d.funnel} />

          <div className="min-w-0 overflow-x-auto rounded-[var(--radius-card)] border border-line">
            <table className="w-full min-w-[24rem] border-collapse text-left text-sm">
              <caption className="sr-only">Acquisition channels with spend, deals and cost per deal</caption>
              <thead>
                <tr className="bg-surface-sunken">
                  {["Channel", "Spend", "Deals", "CAC"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="num px-4 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-text-faint"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.channelCac.map((c) => (
                  <tr key={c.channel} className="border-t border-line">
                    <td className="px-4 py-3 text-text">{c.channel}</td>
                    <td className="num px-4 py-3 text-text-muted">${c.spend.toLocaleString("en-US")}</td>
                    <td className="num px-4 py-3 text-text-muted">{c.deals}</td>
                    <td
                      className={`num px-4 py-3 font-semibold ${c.cac <= 350 ? "text-good" : "text-warn"}`}
                    >
                      ${c.cac}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
