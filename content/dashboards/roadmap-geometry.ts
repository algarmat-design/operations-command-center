import type { Initiative, LaneId } from "./types.ts";

/**
 * Deterministic coordinate math for the roadmap gantt.
 *
 * Every position is arithmetic on lane index and quarter span, so the whole
 * chart renders as one SVG from a server component — no client-side measurement,
 * no getBBox, identical output on every render.
 */

export const G = {
  LANE_LABEL_W: 168,
  QUARTER_W: 200,
  HEADER_H: 44,
  ROW_H: 52,
  /** Bars carry two lines: the name, then owner and investment underneath. */
  BAR_H: 34,
  LANE_PAD_TOP: 12,
  LANE_PAD_BOT: 16,
  /** Horizontal padding inside a quarter cell. */
  BAR_INSET: 8,
  /** Left padding for text inside a bar, clearing the RAG cap. */
  TEXT_INSET: 12,
  /** Connector stub length out of a bar edge. */
  ELBOW: 14,
  /** Offset per overlapping connector so parallel routes stay distinguishable. */
  DEP_STAGGER: 4,
  QUARTERS: 4,
  NAME_FONT_PX: 12,
  META_FONT_PX: 9.5,
} as const;

/**
 * Deterministic text fitting, so the layout needs no measurement.
 *
 * Public Sans at semibold averages ~0.55em per character; JetBrains Mono has a
 * fixed 0.6em advance. Both estimates run slightly wide on purpose — a bar that
 * reserves a little too much space looks fine, one that reserves too little
 * overlaps, which is the failure this replaces.
 */
export const nameWidth = (text: string) => text.length * G.NAME_FONT_PX * 0.56;
export const metaWidth = (text: string) => text.length * G.META_FONT_PX * 0.6;

/** Usable text width inside a bar spanning `span` quarters. */
export const barTextWidth = (span: number) =>
  span * G.QUARTER_W - 2 * G.BAR_INSET - G.TEXT_INSET - 8;

/** Whether a bar label fits its own span. Asserted by scripts/check-data.mts. */
export const labelFits = (text: string, span: number) =>
  nameWidth(text) <= barTextWidth(span);

export interface PlacedInitiative extends Initiative {
  readonly laneIndex: number;
  readonly rowIndex: number;
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly midY: number;
}

export interface GanttLayout {
  readonly width: number;
  readonly height: number;
  readonly placed: readonly PlacedInitiative[];
  readonly laneBands: readonly { id: LaneId; label: string; y: number; height: number }[];
  readonly connectors: readonly { from: string; to: string; d: string }[];
}

const xOfQuarter = (q: number) => G.LANE_LABEL_W + (q - 1) * G.QUARTER_W;

export function layoutGantt(
  lanes: readonly { id: LaneId; label: string }[],
  initiatives: readonly Initiative[],
): GanttLayout {
  // One row per initiative — no greedy packing. Names have to stay readable.
  const perLane = lanes.map((l) =>
    initiatives.filter((i) => i.lane === l.id).slice().sort((a, b) => a.startQ - b.startQ || a.endQ - b.endQ),
  );
  const rowsPerLane = perLane.map((rows) => rows.length);

  const laneOffset = (laneIndex: number) =>
    G.HEADER_H +
    rowsPerLane
      .slice(0, laneIndex)
      .reduce((acc, n) => acc + G.LANE_PAD_TOP + n * G.ROW_H + G.LANE_PAD_BOT, 0);

  const placed: PlacedInitiative[] = [];
  const laneBands: { id: LaneId; label: string; y: number; height: number }[] = lanes.map((l, laneIndex) => {
    const y = laneOffset(laneIndex);
    const height = G.LANE_PAD_TOP + rowsPerLane[laneIndex] * G.ROW_H + G.LANE_PAD_BOT;

    perLane[laneIndex].forEach((init, rowIndex) => {
      const rowY = y + G.LANE_PAD_TOP + rowIndex * G.ROW_H;
      placed.push({
        ...init,
        laneIndex,
        rowIndex,
        x: xOfQuarter(init.startQ) + G.BAR_INSET,
        y: rowY + (G.ROW_H - G.BAR_H) / 2,
        w: (init.endQ - init.startQ + 1) * G.QUARTER_W - 2 * G.BAR_INSET,
        midY: rowY + G.ROW_H / 2,
      });
    });

    return { id: l.id, label: l.label, y, height };
  });

  const width = G.LANE_LABEL_W + G.QUARTERS * G.QUARTER_W;
  const height = laneOffset(lanes.length);

  const byId = new Map(placed.map((p) => [p.id, p]));
  const seenFrom = new Map<string, number>();
  const connectors: { from: string; to: string; d: string }[] = [];

  for (const target of placed) {
    for (const depId of target.deps) {
      const source = byId.get(depId);
      if (!source) continue; // check-data.mts asserts this never happens

      const k = seenFrom.get(depId) ?? 0;
      seenFrom.set(depId, k + 1);

      const x1 = source.x + source.w;
      const y1 = source.midY;
      const x2 = target.x;
      const y2 = target.midY;

      let d: string;
      if (x2 >= x1 + 2 * G.ELBOW) {
        // Room to route directly: out, across, in.
        d = `M ${x1} ${y1} h ${G.ELBOW} V ${y2} H ${x2 - 3}`;
      } else {
        // Tight or backward link — route through the gutter between rows. BAR_H
        // sits inside ROW_H, so the row midpoint band is empty by construction.
        const gutterY = Math.max(y1, y2) - G.ROW_H / 2 + k * G.DEP_STAGGER;
        d = `M ${x1} ${y1} h ${G.ELBOW} V ${gutterY} H ${x2 - G.ELBOW} V ${y2} h ${G.ELBOW - 3}`;
      }

      connectors.push({ from: depId, to: target.id, d });
    }
  }

  return { width, height, placed, laneBands, connectors };
}

export const quarterX = xOfQuarter;
