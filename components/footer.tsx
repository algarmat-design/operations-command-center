import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-[var(--surface)]/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>
            <span className="font-semibold text-white">Built by Álvaro García</span> — IT Senior Director & Operator
          </p>
          <p className="max-w-xl">
            Designed, specified and shipped by me, with Claude (Anthropic) as pair-programmer. Demo data is simulated —
            the rules engine, architecture and UX decisions are my own.
          </p>
          <p className="text-[10px] text-slate-600">
            © {new Date().getFullYear()} Álvaro García · Built April 2026 · v1
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-4">
          <li>
            <Link href="/resume" className="hover:text-white">
              Resume
            </Link>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/algarmat" className="hover:text-white" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="mailto:algarmat@gmail.com" className="hover:text-white">
              Email
            </a>
          </li>
          <li>
            <a
              href="https://github.com/algarmat-design/operations-command-center"
              className="hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="/resume.pdf" className="hover:text-white" target="_blank" rel="noreferrer">
              Resume PDF
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
