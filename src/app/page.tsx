import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroIntro } from "@/components/home/hero-intro";
import { TrustedLogos } from "@/components/home/trusted-logos";
import { NavLink } from "@/components/layout/nav-link";
import { CardRail } from "@/components/report-card-rail";
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
  homeBands,
  whatWeDo,
} from "@/content/home";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const [reportsLink, interviewsLink] = resourcesNav;

  return (
    <main id="main">
      {/* Promise over the user-supplied field photograph (used as is, PNG
          included on direction), composed the way the Bamboo Reports HeroV2
          composes its artwork: the photo drifts slowly under a white veil
          that fades into the page surface, the type stays ink with the
          payoff line in the accent. `hero-wash` stays underneath as the
          paint before the image loads. (Bamboo's capabilities rail on the
          band's foot was tried and removed on user direction; the What we
          do band below carries the four solutions.) */}
      <Section
        spacing="none"
        className="hero-wash relative overflow-hidden"
      >
        <Image
          src="/hero-updated.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image-drift pointer-events-none object-cover"
        />
        <div
          aria-hidden="true"
          className="hero-veil pointer-events-none absolute inset-0"
        />
        <Container className="relative py-24 sm:py-28 lg:py-32">
          {/* HeroIntro choreographs the entrance as a GSAP timeline; the
              words of the headline are split into spans so it can resolve
              word by word. The whitespace between word spans keeps each
              accessible name one sentence. */}
          <HeroIntro className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="max-w-[22ch] text-balance text-display-sm font-display text-ink">
              {hero.headline.split(" ").map((word, index) => (
                <span key={index}>
                  <span data-hero-word className="inline-block">
                    {word}
                  </span>{" "}
                </span>
              ))}
              <span className="block text-accent">
                {hero.headlineAccent.split(" ").map((word, index) => (
                  <span key={index}>
                    <span data-hero-word className="inline-block">
                      {word}
                    </span>{" "}
                  </span>
                ))}
              </span>
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
          <div className="mb-8 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={homeBands.featuredReports.eyebrow}
              title={homeBands.featuredReports.title}
              lede={homeBands.featuredReports.lede}
            />
            <NavLink
              item={reportsLink}
              className="group min-h-11 shrink-0 self-start text-sm font-semibold text-accent hover:text-accent-hover md:self-auto"
            >
              {homeBands.featuredReports.cta}
              <TrailingArrow />
            </NavLink>
          </div>

          {/* A rail rather than a grid: four portrait covers stacked on a
              phone ran several screens tall before the next section. */}
          <CardRail
            label={homeBands.featuredReports.title}
            items={featuredReports.map((report) => ({
              key: report.href,
              node: <ResourceCard resource={report} withPlate portrait />,
            }))}
          />
        </Container>
      </Section>

      {/* Experts view shares the report-card system so both resource sections
          scan consistently, while the white band keeps them distinct. */}
      <Section surface="bright" bordered spacing="default">
        <Container>
          <div className="mb-8 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={homeBands.expertsView.eyebrow}
              title={homeBands.expertsView.title}
              lede={homeBands.expertsView.lede}
            />
            <NavLink
              item={interviewsLink}
              className="group min-h-11 shrink-0 self-start text-sm font-semibold text-accent hover:text-accent-hover md:self-auto"
            >
              {homeBands.expertsView.cta}
              <TrailingArrow />
            </NavLink>
          </div>

          {/* A scrolling rail rather than a fixed four: the latest buyers sit
              in view and the rest of the Buyer's perspective library is a
              swipe or an arrow away. */}
          <CardRail
            label={homeBands.expertsView.title}
            items={featuredInterviews.map((interview) => ({
              key: interview.href,
              node: <ResourceCard resource={interview} withPlate />,
            }))}
          />
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
            className="mb-8 sm:mb-12"
          />
          <ul
            aria-label={whatWeDo.title}
            className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-0 sm:gap-y-12 lg:grid-cols-4"
          >
            {whatWeDo.items.map((item) => (
                <li key={item.title} className="row-span-3 grid min-w-0 grid-rows-subgrid gap-y-4 border-t border-line pt-6 sm:row-span-4 sm:pr-8 lg:pr-10">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-6 self-start rounded-[1px] bg-signal"
                  />
                  <h3 className="whitespace-pre-line text-title font-display-soft">
                    {item.title}
                  </h3>
                  <p className="hidden text-sm leading-relaxed text-ink-soft sm:block">
                    {item.description}
                  </p>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-11 min-w-0 items-center gap-2 self-start text-sm font-semibold text-accent hover:text-accent-hover"
                    >
                      <span className="min-w-0">{homeBands.bambooCta}</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                      <TrailingArrow />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="group inline-flex min-h-11 min-w-0 items-center gap-2 self-start text-sm font-semibold text-accent hover:text-accent-hover"
                    >
                      {homeBands.exploreCta}
                      <span className="sr-only"> {item.title}</span>
                      <TrailingArrow />
                    </Link>
                  )}
                </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Stepped journey: descending stages on desktop, stacked on mobile. */}
      <Section surface="bright" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={engagementSteps.eyebrow}
            title={engagementSteps.title}
            className="max-w-3xl"
          />
          <ol aria-label="Engagement stages" className="mt-8 grid gap-y-8 sm:mt-14 lg:grid-cols-4 lg:gap-y-0">
            {engagementSteps.steps.map((stage, index) => (
              <li
                key={stage.name}
                className={`relative border-t border-accent pt-6 lg:pr-8 ${["lg:mt-0", "lg:mt-14", "lg:mt-28", "lg:mt-42"][index]}`}
              >
                {index > 0 && <span aria-hidden="true" className="absolute -top-14 left-0 hidden h-14 w-px bg-accent lg:block" />}
                <p className="text-sm font-semibold tabular-nums text-accent">Step {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-headline font-display-soft">{stage.name}</h3>
                <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink-soft">{stage.description}</p>
                <p className="mt-6 text-sm font-semibold text-accent"><span className="sr-only">Outcome: </span>{stage.outcome}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Experience leads: the selected blue statement with open reasons. */}
      <Section surface="bright" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={differentiators.eyebrow}
            title={differentiators.title}
          />
          <div className="mt-8 grid gap-10 sm:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
            <div className="flex flex-col justify-center bg-accent px-8 py-12 text-white sm:px-12 sm:py-16 lg:rounded-tr-[6rem]">
              <h3 className="font-display">
                <span className="block text-[6rem] leading-none tracking-[-0.04em]">7+</span>
                <span className="mt-4 block text-headline">years of experience</span>
              </h3>
              <p className="mt-6 max-w-[36ch] text-lg leading-relaxed">{differentiators.items[0].description}</p>
            </div>
            <ul className="flex flex-col justify-center gap-8 sm:gap-10">
              {differentiators.items.slice(1).map((item) => (
                <li key={item.title}>
                  <h3 className="text-title font-display-soft">{item.title}</h3>
                  <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-ink-soft">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Customer marks borrowed from the Bamboo Reports platform treatment,
          adapted to this site's measured section-heading system. */}
      <Section bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={homeBands.trustedBy.eyebrow}
            title={homeBands.trustedBy.title}
            lede={homeBands.trustedBy.lede}
            className="mb-8 max-w-3xl sm:mb-12"
          />
          <TrustedLogos />
        </Container>
      </Section>
    </main>
  );
}
