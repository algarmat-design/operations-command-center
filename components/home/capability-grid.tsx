import Link from "next/link";
import { capabilities } from "@/content/profile";
import { CapabilityIcon } from "@/components/ui/capability-icon";

/**
 * Two pieces of numeric evidence per capability. That is the whole point of the
 * section — it is what separates this from a list of buzzwords.
 */
export function CapabilityGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {capabilities.map((c) => (
        <li key={c.id} className="bg-surface">
          <Link
            href={`/capabilities#${c.id}`}
            className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-surface-sunken"
          >
            <span className="text-accent">
              <CapabilityIcon name={c.icon} />
            </span>

            <h3 className="text-base leading-snug text-text group-hover:text-accent">{c.name}</h3>

            <p className="text-sm leading-relaxed text-text-muted">{c.blurb}</p>

            <ul className="mt-auto flex flex-col gap-2 border-t border-line pt-3">
              {c.evidence.slice(0, 2).map((e) => (
                <li key={e} className="flex gap-2 text-[13px] leading-snug text-text-muted">
                  <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ul>
  );
}
