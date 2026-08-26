import Link from "next/link";
import { dashboards } from "@/content/profile";
import { DashboardThumbnail } from "@/components/dashboards/thumbnail";
import { Eyebrow } from "@/components/ui/primitives";

export function DashboardCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {dashboards.map((d) => (
        <li key={d.slug} className="relative">
          <article className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-colors hover:border-line-strong">
            <DashboardThumbnail slug={d.slug} />

            <div className="flex flex-col gap-2">
              <Eyebrow>{d.framework}</Eyebrow>
              <h3 className="text-lg leading-snug text-text">
                {/* Overlay link: the whole card is clickable, but the heading
                    stays the accessible name of the single link. */}
                <Link href={`/dashboards/${d.slug}`} className="after:absolute after:inset-0 hover:text-accent">
                  {d.title}
                </Link>
              </h3>
            </div>

            <dl className="flex flex-col gap-2 border-t border-line pt-3 text-sm">
              <div className="flex gap-3">
                <dt className="num w-16 shrink-0 text-[11px] uppercase tracking-[0.14em] text-text-faint">For</dt>
                <dd className="text-text-muted">{d.audience}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="num w-16 shrink-0 text-[11px] uppercase tracking-[0.14em] text-text-faint">Asks</dt>
                <dd className="text-text-muted">{d.question}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="num w-16 shrink-0 text-[11px] uppercase tracking-[0.14em] text-text-faint">Period</dt>
                <dd className="num text-xs text-text-faint">{d.period.split(" · ")[0]}</dd>
              </div>
            </dl>
          </article>
        </li>
      ))}
    </ul>
  );
}
