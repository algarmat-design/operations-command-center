import type { BudgetLine, Channel, FunnelStep, Insight, MetricSpec } from "./types.ts";
import { MONTHS } from "./types.ts";

/**
 * Synthetic C-level financials, in thousands of USD unless noted.
 *
 * Only the three base series are authored. Margin, EBITDA and every ratio are
 * derived below, so the board-level numbers can never disagree with the ledger
 * they are supposed to summarize.
 */

/** Monthly recurring revenue. */
export const mrr = [982, 1004, 1021, 1058, 1073, 1096, 1124, 1147, 1168, 1195, 1218, 1243];
/** Cost of goods sold — hosting, payment processing, support delivery. */
export const cogs = [364, 371, 374, 386, 388, 393, 399, 404, 408, 414, 419, 423];
/** Operating expense — payroll, sales and marketing, G&A, IT. */
export const opex = [512, 519, 522, 534, 531, 536, 541, 545, 548, 552, 556, 559];
/** IT spend, a subset of opex. */
export const itSpend = [61, 63, 64, 66, 65, 66, 67, 67, 68, 68, 69, 69];

export const grossProfit = mrr.map((r, i) => r - cogs[i]);
export const grossMargin = mrr.map((r, i) => grossProfit[i] / r);
export const ebitda = mrr.map((r, i) => r - cogs[i] - opex[i]);
export const ebitdaMargin = mrr.map((r, i) => ebitda[i] / r);
export const itSpendPctRevenue = mrr.map((r, i) => itSpend[i] / r);

/** Blended customer acquisition cost and lifetime value, in whole USD. */
export const cac = [612, 604, 598, 611, 589, 578, 566, 559, 548, 541, 533, 524];
export const ltv = [3980, 4010, 4055, 4090, 4160, 4215, 4280, 4325, 4390, 4450, 4510, 4580];
export const ltvCacRatio = ltv.map((v, i) => v / cac[i]);

export const budgetByArea: readonly BudgetLine[] = [
  { area: "Infrastructure & cloud", budget: 268, actual: 251 },
  { area: "Engineering delivery", budget: 412, actual: 428 },
  { area: "Security & compliance", budget: 156, actual: 149 },
  { area: "AI & automation", budget: 124, actual: 118 },
  { area: "Vendor & licensing", budget: 198, actual: 176 },
];

export const budgetTotals = budgetByArea.reduce(
  (acc, l) => ({ budget: acc.budget + l.budget, actual: acc.actual + l.actual }),
  { budget: 0, actual: 0 },
);
/** Negative means under budget. */
export const budgetVariance = budgetTotals.actual - budgetTotals.budget;
export const budgetVariancePct = budgetVariance / budgetTotals.budget;

/** Project portfolio: invested vs. annualized benefit realized, thousands USD. */
export const portfolio = [
  { name: "Payments platform hardening", invested: 340, benefit: 512 },
  { name: "Document intelligence rollout", invested: 210, benefit: 468 },
  { name: "Cloud cost remediation", invested: 96, benefit: 289 },
  { name: "Service desk automation", invested: 128, benefit: 214 },
];
export const portfolioInvested = portfolio.reduce((s, p) => s + p.invested, 0);
export const portfolioBenefit = portfolio.reduce((s, p) => s + p.benefit, 0);
export const portfolioRoi = (portfolioBenefit - portfolioInvested) / portfolioInvested;

/** Marketing-to-deals funnel, carried over from the retired /workflow route. */
export const funnel: readonly FunnelStep[] = [
  { label: "Impressions", count: 482_000, note: "Paid + organic reach across all channels" },
  { label: "Marketing Qualified Leads", count: 4_820, note: "1% conversion on impressions" },
  { label: "Sales Qualified Leads", count: 2_106, note: "BANT-qualified by the SDR team" },
  { label: "Proposals Sent", count: 744, note: "After discovery and scoping calls" },
  { label: "Closed-Won", count: 183, note: "New logo clients this month" },
];

export const channels: readonly Channel[] = [
  { channel: "LinkedIn Ads", spend: 12_400, leads: 412, deals: 24 },
  { channel: "Google Search", spend: 18_900, leads: 886, deals: 47 },
  { channel: "Content / SEO", spend: 4_200, leads: 298, deals: 19 },
  { channel: "Partner referrals", spend: 2_100, leads: 94, deals: 28 },
];
export const channelCac = channels.map((c) => ({ ...c, cac: Math.round(c.spend / c.deals) }));
export const blendedCac = Math.round(
  channels.reduce((s, c) => s + c.spend, 0) / channels.reduce((s, c) => s + c.deals, 0),
);

const usd = (thousands: number) =>
  thousands >= 1000 ? `$${(thousands / 1000).toFixed(2)}M` : `$${Math.round(thousands)}K`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
const last = <T,>(a: readonly T[]) => a[a.length - 1];
const prev = <T,>(a: readonly T[]) => a[a.length - 2];
const ppDelta = (a: readonly number[]) => `${((last(a) - prev(a)) * 100).toFixed(1)} pp`;

export const headline: readonly MetricSpec[] = [
  {
    id: "mrr",
    label: "Monthly recurring revenue",
    value: usd(last(mrr)),
    unit: "USD per month",
    delta: `+${(((last(mrr) - prev(mrr)) / prev(mrr)) * 100).toFixed(1)}%`,
    tone: "good",
    target: usd(1200),
    context: "Twelfth consecutive month of growth; compounding at roughly 2% month over month.",
    series: mrr,
  },
  {
    id: "gross-margin",
    label: "Gross margin",
    value: pct(last(grossMargin)),
    unit: "% of revenue",
    delta: `+${ppDelta(grossMargin)}`,
    tone: "good",
    target: "65.0%",
    context: "Revenue is outgrowing COGS, so margin expands without a pricing change.",
    series: grossMargin,
  },
  {
    id: "ebitda",
    label: "EBITDA",
    value: usd(last(ebitda)),
    unit: "USD per month",
    delta: `+${usd(last(ebitda) - prev(ebitda))}`,
    tone: "good",
    target: usd(240),
    context: `${pct(last(ebitdaMargin))} EBITDA margin — the operating leverage is real, not a one-off.`,
    series: ebitda,
  },
  {
    id: "it-spend",
    label: "IT spend as % of revenue",
    value: pct(last(itSpendPctRevenue)),
    unit: "% of revenue",
    delta: ppDelta(itSpendPctRevenue),
    tone: "good",
    target: "≤ 6.0%",
    context: "IT cost is growing slower than the business it supports. That is the whole objective.",
    series: itSpendPctRevenue,
  },
  {
    id: "ltv-cac",
    label: "LTV : CAC",
    value: `${last(ltvCacRatio).toFixed(1)}×`,
    unit: "ratio",
    delta: `+${(last(ltvCacRatio) - prev(ltvCacRatio)).toFixed(2)}×`,
    tone: "good",
    target: "≥ 3.0×",
    context: `CAC down to $${last(cac)} while LTV climbed to $${last(ltv).toLocaleString("en-US")}.`,
    series: ltvCacRatio,
  },
  {
    id: "budget-variance",
    label: "Budget variance",
    value: pct(budgetVariancePct),
    unit: "% vs. plan",
    tone: "warn",
    target: "±3.0%",
    context: `$${Math.abs(budgetVariance)}K under plan — favourable, but outside the ±3% tolerance, which means the forecast was wrong. Engineering is the only overrun.`,
  },
  {
    id: "portfolio-roi",
    label: "Project portfolio ROI",
    value: pct(portfolioRoi),
    unit: "% return on invested",
    tone: "good",
    target: "≥ 40%",
    context: `${usd(portfolioBenefit)} annualized benefit against ${usd(portfolioInvested)} invested.`,
  },
  {
    id: "blended-cac",
    label: "Blended CAC",
    value: `$${blendedCac}`,
    unit: "USD per closed deal",
    tone: "good",
    target: "≤ $350",
    context: "Partner referrals hold the blended number down; paid search carries the volume.",
  },
];

export const insights: readonly Insight[] = [
  {
    tone: "good",
    title: "Margin expansion is structural, not seasonal",
    body: "Gross margin improved for eleven of twelve months while revenue grew 27%. COGS is growing at roughly half the rate of revenue, which means the unit economics improve as volume arrives rather than degrading. Protect this by holding infrastructure cost per transaction flat as scale continues.",
  },
  {
    tone: "warn",
    title: "Engineering delivery is the only line over plan",
    body: "Engineering is $16K over a $412K budget while every other area came in under. That is contractor spend pulled forward to hit the platform-hardening dates, not a run-rate problem — but it needs to be re-forecast rather than absorbed silently, because the same pull-forward will not be available next quarter.",
  },
  {
    tone: "good",
    title: "IT spend is decoupled from revenue growth",
    body: "IT spend as a share of revenue fell from 6.2% to 5.6% across the year while absolute IT spend rose 13%. This is the number to put in front of a board: the function is scaling sub-linearly with the business, which is what buys the credibility to ask for the next investment.",
  },
  {
    tone: "neutral",
    title: "Partner referrals are the cheapest channel and the smallest",
    body: "At $75 per deal, referrals convert eleven times more efficiently than LinkedIn Ads at $517. The channel produced 28 deals on $2.1K of spend. The question for the CRO is not whether to shift budget, it is whether referral volume can be manufactured at all — most of the time it cannot, which is why the paid channels still deserve their allocation.",
  },
  {
    tone: "good",
    title: "Portfolio ROI is carried by two of four projects",
    body: "Document intelligence returned 2.2× and cloud cost remediation 3.0×, while service desk automation is at 1.7× and still ramping. Reporting a single blended portfolio ROI hides that spread — the board should see which bets paid and which are still in flight.",
  },
];

export { MONTHS };
