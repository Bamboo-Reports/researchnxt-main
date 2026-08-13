import type { Metadata } from "next";
import Link from "next/link";
import { HeroIntro } from "@/components/home/hero-intro";
import { TrustedLogos } from "@/components/home/trusted-logos";
import { NavLink } from "@/components/layout/nav-link";
import { Reveal } from "@/components/motion/reveal";
import { ResourceCard } from "@/components/resource-card";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { resourcesNav } from "@/config/nav";
import {
  differentiators,
  engagementSteps,
  featuredInterviews,
  featuredReports,
  hero,
  whatWeDo,
} from "@/content/home";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const [reportsLink, interviewsLink] = resourcesNav;

  return (
    <main id="main">
      {/* Promise over the site's light hero wash: plain white with the soft
          accent gradients the inner-page heroes use, on user direction. The
          orange beam field (`HeroField`) is retired from this band for now;
          the component stays in the repo should it come back. */}
      <Section spacing="none" className="hero-wash border-b border-line">
        <Container className="py-24 sm:py-28 lg:py-36">
          {/* Centred composition: the promise, the lede, then the one action,
              arriving in that order. HeroIntro choreographs the entrance as a
              GSAP timeline; the words of the headline are split into spans so
              it can resolve word by word. The whitespace between spans keeps
              the accessible name one sentence. */}
          <HeroIntro className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="max-w-[22ch] text-balance text-display-sm font-display text-ink">
              {hero.headline.split(" ").map((word, index) => (
                <span key={index}>
                  <span data-hero-word className="inline-block">
                    {word}
                  </span>{" "}
                </span>
              ))}
            </h1>

            <p
              data-hero-lede
              className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft"
            >
              {hero.lede}
            </p>

            <div data-hero-cta className="mt-9">
              <Button href={hero.cta.href}>{hero.cta.label}</Button>
            </div>
          </HeroIntro>
        </Container>
      </Section>

      {/* Featured reports. Cards genuinely are the right affordance here: each
          item is a plate plus its caption, sized alike and scanned in parallel. */}
      <Section surface="subtle" bordered spacing="default">
        <Container>
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured reports"
              title="Latest reports and guides"
              lede="Original research published for business and marketing leaders."
            />
            <NavLink
              item={reportsLink}
              className="group shrink-0 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              All reports
              <TrailingArrow />
            </NavLink>
          </div>

          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredReports.map((report, index) => (
              <ResourceCard
                key={report.href}
                resource={report}
                withPlate
                portrait
                style={step(index)}
              />
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Experts view shares the report-card system so both resource sections
          scan consistently, while the white band keeps them distinct. */}
      <Section bordered spacing="default" className="bg-white">
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
              <TrailingArrow />
            </NavLink>
          </div>

          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredInterviews.map((interview, index) => (
              <ResourceCard
                key={interview.href}
                resource={interview}
                withPlate
                style={step(index)}
              />
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* What we do: the four solutions as stations on one rule, the joined
          timeline grammar the About page uses; the GCC Intelligence card
          goes out to Bamboo Reports, as the nav does. */}
      <Section surface="muted" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={whatWeDo.eyebrow}
            title={whatWeDo.title}
            className="mb-12"
          />
          <Reveal className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.items.map((item, index) => (
              <div
                key={item.title}
                className="row-span-4 grid grid-rows-subgrid gap-y-4 border-t border-line pt-6 sm:pr-8 lg:pr-10"
                style={step(index)}
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-6 self-start rounded-[1px] bg-signal"
                />
                {/* The chosen "\n" break applies once the cards sit in a
                    grid; in the single mobile column it collapses to a
                    space. */}
                <h3 className="text-title font-display-soft sm:whitespace-pre-line">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-accent hover:text-accent-hover"
                  >
                    Visit Bamboo Reports
                    <span className="sr-only"> (opens in a new tab)</span>
                    <TrailingArrow />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-accent hover:text-accent-hover"
                  >
                    Explore
                    <span className="sr-only"> {item.title}</span>
                    <TrailingArrow />
                  </Link>
                )}
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* How an engagement runs: the four steps as cards, numbered because
          the order is the information. The closing Engage card is the
          band's one saturated moment on the accent blue, the stats-bento
          feature treatment; its outcome line is white because brand orange
          is never text on any surface. */}
      <Section bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={engagementSteps.eyebrow}
            title={engagementSteps.title}
            className="mb-12"
          />
          {/* No auto-rows-fr here: the subgrid alone keeps the four cards'
              rows level, and fr rows would stretch the cards with dead
              space. */}
          <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {engagementSteps.steps.map((stage, index) => {
              const closing = index === engagementSteps.steps.length - 1;

              return (
                <div
                  key={stage.name}
                  className={`row-span-4 grid grid-rows-subgrid gap-y-2.5 rounded-md p-5 sm:p-6 ${
                    closing ? "bg-accent" : "border border-line bg-surface"
                  }`}
                  style={step(index)}
                >
                  <p
                    className={`flex items-center gap-3 text-sm font-semibold ${
                      closing ? "text-white/85" : "text-accent"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-1.5 shrink-0 rounded-[1px] ${
                        closing ? "bg-white/60" : "bg-signal"
                      }`}
                    />
                    Step {index + 1}
                  </p>
                  <h3
                    className={`text-title font-display-soft ${
                      closing ? "text-white" : "text-ink"
                    }`}
                  >
                    {stage.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      closing ? "text-white/85" : "text-ink-soft"
                    }`}
                  >
                    {stage.description}
                  </p>
                  <p
                    className={`self-end text-sm font-semibold ${
                      closing ? "text-white" : "text-accent"
                    }`}
                  >
                    {stage.outcome}
                  </p>
                </div>
              );
            })}
          </Reveal>
        </Container>
      </Section>

      {/* Why Research NXT. Bento tiles in the same system as the About stats:
          the lead claim carries the brand blue as the double-height feature
          tile, the rest stay quiet white so the highlight reads once. */}
      <Section bordered spacing="default">
        <Container>
          {/* No max-width on this one: the long title needs the full container
              to settle onto two balanced lines at desktop widths. */}
          <SectionHeading
            eyebrow={differentiators.eyebrow}
            title={differentiators.title}
            className="mb-12"
          />
          <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr">
            {differentiators.items.map((item, index) => {
              const tiles = [
                "sm:col-span-2 lg:row-span-2 bg-accent text-white",
                "sm:col-span-2 border border-line bg-surface",
                "border border-line bg-surface",
                "border border-line bg-surface",
              ] as const;
              const inverted = index === 0;

              return (
                <div
                  key={item.title}
                  className={`flex min-h-36 flex-col justify-between gap-6 rounded-md p-6 sm:p-7 ${tiles[index % tiles.length]}`}
                  style={step(index)}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1 w-6 rounded-[1px] ${
                      inverted ? "bg-white/60" : "bg-signal"
                    }`}
                  />
                  <div className="flex flex-col gap-1.5">
                    <h3
                      className={`font-display-soft ${
                        index === 0 ? "text-headline" : "text-title"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        inverted ? "text-white" : "text-ink-soft"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </Container>
      </Section>

      {/* Customer marks borrowed from the Bamboo Reports platform treatment,
          adapted to this site's measured section-heading system. */}
      <Section bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Trusted by"
            title="Teams building what comes next"
            lede="Organisations that have trusted our research, intelligence and engagement programmes."
            className="mb-12 max-w-3xl"
          />
          <TrustedLogos />
        </Container>
      </Section>
    </main>
  );
}
