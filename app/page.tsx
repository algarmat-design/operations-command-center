import { Hero } from "@/components/home/hero";
import { CapabilityGrid } from "@/components/home/capability-grid";
import { RoleFit } from "@/components/home/role-fit";
import { DashboardCards } from "@/components/home/dashboard-cards";
import { CareerList, SelectedProjects } from "@/components/home/career-list";
import { ContactCta } from "@/components/home/contact-cta";
import { Section } from "@/components/ui/primitives";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section
        id="capabilities"
        eyebrow="What I bring"
        title="Eight capabilities, each with the number behind it"
        lede="Every claim below carries evidence from a role I actually held. Follow any card for the full record."
      >
        <CapabilityGrid />
      </Section>

      <Section
        id="fit"
        eyebrow="Where I fit"
        title="Three roles this background is built for"
        lede="If your open role looks like one of these, the rest of this page is the evidence. If it does not, the fit is probably somewhere else — and that is worth knowing in ten seconds rather than three interviews."
      >
        <RoleFit />
      </Section>

      <Section
        id="dashboards"
        eyebrow="Dashboards I build"
        title="Four boards, four audiences, four different questions"
        lede="Worked examples, built by me on synthetic data and labelled as such on every board. They demonstrate business acumen — what to measure, who to measure it for, and what to conclude — not anyone's real numbers. Each board states its measurement period."
      >
        <DashboardCards />
      </Section>

      <Section
        id="projects"
        eyebrow="Hands-on"
        title="Selected technical projects"
        lede="Systems I architected and shipped myself, not ones I approved a budget for."
      >
        <SelectedProjects />
      </Section>

      <Section
        id="experience"
        eyebrow="Career"
        title="25+ years, five organizations"
        lede="Fortune 500 enterprise, high-growth fintech, and a 13-year run through problem management, SAP FI consulting and global operations that taught me what an audit actually costs."
      >
        <CareerList />
      </Section>

      <Section id="contact" eyebrow="Contact">
        <ContactCta />
      </Section>
    </>
  );
}
