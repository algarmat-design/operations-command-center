import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-white/5 bg-[var(--surface)]/50 lg:flex lg:flex-col">
      <div className="px-5 py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l4-4 4 4 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="21" cy="7" r="1.5" fill="currentColor" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Command Center</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">ops intelligence</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 text-sm">
        <ul className="space-y-1">
          <NavItem href="/" label="Dashboard" icon="grid" />
          <NavItem href="/workflow" label="Workflow" icon="flow" />
          <NavItem href="/resume" label="Resume" icon="user" />
        </ul>
      </nav>

      <div className="px-5 py-5 text-[10px] text-slate-500">
        <p>Built by Álvaro García</p>
        <p className="text-slate-600">Powered by Claude · Next.js 16</p>
      </div>
    </aside>
  );
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: "grid" | "flow" | "user" }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
      >
        <Icon name={icon} />
        <span>{label}</span>
      </Link>
    </li>
  );
}

function Icon({ name }: { name: "grid" | "flow" | "user" }) {
  const common = "h-4 w-4";
  if (name === "grid")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  if (name === "flow")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="5" cy="6" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="12" r="2" />
        <path d="M7 6h6a4 4 0 014 4v0M7 18h6a4 4 0 004-4v0" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0116 0" strokeLinecap="round" />
    </svg>
  );
}
