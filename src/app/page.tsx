import type { Metadata } from "next";
import Image from "next/image";
import { HeroQuestions } from "@/components/home/hero-questions";
import { TrustedLogos } from "@/components/home/trusted-logos";
import { NavLink } from "@/components/layout/nav-link";
import { Reveal } from "@/components/motion/reveal";
import { ResourceCard } from "@/components/resource-card";
import { Button } from "@/components/ui/button";
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
      {/* Problem-to-promise over the work itself. The photograph runs full
          bleed behind the band; a white scrim keeps the copy side opaque and
          clears to nothing on the right, so the type reads on paper and the
          room emerges beside it rather than sitting in a boxed panel. */}
      <Section spacing="none" className="relative isolate overflow-hidden bg-white">
        <Image
          src="/hero2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[68%_center] lg:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-white/88 sm:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-white from-30% via-white/90 to-white/10 sm:block lg:via-white/80 lg:to-transparent"
        />

        <Container className="py-24 sm:py-28 lg:py-36">
          <div className="max-w-xl lg:max-w-2xl">
            <HeroQuestions questions={hero.questions} />

            <h1 className="mt-7 max-w-[19ch] text-display-sm font-display text-ink">
              {hero.headline}
            </h1>

            <div className="mt-9">
              <Button href={hero.cta.href}>{hero.cta.label}</Button>
            </div>
          </div>
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
          <SectionHeading
            eyebrow={differentiators.eyebrow}
            title={differentiators.title}
            className="mb-12 max-w-4xl"
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
