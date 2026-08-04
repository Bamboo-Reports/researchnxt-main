import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { articleHref, insightArticles } from "@/content/insights";
import { cn } from "@/lib/cn";
import { step } from "@/lib/motion";
import type { InsightArticle } from "@/content/insights";

/**
 * Insights library: a paginated 3x2 grid of articles.
 *
 * Pagination is a `?page=N` search param rather than a route segment, so it
 * cannot collide with the `[project]` segment beneath this route. The value is
 * clamped to a real page rather than 404ing on junk input, and page 1
 * canonicalises to the bare path.
 */

type SearchParams = Record<string, string | string[] | undefined>;
type Params = { searchParams: Promise<SearchParams> };

const PER_PAGE = 6;
const PATH = "/resources/insights";

const lede =
  "Articles and analysis from the Research NXT team, written around the research we publish.";

const totalPages = Math.max(1, Math.ceil(insightArticles.length / PER_PAGE));

/** Clamps whatever arrived in the page param to a real page number. */
function resolvePage(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed)) return 1;
  return Math.min(Math.max(parsed, 1), totalPages);
}

/** Page 1 canonicalises to the bare path, with no `?page=1`. */
function pageHref(page: number) {
  return page > 1 ? `${PATH}?page=${page}` : PATH;
}

export async function generateMetadata({
  searchParams,
}: Params): Promise<Metadata> {
  const current = resolvePage((await searchParams).page);

  return {
    title: current > 1 ? `Insights, page ${current}` : "Insights",
    description: lede,
    alternates: { canonical: pageHref(current) },
  };
}

function ArticleCard({
  article,
  index,
}: {
  article: InsightArticle;
  index: number;
}) {
  return (
    <Link
      href={articleHref(article)}
      className="group flex flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
      style={step(index)}
    >
      <Image
        src={article.thumbnail}
        alt=""
        width={640}
        height={360}
        className="mt-1 aspect-video w-full rounded-md object-cover"
      />
      <h2 className="clamp-3 text-base font-semibold transition-colors duration-200 group-hover:text-accent">
        {article.title}
      </h2>
      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
        Read the article
        <TrailingArrow />
      </span>
    </Link>
  );
}

/** Numbered pager. Rendered as links so every page is crawlable and shareable. */
function Pagination({ current }: { current: number }) {
  if (totalPages < 2) return null;

  const stepLink =
    "inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-sm font-semibold transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-ink hover:bg-surface-muted";

  return (
    <nav
      aria-label="Insights pages"
      className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-line pt-8"
    >
      {current > 1 ? (
        <Link href={pageHref(current - 1)} rel="prev" className={stepLink}>
          Previous
        </Link>
      ) : (
        <span className={cn(stepLink, "pointer-events-none opacity-40")}>
          Previous
        </span>
      )}

      <ol className="flex items-center gap-1 px-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => {
            const isCurrent = page === current;
            return (
              <li key={page}>
                <Link
                  href={pageHref(page)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "font-figure inline-flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)]",
                    isCurrent
                      ? "bg-accent text-white"
                      : "text-ink-soft hover:bg-accent-soft hover:text-accent",
                  )}
                >
                  {page}
                  {isCurrent ? (
                    <span className="sr-only"> (current page)</span>
                  ) : null}
                </Link>
              </li>
            );
          },
        )}
      </ol>

      {current < totalPages ? (
        <Link href={pageHref(current + 1)} rel="next" className={stepLink}>
          Next
        </Link>
      ) : (
        <span className={cn(stepLink, "pointer-events-none opacity-40")}>
          Next
        </span>
      )}
    </nav>
  );
}

export default async function InsightsPage({ searchParams }: Params) {
  const current = resolvePage((await searchParams).page);
  const start = (current - 1) * PER_PAGE;
  const articles = insightArticles.slice(start, start + PER_PAGE);

  return (
    <main id="main">
      <PageHero eyebrow="Resources" title="Insights" lede={lede} />

      <Section spacing="default">
        <Container>
          {/* Keyed on the page so the stagger replays when the set changes. */}
          <Reveal
            key={current}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </Reveal>

          <Pagination current={current} />
        </Container>
      </Section>
    </main>
  );
}
