import type { Metadata } from "next";
import { CTABand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { StatsBand } from "@/components/stats-band";
import { Container } from "@/components/ui/container";
import { DataPlate, MonogramPlate } from "@/components/ui/data-plate";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  aboutHero,
  aboutStats,
  culture,
  leadership,
  whoWeAre,
} from "@/content/about";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  title: "About",
  description: aboutHero.lede,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        lede={aboutHero.lede}
      />

      <Section spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-5">
              <h2 className="mb-2 text-headline font-display-soft">
                {whoWeAre.title}
              </h2>
              {whoWeAre.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[68ch] text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <DataPlate
              seed="about-who-we-are"
              aspect="square"
              label="Research NXT"
              className="lg:sticky lg:top-24"
            />
          </div>
        </Container>
      </Section>

      <StatsBand stats={aboutStats} />

      <Section bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={culture.eyebrow}
            title={culture.title}
            className="mb-12 max-w-3xl"
          />

          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="flex flex-col gap-5">
              {culture.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[64ch] text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Reveal as="ul" className="flex flex-col border-b border-line">
              {culture.points.map((point, index) => (
                <li
                  key={point.title}
                  className="flex flex-col gap-1.5 border-t border-line py-5"
                  style={step(index)}
                >
                  <h3 className="text-base font-semibold">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {point.description}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section surface="subtle" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={leadership.eyebrow}
            title={leadership.title}
            className="mb-12"
          />
          <Reveal
            className={
              leadership.people.length > 1
                ? "grid gap-x-10 gap-y-10 sm:grid-cols-2"
                : "grid gap-6 sm:max-w-md"
            }
          >
            {leadership.people.map((person, index) => (
              <div
                key={person.name}
                className="flex flex-col gap-4 border-t border-line pt-6"
                style={step(index)}
              >
                <MonogramPlate name={person.name} className="size-16" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-title font-display-soft">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold text-accent">
                    {person.role}
                  </p>
                </div>
                <p className="max-w-[60ch] text-sm leading-relaxed text-ink-soft">
                  {person.bio}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CTABand />
    </main>
  );
}
