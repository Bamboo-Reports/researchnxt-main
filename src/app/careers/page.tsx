import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/application-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { accentedTitle } from "@/components/ui/accented-title";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { careersHero, openings } from "@/content/careers";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Careers",
  description: careersHero.lede,
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
              {accentedTitle("Positions we are currently hiring for")}
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
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <h2 className="text-headline font-display-soft">
              What are you looking for in your next job?
            </h2>
            <ApplicationForm role="General application" submitLabel="Apply now" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
