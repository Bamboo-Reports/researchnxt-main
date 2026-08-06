import { Reveal } from "@/components/motion/reveal";
import { ReportCard } from "@/components/report-card";
import { step } from "@/lib/motion";
import type { ReportCardItem } from "@/content/resources";

/**
 * Card grid used by the report landing's expert insights tabs. The card
 * itself lives in `report-card.tsx`, shared with the scrolling rail.
 *
 * Three columns rather than four: the grid now sits beside the tab rail, not
 * across the full container, so quarters would leave the cards too narrow for
 * their titles.
 */
export function ReportCardGrid({ items }: { items: ReportCardItem[] }) {
  return (
    <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <ReportCard key={item.title} item={item} style={step(index)} />
      ))}
    </Reveal>
  );
}
