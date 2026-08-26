/**
 * Regenerates public/resume.pdf from /resume/print.
 *
 *   npm run resume:pdf     (runs `next build` first, then this)
 *
 * Deliberately a leaf script: nothing in the build references it. Do NOT add a
 * prebuild/postbuild hook — that is the one change that would turn this into a
 * Vercel build step, and Vercel has no browser.
 *
 * `.mts` rather than `.ts` because package.json has no "type": "module", so a
 * `.ts` file would be treated as CommonJS by Node's type stripping and the
 * imports below would fail. `.mts` is unconditionally ESM.
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "playwright";

const PORT = 4321;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const PAGE_URL = `${ORIGIN}/resume/print`;
const OUT = "public/resume.pdf";

// detached so we can signal the whole process group — `next start` spawns workers.
const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  stdio: "ignore",
  detached: true,
});

let stopped = false;
function stopServer() {
  if (stopped || server.pid === undefined) return;
  stopped = true;
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    // Already gone.
  }
}
process.on("SIGINT", () => {
  stopServer();
  process.exit(130);
});
process.on("SIGTERM", () => {
  stopServer();
  process.exit(143);
});

/** Poll the actual page, not the root — it proves the route compiled. */
async function waitForServer(attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(PAGE_URL, { redirect: "manual" });
      if (res.ok) return;
    } catch {
      // Not listening yet.
    }
    await sleep(400);
  }
  throw new Error(`${PAGE_URL} did not respond within ${(attempts * 400) / 1000}s`);
}

let browser;
try {
  console.log(`Waiting for ${PAGE_URL} …`);
  await waitForServer();

  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(PAGE_URL, { waitUntil: "networkidle" });

  // Without this the PDF inherits the machine's OS dark preference, because the
  // tokens resolve through light-dark(). Forcing light here and in the print
  // stylesheet is belt and braces.
  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: OUT,
    format: "A4",
    printBackground: true,
    margin: { top: "14mm", right: "14mm", bottom: "16mm", left: "14mm" },
    preferCSSPageSize: false,
  });

  console.log(`Wrote ${OUT}`);
} finally {
  await browser?.close();
  stopServer();
}
