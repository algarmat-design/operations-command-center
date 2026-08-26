import { ResumeView } from "@/components/resume/resume-view";

export default function ResumePrintPage() {
  return (
    <div className="mx-auto w-full max-w-[190mm] px-6 py-8 print:px-0 print:py-0">
      <ResumeView print />
    </div>
  );
}
