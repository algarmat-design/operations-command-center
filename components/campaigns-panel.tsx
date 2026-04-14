import type { MarketingCampaign } from "@/lib/types";

const statusDot: Record<MarketingCampaign["status"], string> = {
  healthy: "bg-emerald-400",
  watch: "bg-amber-400",
  breach: "bg-rose-400",
};

function currency(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toLocaleString()}`;
}

export function CampaignsPanel({ campaigns }: { campaigns: MarketingCampaign[] }) {
  const totalLeads = campaigns.reduce((a, c) => a + c.leads, 0);
  const totalDeals = campaigns.reduce((a, c) => a + c.deals, 0);
  const totalSpend = campaigns.reduce((a, c) => a + c.spend, 0);
  const blendedCac = totalDeals ? totalSpend / totalDeals : 0;

  return (
    <section className="rounded-2xl border border-white/5 bg-[var(--surface)] p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Marketing Efficiency</h2>
          <p className="text-xs text-slate-500">
            Spend → leads → closed-won deals, by channel. Blended CAC ${Math.round(blendedCac)}.
          </p>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div>{totalDeals} deals</div>
          <div>{totalLeads.toLocaleString()} leads</div>
        </div>
      </div>

      <ul className="space-y-2">
        {campaigns.map((c) => {
          const conv = c.leads ? (c.deals / c.leads) * 100 : 0;
          return (
            <li key={c.channel} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-white/5 bg-[var(--surface-2)]/40 px-3 py-2.5">
              <span className={`h-2 w-2 rounded-full ${statusDot[c.status]}`} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">{c.channel}</p>
                <p className="text-[11px] text-slate-400">
                  {c.leads.toLocaleString()} leads → {c.deals} deals · {conv.toFixed(1)}% conv
                </p>
              </div>
              <div className="text-right text-[11px]">
                <p className="font-mono text-slate-300">CAC ${c.cac}</p>
                <p className="text-slate-500">{currency(c.spend)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
