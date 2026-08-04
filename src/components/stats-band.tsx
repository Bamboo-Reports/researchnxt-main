import { FigureValue } from "@/components/motion/figure-value";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Stat } from "@/content/types";
import { step } from "@/lib/motion";

/**
 * Shared numbers band, used on About and the solution pages. The homepage does
 * not use it: its figures are read off the hero's own axis instead, so the
 * treatment is not repeated twice on one page.
 *
 * Set as a bento grid: the first stat is the feature tile, double-height on
 * the solid accent blue so the band carries one saturated moment; the rest
 * stay quiet white tiles. Tile order therefore matters when authoring the
 * stats array: lead with the strongest figure.
 */

const tileStyles = [
  "sm:col-span-2 lg:row-span-2 bg-accent text-white",
  "sm:col-span-2 border border-line bg-surface",
  "border border-line bg-surface",
  "border border-line bg-surface",
] as const;

/** The bento grid alone, for embedding inside another section's flow. */
export function StatsBento({ stats }: { stats: Stat[] }) {
  return (
    <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr">
      {stats.map((stat, index) => {
        const feature = index % tileStyles.length === 0;
        const inverted = feature;

        return (
          <div
            key={stat.label}
            className={`flex min-h-36 flex-col justify-between gap-6 rounded-md p-6 sm:p-7 ${
              tileStyles[index % tileStyles.length]
            }`}
            style={step(index)}
          >
            <span
              aria-hidden="true"
              className={`h-1 w-6 rounded-[1px] ${
                inverted ? "bg-white/60" : "bg-signal"
              }`}
            />
            <div className="flex flex-col gap-1.5">
              <span
                className={`font-display ${
                  feature
                    ? "text-5xl sm:text-6xl lg:text-7xl"
                    : "text-4xl sm:text-5xl"
                }`}
              >
                <FigureValue value={stat.value} />
              </span>
              <span
                className={`text-sm ${
                  inverted ? "text-white/85" : "text-ink-soft"
                }`}
              >
                {stat.label}
              </span>
            </div>
          </div>
        );
      })}
    </Reveal>
  );
}

/** Standalone band wrapper, for pages that show the figures as their own strip. */
export function StatsBand({ stats }: { stats: Stat[] }) {
  return (
    <Section surface="subtle" bordered spacing="tight">
      <Container>
        <StatsBento stats={stats} />
      </Container>
    </Section>
  );
}
