import { credentials, experience, identity, positioning, skills } from "@/content/profile";

/**
 * One resume renderer, two presentations.
 *
 * `print` drops every interactive affordance and switches to the print grid;
 * /resume/print uses it, and scripts/generate-resume-pdf.mts prints that page.
 * Web and PDF therefore cannot disagree — they are the same component reading
 * the same content module.
 */
export function ResumeView({ print = false }: { print?: boolean }) {
  // Applicant-tracking parsers trip on typographic dashes; paper gets ASCII, the web keeps typography.
  const t = (text: string) => (print ? text.replace(/[\u2013\u2014]/g, "-") : text);
  return (
    <article className={print ? "resume-print flex flex-col gap-4" : "flex flex-col gap-10"}>
      <header className="flex flex-col gap-3">
        <h1 className={print ? "text-3xl leading-tight" : "text-[clamp(2rem,5vw,3rem)] leading-tight"}>
          {identity.name}
        </h1>
        <p className={print ? "text-base font-semibold text-accent" : "text-lg font-semibold text-accent"}>
          {identity.title}
        </p>
        <p className="num flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted">
          <span>{identity.location}</span>
          <span aria-hidden="true">|</span>
          <span>{identity.availability}</span>
          <span aria-hidden="true">|</span>
          <a href={`mailto:${identity.email}`} className="text-link">
            {identity.email}
          </a>
          <span aria-hidden="true">|</span>
          <a href={`https://wa.me/${identity.whatsapp}`} className="text-link">
            {identity.phone}
          </a>
          <span aria-hidden="true">|</span>
          <a href={identity.linkedin} className="text-link">
            {identity.linkedinHandle}
          </a>
        </p>
        <p className="num text-xs text-text-muted">{credentials.languages.join(" | ")}</p>
      </header>

      <ResumeSection title="Professional Summary" print={print}>
        <p className="max-w-[80ch] text-sm leading-relaxed text-text-muted">{t(positioning.summary)}</p>
      </ResumeSection>

      <ResumeSection title="Core Competencies" print={print}>
        <p className="max-w-[85ch] text-sm leading-relaxed text-text-muted">
          {/* Technical tools have their own line further down; repeating them
              here is what makes a competencies block read as padding. */}
          {t(
            skills
              .filter((g) => g.group !== "Technical")
              .flatMap((g) => g.items)
              .join(" · "),
          )}
        </p>
      </ResumeSection>

      <ResumeSection title="Professional Experience" print={print}>
        <ol className="flex flex-col gap-6">
          {experience.map((role) => (
            <li key={`${role.company}-${role.period}`} className="resume-role flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base leading-snug text-text">
                  {role.title} {print ? "-" : "—"} {role.company}
                </h3>
                <p className="num text-xs text-text-muted">{t(role.period)}</p>
              </div>
              <p className="max-w-[85ch] text-sm leading-relaxed text-text-muted">{t(role.summary)}</p>
              <ul className="flex flex-col gap-1.5">
                {role.achievements.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                    <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="max-w-[80ch]">{t(a)}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </ResumeSection>

      {/* Projects are not repeated here: the current role already carries
          each system with its numbers, and the resume has a two-page budget. */}
      <ResumeSection title="Technical Skills" print={print}>
        <p className="max-w-[85ch] text-sm leading-relaxed text-text-muted">
          {skills.find((g) => g.group === "Technical")?.items.join(" | ")}
        </p>
      </ResumeSection>

      <div className={print ? "flex flex-col gap-4" : "grid gap-10 md:grid-cols-2"}>
        <ResumeSection title="Education" print={print}>
          <ul className={print ? "flex flex-col gap-1" : "flex flex-col gap-3"}>
            {credentials.education.map((e) => (
              <li key={e.credential} className={`resume-block flex gap-x-2 gap-y-0.5 ${print ? "flex-row flex-wrap" : "flex-col"}`}>
                <p className="text-sm font-semibold text-text">{e.credential}</p>
                {print && <p className="text-sm text-text-muted" aria-hidden="true">-</p>}
                <p className="text-sm text-text-muted">{e.institution}</p>
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title="Certifications" print={print}>
          <p className="max-w-[80ch] text-sm leading-relaxed text-text-muted">
            {credentials.certifications.join(" | ")}
          </p>
        </ResumeSection>
      </div>
    </article>
  );
}

function ResumeSection({
  title,
  print,
  children,
}: {
  title: string;
  print: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2
        className={`num border-b border-line pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-faint ${
          print ? "" : "text-[12px]"
        }`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
