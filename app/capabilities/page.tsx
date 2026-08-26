import type { Metadata } from "next";
import { capabilities, identity, skills } from "@/content/profile";
import { CapabilityIcon } from "@/components/ui/capability-icon";
import { Badge, ButtonLink, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Capabilities",
  description: `The eight areas ${identity.name} leads, each with the evidence behind it.`,
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="px-5 pb-8 pt-12 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
          <Eyebrow>Capabilities</Eyebrow>
          <h1 className="max-w-[20ch] text-[clamp(2rem,5vw,3rem)] leading-tight">
            What I lead, and what it produced
          </h1>
          <p className="max-w-[65ch] text-base leading-relaxed text-text-muted">
            Eight areas, each with concrete evidence drawn from a role I held. Nothing here is a
            certification I collected — it is work that shipped and a number that moved.
          </p>
          <nav aria-label="Capabilities" className="flex flex-wrap gap-2 pt-2">
            {capabilities.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-line px-3 py-1.5 text-[13px] text-text-muted transition-colors hover:border-line-strong hover:text-text"
              >
                {c.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="border-t border-line px-5 py-4 sm:px-8">
        <ol className="mx-auto flex w-full max-w-6xl flex-col">
          {capabilities.map((c, i) => (
            <li
              key={c.id}
              id={c.id}
              className={`grid scroll-mt-28 gap-x-10 gap-y-5 py-10 md:grid-cols-[minmax(0,20rem)_1fr] ${
                i === 0 ? "" : "border-t border-line"
              }`}
            >
              <div className="flex flex-col gap-3">
                <span className="num text-[11px] tracking-[0.18em] text-text-faint">
                  {`0${i + 1}`.slice(-2)}
                </span>
                <span className="text-accent">
                  <CapabilityIcon name={c.icon} className="h-7 w-7" />
                </span>
                <h2 className="text-xl leading-snug text-text">{c.name}</h2>
                <p className="text-sm leading-relaxed text-text-muted">{c.blurb}</p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <p className="num text-[11px] uppercase tracking-[0.16em] text-text-faint">Evidence</p>
                  <ul className="flex flex-col gap-3">
                    {c.evidence.map((e) => (
                      <li
                        key={e}
                        className="max-w-[70ch] border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-text"
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li key={t}>
                      <Badge>{t}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Section eyebrow="Full skill inventory" title="Everything, grouped">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.group} className="flex flex-col gap-3">
              <h3 className="border-b border-line pb-2 text-sm font-semibold text-text">{g.group}</h3>
              <ul className="flex flex-col gap-1.5">
                {g.items.map((item) => (
                  <li key={item} className="text-[13px] leading-relaxed text-text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Next">
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/dashboards" variant="outline">
            See the dashboards
          </ButtonLink>
          <ButtonLink href="/resume.pdf" download={identity.resumeFileName}>
            Download CV
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
