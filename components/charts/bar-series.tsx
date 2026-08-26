export interface BarGroup {
  readonly id: string;
  readonly label: string;
  readonly values: readonly number[];
  readonly color: string;
}

/**
 * Grouped or stacked bars, vertical or horizontal. One component rather than
 * four, because the axis math is the same and only the mapping flips.
 */
export function BarSeries({
  categories,
  series,
  mode = "grouped",
  orientation = "vertical",
  valueFormat,
  reference,
  height = 260,
  width = 720,
  mini = false,
}: {
  categories: readonly string[];
  series: readonly BarGroup[];
  mode?: "grouped" | "stacked";
  orientation?: "vertical" | "horizontal";
  valueFormat: (n: number) => string;
  /** Optional reference line, e.g. a budget or target level. */
  reference?: { value: number; label: string };
  height?: number;
  width?: number;
  mini?: boolean;
}) {
  const horizontal = orientation === "horizontal";
  const pad = mini
    ? { top: 4, right: 4, bottom: 4, left: 4 }
    : horizontal
      ? { top: 8, right: 56, bottom: 24, left: 150 }
      : { top: 16, right: 16, bottom: 28, left: 56 };

  const totals = categories.map((_, i) =>
    mode === "stacked"
      ? series.reduce((s, g) => s + (g.values[i] ?? 0), 0)
      : Math.max(...series.map((g) => g.values[i] ?? 0)),
  );
  const max = Math.max(...totals, reference?.value ?? 0) * 1.08 || 1;

  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // The band each category occupies, along the category axis.
  const bandSize = (horizontal ? plotH : plotW) / categories.length;
  const bandPad = bandSize * (mini ? 0.16 : 0.24);
  const inner = bandSize - bandPad;
  const barThickness = mode === "grouped" ? inner / series.length : inner;
  const scale = (v: number) => (v / max) * (horizontal ? plotW : plotH);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" role="img" aria-hidden={mini ? true : undefined} className="block">
      {!mini && !horizontal && (
        <line x1={pad.left} x2={width - pad.right} y1={pad.top + plotH} y2={pad.top + plotH} stroke="var(--chart-grid)" />
      )}

      {categories.map((cat, i) => {
        const bandStart = (horizontal ? pad.top : pad.left) + i * bandSize + bandPad / 2;
        let stackAcc = 0;

        return (
          <g key={cat}>
            {!mini && (
              <text
                x={horizontal ? pad.left - 10 : bandStart + inner / 2}
                y={horizontal ? bandStart + inner / 2 + 3.5 : height - 8}
                textAnchor={horizontal ? "end" : "middle"}
                fontSize="10"
                fill="var(--chart-axis)"
                className="num"
                aria-hidden="true"
              >
                {cat}
              </text>
            )}

            {series.map((g, si) => {
              const v = g.values[i] ?? 0;
              const len = scale(v);
              const offset = mode === "grouped" ? si * barThickness : 0;
              const along = bandStart + offset;

              let rect;
              if (horizontal) {
                const x = pad.left + (mode === "stacked" ? scale(stackAcc) : 0);
                rect = { x, y: along, width: Math.max(len, 1), height: barThickness - (mode === "grouped" ? 2 : 0) };
              } else {
                const y = pad.top + plotH - len - (mode === "stacked" ? scale(stackAcc) : 0);
                rect = { x: along, y, width: barThickness - (mode === "grouped" ? 2 : 0), height: Math.max(len, 1) };
              }
              stackAcc += v;

              return <rect key={g.id} {...rect} fill={g.color} rx={mini ? 1 : 2} />;
            })}

            {/* Horizontal bars carry their value at the end of the bar — a
                separate axis would cost more space than it returns. */}
            {!mini && horizontal && (
              <text
                x={pad.left + scale(mode === "stacked" ? stackAcc : Math.max(...series.map((g) => g.values[i] ?? 0))) + 8}
                y={bandStart + inner / 2 + 3.5}
                fontSize="10"
                fill="var(--text-muted)"
                className="num"
                aria-hidden="true"
              >
                {valueFormat(mode === "stacked" ? stackAcc : Math.max(...series.map((g) => g.values[i] ?? 0)))}
              </text>
            )}
          </g>
        );
      })}

      {!mini && reference && (
        <g>
          <line
            x1={horizontal ? pad.left + scale(reference.value) : pad.left}
            x2={horizontal ? pad.left + scale(reference.value) : width - pad.right}
            y1={horizontal ? pad.top : pad.top + plotH - scale(reference.value)}
            y2={horizontal ? pad.top + plotH : pad.top + plotH - scale(reference.value)}
            stroke="var(--text-faint)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={horizontal ? pad.left + scale(reference.value) + 4 : width - pad.right}
            y={horizontal ? pad.top + 10 : pad.top + plotH - scale(reference.value) - 6}
            textAnchor={horizontal ? "start" : "end"}
            fontSize="10"
            fill="var(--text-faint)"
            className="num"
            aria-hidden="true"
          >
            {reference.label}
          </text>
        </g>
      )}
    </svg>
  );
}
