import { roleFit } from "@/content/profile";
import { Card, Eyebrow } from "@/components/ui/primitives";

/**
 * The section that does the recruiter's job for them. Three archetypes, each
 * with why I fit and the signals that say a company needs this role filled.
 */
export function RoleFit() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {roleFit.map((r, i) => (
        <Card as="li" key={r.archetype} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Eyebrow>{`0${i + 1} — ${r.forWhom}`}</Eyebrow>
            <h3 className="text-lg leading-snug text-text">{r.archetype}</h3>
          </div>

          <p className="text-sm leading-relaxed text-text-muted">{r.why}</p>

          <div className="mt-auto flex flex-col gap-2 border-t border-line pt-4">
            <p className="num text-[11px] font-medium uppercase tracking-[0.16em] text-text-faint">
              Signals you need this
            </p>
            <ul className="flex flex-col gap-2">
              {r.signals.map((s) => (
                <li key={s} className="flex gap-2.5 text-[13px] leading-snug text-text-muted">
                  <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </ul>
  );
}
