import type { Metadata } from "next";
import { identity, positioning } from "@/content/profile";
import { ResumeView } from "@/components/resume/resume-view";
import { ButtonLink } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Resume",
  description: positioning.subhead,
};

export default function ResumePage() {
  return (
    <div className="px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="flex flex-wrap items-center gap-3 border-b border-line pb-6">
          <ButtonLink href="/resume.pdf" download={identity.resumeFileName}>
            Download PDF
          </ButtonLink>
          <ButtonLink href={`mailto:${identity.email}`} variant="outline">
            Email me
          </ButtonLink>
          <p className="num text-xs text-text-faint">
            This page and the PDF are generated from the same source.
          </p>
        </div>

        <ResumeView />
      </div>
    </div>
  );
}
