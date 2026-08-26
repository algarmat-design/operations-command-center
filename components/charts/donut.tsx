export interface DonutSegment {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly color: string;
}

export function Donut({
  segments,
  centerValue,
  centerLabel,
  size = 180,
  thickness = 26,
  mini = false,
}: {
  segments: readonly DonutSegment[];
  centerValue: string;
  centerLabel: string;
  size?: number;
  thickness?: number;
  mini?: boolean;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const r = size / 2 - thickness / 2 - 2;
  const c = size / 2;
  let angle = -Math.PI / 2; // start at 12 o'clock

  const arcs = segments.map((seg) => {
    const sweep = (seg.value / total) * Math.PI * 2;
    const x1 = c + r * Math.cos(angle);
    const y1 = c + r * Math.sin(angle);
    angle += sweep;
    const x2 = c + r * Math.cos(angle);
    const y2 = c + r * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    // A full-circle single segment cannot be drawn with one arc command.
    const d =
      sweep >= Math.PI * 2 - 1e-6
        ? `M ${c} ${c - r} A ${r} ${r} 0 1 1 ${c - 0.01} ${c - r}`
        : `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
    return { ...seg, d };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-hidden={mini ? true : undefined}
      className="block"
    >
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--chart-grid)" strokeWidth={thickness} />
      {arcs.map((a) => (
        <path key={a.id} d={a.d} fill="none" stroke={a.color} strokeWidth={thickness} strokeLinecap="butt" />
      ))}
      {!mini && (
        <>
          <text
            x={c}
            y={c - 1}
            textAnchor="middle"
            fontSize={size / 7}
            fontWeight="600"
            fill="var(--text)"
            className="num"
            aria-hidden="true"
          >
            {centerValue}
          </text>
          <text x={c} y={c + 16} textAnchor="middle" fontSize="10" fill="var(--text-faint)" className="num" aria-hidden="true">
            {centerLabel}
          </text>
        </>
      )}
    </svg>
  );
}
