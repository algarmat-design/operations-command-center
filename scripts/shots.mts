/**
 * Ad-hoc visual check. Not part of the build or the npm scripts — captures the
 * above-the-fold framing and both color schemes so they can be eyeballed.
 *
 *   npx next start -p 4322 &   then:   node scripts/shots.mts
 */
import { chromium } from "playwright";

const ORIGIN = process.env.CHECK_ORIGIN ?? "http://127.0.0.1:4322";
const OUT = process.env.SHOT_DIR ?? "/tmp/shots";

const SHOTS: { route: string; width: number; height: number; scheme: "light" | "dark"; full?: boolean }[] = [
  { route: "/", width: 1280, height: 800, scheme: "light" },
  { route: "/", width: 1280, height: 800, scheme: "dark" },
  { route: "/", width: 360, height: 780, scheme: "light" },
  { route: "/capabilities", width: 1280, height: 800, scheme: "light" },
  { route: "/dashboards", width: 1280, height: 800, scheme: "dark" },
  { route: "/dashboards/executive", width: 1280, height: 900, scheme: "light" },
  { route: "/dashboards/it-operations", width: 1280, height: 900, scheme: "dark" },
  { route: "/dashboards/devops", width: 1280, height: 900, scheme: "light" },
  { route: "/dashboards/roadmap", width: 1280, height: 1100, scheme: "light" },
  { route: "/resume", width: 1280, height: 900, scheme: "light" },
  { route: "/resume/print", width: 900, height: 1200, scheme: "light" },
];

const browser = await chromium.launch();
for (const s of SHOTS) {
  const ctx = await browser.newContext({
    viewport: { width: s.width, height: s.height },
    colorScheme: s.scheme,
  });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}${s.route}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const name = `${s.route.replace(/\//g, "_") || "_home"}-${s.width}-${s.scheme}.png`;
  await page.screenshot({ path: `${OUT}/${name}`, fullPage: s.full ?? false });
  console.log(name);
  await ctx.close();
}
await browser.close();
