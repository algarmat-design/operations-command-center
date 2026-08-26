import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume (print)",
  robots: { index: false, follow: false },
};

/**
 * Bare layout: no header, no footer, no theme toggle. This is the page
 * scripts/generate-resume-pdf.mts prints, so anything rendered here ends up in
 * public/resume.pdf.
 */
export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return <div className="resume-print-root">{children}</div>;
}
