"use client";

import { useEffect, useState } from "react";

type Mode = "system" | "light" | "dark";

const NEXT: Record<Mode, Mode> = { system: "light", light: "dark", dark: "system" };
const LABEL: Record<Mode, string> = { system: "System", light: "Light", dark: "Dark" };

/**
 * The only Client Component in this codebase.
 *
 * Three states rather than two: with a plain light/dark switch, anyone who ever
 * clicks it can never get back to following their OS preference.
 *
 * Colors are never touched here. `:root { color-scheme: light dark }` already
 * resolves the OS preference in pure CSS; this only writes an explicit override
 * onto <html>, which flips `color-scheme` via the [data-theme] rules.
 */
export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("system");

  // Read the attribute the no-flash script may already have set. Done in an
  // effect so the server-rendered markup and the first client render agree.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") setMode(attr);
  }, []);

  function apply(next: Mode) {
    setMode(next);
    try {
      if (next === "system") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.removeItem("theme");
      } else {
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      }
    } catch {
      // Private mode / storage disabled — the attribute still applies for this page.
    }
  }

  return (
    <button
      type="button"
      onClick={() => apply(NEXT[mode])}
      aria-label={`Color theme: ${LABEL[mode]}. Activate to switch to ${LABEL[NEXT[mode]]}.`}
      title={`Theme: ${LABEL[mode]}`}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-text-muted transition-colors hover:bg-surface-sunken hover:text-text"
    >
      <ThemeIcon mode={mode} />
      <span aria-live="polite" className="sr-only">
        {LABEL[mode]} theme
      </span>
    </button>
  );
}

/** Fixed 16×16 box in every branch, so cycling causes no layout shift. */
function ThemeIcon({ mode }: { mode: Mode }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (mode === "light") {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="3.1" />
        <path d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.95 3.05l-1.13 1.13M4.18 11.82l-1.13 1.13M12.95 12.95l-1.13-1.13M4.18 4.18L3.05 3.05" />
      </svg>
    );
  }
  if (mode === "dark") {
    return (
      <svg {...common}>
        <path d="M13.5 9.6A5.9 5.9 0 0 1 6.4 2.5a5.9 5.9 0 1 0 7.1 7.1Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="1.75" y="2.75" width="12.5" height="8.5" rx="1.25" />
      <path d="M5.75 14.25h4.5M8 11.25v3" />
    </svg>
  );
}
