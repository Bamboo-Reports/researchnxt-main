import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Pagination } from "@/components/pagination";
import { Section } from "@/components/ui/section";
import { insightHref, insights, insightsLibrary } from "@/content/insights";
import { step } from "@/lib/motion";

/**
 * Insights library: a paginated 3x2 grid of articles, newest first, matching
 * the experts-view library. One flat list rather than sections, since the
 * articles are not grouped by anything yet; a filter or grouping band goes
 * here when they are.
 */

type SearchParams = Record<string, string | string[] | undefined>;
type Params = { searchParams: Promise<SearchParams> };

const PER_PAGE = 6;
const PATH = "/resources/insights";

const totalPages = Math.max(1, Math.ceil(insights.length / PER_PAGE));

/** Clamps whatever arrived in the page param to a real page number. */
function resolvePage(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed)) return 1;
  return Math.min(Math.max(parsed, 1), totalPages);
}

/** Page 1 canonicalises to the bare path, so there is no `?page=1` URL. */
function pageHref(page: number) {
  return page > 1 ? `${PATH}?page=${page}` : PATH;
}

export async function generateMetadata({
  searchParams,
}: Params): Promise<Metadata> {
  const current = resolvePage((await searchParams).page);

  return {
    title:
      current > 1
        ? `${insightsLibrary.title}, page ${current}`
        : insightsLibrary.title,
    description: insightsLibrary.lede,
    alternates: { canonical: pageHref(current) },
  };
}

export default async function InsightsPage({ searchParams }: Params) {
  const current = resolvePage((await searchParams).page);
  const start = (current - 1) * PER_PAGE;
  const page = insights.slice(start, start + PER_PAGE);

  return (
    <main id="main">
      <PageHero
        eyebrow="Resources"
        title={insightsLibrary.title}
        lede={insightsLibrary.lede}
      />

      <Section spacing="default">
        <Container>
          {/* Keyed on the page so the stagger replays when the set changes. */}
          <Reveal
            key={current}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {page.map((insight, index) => (
              <Link
                key={insight.slug}
                href={insightHref(insight)}
                className="group flex flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                style={step(index)}
              >
                <Image
                  src={insight.thumbnail}
                  alt=""
                  width={640}
                  height={360}
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
                  className="mt-1 aspect-video w-full rounded-md object-cover"
                />
                <h2 className="clamp-3 text-base font-semibold transition-colors duration-200 group-hover:text-accent">
                  {insight.title}
                </h2>
                <p className="clamp-3 text-sm leading-relaxed text-ink-soft">
                  {insight.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
                  {insightsLibrary.cardCta}
                  <TrailingArrow />
                </span>
              </Link>
            ))}
          </Reveal>

          <Pagination
            label="Insights pages"
            current={current}
            totalPages={totalPages}
            href={pageHref}
          />
        </Container>
      </Section>
    </main>
  );
}
