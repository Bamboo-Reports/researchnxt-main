import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { StatsBento } from "@/components/stats-band";
import { accentedTitle } from "@/components/ui/accented-title";
import { Container } from "@/components/ui/container";
import { MonogramPlate } from "@/components/ui/data-plate";
import { Section } from "@/components/ui/section";
import { SocialIcon } from "@/components/ui/social-icon";
import {
  aboutHero,
  aboutStats,
  culture,
  leadership,
  whoWeAre,
} from "@/content/about";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  title: "About Us",
  description: whoWeAre.body[0],
  alternates: { canonical: "/about" },
};

const peopleSections = [leadership];

/** Section opener in the solution-page style: two-tone-capable headline over
    a short orange rule. */
function RuledHeading({ title }: { title: string }) {
  return (
    <>
      <h2 className="text-headline font-display-soft">
        {accentedTitle(title)}
      </h2>
      <span aria-hidden="true" className="h-0.5 w-12 rounded-[1px] bg-signal" />
    </>
  );
}

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero title={aboutHero.title} lede={aboutHero.lede} />

      <Section spacing="default">
        <Container>
          <div className="flex flex-col gap-6">
            <RuledHeading title={whoWeAre.title} />
            <div className="flex flex-col gap-5">
              {whoWeAre.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {/* The figures are part of the Who we are story, not their own band. */}
            <div className="mt-6">
              <StatsBento stats={aboutStats} />
            </div>
          </div>
        </Container>
      </Section>

      <Section bordered spacing="default">
        <Container>
          <div className="flex flex-col gap-6">
            <RuledHeading title={culture.title} />
            <div className="flex flex-col gap-5">
              {culture.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {peopleSections.map((section, sectionIndex) => (
        <Section
          key={section.title}
          surface={sectionIndex === 0 ? "subtle" : "default"}
          bordered
          spacing="default"
        >
          <Container>
            <div className="mb-12 flex flex-col gap-6">
              <RuledHeading title={section.title} />
            </div>
            <Reveal className="grid gap-6">
              {section.people.map((person, index) => (
                <article
                  key={person.name}
                  className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[20rem_1fr] sm:gap-10 lg:grid-cols-[26rem_1fr]"
                  style={step(index)}
                >
                  {"image" in person && person.image ? (
                    <div className="relative aspect-square w-full max-w-sm self-start overflow-hidden rounded-md">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        sizes="(min-width: 1024px) 26rem, (min-width: 640px) 20rem, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <MonogramPlate name={person.name} className="size-16" />
                  )}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-title font-display-soft">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-relaxed text-accent">
                      {person.role}
                    </p>
                    {person.bio.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed text-ink-soft"
                      >
                        {paragraph}
                      </p>
                    ))}
                    <ul className="flex flex-col gap-2 border-t border-line pt-4">
                      {person.affiliations.map((affiliation) => (
                        <li
                          key={affiliation}
                          className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 rounded-[1px] bg-line-strong"
                          />
                          {affiliation}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      {person.social.map((channel) => (
                        <a
                          key={channel.label}
                          href={channel.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink transition-opacity duration-150 hover:opacity-70"
                        >
                          <SocialIcon
                            label={channel.label}
                            className="size-5"
                          />
                          <span className="sr-only">
                            {person.name} on {channel.label} (opens in a new
                            tab)
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </Reveal>
          </Container>
        </Section>
      ))}
    </main>
  );
}
