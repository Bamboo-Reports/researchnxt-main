import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { solutionsNav } from "@/config/nav";
import { thankYouPage } from "@/content/contact";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Thank you",
  description: thankYouPage.lede,
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={thankYouPage.eyebrow}
        title={thankYouPage.title}
        lede={thankYouPage.lede}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/" variant="on-deep">
            Back to home
          </Button>
        </div>
      </PageHero>

      <Section spacing="default">
        <Container>
          <SectionHeading
            eyebrow="While you wait"
            title="Explore what we do"
            size="title"
            className="mb-8"
          />
          <Reveal as="ul" className="flex flex-col border-b border-line">
            {solutionsNav.map((solution, index) => (
              <li key={solution.href} style={step(index)}>
                <Link
                  href={solution.href}
                  className="group grid gap-x-8 gap-y-2 border-t border-line py-6 transition-colors duration-200 hover:border-accent lg:grid-cols-[16rem_1fr_auto] lg:items-center"
                >
                  <h3 className="text-title font-display-soft transition-colors duration-200 group-hover:text-accent">
                    {solution.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {solution.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Explore
                    <TrailingArrow />
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
