import type {
  Capability,
  Credentials,
  DashboardMeta,
  Identity,
  Positioning,
  Project,
  Role,
  RoleFit,
  SkillGroup,
} from "./types.ts";

/**
 * Single source of truth for everything the site says about Alvaro.
 *
 * `experience`, `credentials` and `skills` are transcribed verbatim from
 * Alvaro_Garcia_Resume_2026.pdf. Do not paraphrase, re-date or embellish them —
 * the web page, the print page and public/resume.pdf all render from here, and
 * they must agree with the PDF recruiters already hold.
 */

export const identity: Identity = {
  name: "Alvaro Garcia",
  alternateName: "Álvaro García",
  title: "IT Senior Director",
  tagline: "IT and engineering executive — strategy, delivery, and P&L.",
  location: "Guadalajara, Mexico",
  timezone: "GMT-6 (Central)",
  email: "algarmat@gmail.com",
  phone: "+52 33 3128-8999",
  whatsapp: "523331288999",
  linkedin: "https://www.linkedin.com/in/algarmat",
  linkedinHandle: "linkedin.com/in/algarmat",
  github: "https://github.com/algarmat-design",
  site: "https://alvarogarcia.space",
  availability: "Open to remote roles worldwide",
  resumeFileName: "Alvaro-Garcia-IT-Senior-Director.pdf",
};

export const positioning: Positioning = {
  headline: "I lead technology organizations where the platform is regulated, the budget is finite, and the roadmap still has to ship.",
  subhead:
    "25+ years across Fortune 500 enterprise and high-growth fintech — IT strategy, software development, and cloud modernization, with full multimillion-dollar P&L ownership.",
  summary:
    "IT and Engineering executive combining C-level leadership with hands-on delivery: architecting AI-driven applications, modular platforms, and secure cloud infrastructure across AWS, Azure and GCP. Deep expertise in payments and PCI-compliant credit-card transactional environments, AI/LLM integration, and SDLC-driven engineering leadership. Leadership is measured by the quality, speed and accountability of its decisions — my job is to give an executive team the clarity and context required to act with confidence.",
  proofPoints: [
    { value: "25+", label: "Years in technology leadership" },
    { value: "Fortune 500", label: "Enterprise and fintech environments" },
    { value: "300+", label: "People led, follow-the-sun" },
    { value: "Multi-million", label: "P&L owned and defended" },
  ],
};

export const capabilities: readonly Capability[] = [
  {
    id: "it-strategy-pl",
    name: "IT Strategy & P&L Ownership",
    blurb:
      "Corporate roadmap, budget, procurement and vendor negotiation, owned end to end and defended in front of a board.",
    evidence: [
      "20% budget reduction through automated procurement controls and process optimization at a payments fintech",
      "20% cut in innovation project costs while executing a roadmap that delivered 40% business growth",
    ],
    tags: ["P&L", "Procurement", "Vendor contracts", "IT roadmap", "OKRs"],
    icon: "strategy",
  },
  {
    id: "global-team-leadership",
    name: "Global Team Leadership",
    blurb:
      "Distributed engineering and operations organizations across time zones, held to attrition and customer-success targets.",
    evidence: [
      "300+ associates led across a follow-the-sun delivery model at Morgan Stanley",
      "20% year-over-year team growth with global technical and soft-skill training",
    ],
    tags: ["Follow-the-sun", "Offshore teams", "Vendor management", "Coaching"],
    icon: "team",
  },
  {
    id: "ai-ops-llm",
    name: "AI Ops & LLM Integration",
    blurb:
      "LLM capability moved from pilot to production — with a human-in-the-loop review layer and a measurable automation number attached.",
    evidence: [
      "25% workforce automation delivered through AI-led transformation as C-level partner to the CTO",
      "End-to-end document-intelligence platform architected on AWS (S3, Lambda) with the Claude API and a human-in-the-loop review layer",
    ],
    tags: ["Claude API", "Human-in-the-loop", "AWS Lambda", "n8n", "Zapier"],
    icon: "ai",
  },
  {
    id: "devops-delivery",
    name: "DevOps & Engineering Delivery",
    blurb:
      "CI/CD, SRE and SDLC discipline applied to offshore teams, measured by delivery performance rather than activity.",
    evidence: [
      "50% improvement in DevOps delivery performance via KPI/SLA optimization",
      "100% SLA/KPI compliance reached and sustained within 90 days through process and quality controls",
    ],
    tags: ["CI/CD", "SRE", "SDLC", "Agile / Scrum", "KPIs & SLAs"],
    icon: "devops",
  },
  {
    id: "cloud-modernization",
    name: "Cloud Architecture & Modernization",
    blurb:
      "Multi-cloud migration and cost optimization, from single-tenant enterprise engagements to a full internal-tooling move.",
    evidence: [
      "10–15 concurrent enterprise engagements managed across AWS, GCP and Azure at Rackspace",
      "Cloud migration of all internal tools led at a payments fintech, with vendor contracts restructured for scalability",
    ],
    tags: ["AWS", "Azure", "GCP", "Cost optimization", "CloudFront", "Vercel"],
    icon: "cloud",
  },
  {
    id: "compliance-audit",
    name: "Compliance & Audit",
    blurb:
      "Security and audit frameworks built to be lived in daily, not assembled the week before an assessment.",
    evidence: [
      "Enterprise-wide PCI DSS / SOC 2 policies and a continuous compliance-monitoring framework established",
      "SAP FI support migrated from the US to Mexico with zero SOX audit-compliance issues",
    ],
    tags: ["PCI DSS", "SOC 2", "SOX", "ITIL v4", "Six Sigma"],
    icon: "compliance",
  },
  {
    id: "payments-transactional",
    name: "Payments & Transactional Systems",
    blurb:
      "Card-transaction environments where an outage is a regulatory event, not just a status page update.",
    evidence: [
      "PCI-compliant credit-card transactional environments owned at two companies — a consumer-credit firm and a payments fintech",
      "Global enterprise network services delivered for a Fortune 500 financial-services client",
    ],
    tags: ["PCI", "Card transactions", "Regulatory process", "Splunk"],
    icon: "payments",
  },
  {
    id: "product-platform",
    name: "Product & Platform Building",
    blurb:
      "Multi-tenant platforms designed and shipped hands-on, with role-based access and real-time profitability reporting.",
    evidence: [
      "Modular multi-tenant architecture designed for attendance capture, payroll/bonus logic and KPI dashboards",
      "Full-stack delivery in Next.js, React, Python and Supabase driven across offshore teams under an SDLC framework",
    ],
    tags: ["Next.js", "React Native", "Supabase", "Turso", "Multi-tenant"],
    icon: "platform",
  },
];

export const roleFit: readonly RoleFit[] = [
  {
    archetype: "CTO / VP of Engineering",
    forWhom: "Scale-up fintech",
    why: "For companies that need the platform to carry a regulated business without the cost curve running away from them. I have owned both sides of that trade: PCI-compliant card environments, and the budget that pays for them.",
    signals: [
      "You process card transactions and PCI scope is growing faster than the team",
      "Engineering delivery is measured in activity, not in DORA outcomes",
      "Cloud spend is climbing and nobody can attribute it to a product line",
    ],
  },
  {
    archetype: "Senior Director / Head of IT",
    forWhom: "Regulated enterprise",
    why: "For organizations with real audit exposure, hard SLAs and distributed teams. I have run 300+ associates follow-the-sun, sustained 100% SLA compliance, and moved audited finance systems across countries with zero findings.",
    signals: [
      "SOX, SOC 2 or PCI evidence is gathered by hand every cycle",
      "Service operations are fragmented across departments and vendors",
      "You need a leader who can face the auditor and the board in the same week",
    ],
  },
  {
    archetype: "AI Transformation Lead",
    forWhom: "Head of AI Engineering",
    why: "For companies that want to move from AI pilots to measurable adoption without rewriting their stack. I shipped a document-intelligence platform on AWS with the Claude API and a human-in-the-loop layer, and attached a 25% automation number to it.",
    signals: [
      "You have promising AI demos and no path to production",
      "Manual data entry is a line item nobody has priced",
      "Automation needs a review layer before it touches a regulated record",
    ],
  },
];

/**
 * Verbatim from the resume PDF. Company names, titles, dates and achievement
 * wording are transcribed, not summarized.
 */
export const experience: readonly Role[] = [
  {
    company: "The Credit Pros",
    title: "IT Senior Director",
    period: "March 2022 – Present",
    location: "Remote — United States",
    summary:
      "Lead enterprise IT strategy, software development, and operations for a U.S. consumer-credit company; manage AWS/Azure infrastructure, cybersecurity, and a portfolio of 5 vendor agencies with offshore development teams. C-level partner to the CTO driving AI-led transformation.",
    achievements: [
      "Delivered 40% business growth and 25% workforce automation through strategic IT roadmap execution, cutting innovation project costs by 20%.",
      "Directed development of AI-driven applications and internal platforms — integrating LLM/Claude-based automation and data analytics within a PCI-compliant credit-card transactional environment to optimize operations and reduce manual processing.",
      "Drove modular system architecture and full-stack delivery (Next.js, React, Python, Supabase) across offshore teams under an SDLC and senior project-management framework; improved DevOps delivery performance by 50% via KPI/SLA optimization.",
      "Established enterprise-wide PCI DSS / SOC 2 security policies and a continuous compliance-monitoring framework.",
      "Owned full P&L for the corporate IT budget, procurement, and project-management function.",
    ],
    stack: ["AWS", "Azure", "Next.js", "React", "Python", "Supabase", "Claude API", "PCI DSS", "SOC 2"],
  },
  {
    company: "Rackspace",
    title: "Engagement Manager",
    period: "July 2021 – March 2022",
    location: "Remote",
    summary:
      "Managed 10–15 concurrent enterprise customer engagements across AWS, GCP, and Azure environments, driving cost optimization and Agile delivery.",
    achievements: [
      "Reached full onboarding and independent customer management within 1 week — a record for the team.",
      "Enhanced customer reporting and KPI tracking, improving transparency and stakeholder satisfaction.",
      "Led escalation management and long-range planning for high-risk cloud programs.",
    ],
    stack: ["AWS", "GCP", "Azure", "Agile", "Cost optimization"],
  },
  {
    company: "Payclip (Clip)",
    title: "Director of IT Operations",
    period: "July 2020 – July 2021",
    location: "Mexico City, Mexico",
    summary:
      "Built the IT operations strategy for a rapidly scaling payments fintech — regulatory processes, ITIL framework, and cross-functional alignment across engineering, product, and business in a card-transaction environment.",
    achievements: [
      "Consolidated service-operations collaboration across all departments within 6 months.",
      "Achieved 20% budget reduction through automated procurement controls and process optimization.",
      "Led cloud migration of all internal tools; restructured IT teams and vendor contracts for scalability.",
    ],
    stack: ["ITIL", "Cloud migration", "Procurement automation", "Vendor management"],
  },
  {
    company: "Morgan Stanley",
    title: "IT DevOps Manager, Enterprise Network Services",
    period: "July 2015 – June 2020",
    location: "Guadalajara, Mexico",
    summary:
      "Led global IT operations and network services for a Fortune 500 financial-services client, managing 300+ associates across a follow-the-sun delivery model.",
    achievements: [
      "Achieved and sustained 100% SLA/KPI compliance within 90 days through process optimization and quality controls adopted across multiple teams.",
      "Managed a multimillion-dollar budget and vendor contracts; implemented Splunk monitoring across enterprise accounts.",
      "Grew a high-performing team 20% year-over-year with global technical and soft-skill training while meeting attrition and customer-success targets.",
    ],
    stack: ["Splunk", "Enterprise networks", "Follow-the-sun", "Vendor contracts"],
  },
  {
    company: "Hewlett-Packard",
    title: "Service Operations Manager / SAP FI Consultant",
    period: "2001 – 2014",
    location: "Guadalajara, Mexico",
    summary:
      "Progressive 13-year career across Problem Management, Change Management, SAP FI consulting, and global IT operations, leading cross-functional teams in the US, Mexico, and India in 24x7 enterprise environments.",
    achievements: [
      "Cut month-end-close incidents by 50% through a new IT finance strategy and KPI implementation.",
      "Built an application-availability dashboard adopted as a worldwide standard, reducing analysis time by 30%.",
      "Led migration of SAP FI support from the US to Mexico with zero SOX audit-compliance issues; maintained 100% root-cause-analysis success with 90% resolution within 48 hours.",
    ],
    stack: ["SAP FICO", "Problem Management", "Change Management", "SOX", "24x7 operations"],
  },
];

export const projects: readonly Project[] = [
  {
    name: "AI Document-Intelligence Platform",
    blurb:
      "An end-to-end system that turns field photographs into validated database records, with a human in the loop before anything is written.",
    highlights: [
      "Architected on AWS (S3, Lambda) with the Claude API and Supabase",
      "Ingests field photos, extracts structured data, writes validated records",
      "Eliminates manual data entry behind a human-in-the-loop review layer",
    ],
    stack: ["AWS S3", "AWS Lambda", "Claude API", "Supabase"],
  },
  {
    name: "Modular Workforce-Operations Platform",
    blurb:
      "A multi-tenant operations platform where attendance, payroll logic and profitability are one system rather than three spreadsheets.",
    highlights: [
      "Modular multi-tenant architecture with role-based access",
      "Attendance capture, payroll and bonus logic, KPI dashboards",
      "Real-time profitability reporting",
    ],
    stack: ["Next.js", "React Native", "Supabase", "Turso"],
  },
  {
    name: "Cloud Web Platforms & Automation",
    blurb:
      "Production web platforms and the integration plumbing that connects LLMs to the systems a business actually runs on.",
    highlights: [
      "Deployed on AWS (S3, CloudFront, Route 53) and Vercel with GitHub CI/CD",
      "Integration and automation workflows built in n8n and Zapier",
      "Claude API wired into business systems",
    ],
    stack: ["AWS CloudFront", "Route 53", "Vercel", "GitHub Actions", "n8n", "Zapier"],
  },
];

export const credentials: Credentials = {
  education: [
    {
      credential: "B.S. in Computer Science & Information Technology",
      institution: "Instituto Tecnológico y de Estudios Superiores de Occidente (ITESO)",
    },
    {
      credential: "Leadership & Management Diploma",
      institution: "Instituto Tecnológico de Estudios Superiores de Monterrey (ITESM)",
    },
  ],
  certifications: [
    "ITIL v4",
    "AWS Fundamentals",
    "PCI DSS Compliance",
    "SOC 2 Compliance",
    "SOX Audit",
    "AI Integration & Data Visualization",
    "Six Sigma / Lean Management",
    "Project Management (PMP methodologies)",
  ],
  languages: ["English (Fluent)", "Spanish (Native)"],
};

export const skills: readonly SkillGroup[] = [
  {
    group: "Leadership",
    items: [
      "Engineering & Technology Leadership",
      "IT Strategy & Roadmap",
      "P&L and Corporate IT Budget Management",
      "Senior Project & Program Management",
      "Global Team Leadership & Scaling",
      "Stakeholder & Change Management",
      "Vendor & Contract Negotiation",
      "KPIs & OKRs",
    ],
  },
  {
    group: "Engineering",
    items: [
      "AI / LLM Platform Development & Integration",
      "Full-Stack Software Development",
      "Modular System & Solution Architecture",
      "DevOps, CI/CD & SRE",
      "Software Development Lifecycle (SDLC)",
      "Agile / Scrum",
    ],
  },
  {
    group: "Platform & compliance",
    items: [
      "Cloud Architecture & Modernization (AWS, Azure, GCP)",
      "Payments & Credit-Card Transactional Systems",
      "Cybersecurity & Compliance (PCI DSS, SOC 2, SOX)",
      "ITIL v4",
    ],
  },
  {
    group: "Technical",
    items: [
      "AI / LLM Integration (Claude API)",
      "Next.js",
      "React",
      "React Native",
      "Python",
      "Supabase",
      "Turso",
      "Vercel",
      "GitHub",
      "n8n",
      "Zapier",
      "AWS / Azure / GCP",
      "SAP FICO",
      "Splunk",
      "Atlassian (Jira, Confluence)",
      "Azure Copilot",
      "Monday.com",
      "CRM & ITSM Tools",
    ],
  },
];

export const dashboards: readonly DashboardMeta[] = [
  {
    slug: "executive",
    title: "Executive Financial Dashboard",
    shortTitle: "Executive",
    framework: "C-level financial",
    audience: "CEO, CFO, board",
    question: "Is the business growing profitably, and is technology spend earning its place in the P&L?",
    whatItProves:
      "That I report technology in the language a board already uses — margin, EBITDA, variance and unit economics — instead of asking them to learn mine.",
    metrics: [
      "Monthly recurring revenue",
      "Gross margin",
      "EBITDA",
      "Budget vs. actual by area",
      "IT spend as % of revenue",
      "CAC, LTV, LTV:CAC",
      "Project portfolio ROI",
      "Budget variance",
    ],
  },
  {
    slug: "it-operations",
    title: "IT Service Operations",
    shortTitle: "IT Operations",
    framework: "ITIL v4",
    audience: "COO, CIO, service delivery",
    question: "Are we meeting our service commitments, and where is the operation about to break?",
    whatItProves:
      "That I run service operations against an ITIL v4 framework where every commitment has a number, an owner and an aging clock.",
    metrics: [
      "SLA attainment",
      "MTTR and MTTA",
      "Incidents by severity (P1–P4)",
      "Change success rate",
      "Ticket backlog and aging",
      "First-contact resolution",
      "Critical service availability",
      "Cost per ticket",
    ],
  },
  {
    slug: "devops",
    title: "DevOps Delivery Performance",
    shortTitle: "DevOps",
    framework: "DORA",
    audience: "CTO, VP Engineering",
    question: "How fast does this organization ship, and what does it cost us in stability when we do?",
    whatItProves:
      "That I read DORA metrics against their published performance bands rather than just plotting them — throughput and stability are one trade-off, not two scores.",
    metrics: [
      "Deployment frequency",
      "Lead time for changes",
      "Change failure rate",
      "Time to restore service",
      "Pipeline duration",
      "Build success rate",
      "Test coverage",
      "Open vulnerabilities by severity",
    ],
  },
  {
    slug: "roadmap",
    title: "Transformation Roadmap",
    shortTitle: "Roadmap",
    framework: "Portfolio & dependencies",
    audience: "CEO, board, PMO",
    question: "What are we changing over the next four quarters, what does it cost, and what breaks if one initiative slips?",
    whatItProves:
      "This is the one that shows judgment rather than instrumentation: sequencing, dependencies, RAG status and the investment-to-benefit case behind each lane.",
    metrics: [
      "Four-quarter roadmap across four lanes",
      "RAG status per initiative",
      "Owner and investment",
      "Expected benefit",
      "Inter-initiative dependencies",
      "Investment by lane",
      "Cumulative benefit",
    ],
  },
];
