import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dashboards } from "@/content/profile";
import type { DashboardSlug } from "@/content/types";
import { DashboardShell } from "@/components/dashboards/dashboard-shell";
import { ExecutiveBoard } from "@/components/dashboards/boards/executive-board";
import { OpsBoard } from "@/components/dashboards/boards/ops-board";
import { DevopsBoard } from "@/components/dashboards/boards/devops-board";
import { RoadmapBoard } from "@/components/dashboards/boards/roadmap-board";
import { insights as executiveInsights } from "@/content/dashboards/executive";
import { insights as opsInsights } from "@/content/dashboards/it-operations";
import { insights as devopsInsights } from "@/content/dashboards/devops";
import { insights as roadmapInsights } from "@/content/dashboards/roadmap";

// Only the four known slugs render; anything else is a 404 at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return dashboards.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/dashboards/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const meta = dashboards.find((d) => d.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: `${meta.framework} dashboard for ${meta.audience}. ${meta.question} Synthetic demo data.`,
  };
}

const BOARDS: Record<DashboardSlug, { body: React.ComponentType; insights: typeof executiveInsights }> = {
  executive: { body: ExecutiveBoard, insights: executiveInsights },
  "it-operations": { body: OpsBoard, insights: opsInsights },
  devops: { body: DevopsBoard, insights: devopsInsights },
  roadmap: { body: RoadmapBoard, insights: roadmapInsights },
};

export default async function DashboardPage(props: PageProps<"/dashboards/[slug]">) {
  const { slug } = await props.params;
  const meta = dashboards.find((d) => d.slug === slug);
  if (!meta) notFound();

  const { body: Body, insights } = BOARDS[meta.slug];

  return (
    <DashboardShell meta={meta} insights={insights}>
      <Body />
    </DashboardShell>
  );
}
