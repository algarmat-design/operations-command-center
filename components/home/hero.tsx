import Image from "next/image";
import { identity, positioning } from "@/content/profile";
import { ButtonLink } from "@/components/ui/primitives";

/**
 * Typographic hero with a decorative backdrop.
 *
 * The artwork is anchored to the right and masked so it dissolves before it
 * reaches the headline — no text ever sits on top of it, at any breakpoint. On
 * narrow screens it drops below the copy as a band rather than shrinking to an
 * unreadable sliver.
 *
 * At 1280px this must still show, without scrolling: the name, the title, the
 * positioning line and the Download CV button.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-12 pt-12 sm:px-8 md:pb-16 md:pt-20">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex max-w-[46rem] flex-col gap-5 lg:max-w-[38rem]">
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

          <p className="max-w-[58ch] text-base leading-relaxed text-text-muted">{positioning.subhead}</p>
        </div>

        <div className="flex max-w-[46rem] flex-wrap items-center gap-3 lg:max-w-[38rem]">
          <ButtonLink href="/resume.pdf" download={identity.resumeFileName}>
            Download CV
          </ButtonLink>
          <ButtonLink href={identity.linkedin} variant="outline" external>
            LinkedIn
          </ButtonLink>
          <ButtonLink href={`mailto:${identity.email}`} variant="outline">
            {identity.email}
          </ButtonLink>
        </div>

        <p className="num text-xs text-text-faint">
          {identity.availability} · Responds within one business day
        </p>
      </div>

      {/* Decorative: everything it depicts is stated in the copy beside it. */}
      <div
        aria-hidden="true"
        className="hero-art pointer-events-none relative mt-10 aspect-[1600/672] w-full overflow-hidden rounded-lg lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-[62%] lg:rounded-none"
      >
        <Image
          src="/hero-backdrop.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-right"
        />
      </div>
    </section>
  );
}

/** The four proof figures, on plain canvas so nothing competes with them. */
export function ProofStrip() {
  return (
    <section
      className="border-t border-line px-5 py-8 sm:px-8 md:py-10"
      aria-label="Career at a glance"
    >
      <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
        {positioning.proofPoints.map((p) => (
          <div key={p.label} className="flex flex-col gap-1.5">
            <dt className="sr-only">{p.label}</dt>
            <dd
              className={`num font-semibold leading-none text-text ${
                // Word-based figures drop a type step so they do not shout over
                // the numeric ones sitting beside them.
                p.value.length > 8
                  ? "text-[clamp(1.125rem,1.9vw,1.5rem)]"
                  : "text-[clamp(1.5rem,3vw,2.25rem)]"
              }`}
            >
              {p.value}
            </dd>
            <p className="max-w-[22ch] text-sm leading-snug text-text-muted">{p.label}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
