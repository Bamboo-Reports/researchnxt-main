import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { reportLandings } from "@/content/resources";
import { step } from "@/lib/motion";

/**
 * Reports & whitepapers library: one card per report landing, in the same
 * card grammar as the insights and experts-view libraries. Pagination joins
 * once the list outgrows a single view, the way those libraries page.
 */

const lede =
  "Original research reports and whitepapers for business and marketing leaders.";

export const metadata: Metadata = {
  title: "Reports & whitepapers",
  description: lede,
  alternates: { canonical: "/resources/reports-whitepapers" },
};

export default function ReportsWhitepapersPage() {
  return (
    <main id="main">
      <PageHero eyebrow="Resources" title="Reports & whitepapers" lede={lede} />

      <Section spacing="default">
        <Container>
          {/* A book shelf: each card is the report's own vertical cover at
              full bleed. A report that does not have its portrait cover yet
              shows its landscape card letterboxed on a muted plate, so the
              shelf stays uniform while the covers arrive one by one. */}
          <Reveal className="grid gap-x-8 gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {reportLandings.map((report, index) => (
              <Link
                key={report.slug}
                href={`/resources/reports-whitepapers/${report.slug}`}
                className="group flex flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                style={step(index)}
              >
                {report.cardPortrait ? (
                  <Image
                    src={report.cardPortrait}
                    alt=""
                    width={840}
                    height={1188}
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 45vw"
                    className="mt-1 aspect-[210/297] w-full rounded-md object-cover"
                  />
                ) : (
                  <span className="mt-1 flex aspect-[210/297] w-full items-center rounded-md bg-surface-muted p-3">
                    <Image
                      src={report.cardImage}
                      alt=""
                      width={1024}
                      height={553}
                      sizes="(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 45vw"
                      className="w-full rounded-sm object-contain"
                    />
                  </span>
                )}
                <h2 className="clamp-3 text-base font-semibold transition-colors duration-200 group-hover:text-accent">
                  {report.hero.title}
                </h2>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
                  View the report
                  <TrailingArrow />
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
