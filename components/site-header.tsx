import Link from "next/link";
import { identity } from "@/content/profile";
import { ButtonLink } from "@/components/ui/primitives";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/dashboards", label: "Dashboards" },
  { href: "/#experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
] as const;

/**
 * The Download CV button stays visible at every breakpoint — it is the one
 * action the whole site exists to produce, so it never collapses into a menu.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-baseline gap-2 text-sm font-semibold text-text"
          aria-label={`${identity.name} — home`}
        >
          <span className="border-l-2 border-accent pl-2 leading-tight">{identity.name}</span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-sunken hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeToggle />
          <ButtonLink
            href="/resume.pdf"
            download={identity.resumeFileName}
            className="px-3 py-2 text-xs sm:px-4 sm:text-sm"
          >
            Download CV
          </ButtonLink>
        </div>
      </div>

      {/* Below md the links move to their own row rather than into a hamburger,
          so every destination stays one tap away. */}
      <nav
        aria-label="Main, compact"
        className="flex items-center gap-1 overflow-x-auto border-t border-line px-5 py-2 md:hidden"
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-2.5 py-1.5 text-[13px] text-text-muted transition-colors hover:bg-surface-sunken hover:text-text"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
