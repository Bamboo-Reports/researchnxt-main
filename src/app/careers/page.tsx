import type { Metadata } from "next";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { accentedTitle } from "@/components/ui/accented-title";
import { Container } from "@/components/ui/container";
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
      <PageHero title={careersHero.title} lede={careersHero.lede} />

      <Section spacing="default">
        <Container>
          <div className="flex flex-col gap-6">
            <h2 className="text-headline font-display-soft">
              {accentedTitle(careersBands.openings)}
            </h2>
            <span
              aria-hidden="true"
              className="h-0.5 w-12 rounded-[1px] bg-signal"
            />
          </div>
          <Reveal as="ul" className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {openings.map((opening, index) => (
              <li
                key={opening.slug}
                id={opening.slug}
                className="flex flex-col gap-3 border-t border-line pt-6"
                style={step(index)}
              >
                <h3 className="text-title font-display-soft">
                  {opening.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {opening.summary}
                </p>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section surface="subtle" bordered spacing="default">
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
