import type { Metadata } from "next";
import { HeroField } from "@/components/home/hero-field";
import { HeroIntro } from "@/components/home/hero-intro";
import { HeroQuestions } from "@/components/home/hero-questions";
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
  featuredInterviews,
  featuredReports,
  hero,
} from "@/content/home";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const [reportsLink, interviewsLink] = resourcesNav;

  return (
    <main id="main">
      {/* Problem-to-promise over a luminous beam field, after the Shinkei
          reference the user supplied. The field renders in `HeroField`: four
          CSS layers documented with the `.hero-field` block in globals.css
          (vivid base wash, stepped beam system, counter-flowing light sweep,
          grain), with GSAP adding the load settle and pointer parallax on
          their shared wrapper. White copy sits straight on the field as in
          the reference; the base wash weights its deep pocket through the
          copy column so the headline clears display contrast.

          Nothing here is an image, so the field costs no download and scales
          to any viewport. The drift is gated behind `data-motion`, and the
          reduced-motion block stops it outright. */}
      <Section
        spacing="none"
        className="on-signal relative isolate overflow-hidden bg-signal"
      >
        <HeroField />

        <Container className="py-24 sm:py-28 lg:py-36">
          {/* Centred composition, as in the reference: question, promise, then
              the one action, arriving in that order. HeroIntro choreographs
              the entrance as a GSAP timeline; the words of the headline are
              split into spans so it can resolve word by word. The whitespace
              between spans keeps the accessible name one sentence. */}
          <HeroIntro className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div data-hero-questions className="w-full">
              <HeroQuestions
                questions={hero.questions}
                toneClass="text-white"
                dotClass="bg-white/60"
                centered
              />
            </div>

            {/* mt-3, not the mt-7 the scale suggests: the dot row above ends
                with ~19px of its 44px touch targets' invisible padding, so
                the visible gap here is already ~31px. */}
            <h1 className="mt-3 max-w-[22ch] text-balance text-display-sm font-display text-white">
              {hero.headline.split(" ").map((word, index) => (
                <span key={index}>
                  <span data-hero-word className="inline-block">
                    {word}
                  </span>{" "}
                </span>
              ))}
            </h1>

            <div data-hero-cta className="mt-9">
              <Button href={hero.cta.href} variant="on-deep">
                {hero.cta.label}
              </Button>
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
