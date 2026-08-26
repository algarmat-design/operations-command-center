import type { Tone } from "@/content/dashboards/types";

const TONE_VAR: Record<Tone, string> = {
  good: "var(--good)",
  warn: "var(--warn)",
  critical: "var(--critical)",
  neutral: "var(--text-muted)",
};

/** 240° arc gauge. Tone comes from the data module — never computed here. */
export function Gauge({
  value,
  min = 0,
  max = 1,
  target,
  tone,
  valueFormat,
  label,
  unit,
  size = 168,
  mini = false,
}: {
  value: number;
  min?: number;
  max?: number;
  target?: number;
  tone: Tone;
  valueFormat: (n: number) => string;
  label: string;
  unit: string;
  size?: number;
  mini?: boolean;
}) {
  const SWEEP = 240;
  const START = 150; // degrees, measured clockwise from the positive x axis
  const r = size / 2 - (mini ? 6 : 12);
  const cx = size / 2;
  const cy = size / 2 + (mini ? 4 : 8);
  const clamp = (v: number) => Math.min(Math.max((v - min) / (max - min), 0), 1);

  const pointOn = (fraction: number) => {
    const deg = START + fraction * SWEEP;
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
  };

  const arcPath = (from: number, to: number) => {
    const [x1, y1] = pointOn(from);
    const [x2, y2] = pointOn(to);
    const large = (to - from) * SWEEP > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  const frac = clamp(value);
  const stroke = mini ? 8 : 11;

  /** A radial tick crossing the track at the target value. */
  function TargetTick() {
    const rad = ((START + clamp(target!) * SWEEP) * Math.PI) / 180;
    const inner = r - stroke / 2 - 3;
    const outer = r + stroke / 2 + 3;
    return (
      <line
        x1={cx + inner * Math.cos(rad)}
        y1={cy + inner * Math.sin(rad)}
        x2={cx + outer * Math.cos(rad)}
        y2={cy + outer * Math.sin(rad)}
        stroke="var(--text)"
        strokeWidth="2"
      />
    );
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-hidden={mini ? true : undefined}
      aria-label={mini ? undefined : `${label}: ${valueFormat(value)} ${unit}`}
      className="block"
    >
      <path d={arcPath(0, 1)} fill="none" stroke="var(--chart-grid)" strokeWidth={stroke} strokeLinecap="round" />
      {frac > 0 && (
        <path d={arcPath(0, frac)} fill="none" stroke={TONE_VAR[tone]} strokeWidth={stroke} strokeLinecap="round" />
      )}

      {target !== undefined && !mini && <TargetTick />}

      {!mini && (
        <>
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            fontSize={size / 6}
            fontWeight="600"
            fill="var(--text)"
            className="num"
            aria-hidden="true"
          >
            {valueFormat(value)}
          </text>
          <text x={cx} y={cy + 18} textAnchor="middle" fontSize="10" fill="var(--text-faint)" className="num" aria-hidden="true">
            {target !== undefined ? `target ${valueFormat(target)}` : unit}
          </text>
        </>
      )}
    </svg>
  );
}
