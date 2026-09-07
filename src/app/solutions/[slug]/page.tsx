import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { StatsBand } from "@/components/stats-band";
import { accentedTitle } from "@/components/ui/accented-title";
import { Button, TrailingArrow } from "@/components/ui/button";
import { CapabilityIcon } from "@/components/ui/capability-icon";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSolution, solutions } from "@/content/solutions";
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
    <Section spacing="tight" className="bg-accent text-white">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          {/* The statement is one line by design: the size clamps against the
              viewport at desktop widths so even the longest equation fits
              without wrapping, and only stacks below lg. */}
          {equation ? (
            <p className="font-display-soft text-[clamp(1.5rem,6vw,2rem)] lg:text-[clamp(1rem,1.65vw,2rem)]">
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
                <span>{equation[1]}</span>
              </span>
            </p>
          ) : (
            <p className="text-headline font-display-soft">
              {outcome.statement}
            </p>
          )}

          {outcome.description ? (
            <p className="max-w-[62ch] text-base leading-relaxed">
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
        eyebrow="Solution"
        title={solution.hero.headline}
        lede={solution.hero.lede}
        backgroundImage={`/hero-backgrounds/${solution.slug}.png`}
      >
              <div className="flex flex-wrap gap-3">
                <Button
                  href={solution.hero.primary.href}
                  external={solution.hero.primary.external}
                  className="h-auto min-h-11 py-3 text-center"
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

      {/* Preserve content order while giving each paragraph a readable measure. */}
      <Section spacing="default">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
            <h2
              className={cn(
                "text-headline font-display-soft lg:col-span-2 lg:max-w-5xl",
                solution.proposition.singleLine &&
                  "lg:whitespace-nowrap lg:text-[clamp(1.25rem,2.5vw,2.125rem)]",
              )}
            >
              {accentedTitle(solution.proposition.title)}
            </h2>
            <div className={cn(
              "grid gap-6 lg:col-span-2",
              solution.slug !== "prospect-database" && "lg:grid-cols-2 lg:gap-16",
            )}>
              {solution.proposition.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className={cn(
                    "text-base leading-relaxed text-ink-soft sm:text-lg",
                    solution.slug !== "prospect-database" && "max-w-[65ch]",
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <OutcomeSection outcome={solution.outcome} />

      <Section surface="bright" spacing="default">
        <Container>
          <SectionHeading
            eyebrow={solution.capabilities.eyebrow}
            title={accentedTitle(solution.capabilities.title)}
            lede={solution.capabilities.lede}
            className={solution.capabilities.body ? "mb-6" : "mb-12"}
          />

          {solution.capabilities.body ? (
            <div className="mb-12 grid gap-5 lg:grid-cols-2 lg:gap-16">
              {solution.capabilities.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[65ch] text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          {/* Capabilities stay visible at every viewport, without a carousel. */}
          <div className={cn(
            "grid gap-10",
            capabilityCount === 2 && "md:grid-cols-2 md:gap-8",
            capabilityCount === 3 && "lg:grid-cols-3 lg:gap-12",
            capabilityCount >= 4 && "md:grid-cols-2 md:gap-x-16 md:gap-y-12",
          )}>
            {solution.capabilities.items.map((capability, index) => (
              <article key={capability.title} className={cn(
                "min-w-0 border-t border-line-strong pt-8",
                capabilityCount === 2 && "rounded-xl border-0 bg-surface-subtle p-6 sm:p-9",
                capabilityCount >= 4 && "grid grid-cols-[auto_1fr] content-start gap-x-5 sm:gap-x-7",
              )}>
                  {capability.icon ? (
                    <span
                      aria-hidden="true"
                      className="mb-6 grid size-12 shrink-0 place-items-center text-accent"
                    >
                      <CapabilityIcon
                        name={capability.icon}
                        className="size-10"
                      />
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="mt-4 h-1 w-6 self-start rounded-[1px] bg-signal"
                    />
                  )}
                  <h3 className="mb-5 self-center text-title font-display-soft">
                    {capability.title}
                  </h3>
                  <div className={cn("flex flex-col gap-4", capabilityCount >= 4 && "col-start-2")}>
                    {capability.description ? (
                      <p className="text-sm leading-relaxed text-ink-soft">
                        {capability.description}
                      </p>
                    ) : null}
                    {capability.points ? (
                      <ul className="flex flex-col divide-y divide-line">
                        {capability.points.map((point, pointIndex) => (
                          <li
                            key={
                              typeof point === "string" ? point : point.label
                            }
                            className="flex items-start gap-3 py-3 text-base leading-relaxed text-ink-soft"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 size-1 shrink-0 rounded-full bg-accent"
                            />
                            {typeof point === "string" ? (
                              point
                            ) : (
                              <button
                                type="button"
                                /* The tooltip sits inside the button so hover
                                 and focus reach it; aria-label keeps it out
                                 of the button's name, so it is announced
                                 once, as the description. */
                                aria-label={point.label}
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
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {solution.detail ? <StatsBand stats={solution.detail.stats} /> : null}
    </main>
  );
}
