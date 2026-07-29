import type { Metadata } from "next";
import { ApplicationForm } from "@/components/forms/application-form";
import { CTABand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { careersHero, openings, whyJoin } from "@/content/careers";
import { site } from "@/config/site";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Careers",
  description: careersHero.lede,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        lede={careersHero.lede}
      />

      <Section spacing="default">
        <Container>
          <h2 className="text-headline font-display-soft">{whyJoin.title}</h2>
          <Reveal as="ul" className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {whyJoin.points.map((point, index) => (
              <li
                key={point.title}
                className="flex flex-col gap-2 border-t border-line pt-5"
                style={step(index)}
              >
                <span
                  aria-hidden="true"
                  className="mb-1 h-1 w-6 rounded-[1px] bg-signal"
                />
                <h3 className="text-base font-semibold">{point.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {point.description}
                </p>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section surface="subtle" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow="Open roles"
            title="Current openings"
            lede="Expand a role to read the detail and apply."
            className="mb-10"
          />

          <div className="flex flex-col border-t border-line">
            {openings.map((opening) => (
              <details
                key={opening.slug}
                id={opening.slug}
                className="group border-b border-line"
              >
                <summary className="flex cursor-pointer list-none flex-col gap-3 py-7 transition-colors duration-200 hover:text-accent sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-title font-display-soft">
                      {opening.title}
                    </h3>
                    <p className="max-w-[64ch] text-sm leading-relaxed text-ink-soft">
                      {opening.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Badge>{opening.type}</Badge>
                      <Badge>{opening.location}</Badge>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
                    <span className="group-open:hidden">Apply now</span>
                    <span className="hidden group-open:inline">Close</span>
                    <svg
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-2.5 transition-transform duration-200 [transition-timing-function:var(--ease-out-quart)] group-open:rotate-180"
                    >
                      <path d="m1 1 4 4 4-4" />
                    </svg>
                  </span>
                </summary>

                <div className="pb-10">
                  <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
                    <div className="flex flex-col gap-4">
                      <h4 className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 rounded-[1px] bg-signal"
                        />
                        What you will do
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {opening.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1 shrink-0 rounded-[1px] bg-line-strong"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ApplicationForm role={opening.title} />
                  </div>
                </div>
              </details>
            ))}
          </div>

          <p className="mt-8 text-sm text-ink-soft">
            Do not see a fit? Write to us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
            >
              {site.email}
            </a>
            .
          </p>
        </Container>
      </Section>

      <CTABand
        eyebrow="Work with us"
        title="Prefer to talk before you apply?"
        lede="Reach out and we will tell you honestly what the role involves."
      />
    </main>
  );
}
