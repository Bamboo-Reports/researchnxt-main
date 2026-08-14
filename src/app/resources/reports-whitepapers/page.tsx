import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Pagination } from "@/components/pagination";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { reportShelf, reportsLibrary } from "@/content/resources";
import { step } from "@/lib/motion";

/**
 * Reports & whitepapers library: one card per report landing. It shares the
 * ruled card spine of the other libraries but swaps the video-aspect art for
 * portrait covers on a four-column shelf, paginated the way insights pages,
 * at three shelf rows per view.
 */

type SearchParams = Record<string, string | string[] | undefined>;
type Params = { searchParams: Promise<SearchParams> };

const PER_PAGE = 12;
const PATH = "/resources/reports-whitepapers";

const totalPages = Math.max(1, Math.ceil(reportShelf.length / PER_PAGE));

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
        ? `${reportsLibrary.title}, page ${current}`
        : reportsLibrary.title,
    description: reportsLibrary.lede,
    alternates: { canonical: pageHref(current) },
  };
}

export default async function ReportsWhitepapersPage({ searchParams }: Params) {
  const current = resolvePage((await searchParams).page);
  const start = (current - 1) * PER_PAGE;
  const page = reportShelf.slice(start, start + PER_PAGE);

  return (
    <main id="main">
      <PageHero
        eyebrow="Resources"
        title={reportsLibrary.title}
        lede={reportsLibrary.lede}
      />

      <Section spacing="default">
        <Container>
          {/* A book shelf: each card is the report's own vertical cover at
              full bleed. A report that does not have its portrait cover yet
              shows its landscape card letterboxed on a muted plate, so the
              shelf stays uniform while the covers arrive one by one. */}
          {/* Keyed on the page so the stagger replays when the set changes. */}
          <Reveal
            key={current}
            className="grid gap-x-8 gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          >
            {page.map((report, index) => (
              <Link
                key={report.href}
                href={report.href}
                className="group flex flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                /* The stagger caps at two rows so the third arrives with the
                   second rather than ~1.6s after the first. */
                style={step(Math.min(index, 7))}
              >
                {report.portrait ? (
                  <Image
                    src={report.portrait}
                    alt=""
                    width={840}
                    height={1188}
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 45vw"
                    className="mt-1 aspect-[210/297] w-full rounded-md object-cover"
                  />
                ) : report.cardImage ? (
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
                ) : (
                  <span className="mt-1 aspect-[210/297] w-full rounded-md bg-surface-muted" />
                )}
                <h2 className="clamp-3 text-base font-semibold transition-colors duration-200 group-hover:text-accent">
                  {report.title}
                </h2>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
                  {reportsLibrary.cardCta}
                  <TrailingArrow />
                </span>
              </Link>
            ))}
          </Reveal>

          <Pagination
            label="Reports pages"
            current={current}
            totalPages={totalPages}
            href={pageHref}
          />
        </Container>
      </Section>
    </main>
  );
}
