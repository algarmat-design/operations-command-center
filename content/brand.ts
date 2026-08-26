/**
 * Brand hexes duplicated for satori (the OG image renderer), which cannot read
 * CSS custom properties. Keep in sync with the raw palette block at the top of
 * app/globals.css — that file is the origin, this is the mirror.
 */
export const BRAND = {
  ink: "#101820",
  slate: "#2C3E50",
  teal: "#16A085",
  tealDeep: "#0E6655",
  sky: "#5DADE2",
  amber: "#F39C12",
  paper: "#F7F9FA",
  line: "#DCE3E5",
} as const;
