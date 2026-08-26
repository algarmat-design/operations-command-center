import { identity } from "@/content/profile";
import { ButtonLink } from "@/components/ui/primitives";

export function ContactCta() {
  return (
    <div className="flex flex-col gap-8 rounded-[var(--radius-card)] border border-line bg-surface-sunken p-6 sm:p-10">
      <div className="flex max-w-[55ch] flex-col gap-3">
        <h2 className="text-2xl md:text-3xl">Hiring for a role like this?</h2>
        <p className="text-base leading-relaxed text-text-muted">
          The fastest way to evaluate the fit is the CV plus twenty minutes. {identity.availability},
          currently in {identity.timezone}.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ButtonLink href="/resume.pdf" download={identity.resumeFileName}>
          Download CV
        </ButtonLink>
        <ButtonLink href={`mailto:${identity.email}`} variant="outline">
          {identity.email}
        </ButtonLink>
        <ButtonLink href={identity.linkedin} variant="outline" external>
          LinkedIn
        </ButtonLink>
        <ButtonLink href={`https://wa.me/${identity.whatsapp}`} variant="ghost" external>
          WhatsApp {identity.phone}
        </ButtonLink>
      </div>
    </div>
  );
}
