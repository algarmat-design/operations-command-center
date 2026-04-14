import Link from "next/link";
import { ResumeTimeline } from "@/components/resume-timeline";
import { resume } from "@/lib/resume-data";

export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      {/* Back to dashboard */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--surface)] px-4 py-2 text-xs text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <span aria-hidden>←</span>
          Back to the Command Center
        </Link>
      </div>

      {/* Hero */}
      <header className="grid grid-cols-1 gap-10 border-b border-white/5 pb-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-300">
            Sr IT Director — Álvaro García
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {resume.name}
          </h1>
          <p className="mt-2 text-lg text-slate-300 sm:text-xl">{resume.headline}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {resume.positioning}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {resume.contact.map((c) =>
              c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") || c.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-200 transition hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-200"
                >
                  <span className="text-slate-500">{c.label}</span>
                  <span>{c.value}</span>
                </a>
              ) : (
                <span key={c.label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-200">
                  <span className="text-slate-500">{c.label}</span>
                  <span>{c.value}</span>
                </span>
              ),
            )}
          </div>
        </div>
      </header>

      {/* Stats strip */}
      <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {resume.stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/5 bg-[var(--surface)] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{s.label}</p>
            <p className="mt-2 text-xl font-semibold text-white">{s.value}</p>
          </div>
        ))}
      </section>

      {/* Core competencies */}
      <section className="mt-14">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">Core competencies</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {resume.coreCompetencies.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 bg-[var(--surface)] px-3 py-1.5 text-xs text-slate-200"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Experience timeline */}
      <section className="mt-14">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">Experience</h2>
        <div className="mt-8">
          <ResumeTimeline roles={resume.roles} />
        </div>
      </section>

      {/* Education + Certifications + Technical */}
      <section className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Block title="Education">
          <ul className="space-y-3 text-sm">
            {resume.education.map((e) => (
              <li key={e.title}>
                <p className="font-medium text-white">{e.title}</p>
                <p className="text-xs text-slate-400">
                  {e.institution} · {e.year}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Certifications">
          <ul className="flex flex-wrap gap-2">
            {resume.certifications.map((c) => (
              <li key={c} className="rounded-full border border-white/10 bg-[var(--surface-2)] px-3 py-1 text-xs text-slate-200">
                {c}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Technical stack">
          <ul className="flex flex-wrap gap-2">
            {resume.technical.map((c) => (
              <li key={c} className="rounded-full border border-white/10 bg-[var(--surface-2)] px-3 py-1 text-xs text-slate-200">
                {c}
              </li>
            ))}
          </ul>
        </Block>
      </section>

      {/* Languages */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">Languages</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {resume.languages.map((l) => (
            <span key={l} className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs text-emerald-200">
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* CTA back */}
      <section className="mt-16 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">See the hands-on side</h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-300">
              The Operations Command Center is my use-case — a working dashboard that reflects how I think about metrics,
              incidents and recommendations at a director level.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
            >
              ← Back to the Command Center
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Download PDF version
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[var(--surface)] p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}
