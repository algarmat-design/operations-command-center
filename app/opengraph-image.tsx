import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { identity, positioning } from "@/content/profile";
import { BRAND } from "@/content/brand";

export const alt = `${identity.name} — ${identity.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * This is what a recruiter sees when someone drops the link into Slack or
 * LinkedIn, so it carries the same four figures as the proof strip.
 *
 * Constraints that are easy to trip over: satori supports flexbox only (no
 * grid), the whole response including fonts must stay under 500KB, and fonts
 * must be TTF/OTF — woff2 is rejected, which is why the site fonts from
 * next/font cannot be reused here and assets/Chivo-Bold.ttf is shipped instead.
 */
export default async function OpengraphImage() {
  const chivo = await readFile(join(process.cwd(), "assets", "Chivo-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND.paper,
          padding: "64px 72px",
          fontFamily: "Chivo",
          color: BRAND.ink,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", width: 6, height: 40, background: BRAND.teal }} />
            <div
              style={{
                display: "flex",
                marginLeft: 18,
                fontSize: 26,
                letterSpacing: 4,
                color: BRAND.tealDeep,
              }}
            >
              {identity.title.toUpperCase()}
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 104, lineHeight: 1.05, marginTop: 26 }}>
            {identity.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: BRAND.slate,
              marginTop: 22,
              maxWidth: 940,
            }}
          >
            {positioning.subhead}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: "100%", height: 1, background: BRAND.line }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
            {positioning.proofPoints.map((p) => (
              <div key={p.label} style={{ display: "flex", flexDirection: "column", maxWidth: 250 }}>
                <div style={{ display: "flex", fontSize: 40, color: BRAND.ink }}>{p.value}</div>
                <div style={{ display: "flex", fontSize: 19, color: BRAND.slate, marginTop: 8 }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Chivo", data: chivo, style: "normal", weight: 700 }],
    },
  );
}
