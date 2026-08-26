/**
 * Asserts that no route scrolls horizontally at any of three widths, and that
 * Tab reaches the Download CV button early from a cold page load.
 *
 *   npm run build && npx next start -p 4322   # in one terminal
 *   npm run check:layout                       # in another
 *
 * Reuses the Playwright dependency the PDF pipeline already needs. Horizontal
 * overflow is the criterion most likely to regress silently — the chart
 * containers carry min-width, so a container that loses its overflow-x:auto
 * would push the body wide without anyone noticing in a screenshot.
 */
import { chromium } from "playwright";

const ORIGIN = process.env.CHECK_ORIGIN ?? "http://127.0.0.1:4322";
const WIDTHS = [360, 768, 1280];
const ROUTES = [
  "/",
  "/capabilities",
  "/dashboards",
  "/dashboards/executive",
  "/dashboards/it-operations",
  "/dashboards/devops",
  "/dashboards/roadmap",
  "/resume",
  "/resume/print",
];

let failures = 0;
const browser = await chromium.launch();

try {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();

    for (const route of ROUTES) {
      const res = await page.goto(`${ORIGIN}${route}`, { waitUntil: "networkidle" });
      if (!res?.ok()) {
        failures++;
        console.error(`  FAIL  ${route} @${width} — HTTP ${res?.status()}`);
        continue;
      }

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      // One pixel of slack for sub-pixel rounding.
      if (scrollWidth > clientWidth + 1) {
        failures++;
        console.error(`  FAIL  ${route} @${width} — scrollWidth ${scrollWidth} > clientWidth ${clientWidth}`);
      } else {
        console.log(`  ok    ${route} @${width}`);
      }
    }

    await context.close();
  }

  // Keyboard reachability of the primary CTA, at desktop width.
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle" });

  let reachedAt = -1;
  for (let i = 1; i <= 10; i++) {
    await page.keyboard.press("Tab");
    const label = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? "");
    if (label.includes("Download CV")) {
      reachedAt = i;
      break;
    }
  }
  if (reachedAt === -1) {
    failures++;
    console.error("  FAIL  Download CV not reachable within 10 Tab presses from page load");
  } else {
    console.log(`  ok    Download CV reachable at Tab #${reachedAt}`);
  }
  await context.close();
} finally {
  await browser.close();
}

console.log(failures === 0 ? "\nLayout checks passed.\n" : `\n${failures} layout check(s) failed.\n`);
process.exit(failures === 0 ? 0 : 1);
