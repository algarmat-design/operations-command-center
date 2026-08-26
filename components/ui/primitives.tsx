import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Layout and surface primitives. Every component in this codebase composes
 * these instead of repeating class strings, and every color here is a semantic
 * token — never a raw Tailwind palette class, never an arbitrary var() value.
 */

type Tone = "neutral" | "accent" | "good" | "warn" | "critical";

const TONE_CHIP: Record<Tone, string> = {
  neutral: "border-line bg-surface-sunken text-text-muted",
  accent: "border-accent/30 bg-accent-quiet text-accent",
  good: "border-good/30 bg-good-quiet text-good",
  warn: "border-warn/30 bg-warn-quiet text-warn",
  critical: "border-critical/30 bg-critical-quiet text-critical",
};

/** Vertical rhythm for a page section, with an optional eyebrow + heading pair. */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  bleed = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: ReactNode;
  /** Drop the top border — used for the first section under the hero. */
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${bleed ? "" : "border-t border-line"} scroll-mt-24 px-5 py-14 sm:px-8 md:py-20`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        {(eyebrow || title || lede) && (
          <header className="flex flex-col gap-3">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 className="max-w-[24ch] text-2xl md:text-3xl">{title}</h2>}
            {lede && <p className="max-w-[65ch] text-base leading-relaxed text-text-muted">{lede}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="num text-[11px] font-medium uppercase tracking-[0.18em] text-text-faint">{children}</p>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={`rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-6 ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`num inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${TONE_CHIP[tone]}`}
    >
      {children}
    </span>
  );
}

/** A large tabular figure with its label. No card, no shadow — the number is the object. */
export function Stat({
  value,
  label,
  size = "lg",
}: {
  value: string;
  label: string;
  size?: "md" | "lg";
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={`num font-semibold leading-none text-text ${
          size === "lg" ? "text-[clamp(1.75rem,4vw,2.75rem)]" : "text-2xl"
        }`}
      >
        {value}
      </span>
      <span className="max-w-[22ch] text-sm leading-snug text-text-muted">{label}</span>
    </div>
  );
}

type ButtonVariant = "solid" | "outline" | "ghost";

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  solid: "bg-accent text-accent-contrast hover:opacity-90",
  outline: "border border-line-strong text-text hover:bg-surface-sunken",
  ghost: "text-text-muted hover:bg-surface-sunken hover:text-text",
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  download,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  download?: string;
  external?: boolean;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${BUTTON_VARIANT[variant]} ${className}`;

  // Download and off-site targets bypass the router deliberately.
  if (download || external) {
    return (
      <a
        href={href}
        className={cls}
        download={download}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Constrains running text to a comfortable measure. */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[65ch] leading-relaxed text-text-muted ${className}`}>{children}</div>;
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
    >
      Skip to content
    </a>
  );
}
