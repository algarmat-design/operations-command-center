import { experience, projects } from "@/content/profile";
import { Card, Eyebrow } from "@/components/ui/primitives";

/**
 * Dense, readable list — explicitly not a vertical timeline with dots. The
 * company wordmark is set in the display face at a size that reads as a logo
 * lockup without shipping five image assets.
 */
export function CareerList() {
  return (
    <ol className="flex flex-col">
      {experience.map((role, i) => (
        <li
          key={`${role.company}-${role.period}`}
          className={`grid gap-x-8 gap-y-4 py-8 md:grid-cols-[minmax(0,15rem)_1fr] ${
            i === 0 ? "" : "border-t border-line"
          }`}
        >
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl leading-tight tracking-tight text-text">{role.company}</h3>
            <p className="num text-xs text-text-faint">{role.period}</p>
            <p className="num text-xs text-text-faint">{role.location}</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold text-text">{role.title}</p>
            <p className="max-w-[65ch] text-sm leading-relaxed text-text-muted">{role.summary}</p>

            <ul className="flex max-w-[70ch] flex-col gap-2 pt-1">
              {role.achievements.slice(0, 3).map((a) => (
                <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                  <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
              {role.stack.map((s) => (
                <li key={s} className="num text-[11px] text-text-faint">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Hands-on build work, transcribed from the resume's technical projects. */
export function SelectedProjects() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {projects.map((p, i) => (
        <Card as="li" key={p.name} className="flex flex-col gap-4">
          <Eyebrow>{`Project 0${i + 1}`}</Eyebrow>
          <h3 className="text-lg leading-snug text-text">{p.name}</h3>
          <p className="text-sm leading-relaxed text-text-muted">{p.blurb}</p>

          <ul className="flex flex-col gap-2 border-t border-line pt-4">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[13px] leading-snug text-text-muted">
                <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-1">
            {p.stack.map((s) => (
              <li key={s} className="num text-[11px] text-text-faint">
                {s}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </ul>
  );
}
