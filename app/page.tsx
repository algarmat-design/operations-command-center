import { Hero, ProofStrip } from "@/components/home/hero";
import { CapabilityGrid } from "@/components/home/capability-grid";
import { RoleFit } from "@/components/home/role-fit";
import { DashboardCards } from "@/components/home/dashboard-cards";
import { CareerList, SelectedProjects } from "@/components/home/career-list";
import { ContactCta } from "@/components/home/contact-cta";
import { AiPractice } from "@/components/home/ai-practice";
import { CareerReel } from "@/components/home/career-reel";
import { Section } from "@/components/ui/primitives";
import { careerReel } from "@/content/profile";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />

      <Section
        id="reel"
        eyebrow={`Career reel · ${careerReel.duration}`}
        title="Twenty-five years of IT leadership, then the hands-on part"
      >
        <CareerReel />
      </Section>

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
        title="Systems I've shipped since April 2026"
        lede="Architected and built myself in my current fractional CTO role — not ones I approved a budget for. Client companies are described rather than named."
      >
        <SelectedProjects />
      </Section>

      <Section
        id="ai-native"
        eyebrow="How it gets built"
        title="An AI-native engineering practice, with the guardrails written down"
        lede="One senior engineer shipping at team speed is a process, not a trick. These are the rules it runs on."
      >
        <AiPractice />
      </Section>

      <Section
        id="experience"
        eyebrow="Career"
        title="25+ years, six organizations"
        lede="A fractional CTO role building production systems, Fortune 500 enterprise, high-growth fintech, and a 13-year run through problem management, SAP FI consulting and global operations that taught me what an audit actually costs."
      >
        <CareerList />
      </Section>

      <Section id="contact" eyebrow="Contact">
        <ContactCta />
      </Section>
    </>
  );
}
