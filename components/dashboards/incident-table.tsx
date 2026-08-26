import type { Incident } from "@/content/dashboards/types";
import { Badge } from "@/components/ui/primitives";

const SEVERITY_TONE = { P1: "critical", P2: "warn", P3: "neutral", P4: "neutral" } as const;

/**
 * Active incident queue. The SLA column is the point of the table — it shows
 * remaining time against the target, so a breach is visible without arithmetic.
 */
export function IncidentTable({ incidents }: { incidents: readonly Incident[] }) {
  return (
    <div className="min-w-0 overflow-x-auto rounded-[var(--radius-card)] border border-line">
      <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
        <caption className="sr-only">Currently open incidents with severity, owner and SLA status</caption>
        <thead>
          <tr className="bg-surface-sunken">
            {["Incident", "Severity", "Service", "Owner", "Open", "SLA"].map((h) => (
              <th
                key={h}
                scope="col"
                className="num whitespace-nowrap px-4 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-text-faint"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incidents.map((inc) => {
            const remaining = inc.slaHours - inc.openedHoursAgo;
            const breached = remaining < 0;
            const atRisk = !breached && remaining <= inc.slaHours * 0.2;

            return (
              <tr key={inc.id} className="border-t border-line align-top">
                <td className="px-4 py-3">
                  <p className="num text-xs text-text-faint">{inc.id}</p>
                  <p className="max-w-[34ch] leading-snug text-text">{inc.title}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={SEVERITY_TONE[inc.severity]}>{inc.severity}</Badge>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-text-muted">{inc.service}</td>
                <td className="num whitespace-nowrap px-4 py-3 text-text-muted">{inc.owner}</td>
                <td className="num whitespace-nowrap px-4 py-3 text-text-muted">
                  {inc.openedHoursAgo.toFixed(1)}h
                </td>
                <td className="num whitespace-nowrap px-4 py-3">
                  <span
                    className={
                      breached ? "font-semibold text-critical" : atRisk ? "font-semibold text-warn" : "text-good"
                    }
                  >
                    {breached
                      ? `Breached by ${Math.abs(remaining).toFixed(1)}h`
                      : `${remaining.toFixed(1)}h left`}
                  </span>
                  <span className="block text-xs text-text-faint">target {inc.slaHours}h</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
