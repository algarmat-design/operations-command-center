import type { Metadata } from "next";
import { dashboards, identity } from "@/content/profile";
import { DashboardCards } from "@/components/home/dashboard-cards";
import { DemoDataBanner } from "@/components/dashboards/dashboard-shell";
import { Card, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Dashboards",
  description: `Four synthetic dashboards built by ${identity.name} — executive financials, ITIL service operations, DORA delivery metrics, and a transformation roadmap.`,
};

/** Ported from the retired sidebar: how to read any of these boards. */
const GUIDE = [
  {
    title: "Start with the audience line",
    body: "Every board names who it is for. A board that speaks to a CFO and a board that speaks to a VP Engineering should not contain the same numbers, and these do not.",
  },
  {
    title: "Read the question, then the metrics",
    body: "Each dashboard exists to answer one business question. If you cannot connect a metric back to that question, the metric is decoration and should be cut.",
  },
  {
    title: "Status colors are not brand colors",
    body: "Green, amber and red mean healthy, watch and breach — nothing else on the site uses them. The teal accent never signals status, so a colored number always means something.",
  },
  {
    title: "Every chart carries its unit and its data",
    body: "Units are printed above each chart, and every chart has a data table underneath it. A chart you cannot check is a chart you have to take on trust.",
  },
  {
    title: "The judgment is at the bottom",
    body: "Each board closes with what I would actually say in the room — what the pattern means, what it does not mean, and what I would do. Instrumentation is the easy half.",
  },
];

export default function DashboardsIndexPage() {
  return (
    <>
      <section className="px-5 pb-8 pt-12 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <Eyebrow>Dashboards</Eyebrow>
          <h1 className="max-w-[22ch] text-[clamp(2rem,5vw,3rem)] leading-tight">
            Four boards, four audiences
          </h1>
          <p className="max-w-[65ch] text-base leading-relaxed text-text-muted">
            Four worked examples, built by me to demonstrate business acumen: what I measure, who
            I measure it for, and what I conclude from the reading. All four run on synthetic data
            and each states the period it covers. The numbers are invented; the judgment is the point.
          </p>
          <DemoDataBanner />
        </div>
      </section>

      <Section bleed>
        <DashboardCards />
      </Section>

      <Section eyebrow="How to read these" title="Five things that apply to all four">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDE.map((g, i) => (
            <Card as="li" key={g.title} className="flex flex-col gap-2">
              <span className="num text-[11px] tracking-[0.18em] text-accent">{`0${i + 1}`}</span>
              <h3 className="text-base leading-snug text-text">{g.title}</h3>
              <p className="text-[13px] leading-relaxed text-text-muted">{g.body}</p>
            </Card>
          ))}
        </ol>
      </Section>

      <Section eyebrow="What each one covers">
        <dl className="flex flex-col divide-y divide-line border-y border-line">
          {dashboards.map((d) => (
            <div key={d.slug} className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[minmax(0,16rem)_1fr]">
              <dt className="flex flex-col gap-1">
                <span className="text-base font-semibold text-text">{d.title}</span>
                <span className="num text-[11px] uppercase tracking-[0.14em] text-text-faint">
                  {d.framework}
                </span>
              </dt>
              <dd className="flex flex-col gap-3">
                <p className="max-w-[70ch] text-sm leading-relaxed text-text-muted">{d.whatItProves}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {d.metrics.map((m) => (
                    <li key={m} className="num text-[11px] text-text-faint">
                      {m}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
