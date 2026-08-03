import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { StatsBand } from "@/components/stats-band";
import { accentedTitle } from "@/components/ui/accented-title";
import { Button, TrailingArrow } from "@/components/ui/button";
import { CapabilityIcon } from "@/components/ui/capability-icon";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSolution, solutions } from "@/content/solutions";
import { step } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { SolutionPage as SolutionPageContent } from "@/content/types";

type Params = { params: Promise<{ slug: string }> };

/**
 * Mid-page statement band. The outcome statements all read as equations, so
 * the template splits on " = " and draws the equals sign as the orange signal
 * mark rather than setting it as type. The full sentence stays in the DOM for
 * readers.
 */
function OutcomeSection({
  outcome,
}: {
  outcome: SolutionPageContent["outcome"];
}) {
  const sides = outcome.statement.split(" = ");
  const equation = sides.length === 2 ? sides : null;

  return (
    <Section surface="muted" bordered spacing="tight">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          {/* The statement is one line by design: the size clamps against the
              viewport at desktop widths so even the longest equation fits
              without wrapping, and only stacks below lg. */}
          {equation ? (
            <p className="font-display-soft text-ink text-[clamp(1.5rem,6vw,2rem)] lg:text-[clamp(1rem,1.65vw,2rem)]">
              <span className="sr-only">{outcome.statement}</span>
              <span
                aria-hidden="true"
                className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 lg:flex-nowrap lg:whitespace-nowrap"
              >
                <span>{equation[0]}</span>
                <span className="flex shrink-0 flex-col gap-1.5">
                  <span className="h-1 w-6 rounded-[1px] bg-signal" />
                  <span className="h-1 w-6 rounded-[1px] bg-signal" />
                </span>
                <span className="text-accent">{equation[1]}</span>
              </span>
            </p>
          ) : (
            <p className="text-headline font-display-soft text-ink">
              {outcome.statement}
            </p>
          )}

          {outcome.description ? (
            <p className="max-w-[62ch] text-base leading-relaxed text-ink-soft">
              {outcome.description}
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};

  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    alternates: { canonical: `/solutions/${solution.slug}` },
  };
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const capabilityCount = solution.capabilities.items.length;

  return (
    <main id="main">
      <PageHero
        eyebrow={solution.hero.eyebrow || undefined}
        title={solution.hero.headline}
        lede={solution.hero.lede}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            href={solution.hero.primary.href}
            external={solution.hero.primary.external}
          >
            {solution.hero.primary.label}
          </Button>
          {solution.hero.secondary ? (
            <Button
              href={solution.hero.secondary.href}
              external={solution.hero.secondary.external}
              variant="secondary"
              className="group"
            >
              {solution.hero.secondary.label}
              <TrailingArrow />
            </Button>
          ) : null}
        </div>
      </PageHero>

      {/* Proposition. Mirrors the old page's structure: two-tone headline,
          a short orange rule, then the argument beneath. */}
      <Section spacing="default">
        <Container>
          <div className="flex flex-col gap-6">
            <h2
              className={cn(
                "text-headline font-display-soft",
                solution.proposition.singleLine &&
                  "lg:whitespace-nowrap lg:text-[clamp(1.25rem,2.5vw,2.125rem)]",
              )}
            >
              {accentedTitle(solution.proposition.title)}
            </h2>
            <span
              aria-hidden="true"
              className="h-0.5 w-12 rounded-[1px] bg-signal"
            />
            <div className="flex flex-col gap-5">
              {solution.proposition.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <OutcomeSection outcome={solution.outcome} />

      <Section surface="subtle" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={solution.capabilities.eyebrow}
            title={accentedTitle(solution.capabilities.title)}
            lede={solution.capabilities.lede}
            className={solution.capabilities.body ? "mb-6" : "mb-12"}
          />

          {solution.capabilities.body ? (
            <div className="mb-12 flex flex-col gap-5">
              {solution.capabilities.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          {/* Subgrid rows keep every card's icon, title and list on shared
              baselines, however many lines a title wraps to. */}
          <Reveal
            className={cn(
              "grid gap-x-10 gap-y-12",
              capabilityCount === 2 && "lg:grid-cols-2",
              capabilityCount === 3 && "sm:grid-cols-2 lg:grid-cols-3",
              capabilityCount >= 4 && "sm:grid-cols-2 lg:grid-cols-4",
            )}
          >
            {solution.capabilities.items.map((capability, index) => (
              <div
                key={capability.title}
                className="grid grid-rows-subgrid row-span-3 gap-y-4 border-t border-line pt-6"
                style={step(index)}
              >
                {capability.icon ? (
                  <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-md bg-accent-soft text-accent"
                  >
                    <CapabilityIcon name={capability.icon} className="size-5" />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="mt-4 h-1 w-6 self-start rounded-[1px] bg-signal"
                  />
                )}
                {/* The chosen "\n" break only applies once the cards sit in a
                    grid; in the single mobile column it collapses to a space. */}
                <h3 className="text-title font-display-soft sm:whitespace-pre-line">
                  {capability.title}
                </h3>
                <div className="flex flex-col gap-4">
                  {capability.description ? (
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {capability.description}
                    </p>
                  ) : null}
                  {capability.points ? (
                    <ul className="flex flex-col gap-2.5 border-t border-line pt-4">
                      {capability.points.map((point, pointIndex) => (
                        <li
                          key={typeof point === "string" ? point : point.label}
                          className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 rounded-[1px] bg-line-strong"
                          />
                          {typeof point === "string" ? (
                            point
                          ) : (
                            <button
                              type="button"
                              aria-describedby={`capability-tooltip-${solution.slug}-${index}-${pointIndex}`}
                              className="group/tooltip relative cursor-help rounded-[1px] border-b border-dotted border-line-strong text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                            >
                              {point.label}
                              <span
                                id={`capability-tooltip-${solution.slug}-${index}-${pointIndex}`}
                                role="tooltip"
                                className="pointer-events-none invisible absolute bottom-full left-0 z-20 mb-2 w-max max-w-56 rounded-md bg-ink px-3 py-2 text-xs font-medium leading-snug text-white opacity-0 shadow-lg transition-opacity group-hover/tooltip:visible group-hover/tooltip:opacity-100 group-focus/tooltip:visible group-focus/tooltip:opacity-100"
                              >
                                {point.tooltip}
                              </span>
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {solution.detail ? <StatsBand stats={solution.detail.stats} /> : null}
    </main>
  );
}
