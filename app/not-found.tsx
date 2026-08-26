import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { identity } from "@/content/profile";

export default function NotFound() {
  return (
    <div className="px-5 py-24 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Eyebrow>404</Eyebrow>
        <h1 className="max-w-[18ch] text-[clamp(2rem,5vw,3rem)] leading-tight">
          That page is not here
        </h1>
        <p className="max-w-[55ch] text-base leading-relaxed text-text-muted">
          The link may be from an older version of this site. Everything worth reading is one click away.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href="/">Back to the start</ButtonLink>
          <ButtonLink href="/dashboards" variant="outline">
            Dashboards
          </ButtonLink>
          <ButtonLink href="/resume.pdf" download={identity.resumeFileName} variant="outline">
            Download CV
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
