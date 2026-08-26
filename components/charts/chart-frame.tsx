import type { ReactNode } from "react";

export interface ChartTable {
  readonly columns: readonly string[];
  readonly rows: readonly (readonly (string | number)[])[];
}

/**
 * Every chart on this site is wrapped in this frame, which resolves the
 * accessibility contract once rather than per chart:
 *
 * - The unit is always rendered visibly. A number without its unit is a rumour.
 * - The SVG lives in an `overflow-x:auto` box with a `min-width`, so dense charts
 *   scroll inside their own container at 360px and the body never scrolls.
 * - That scroll container is `tabindex=0`, which is both the WCAG requirement for
 *   a scrollable region and the chart's keyboard focus state — one tab stop per
 *   chart instead of one per data point.
 * - A native <details><table> carries the exact values. The trade-off is explicit:
 *   no per-point keyboard exploration, but a sane tab order and real data that a
 *   screen reader can navigate. A hover tooltip would give neither.
 */
export function ChartFrame({
  id,
  title,
  unit,
  description,
  minWidth = 640,
  table,
  children,
}: {
  id: string;
  title: string;
  unit: string;
  description?: string;
  minWidth?: number;
  table: ChartTable;
  children: ReactNode;
}) {
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <figcaption className="flex flex-col gap-1">
        <h3 id={`${id}-title`} className="text-lg font-bold leading-snug text-text">
          {title}
        </h3>
        <p className="num text-[11px] uppercase tracking-[0.14em] text-text-faint">Unit: {unit}</p>
        {description && <p className="max-w-[65ch] text-sm leading-relaxed text-text-muted">{description}</p>}
      </figcaption>

      <div
        tabIndex={0}
        role="group"
        aria-labelledby={`${id}-title`}
        className="min-w-0 overflow-x-auto rounded-md"
      >
        <div style={{ minWidth }}>{children}</div>
      </div>

      <details className="group">
        <summary className="num w-fit cursor-pointer text-[11px] uppercase tracking-[0.14em] text-text-faint hover:text-text-muted">
          Show data table
        </summary>
        <div className="mt-3 min-w-0 overflow-x-auto">
          <table className="num w-full min-w-[32rem] border-collapse text-left text-xs">
            <caption className="sr-only">{`${title} — values in ${unit}`}</caption>
            <thead>
              <tr>
                {table.columns.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="border-b border-line py-2 pr-4 font-medium text-text-muted"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`border-b border-line py-1.5 pr-4 ${
                        j === 0 ? "text-text-muted" : "text-text"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
