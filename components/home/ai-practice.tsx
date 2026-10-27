import { aiPractice } from "@/content/profile";
import { Card } from "@/components/ui/primitives";

/** The working rules behind the shipped systems, each a checkable claim. */
export function AiPractice() {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {aiPractice.map((item) => (
        <Card as="li" key={item.title} className="flex flex-col gap-2">
          <h3 className="text-base leading-snug text-text">{item.title}</h3>
          <p className="text-sm leading-relaxed text-text-muted">{item.detail}</p>
        </Card>
      ))}
    </ul>
  );
}
