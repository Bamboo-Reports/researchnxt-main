import type { Metadata } from "next";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { RuledHeading } from "@/components/ui/ruled-heading";
import { Container } from "@/components/ui/container";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { careersBands, careersHero, openings } from "@/content/careers";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Careers",
  description: careersHero.metaDescription,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <main id="main">
      <PageHero
        title={careersHero.title}
        lede={careersHero.lede}
        backgroundImage="/hero-backgrounds/careers.png"
      />

      <Section spacing="tight">
        <Container>
          <div className="flex flex-col gap-6">
            <RuledHeading title={careersBands.openings} />
          </div>
          <Reveal as="ul" className="mt-8 divide-y divide-line border-y border-line">
            {openings.map((opening, index) => (
              <li
                key={opening.slug}
                id={opening.slug}
                className="grid items-center gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16"
                style={step(index)}
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-title font-display-soft">
                    {opening.title}
                  </h3>
                  <p className="max-w-[70ch] text-base leading-relaxed text-ink-soft">
                    {opening.summary}
                  </p>
                </div>
                <Button href="#application" className="group justify-self-start" aria-label={`Apply for ${opening.title}`}>
                  Apply now
                  <TrailingArrow />
                </Button>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section id="application" className="scroll-mt-28" surface="subtle" bordered spacing="default">
        <Container>
          <div className="flex flex-col gap-12">
            <h2 className="text-center text-headline font-display-soft">
              {careersBands.apply}
            </h2>
            {/* Applications land through Jotform, not a local form. */}
            <JotformEmbed
              formId="242812511285048"
              title="Job application form"
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
