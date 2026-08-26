import { G, layoutGantt, quarterX } from "@/content/dashboards/roadmap-geometry";
import type { Initiative, Lane, Rag } from "@/content/dashboards/types";

const RAG_VAR: Record<Rag, string> = {
  green: "var(--good)",
  amber: "var(--warn)",
  red: "var(--critical)",
};

const RAG_WORD: Record<Rag, string> = { green: "on track", amber: "at risk", red: "off track" };

/**
 * The whole roadmap is one SVG. Coordinates come from lane index and quarter
 * span, so this renders on the server with no measurement and no client JS, and
 * produces identical output on every render.
 *
 * Connectors are decorative (`aria-hidden`) — every dependency is also stated in
 * the per-bar <title> and in the data table the ChartFrame renders.
 */
export function Gantt({
  lanes,
  initiatives,
  quarters,
}: {
  lanes: readonly Lane[];
  initiatives: readonly Initiative[];
  quarters: readonly string[];
}) {
  const { width, height, placed, laneBands, connectors } = layoutGantt(lanes, initiatives);
  const byId = new Map(initiatives.map((i) => [i.id, i.name]));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" role="img" className="block">
      <defs>
        <marker id="rm-dep-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L6,3.5 L0,7 Z" fill="var(--line-strong)" />
        </marker>
      </defs>

      {/* 1 — lane bands */}
      {laneBands.map((b, i) => (
        <rect
          key={b.id}
          x="0"
          y={b.y}
          width={width}
          height={b.height}
          fill={i % 2 === 0 ? "var(--surface-sunken)" : "transparent"}
        />
      ))}

      {/* 2 — quarter gridlines and header */}
      {quarters.map((q, i) => (
        <g key={q}>
          <line
            x1={quarterX(i + 1)}
            x2={quarterX(i + 1)}
            y1={0}
            y2={height}
            stroke="var(--chart-grid)"
            strokeWidth="1"
          />
          <text
            x={quarterX(i + 1) + G.QUARTER_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-muted)"
            className="num"
            aria-hidden="true"
          >
            {q}
          </text>
        </g>
      ))}
      <line x1="0" x2={width} y1={G.HEADER_H} y2={G.HEADER_H} stroke="var(--line)" strokeWidth="1" />

      {/* 3 — lane labels */}
      {laneBands.map((b) => (
        <text
          key={`${b.id}-label`}
          x="12"
          y={b.y + G.LANE_PAD_TOP + 18}
          fontSize="11"
          fontWeight="700"
          fill="var(--text-muted)"
          letterSpacing="0.06em"
          aria-hidden="true"
        >
          {b.label.toUpperCase()}
        </text>
      ))}

      {/* 4 — dependency connectors, drawn UNDER the bars. A line that slips
          behind a bar and re-emerges is the conventional gantt reading, and it
          avoids fighting the bar labels for the same pixels. The arrowhead
          stops 3px short of its target, so it always stays visible. */}
      <g aria-hidden="true">
        {connectors.map((c) => (
          <path
            key={`${c.from}-${c.to}`}
            d={c.d}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.5"
            strokeLinejoin="miter"
            markerEnd="url(#rm-dep-arrow)"
          />
        ))}
      </g>

      {/* 5+6 — initiative bars and their text */}
      {placed.map((p) => (
        <g key={p.id}>
          <title>
            {`${p.name} — ${lanes.find((l) => l.id === p.lane)?.label}, Q${p.startQ}–Q${p.endQ}, ${
              RAG_WORD[p.rag]
            }, owner ${p.owner}, $${p.investment}K invested for $${p.benefit}K expected benefit.${
              p.deps.length ? ` Depends on: ${p.deps.map((d) => byId.get(d)).join(", ")}.` : ""
            }`}
          </title>
          <rect
            x={p.x}
            y={p.y}
            width={p.w}
            height={G.BAR_H}
            rx="4"
            fill="var(--accent-quiet)"
            stroke="var(--line)"
            strokeWidth="1"
          />
          {/* RAG status reads as a cap on the leading edge, not as the bar fill —
              so status never competes with the brand accent for the same pixels. */}
          <rect x={p.x} y={p.y} width="4" height={G.BAR_H} rx="2" fill={RAG_VAR[p.rag]} />

          {/* Two lines rather than one row shared with the meta: on a
              single-quarter bar there is not enough width for both, and the
              collision is invisible until real data lands in it. */}
          <text
            x={p.x + G.TEXT_INSET}
            y={p.y + 15}
            fontSize={G.NAME_FONT_PX}
            fontWeight="600"
            fill="var(--text)"
            aria-hidden="true"
          >
            {p.shortName ?? p.name}
          </text>
          <text
            x={p.x + G.TEXT_INSET}
            y={p.y + 27}
            fontSize={G.META_FONT_PX}
            fill="var(--text-muted)"
            className="num"
            aria-hidden="true"
          >
            {`${p.owner} · $${p.investment}K · ${p.startQ === p.endQ ? `Q${p.startQ}` : `Q${p.startQ}–Q${p.endQ}`}`}
          </text>
        </g>
      ))}

    </svg>
  );
}
