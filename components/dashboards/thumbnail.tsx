import type { DashboardSlug } from "@/content/types";
import * as exec from "@/content/dashboards/executive";
import * as ops from "@/content/dashboards/it-operations";
import * as devops from "@/content/dashboards/devops";
import { initiatives, lanes } from "@/content/dashboards/roadmap";

/**
 * A real preview, not an icon and not a screenshot: each thumbnail draws the
 * dashboard's own data in the shape of that dashboard's signature layout. It
 * cannot drift from the board it previews, it stays crisp at any DPR, and it
 * follows the theme — none of which a PNG would do.
 *
 * Decorative by design: the card's link text carries the title, audience and
 * question, so the drawing is aria-hidden.
 */

const W = 320;
const H = 176;

export function DashboardThumbnail({ slug }: { slug: DashboardSlug }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="auto"
      aria-hidden="true"
      className="block rounded-md border border-line bg-surface-sunken"
    >
      {slug === "executive" && <ExecutiveThumb />}
      {slug === "it-operations" && <OpsThumb />}
      {slug === "devops" && <DevopsThumb />}
      {slug === "roadmap" && <RoadmapThumb />}
    </svg>
  );
}

/** Shared header: two live headline figures in the mono face. */
function Head({ a, aLabel, b, bLabel }: { a: string; aLabel: string; b: string; bLabel: string }) {
  return (
    <g>
      <text x="16" y="30" fontSize="19" fontWeight="600" fill="var(--text)" className="num">
        {a}
      </text>
      <text x="16" y="43" fontSize="8" fill="var(--text-faint)" letterSpacing="0.08em" className="num">
        {aLabel.toUpperCase()}
      </text>
      <text x="116" y="30" fontSize="19" fontWeight="600" fill="var(--text)" className="num">
        {b}
      </text>
      <text x="116" y="43" fontSize="8" fill="var(--text-faint)" letterSpacing="0.08em" className="num">
        {bLabel.toUpperCase()}
      </text>
      <line x1="16" y1="54" x2={W - 16} y2="54" stroke="var(--line)" />
    </g>
  );
}

/** Maps a series into a polyline inside an explicit box. */
function line(values: readonly number[], x: number, y: number, w: number, h: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => `${x + (i / (values.length - 1)) * w},${y + h - ((v - min) / span) * h}`).join(" ");
}

function ExecutiveThumb() {
  const pts = line(exec.mrr, 16, 66, 180, 86);
  return (
    <>
      <Head a="$1.24M" aLabel="MRR" b="66.0%" bLabel="Gross margin" />
      <polygon points={`16,152 ${pts} 196,152`} fill="var(--series-1)" opacity="0.14" />
      <polyline points={pts} fill="none" stroke="var(--series-1)" strokeWidth="2" strokeLinejoin="round" />
      {/* Budget vs actual, five areas, as a compact paired column set. */}
      {exec.budgetByArea.map((l, i) => {
        const max = Math.max(...exec.budgetByArea.map((b) => b.budget));
        const x = 218 + i * 20;
        const bh = (l.budget / max) * 74;
        const ah = (l.actual / max) * 74;
        return (
          <g key={l.area}>
            <rect x={x} y={152 - bh} width="7" height={bh} rx="1.5" fill="var(--line-strong)" />
            <rect x={x + 8} y={152 - ah} width="7" height={ah} rx="1.5" fill="var(--series-2)" />
          </g>
        );
      })}
      <line x1="212" y1="152" x2={W - 16} y2="152" stroke="var(--line)" />
    </>
  );
}

function OpsThumb() {
  const sev = [
    { key: ops.incidentsBySeverity.P1, color: "var(--critical)" },
    { key: ops.incidentsBySeverity.P2, color: "var(--warn)" },
    { key: ops.incidentsBySeverity.P3, color: "var(--series-2)" },
    { key: ops.incidentsBySeverity.P4, color: "var(--line-strong)" },
  ];
  const totals = ops.totalIncidents;
  const max = Math.max(...totals);

  return (
    <>
      <Head a="96.7%" aLabel="SLA attained" b="3.9h" bLabel="MTTR" />
      {/* Stacked severity columns — the ITIL board's signature shape. */}
      {totals.map((_, i) => {
        let acc = 0;
        const x = 16 + i * 17;
        return (
          <g key={i}>
            {sev.map((s, si) => {
              const h = (s.key[i] / max) * 84;
              const y = 152 - acc - h;
              acc += h;
              return <rect key={si} x={x} y={y} width="12" height={Math.max(h, 1)} rx="1" fill={s.color} />;
            })}
          </g>
        );
      })}
      <line x1="16" y1="152" x2={16 + 12 * 17} y2="152" stroke="var(--line)" />
      {/* Availability arc on the right. */}
      <path d="M 240 146 A 40 40 0 1 1 304 146" fill="none" stroke="var(--chart-grid)" strokeWidth="9" strokeLinecap="round" />
      <path d="M 240 146 A 40 40 0 1 1 302 148" fill="none" stroke="var(--good)" strokeWidth="9" strokeLinecap="round" />
      <text x="272" y="134" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text)" className="num">
        99.93%
      </text>
    </>
  );
}

function DevopsThumb() {
  // Four DORA arcs in a row — the board's whole argument in one glance.
  const arcs = [
    { frac: 0.94, tone: "var(--good)", label: "DF" },
    { frac: 0.9, tone: "var(--good)", label: "LT" },
    { frac: 0.95, tone: "var(--good)", label: "CFR" },
    { frac: 0.72, tone: "var(--warn)", label: "TTR" },
  ];
  const r = 22;
  const arc = (cx: number, cy: number, frac: number) => {
    const start = 140;
    const sweep = 260 * frac;
    const p = (deg: number) => {
      const rad = (deg * Math.PI) / 180;
      return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    };
    const [x1, y1] = p(start);
    const [x2, y2] = p(start + sweep);
    return `M ${x1} ${y1} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };

  return (
    <>
      <Head a="2.8/day" aLabel="Deploy freq" b="18h" bLabel="Lead time" />
      {arcs.map((a, i) => {
        const cx = 52 + i * 72;
        const cy = 108;
        return (
          <g key={a.label}>
            <path d={arc(cx, cy, 1)} fill="none" stroke="var(--chart-grid)" strokeWidth="7" strokeLinecap="round" />
            <path d={arc(cx, cy, a.frac)} fill="none" stroke={a.tone} strokeWidth="7" strokeLinecap="round" />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text)" className="num">
              {a.label}
            </text>
            <text x={cx} y={cy + 40} textAnchor="middle" fontSize="7.5" fill="var(--text-faint)" letterSpacing="0.1em" className="num">
              {a.frac > 0.85 ? "ELITE" : "HIGH"}
            </text>
          </g>
        );
      })}
    </>
  );
}

function RoadmapThumb() {
  const RAG: Record<string, string> = {
    green: "var(--good)",
    amber: "var(--warn)",
    red: "var(--critical)",
  };
  const rowH = 13;
  const top = 66;

  return (
    <>
      <Head a="12" aLabel="Initiatives" b="1.6×" bLabel="Benefit : cost" />
      {/* Quarter gridlines. */}
      {[0, 1, 2, 3].map((q) => (
        <line key={q} x1={70 + q * 62} y1={60} x2={70 + q * 62} y2={166} stroke="var(--chart-grid)" />
      ))}
      {lanes.map((lane, li) => {
        const rows = initiatives.filter((i) => i.lane === lane.id);
        const laneTop = top + li * (rows.length * rowH + 6);
        return (
          <g key={lane.id}>
            <text x="16" y={laneTop + 9} fontSize="7" fill="var(--text-faint)" letterSpacing="0.08em" className="num">
              {lane.label.split(" ")[0].toUpperCase()}
            </text>
            {rows.map((init, ri) => {
              const x = 70 + (init.startQ - 1) * 62 + 2;
              const w = (init.endQ - init.startQ + 1) * 62 - 4;
              const y = laneTop + ri * rowH;
              return (
                <g key={init.id}>
                  <rect x={x} y={y} width={w} height="9" rx="2" fill="var(--accent-quiet)" stroke="var(--line)" />
                  <rect x={x} y={y} width="2.5" height="9" rx="1.25" fill={RAG[init.rag]} />
                </g>
              );
            })}
          </g>
        );
      })}
      {/* One dependency connector, to show that the real board draws them. */}
      <path
        d="M 190 84 h 6 V 123 H 128"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1.2"
      />
    </>
  );
}
