import { identity, positioning } from "@/content/profile";
import { ButtonLink } from "@/components/ui/primitives";

/**
 * Typographic hero — no portrait by design.
 *
 * At 1280px this must show, without scrolling: the name, the title, the
 * positioning line, the Download CV button and at least one proof figure. The
 * proof points sit in the second column rather than in a strip below, which
 * both balances the composition and puts all four above the fold.
 */
export function Hero() {
  return (
    <section className="px-5 pb-12 pt-12 sm:px-8 md:pb-16 md:pt-20">
      <div className="mx-auto grid w-full max-w-6xl gap-x-12 gap-y-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-5">
            <p className="num flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-faint">
              <span className="text-accent">{identity.title}</span>
              <span aria-hidden="true">·</span>
              <span>{identity.location}</span>
              <span aria-hidden="true">·</span>
              <span>{identity.timezone}</span>
            </p>

            <h1 className="text-[clamp(2.25rem,6vw,4rem)] leading-[1.05]">{identity.name}</h1>

            <p className="max-w-[38ch] border-l-2 border-accent pl-4 text-[clamp(1.125rem,2.2vw,1.5rem)] font-semibold leading-snug text-text">
              {positioning.headline}
            </p>

            <p className="max-w-[62ch] text-base leading-relaxed text-text-muted">{positioning.subhead}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/resume.pdf" download={identity.resumeFileName}>
              Download CV
            </ButtonLink>
            <ButtonLink href={identity.linkedin} variant="outline" external>
              LinkedIn
            </ButtonLink>
            <ButtonLink href={`mailto:${identity.email}`} variant="outline">
              Email me
            </ButtonLink>
          </div>

          <p className="num text-xs text-text-faint">
            {identity.availability} · Responds within one business day
          </p>
        </div>

        <dl className="flex min-w-0 flex-col self-center border-t border-line lg:border-l lg:border-t-0 lg:pl-10">
          {positioning.proofPoints.map((p) => (
            <div
              key={p.label}
              className="flex items-baseline justify-between gap-6 border-b border-line py-4 lg:flex-col lg:items-start lg:justify-start lg:gap-1 lg:border-b-0 lg:py-3"
            >
              <dt className="order-2 max-w-[22ch] text-sm leading-snug text-text-muted">{p.label}</dt>
              <dd
                className={`num order-1 font-semibold leading-none text-text ${
                  // Word-based figures drop a type step so they do not shout over
                  // the numeric ones sitting directly above and below them.
                  p.value.length > 8
                    ? "text-[clamp(1.125rem,1.9vw,1.375rem)]"
                    : "text-[clamp(1.5rem,3vw,2.25rem)]"
                }`}
              >
                {p.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
