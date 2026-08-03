import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { StatsBand } from "@/components/stats-band";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSolution, solutions } from "@/content/solutions";
import { step } from "@/lib/motion";

type Params = { params: Promise<{ slug: string }> };

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

  const others = solutions.filter((item) => item.slug !== solution.slug);

  return (
    <main id="main">
      <PageHero
        eyebrow={solution.hero.eyebrow}
        title={solution.hero.headline}
        lede={solution.hero.lede}
        plateSeed={solution.slug}
        plateLabel={solution.navLabel}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            href={solution.hero.primary.href}
            external={solution.hero.primary.external}
            variant="on-deep"
          >
            {solution.hero.primary.label}
          </Button>
          {solution.hero.secondary ? (
            <Button
              href={solution.hero.secondary.href}
              external={solution.hero.secondary.external}
              variant="on-deep-quiet"
              className="group"
            >
              {solution.hero.secondary.label}
              <TrailingArrow />
            </Button>
          ) : null}
        </div>
      </PageHero>

      {/* Proposition. The heading sits opposite the argument rather than above
          it, so the two read as claim and evidence. */}
      <Section spacing="default">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <h2 className="text-headline font-display-soft">
              {solution.proposition.title}
            </h2>
            <div className="flex max-w-[68ch] flex-col gap-5">
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

      <Section surface="subtle" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title={solution.capabilities.title}
            lede={solution.capabilities.lede}
            className="mb-12 max-w-3xl"
          />

          <Reveal
            className={
              solution.capabilities.items.length === 2
                ? "grid gap-x-10 gap-y-10 lg:grid-cols-2"
                : "grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
            }
          >
            {solution.capabilities.items.map((capability, index) => (
              <div
                key={capability.title}
                className="flex flex-col gap-3 border-t border-line pt-5"
                style={step(index)}
              >
                <span
                  aria-hidden="true"
                  className="mb-1 h-1 w-6 rounded-[1px] bg-signal"
                />
                <h3 className="text-title font-display-soft">
                  {capability.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {capability.description}
                </p>
                {capability.points ? (
                  <ul className="mt-2 flex flex-col gap-2 border-t border-line pt-4">
                    {capability.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-[1px] bg-line-strong"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {solution.detail ? <StatsBand stats={solution.detail.stats} /> : null}

      {/* Outcome. One statement, set large and alone: the page's quiet moment. */}
      <Section bordered spacing="default">
        <Container width="narrow">
          <div className="flex flex-col items-center gap-6 text-center">
            <span
              aria-hidden="true"
              className="h-1 w-8 rounded-[1px] bg-signal"
            />
            <p className="text-headline font-display-soft">
              {solution.outcome.statement}
            </p>
            <p className="max-w-[62ch] text-base leading-relaxed text-ink-soft">
              {solution.outcome.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Cross-links keep every solution page reachable from every other. */}
      <Section surface="subtle" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Also from Research NXT"
            title="Other solutions"
            size="title"
            className="mb-8"
          />
          <Reveal as="ul" className="flex flex-col border-b border-line">
            {others.map((other, index) => (
              <li key={other.slug} style={step(index)}>
                <Link
                  href={`/solutions/${other.slug}`}
                  className="group grid gap-x-8 gap-y-2 border-t border-line py-6 transition-colors duration-200 hover:border-accent lg:grid-cols-[16rem_1fr_auto] lg:items-center"
                >
                  <h3 className="text-title font-display-soft transition-colors duration-200 group-hover:text-accent">
                    {other.navLabel}
                  </h3>
                  <p className="clamp-2 text-sm leading-relaxed text-ink-soft">
                    {other.hero.lede}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Explore
                    <TrailingArrow />
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CTABand
        title={solution.cta.title}
        lede={solution.cta.lede}
        primary={solution.cta.primary}
        secondary={solution.cta.secondary}
      />
    </main>
  );
}
