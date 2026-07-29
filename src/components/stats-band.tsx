import { FigureValue } from "@/components/motion/figure-value";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Stat } from "@/content/types";

/**
 * Shared numbers strip, used on About and the solution pages. The homepage does
 * not use it: its figures are read off the hero's own axis instead, so the
 * treatment is not repeated twice on one page.
 *
 * Hairlines come from the grid gap rather than per-cell borders, so the rules
 * hold at every wrap.
 */
export function StatsBand({
  stats,
  surface = "muted",
}: {
  stats: Stat[];
  surface?: "muted" | "subtle" | "deep";
}) {
  const deep = surface === "deep";

  return (
    <Section surface={surface} bordered spacing="tight">
      <Container>
        <dl
          className={`grid grid-cols-2 gap-px lg:grid-cols-4 ${
            deep ? "bg-deep-line" : "bg-line"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-1.5 px-1 py-6 sm:px-4 ${
                deep ? "bg-deep" : surface === "subtle" ? "bg-surface-subtle" : "bg-surface-muted"
              }`}
            >
              <dt
                className={
                  deep ? "order-2 text-sm text-on-deep" : "order-2 text-sm text-ink-soft"
                }
              >
                {stat.label}
              </dt>
              <dd
                className={
                  deep
                    ? "order-1 text-3xl font-display text-white sm:text-4xl"
                    : "order-1 text-3xl font-display text-ink sm:text-4xl"
                }
              >
                <FigureValue value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
