import type { CapabilityIcon as IconName } from "@/content/types";

/**
 * Line-drawn glyphs for the capability set. Deliberately geometric and uniform
 * in weight — these are section markers, not decoration, and never emoji.
 */
const PATHS: Record<IconName, React.ReactNode> = {
  strategy: (
    <>
      <path d="M3 17.5V6.5M3 17.5h14" />
      <path d="M6.5 14.5v-3M10 14.5V8M13.5 14.5v-5" />
    </>
  ),
  team: (
    <>
      <circle cx="7.5" cy="6.5" r="2.5" />
      <path d="M3 16.5c0-2.5 2-4.2 4.5-4.2s4.5 1.7 4.5 4.2" />
      <path d="M13 5.2a2.5 2.5 0 0 1 0 4.6M14.5 12.8c1.6.6 2.5 2 2.5 3.7" />
    </>
  ),
  ai: (
    <>
      <rect x="6" y="6" width="8" height="8" rx="1.5" />
      <path d="M8.5 3.5v2.5M11.5 3.5v2.5M8.5 14v2.5M11.5 14v2.5M3.5 8.5H6M3.5 11.5H6M14 8.5h2.5M14 11.5h2.5" />
    </>
  ),
  devops: (
    <>
      <path d="M4 10a6 6 0 0 1 10.2-4.2" />
      <path d="M16 10a6 6 0 0 1-10.2 4.2" />
      <path d="M14.5 3v3h-3M5.5 17v-3h3" />
    </>
  ),
  cloud: (
    <>
      <path d="M6 15.5a3.5 3.5 0 0 1-.3-7A4.5 4.5 0 0 1 14 7.3a3.1 3.1 0 0 1 .6 6.1" />
      <path d="M6 15.5h8.3" />
    </>
  ),
  compliance: (
    <>
      <path d="M10 3l6 2.4v4.8c0 3.4-2.4 6.2-6 7.3-3.6-1.1-6-3.9-6-7.3V5.4L10 3Z" />
      <path d="M7.5 10.2l1.8 1.8 3.4-3.6" />
    </>
  ),
  payments: (
    <>
      <rect x="2.5" y="5" width="15" height="10" rx="1.75" />
      <path d="M2.5 8.5h15M5.5 12h3" />
    </>
  ),
  platform: (
    <>
      <path d="M10 2.75 17 6.5 10 10.25 3 6.5l7-3.75Z" />
      <path d="M3 10.25 10 14l7-3.75M3 13.75 10 17.5l7-3.75" />
    </>
  ),
};

export function CapabilityIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
