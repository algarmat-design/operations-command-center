import Link from "next/link";
import { identity, positioning } from "@/content/profile";

const YEAR = 2026;

export function SiteFooter() {
  const links = [
    { label: "Email", href: `mailto:${identity.email}`, text: identity.email, external: false },
    { label: "LinkedIn", href: identity.linkedin, text: identity.linkedinHandle, external: true },
    { label: "WhatsApp", href: `https://wa.me/${identity.whatsapp}`, text: identity.phone, external: true },
  ];

  return (
    <footer className="border-t border-line px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div className="flex max-w-[45ch] flex-col gap-2">
          <p className="text-sm font-semibold text-text">
            {identity.name} — {identity.title}
          </p>
          <p className="text-sm leading-relaxed text-text-muted">{identity.tagline}</p>
          <p className="num text-xs text-text-faint">
            {identity.location} · {identity.timezone} · {identity.availability}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="num text-[11px] font-medium uppercase tracking-[0.18em] text-text-faint">Contact</p>
          <ul className="flex flex-col gap-2 text-sm">
            {links.map((l) => (
              <li key={l.label} className="flex gap-2">
                <span className="w-20 shrink-0 text-text-faint">{l.label}</span>
                <a
                  href={l.href}
                  className="text-link underline-offset-4 hover:underline"
                  {...(l.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                >
                  {l.text}
                </a>
              </li>
            ))}
            <li className="flex gap-2">
              <span className="w-20 shrink-0 text-text-faint">CV</span>
              <a
                href="/resume.pdf"
                download={identity.resumeFileName}
                className="text-link underline-offset-4 hover:underline"
              >
                Download PDF
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <p className="num text-[11px] font-medium uppercase tracking-[0.18em] text-text-faint">Site</p>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              { href: "/capabilities", label: "Capabilities" },
              { href: "/dashboards", label: "Dashboards" },
              { href: "/resume", label: "Resume" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-text-muted hover:text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-line pt-6">
        <p className="num text-xs text-text-faint">
          © {YEAR} {identity.name}. {positioning.proofPoints[0]?.value} years in technology leadership.
          Dashboards on this site use synthetic data.
        </p>
      </div>
    </footer>
  );
}
