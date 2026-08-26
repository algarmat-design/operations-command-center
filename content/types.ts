/**
 * Content model for the site.
 *
 * Every string a visitor reads that describes Alvaro — his CV, his metrics, his
 * contact details — is typed here and authored in `content/`. Components render
 * these values; they never hardcode them.
 *
 * Erasable syntax only (no `enum`, no `namespace`, no parameter properties) so
 * these modules stay importable by the Node type-stripping scripts in `scripts/`.
 */

export interface Identity {
  /** Unaccented, matching the resume PDF that already circulates. */
  readonly name: string;
  /** Accented form, surfaced as JSON-LD `alternateName`. */
  readonly alternateName: string;
  readonly title: string;
  readonly tagline: string;
  readonly location: string;
  readonly timezone: string;
  readonly email: string;
  readonly phone: string;
  /** E.164 digits, for the wa.me link. */
  readonly whatsapp: string;
  readonly linkedin: string;
  /** Display form of the LinkedIn URL, e.g. "linkedin.com/in/handle". */
  readonly linkedinHandle: string;
  readonly github: string;
  readonly site: string;
  readonly availability: string;
  /** Filename served to the browser by the Download CV button. */
  readonly resumeFileName: string;
}

export interface ProofPoint {
  readonly value: string;
  readonly label: string;
}

export interface Positioning {
  readonly headline: string;
  readonly subhead: string;
  readonly summary: string;
  readonly proofPoints: readonly ProofPoint[];
}

/** Keys of the inline icon set in `components/ui/capability-icon.tsx`. */
export type CapabilityIcon =
  | "strategy"
  | "team"
  | "ai"
  | "devops"
  | "cloud"
  | "compliance"
  | "payments"
  | "platform";

export interface Capability {
  readonly id: string;
  readonly name: string;
  readonly blurb: string;
  /** Each entry leads with a number. That is what makes the claim checkable. */
  readonly evidence: readonly string[];
  readonly tags: readonly string[];
  readonly icon: CapabilityIcon;
}

export interface RoleFit {
  readonly archetype: string;
  readonly forWhom: string;
  readonly why: string;
  readonly signals: readonly string[];
}

export interface Role {
  readonly company: string;
  readonly title: string;
  readonly period: string;
  readonly location: string;
  readonly summary: string;
  readonly achievements: readonly string[];
  readonly stack: readonly string[];
}

export interface Project {
  readonly name: string;
  readonly blurb: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
}

export interface EducationEntry {
  readonly credential: string;
  readonly institution: string;
}

export interface Credentials {
  readonly education: readonly EducationEntry[];
  readonly certifications: readonly string[];
  readonly languages: readonly string[];
}

export interface SkillGroup {
  readonly group: string;
  readonly items: readonly string[];
}

export type DashboardSlug = "executive" | "it-operations" | "devops" | "roadmap";

export interface DashboardMeta {
  readonly slug: DashboardSlug;
  readonly title: string;
  /** Short label used in nav and cards. */
  readonly shortTitle: string;
  readonly framework: string;
  readonly audience: string;
  readonly question: string;
  readonly whatItProves: string;
  readonly metrics: readonly string[];
}
