import type {
  Capability,
  CareerReel,
  Credentials,
  DashboardMeta,
  Identity,
  Positioning,
  PracticeItem,
  Project,
  Role,
  RoleFit,
  SkillGroup,
} from "./types.ts";

/**
 * Single source of truth for everything the site says about Alvaro.
 *
 * `experience`, `credentials` and `skills` ARE the resume: the web page, the
 * print page and public/resume.pdf render from here, and the ATS .docx resume is
 * exported from this module. Edit a fact here and regenerate both.
 *
 * Every figure in the Grupo Alista role and in `projects` is taken from the
 * source repositories (git history, schema migrations) as of October 2026.
 * Client companies are described, never named.
 */

export const identity: Identity = {
  name: "Alvaro Garcia",
  alternateName: "Álvaro García",
  title: "Fractional CTO & IT Executive",
  tagline: "IT and engineering executive — strategy, delivery, and P&L, with the hands to build it.",
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
  resumeFileName: "Alvaro_Garcia_Resume_2026.pdf",
};

export const positioning: Positioning = {
  headline: "I lead technology organizations where the platform is regulated, the budget is finite, and the roadmap still has to ship.",
  subhead:
    "25+ years across Fortune 500 enterprise and high-growth fintech — IT strategy, software development, and cloud modernization, with full multimillion-dollar P&L ownership. Today, as Fractional CTO at Grupo Alista, I architect and ship the production systems myself.",
  summary:
    "IT and Engineering executive combining C-level leadership with hands-on delivery. As Fractional CTO and Technology Consultant at Grupo Alista, I have shipped multi-tenant SaaS platforms, CRMs, websites and automation to production since April 2026 — using an AI-native engineering practice (Claude Code, Codex, MCP tooling) held to mandatory security review and cloud-cost discipline. Before that: 25+ years leading IT at Hewlett-Packard, Morgan Stanley, Clip, Rackspace and The Credit Pros — PCI-compliant payments, multi-cloud and SDLC-driven engineering leadership.",
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
 * Company names, titles, dates and achievement wording. Roles before Grupo
 * Alista are transcribed from the 2026 resume, not summarized.
 */
export const experience: readonly Role[] = [
  {
    company: "Grupo Alista",
    title: "Fractional CTO & Technology Consultant",
    period: "April 2026 – Present",
    location: "Guadalajara, Mexico",
    summary:
      "Technology leadership for a Mexican business group and its clients in health, private security, foreign trade, manufacturing and retail — architecting and personally building their production platforms.",
    achievements: [
      "Architected and shipped DENTALISTA, a multi-tenant dental-practice SaaS (Next.js, PostgreSQL row-level security, AWS CDK, Stripe subscription billing) — 400+ commits and 76 schema migrations, live at dentalista.app and built for Mexican data-privacy law (LFPDPPP).",
      "Built GuardTrack, a guard-patrol platform — Android app (Expo / React Native) plus web console on Supabase — that proves every checkpoint with a signed QR scan, photo and GPS; 240 commits and 26 edge functions delivered in 18 days.",
      "Delivered an attendance, payroll and ISO 9001 platform for a private security firm with 380+ guards and 100+ client accounts (Next.js, Drizzle, PostgreSQL on AWS) — 420 commits since May 2026.",
      "Built CRMs and back-office systems: an AI-assisted consulting back office (quotes, CFDI e-invoice ingestion, bank reconciliation), a cross-platform desktop sales CRM with a 25-stage pipeline, a customs-operations platform and a quote-to-production system for a U.S. manufacturer.",
      "Redesigned and launched 8 production websites (Next.js, Astro, Vite) on AWS S3/CloudFront and Vercel, with bilingual i18n, SEO structured data, CSP hardening and WCAG AA audits at zero axe violations.",
      "Built integrations and automation: a 53-node n8n content engine (fal.ai, Runway, ElevenLabs, Meta and Pinterest APIs), Stripe subscriptions and webhooks, Resend / AWS SES email, CFDI e-invoice parsing and a Claude-powered WhatsApp agent.",
      "Run an AI-native engineering practice — Claude Code with sub-agent orchestration, Codex as independent reviewer, 25+ MCP integrations, spec-driven development and pre-commit security gates — with per-project AWS cost attribution and budget alarms.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "AWS CDK", "Vercel", "Stripe", "Expo", "Claude Code", "n8n"],
  },
  {
    company: "The Credit Pros",
    title: "IT Senior Director",
    period: "March 2022 – March 2026",
    location: "Remote — United States",
    summary:
      "Led enterprise IT strategy, software development, and operations for a U.S. consumer-credit company; managed AWS/Azure infrastructure, cybersecurity, and a portfolio of 5 vendor agencies with offshore development teams. C-level partner to the CTO driving AI-led transformation.",
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
    name: "DENTALISTA",
    blurb:
      "Multi-tenant SaaS for dental clinics: schedule by dentist and chair, clinical record with odontogram, treatment plans, billing and patient balances — each clinic on its own subdomain.",
    highlights: [
      "PostgreSQL row-level security per clinic, infrastructure as code with AWS CDK",
      "Stripe subscription billing, e-signed consents and six clinical PDF formats",
      "400+ commits and 76 schema migrations; built for Mexican data-privacy law (LFPDPPP)",
    ],
    stack: ["Next.js", "Drizzle", "PostgreSQL RLS", "AWS CDK", "Stripe", "Cloudflare"],
    status: "In production",
    url: "https://dentalista.app",
  },
  {
    name: "GuardTrack",
    blurb:
      "Guard-patrol platform for security companies: a guard cannot mark a checkpoint without being there, and the client sees the proof.",
    highlights: [
      "Android app scans a signed QR, takes a photo and records GPS at every checkpoint",
      "Web console, client portal, alerts and scheduled email reports",
      "240 commits and 26 edge functions in 18 days, with pgTAP tests for tenant isolation",
    ],
    stack: ["Expo / React Native", "Next.js", "Supabase", "PostgreSQL RLS", "Resend"],
    status: "In production",
    url: "https://guardtrack.grupoalista.com",
  },
  {
    name: "Workforce-Operations Platform",
    blurb:
      "Attendance, payroll, payouts, uniforms and ISO 9001 for a private security firm — one system instead of a dozen spreadsheets.",
    highlights: [
      "Runs 380+ guards across 100+ client accounts",
      "Payroll rules for bonuses, food vouchers and severance; Excel import and export",
      "Single sign-on hand-off into GuardTrack; 420 commits since May 2026",
    ],
    stack: ["Next.js", "Drizzle", "PostgreSQL", "AWS Amplify", "Amazon S3"],
    status: "In production",
  },
  {
    name: "CRMs & Back-Office Systems",
    blurb:
      "The operational core of small and mid-size businesses: pipeline, quotes, invoicing and reconciliation.",
    highlights: [
      "AI-assisted consulting back office: versioned quotes, CFDI e-invoice ingestion, bank reconciliation",
      "Desktop sales CRM (Windows and macOS) with a 25-stage pipeline and margin calculation",
      "Customs-operations platform and a quote-to-production system for a U.S. manufacturer",
    ],
    stack: ["Next.js", "Prisma", "Electron", "SQLite", "Claude API", "Neon"],
    status: "Delivered",
  },
  {
    name: "Web Platforms",
    blurb:
      "Eight production websites redesigned or launched for a dental SaaS, an import group, an industrial supplier, a U.S. manufacturer and a fashion boutique.",
    highlights: [
      "Static-first builds on AWS S3 + CloudFront and Vercel, behind a CDN from day one",
      "Bilingual i18n, SEO structured data, CSP and consent banners",
      "WCAG AA audited with axe at zero violations",
    ],
    stack: ["Next.js", "Astro", "Vite", "Tailwind", "CloudFront", "Vercel"],
    status: "In production",
  },
  {
    name: "Automation & Integrations",
    blurb:
      "The plumbing that connects LLMs and SaaS APIs to the systems a business actually runs on.",
    highlights: [
      "53-node n8n content engine: fal.ai, Runway and ElevenLabs generation, Meta and Pinterest publishing",
      "Stripe subscriptions and webhooks, Resend and AWS SES email, CFDI e-invoice parsing",
      "Claude-powered WhatsApp agent on the Meta Cloud API, built and pending launch",
    ],
    stack: ["n8n", "Stripe", "Claude API", "WhatsApp Cloud API", "Resend", "FastAPI"],
    status: "In production",
  },
];

/** How the work above gets built. Each item is a rule actually enforced, not a tool list. */
export const aiPractice: readonly PracticeItem[] = [
  {
    title: "Agents, not autocomplete",
    detail:
      "Claude Code as the daily engineering agent, with parallel sub-agents for exploration, review and fan-out work across repositories.",
  },
  {
    title: "A second model reviews every commit",
    detail:
      "Pre-commit gate: static security scan, code review, an independent Codex review, then a security review before anything is pushed.",
  },
  {
    title: "Spec before code",
    detail:
      "Spec-driven development (GitHub spec-kit), written plans and test-driven implementation for any change of three steps or more.",
  },
  {
    title: "25+ MCP integrations",
    detail:
      "Vercel, Supabase, GitHub, Playwright, AWS IaC and pricing, Notion and more — the agent works against real systems, not copies of them.",
  },
  {
    title: "Memory that outlives the session",
    detail:
      "Every project keeps an append-only decision log in an Obsidian vault, so the next session starts where the last one ended.",
  },
  {
    title: "Cloud cost as a design input",
    detail:
      "No high availability before revenue, CDN in front of every origin, per-project cost tags and budget alarms from day one.",
  },
];

export const careerReel: CareerReel = {
  src: "/career-reel.mp4",
  poster: "/career-reel.jpg",
  duration: "1:46",
  caption:
    "Education, the five organizations behind 25 years of IT leadership, the results, what I do today as a fractional CTO, and the platforms I have shipped since April 2026.",
  transcript: [
    "25+ years leading technology. From Fortune 500 operations to shipping AI-built platforms.",
    "Alvaro Garcia — IT & Engineering Executive, Fractional CTO. Guadalajara, Mexico; English and Spanish; open to remote work worldwide.",
    "Education: ITESO, Bachelor of Science in Computer Science & IT. ITESM, Leadership & Management Diploma. Certifications: ITIL v4, AWS, PCI DSS, SOC 2, SOX Audit, Six Sigma / Lean, PMP methodologies, AI Integration & Data Visualization.",
    "Hewlett-Packard, 2001–2014: Service Operations Manager and SAP FI Consultant. 50% fewer month-end-close incidents; a dashboard adopted as the worldwide standard; SAP FI support moved from the US to Mexico with zero SOX findings.",
    "Morgan Stanley, 2015–2020: IT DevOps Manager, Enterprise Network Services. 300+ people, follow-the-sun; 100% SLA/KPI compliance within 90 days; multimillion-dollar budget and vendor contracts.",
    "Clip, 2020–2021: Director of IT Operations at a payments fintech. 20% IT budget reduction; ITIL operations strategy; cloud migration of all internal tools; every department aligned in 6 months.",
    "Rackspace, 2021–2022: Engagement Manager across AWS, GCP and Azure. 10–15 enterprise accounts at once; cost optimization, Agile delivery and escalation management.",
    "The Credit Pros, 2022–2026: IT Senior Director and C-level partner to the CTO. 40% business growth and 25% workforce automation; full IT P&L, 5 vendor agencies, PCI DSS / SOC 2, AI-led transformation.",
    "Results: 40% business growth; 25% workforce automation; 50% better DevOps delivery; 100% SLA compliance in 90 days; 300+ people led worldwide; multimillion-dollar P&L ownership.",
    "Strategy & leadership: Fractional CTO; IT strategy design and execution; P&L and budget management; business needs translated into technology results; communication across departments.",
    "Operations & engineering: ITIL v4 service operations; engineering delivery with SDLC, DevOps and SRE; global multidisciplinary teams in engineering, innovation, project management and operations; tools rolled out for Sales and Support.",
    "Dashboards & automation: C-level executive dashboards; workflow automation with n8n and Zapier; API and third-party integrations; sales and customer-support workflows; AI / LLM integration.",
    "Today, since April 2026: Fractional CTO & Technology Consultant at Grupo Alista, designing and shipping the platforms myself — for clients and for the group.",
    "DENTALISTA: a live multi-tenant SaaS for dental clinics — scheduling, clinical records, odontogram and billing. 400+ commits, Stripe billing, AWS and PostgreSQL.",
    "GuardTrack, for SESPO: guard-patrol tracking where every checkpoint is proven with a signed QR, a photo and GPS. Android app and web console, shipped in 18 days.",
    "SESPO / Mega Seguridad: an attendance, payroll and ISO 9001 platform for security-guard operations across multiple legal entities — 380+ guards.",
    "SackDesk: a desktop sales CRM for an industrial-bag distributor, with a 25-stage pipeline, quotes as PDF and 12 pivot reports.",
    "Grupo 414: a foreign-trade operations platform with 22 legal templates, a customs-document parser and an FX & freight dashboard. Quoting systems: a multi-tenant quoting SaaS on AWS, and a pricing engine with branded PDFs for a U.S. manufacturer.",
    "Also delivered through Grupo Alista: Alista System, a back office for quotes, CFDI e-invoicing, bank reconciliation and AI receipt reading; JobHunt AI, a daily job-portal sweep where an LLM tailors an ATS-clean résumé per opening; and MichiBots, an AI-produced animated kids' series built on Runway, ElevenLabs and an FFmpeg pipeline.",
    "Toolkit: Claude Code, Codex, Claude API, n8n, Zapier, Next.js, React, React Native, TypeScript, Python, PostgreSQL, Supabase, AWS, Azure, GCP, Vercel, Cloudflare, Stripe, WhatsApp API, SAP FICO, Splunk, Jira and Confluence, Monday.com, ITIL v4.",
    "Alvaro Garcia — IT & Engineering Executive, Fractional CTO. Turning business needs into technology results. alvarogarcia.space · linkedin.com/in/algarmat",
  ],
};

export const credentials: Credentials = {
  education: [
    {
      credential: "Bachelor of Science in Computer Science & Information Technology",
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
    group: "AI-native engineering",
    items: [
      "Agentic Software Development (Claude Code, Codex)",
      "Multi-Agent Orchestration & Sub-Agent Workflows",
      "Spec-Driven & Test-Driven Development",
      "MCP Integrations",
      "AI Code & Security Review Gates",
      "Prompt & Context Engineering",
    ],
  },
  {
    group: "Technical",
    items: [
      "Claude Code",
      "Codex",
      "Claude API",
      "Gemini API",
      "MCP",
      "TypeScript",
      "Python",
      "SQL",
      "Next.js",
      "React",
      "React Native / Expo",
      "Astro",
      "Vite",
      "Tailwind CSS",
      "Electron",
      "Node.js",
      "FastAPI",
      "Drizzle ORM",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Neon",
      "Turso / SQLite",
      "AWS (CDK, RDS, S3, CloudFront, Lambda, Amplify, SES)",
      "Azure",
      "GCP",
      "Vercel",
      "Cloudflare",
      "Docker",
      "GitHub Actions",
      "Stripe",
      "WhatsApp Cloud API",
      "Resend",
      "n8n",
      "Zapier",
      "Playwright",
      "Vitest",
      "SAP FICO",
      "Splunk",
      "Atlassian (Jira, Confluence)",
    ],
  },
];

export const dashboards: readonly DashboardMeta[] = [
  {
    slug: "executive",
    period: "Rolling 12 months, Sep 2025 – Aug 2026 · headline values as of 31 Aug 2026",
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
    period: "Rolling 12 months, Sep 2025 – Aug 2026 · headline values as of 31 Aug 2026 · incident queue as of 09:00",
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
    period: "Rolling 12 months, Sep 2025 – Aug 2026 · headline values as of 31 Aug 2026",
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
    period: "Forward-looking four quarters, Q1 – Q4 2027 · status as of 31 Aug 2026",
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
