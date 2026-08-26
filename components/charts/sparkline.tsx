/**
 * Twelve-month shape indicator. Ported from the previous site's sparkline; the
 * only change is that `color` is now required, so a status color can never be
 * inherited by accident.
 */
export function Sparkline({
  values,
  color,
  label,
  width = 120,
  height = 28,
}: {
  values: readonly number[];
  color: string;
  /** Screen-reader description; the exact values live in the card's context line. */
  label: string;
  width?: number;
  height?: number;
}) {
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = width / (values.length - 1);

  const points = values.map((v, i) => `${i * stepX},${height - ((v - min) / span) * height}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-7 w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <polygon points={`0,${height} ${points} ${width},${height}`} fill={color} opacity="0.12" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
