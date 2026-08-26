export interface Series {
  readonly id: string;
  readonly label: string;
  readonly values: readonly number[];
  /** Required — primitives never pick a color, so status can't leak into brand. */
  readonly color: string;
  readonly kind?: "line" | "area" | "dashed";
}

const PAD = { top: 16, right: 16, bottom: 28, left: 52 };

/** Rounds a range outward to a readable tick interval. */
function niceScale(min: number, max: number, ticks: number) {
  if (min === max) {
    const pad = Math.abs(min) * 0.1 || 1;
    min -= pad;
    max += pad;
  }
  const raw = (max - min) / ticks;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  return { lo: Math.floor(min / step) * step, hi: Math.ceil(max / step) * step, step };
}

export function TimeSeries({
  labels,
  series,
  yFormat,
  yTicks = 4,
  yMin,
  yMax,
  height = 260,
  width = 720,
  mini = false,
}: {
  labels: readonly string[];
  series: readonly Series[];
  yFormat: (n: number) => string;
  yTicks?: number;
  yMin?: number;
  yMax?: number;
  height?: number;
  width?: number;
  /** Miniature mode for the home-page dashboard previews: shape only, no chrome. */
  mini?: boolean;
}) {
  const pad = mini ? { top: 4, right: 4, bottom: 4, left: 4 } : PAD;
  const all = series.flatMap((s) => s.values);
  const { lo, hi, step } = niceScale(yMin ?? Math.min(...all), yMax ?? Math.max(...all), yTicks);

  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const x = (i: number) => pad.left + (labels.length === 1 ? plotW / 2 : (i / (labels.length - 1)) * plotW);
  const y = (v: number) => pad.top + plotH - ((v - lo) / (hi - lo)) * plotH;

  const gridValues: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) gridValues.push(v);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="auto"
      role="img"
      aria-hidden={mini ? true : undefined}
      className="block"
    >
      {!mini &&
        gridValues.map((v) => (
          <g key={v}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--chart-grid)"
              strokeWidth="1"
            />
            <text
              x={pad.left - 8}
              y={y(v) + 3.5}
              textAnchor="end"
              fontSize="10"
              fill="var(--chart-axis)"
              className="num"
              aria-hidden="true"
            >
              {yFormat(v)}
            </text>
          </g>
        ))}

      {!mini &&
        labels.map((l, i) =>
          // Thin the x labels so they never collide at narrow widths.
          i % Math.ceil(labels.length / 12) === 0 ? (
            <text
              key={l + i}
              x={x(i)}
              y={height - 8}
              textAnchor="middle"
              fontSize="10"
              fill="var(--chart-axis)"
              className="num"
              aria-hidden="true"
            >
              {l}
            </text>
          ) : null,
        )}

      {series.map((s) => {
        const points = s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
        return (
          <g key={s.id}>
            {s.kind === "area" && (
              <polygon
                points={`${pad.left},${pad.top + plotH} ${points} ${pad.left + plotW},${pad.top + plotH}`}
                fill={s.color}
                opacity="0.1"
              />
            )}
            <polyline
              points={points}
              fill="none"
              stroke={s.color}
              strokeWidth={mini ? 2 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={s.kind === "dashed" ? "5 4" : undefined}
              vectorEffect="non-scaling-stroke"
            />
            {!mini && (
              <circle cx={x(s.values.length - 1)} cy={y(s.values[s.values.length - 1])} r="3.5" fill={s.color} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Legend rendered as HTML, not SVG text, so it wraps and inherits type tokens. */
export function ChartLegend({ series }: { series: readonly Series[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
      {series.map((s) => (
        <li key={s.id} className="num flex items-center gap-2 text-[11px] text-text-muted">
          <span
            aria-hidden="true"
            className="h-0.5 w-4 rounded-full"
            style={{ backgroundColor: s.color }}
          />
          {s.label}
        </li>
      ))}
    </ul>
  );
}
