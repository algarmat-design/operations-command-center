export type ScenarioKey = "normal" | "crisis" | "growth";

export type Severity = "info" | "warning" | "critical";
export type Priority = "low" | "medium" | "high";
export type Trend = "up" | "down" | "flat";

export interface Kpi {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  deltaPct: number;
  trend: Trend;
  target?: string;
  unit?: string;
  sparkline: number[];
  status: "healthy" | "watch" | "breach";
  context: string;
}

export interface FunnelStep {
  label: string;
  count: number;
  note?: string;
}

export interface MarketingCampaign {
  channel: string;
  spend: number;
  leads: number;
  deals: number;
  cac: number;
  status: "healthy" | "watch" | "breach";
}

export interface ActiveProject {
  code: string;
  name: string;
  pm: string;
  status: "on-track" | "at-risk" | "delayed" | "mvp" | "launched";
  progressPct: number;
  budgetUsedPct: number;
  nextMilestone: string;
}

export interface ChurnRisk {
  accountsAtRisk: number;
  inactiveOver30Days: number;
  estimatedMrrAtRisk: number;
}

export interface OperationalData {
  scenario: ScenarioKey;
  scenarioLabel: string;
  scenarioDescription: string;
  kpis: Kpi[];
  funnel: FunnelStep[];
  campaigns: MarketingCampaign[];
  projects: ActiveProject[];
  churn: ChurnRisk;
  itOps: {
    openTickets: number;
    p1: number;
    p2: number;
    changesThisWeek: number;
    failedChanges: number;
    mttrMinutes: number;
    slaCompliancePct: number;
    ticketDeltaPct: number;
  };
  monthOverMonth: {
    revenueDeltaPct: number;
    conversionDeltaPct: number;
  };
}

export interface Alert {
  id: string;
  title: string;
  detail: string;
  severity: Severity;
  source: string;
  createdMinutesAgo: number;
}

export interface Recommendation {
  id: string;
  action: string;
  rationale: string;
  impact: string;
  effort: "low" | "medium" | "high";
  priority: Priority;
  owner: string;
}

export interface Insights {
  alerts: Alert[];
  recommendations: Recommendation[];
}

export interface ResumeRole {
  title: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface ResumeData {
  name: string;
  headline: string;
  positioning: string;
  contact: { label: string; value: string; href?: string }[];
  stats: { label: string; value: string }[];
  coreCompetencies: string[];
  roles: ResumeRole[];
  education: { title: string; institution: string; year: string }[];
  certifications: string[];
  technical: string[];
  languages: string[];
}
