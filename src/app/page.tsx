import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceField } from "@/components/home/evidence-field";
import { HeroQuestions } from "@/components/home/hero-questions";
import { CTABand } from "@/components/layout/cta-band";
import { NavLink } from "@/components/layout/nav-link";
import { FigureValue } from "@/components/motion/figure-value";
import { Reveal } from "@/components/motion/reveal";
import { ResourceCard } from "@/components/resource-card";
import { Badge } from "@/components/ui/badge";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DataPlate } from "@/components/ui/data-plate";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { resourcesNav } from "@/config/nav";
import {
  differentiators,
  ecosystem,
  featuredInterviews,
  featuredReports,
  hero,
  homeStats,
  recognition,
  solutionCards,
} from "@/content/home";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const [reportsLink, interviewsLink] = resourcesNav;

  return (
    <main id="main">
      {/* ------------------------------------------------------------------
          Hero. The headline is fixed and the questions carry the motion: one
          at a time, on a dwell timer, steerable from the tracks beneath them.
          Spending the movement on one element keeps the band calm.
      ------------------------------------------------------------------ */}
      <Section surface="deep" spacing="none" className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <EvidenceField />
          {/* Holds the left half dark enough for the display type to sit on. */}
          <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/75 to-transparent" />
        </div>

        <Container className="relative pb-14 pt-20 sm:pb-16 sm:pt-28 lg:pt-36">
          <h1 className="max-w-[19ch] text-display font-display text-white">
            {hero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <HeroQuestions questions={hero.questions} />

          <div className="mt-12 flex flex-wrap gap-3">
            <Button href={hero.primary.href} size="lg" variant="on-deep">
              {hero.primary.label}
            </Button>
            <Button
              href={hero.secondary.href}
              size="lg"
              variant="on-deep-quiet"
              className="group"
            >
              {hero.secondary.label}
              <TrailingArrow />
            </Button>
          </div>
        </Container>

        {/* The figures. A plain list rather than a definition list, because a
            `dl` forces the label ahead of the value in the DOM: reading the
            value first is both the better composition and the natural reading
            order, and this way what is seen, copied and announced all agree.

            The row is padded on both sides of the rule, so the column dividers
            span exactly the entries and the figures are never clipped by the
            band edge. */}
        <Container className="relative">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-deep-line py-12 sm:gap-x-12 lg:grid-cols-4 lg:py-16">
            {homeStats.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col gap-2.5 lg:border-l lg:border-deep-line lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <p className="text-4xl font-display leading-none text-white">
                  <FigureValue value={stat.value} />
                </p>
                <p className="max-w-[18ch] text-sm leading-snug text-on-deep">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
          Solutions. Ruled rows rather than three identical cards: each one
          gets its own plate, and the row itself is the hit target.
      ------------------------------------------------------------------ */}
      <Section spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Solutions"
            title="Three ways we help B2B marketing teams"
            className="mb-12 max-w-3xl"
          />

          <Reveal as="ul" className="flex flex-col border-b border-line">
            {solutionCards.map((solution, index) => (
              <li key={solution.href} style={step(index)}>
                <Link
                  href={solution.href}
                  className="group grid items-center gap-x-8 gap-y-4 border-t border-line py-8 transition-colors duration-200 hover:border-accent lg:grid-cols-[4rem_1fr_14rem_auto]"
                >
                  <span
                    aria-hidden="true"
                    className="font-figure text-sm text-ink-muted transition-colors group-hover:text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-title font-display-soft transition-colors duration-200 group-hover:text-accent">
                      {solution.title}
                    </h3>
                    <p className="max-w-[52ch] text-sm leading-relaxed text-ink-soft">
                      {solution.description}
                    </p>
                  </div>

                  <DataPlate
                    seed={solution.href}
                    aspect="wide"
                    className="hidden w-full lg:block"
                  />

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Explore
                    <TrailingArrow />
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>

          <div className="mt-10">
            <Button href="/solutions" variant="secondary" className="group">
              View all solutions
              <TrailingArrow />
            </Button>
          </div>
        </Container>
      </Section>

      {/* Featured reports. Cards genuinely are the right affordance here: each
          item is a plate plus its caption, sized alike and scanned in parallel. */}
      <Section surface="subtle" bordered spacing="default">
        <Container>
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Research"
              title="Latest reports and guides"
              lede="Original research published for business and marketing leaders."
            />
            <NavLink
              item={reportsLink}
              className="group shrink-0 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              All reports
            </NavLink>
          </div>

          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredReports.map((report, index) => (
              <ResourceCard
                key={report.href}
                resource={report}
                withPlate
                style={step(index)}
              />
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Experts view. Deliberately not plated: these are people talking, so
          the treatment is a ruled two-column list, not another grid of images. */}
      <Section bordered spacing="default">
        <Container>
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Experts view"
              title="Perspectives from the people doing the work"
              lede="Interviews with thought leaders, buyers and vendors across B2B technology."
            />
            <NavLink
              item={interviewsLink}
              className="group shrink-0 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              All interviews
            </NavLink>
          </div>

          <Reveal as="ul" className="grid gap-x-12 sm:grid-cols-2">
            {featuredInterviews.map((interview, index) => (
              <li key={interview.href} style={step(index)}>
                <a
                  href={interview.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 border-t border-line py-6 transition-colors duration-200 hover:border-accent"
                >
                  <Badge className="self-start">{interview.kind}</Badge>
                  <h3 className="clamp-2 text-title font-display-soft transition-colors duration-200 group-hover:text-accent">
                    {interview.title}
                  </h3>
                  <p className="clamp-2 text-sm leading-relaxed text-ink-soft">
                    {interview.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
                    Read More
                    <TrailingArrow />
                  </span>
                </a>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Why Research NXT. Each claim leads with the thing that proves it. */}
      <Section bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={differentiators.eyebrow}
            title={differentiators.title}
            className="mb-12 max-w-4xl"
          />
          <Reveal className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.items.map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 border-t border-line pt-5"
                style={step(index)}
              >
                <span
                  aria-hidden="true"
                  className="mb-1 h-1 w-6 rounded-[1px] bg-signal"
                />
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Recognition and ecosystem, read as one proof band rather than two. */}
      <Section surface="muted" bordered spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <SectionHeading
              eyebrow={recognition.eyebrow}
              title={recognition.title}
              lede={ecosystem.lede}
            />

            <div className="flex flex-col gap-10">
              <ul className="flex flex-wrap gap-3">
                {recognition.awards.map((award) => (
                  <li
                    key={award}
                    className="inline-flex items-center gap-2.5 rounded-md border border-line-strong bg-surface px-4 py-3 text-sm font-semibold"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-[1px] bg-signal"
                    />
                    {award}
                  </li>
                ))}
              </ul>

              {/* Borders rather than a gap grid, so a ragged last row stays
                  clean however many partners the list grows to. */}
              <Reveal
                as="ul"
                className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-4"
              >
                {ecosystem.names.map((name, index) => (
                  <li
                    key={name}
                    className="flex h-20 items-center justify-center border-b border-r border-line bg-surface px-3 text-center text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-ink"
                    style={step(index)}
                  >
                    {name}
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CTABand />
    </main>
  );
}
