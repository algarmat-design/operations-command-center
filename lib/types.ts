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
}

export interface TeamMetric {
  team: string;
  productivity: number;
  headcount: number;
  sla: number;
  slaTarget: number;
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
  teams: TeamMetric[];
  churn: ChurnRisk;
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
