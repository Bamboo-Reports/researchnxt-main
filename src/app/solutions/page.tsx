import type { Metadata } from "next";
import { CTABand } from "@/components/layout/cta-band";
import { ExternalIcon, NavLink } from "@/components/layout/nav-link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DataPlate } from "@/components/ui/data-plate";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  gccIntelligenceLink,
  solutions,
  solutionsHub,
} from "@/content/solutions";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Solutions",
  description: solutionsHub.lede,
  alternates: { canonical: "/solutions" },
};

const solutionCards = [
  ...solutions.map((solution) => ({
    slug: solution.slug,
    label: solution.navLabel,
    href: `/solutions/${solution.slug}`,
    description: solution.hero.lede,
    external: false,
  })),
  gccIntelligenceLink,
];

export default function SolutionsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={solutionsHub.eyebrow}
        title={solutionsHub.title}
        lede={solutionsHub.lede}
      />

      <Section spacing="default">
        <Container>
          <Reveal className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {solutionCards.map((solution, index) => (
              <NavLink
                key={solution.href}
                item={solution}
                withIcon={false}
                className="group flex flex-col gap-5"
                style={step(index)}
              >
                <DataPlate
                  seed={solution.slug}
                  aspect="wide"
                  label={solution.label}
                />
                <div className="flex flex-1 flex-col gap-3 border-t border-line pt-5 transition-colors duration-200 group-hover:border-accent">
                  <h2 className="text-title font-display-soft transition-colors duration-200 group-hover:text-accent">
                    {solution.label}
                  </h2>
                  <p className="clamp-3 text-sm leading-relaxed text-ink-soft">
                    {solution.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
                    Explore {solution.label}
                    <TrailingArrow />
                    {solution.external ? <ExternalIcon /> : null}
                  </span>
                </div>
              </NavLink>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Methodology is a genuine sequence, so it is the one place on the site
          where numbered markers carry information rather than decorate. */}
      <Section surface="subtle" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Methodology"
            title={solutionsHub.methodology.title}
            lede={solutionsHub.methodology.lede}
            className="mb-12 max-w-3xl"
          />

          <Reveal as="ol" className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {solutionsHub.methodology.steps.map((item, index) => (
              <li
                key={item.title}
                className="flex flex-col gap-3 border-t border-line pt-5"
                style={step(index)}
              >
                <span className="font-figure text-sm font-semibold text-accent">
                  Step {index + 1}
                </span>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CTABand />
    </main>
  );
}
