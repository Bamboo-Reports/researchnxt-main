import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Pagination } from "@/components/pagination";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  expertPerspectives,
  expertsViewLibrary,
  getPerspectiveInterviews,
  interviewHref,
} from "@/content/experts-view";
import { step } from "@/lib/motion";
import type { ExpertInterview } from "@/content/experts-view";

/**
 * Experts view library.
 *
 * Organised by who is speaking, not by which report commissioned the
 * conversation: one band per perspective, each a paginated 3x2 grid with its
 * own `?<param>=N` search param, so paging one section leaves the others
 * where they were. A section with no interviews yet is not rendered.
 */

type SearchParams = Record<string, string | string[] | undefined>;
type Params = { searchParams: Promise<SearchParams> };

const PER_PAGE = 6;
const PATH = "/resources/experts-view";

/** Clamps whatever arrived in a page param to a real page number. */
function resolvePage(raw: string | string[] | undefined, totalPages: number) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed)) return 1;
  return Math.min(Math.max(parsed, 1), totalPages);
}

/** Every section's page param, resolved and clamped against its own length. */
function resolveSections(searchParams: SearchParams) {
  return expertPerspectives
    .map((perspective) => {
      const interviews = getPerspectiveInterviews(perspective.id);
      const totalPages = Math.max(1, Math.ceil(interviews.length / PER_PAGE));
      const current = resolvePage(searchParams[perspective.param], totalPages);
      return { ...perspective, interviews, totalPages, current };
    })
    .filter((section) => section.interviews.length > 0);
}

/** Builds a URL that changes one section's page and preserves the others. */
function buildHref(searchParams: SearchParams, param: string, page: number) {
  const query = new URLSearchParams();
  for (const key of Object.keys(searchParams).sort()) {
    if (key === param) continue;
    const value = searchParams[key];
    const first = Array.isArray(value) ? value[0] : value;
    if (first) query.set(key, first);
  }
  if (page > 1) query.set(param, String(page));

  // The fragment keeps the reader on the section they were paging, rather
  // than throwing them back to the top of the library.
  const search = query.toString();
  return `${PATH}${search ? `?${search}` : ""}#${param}`;
}

export async function generateMetadata({
  searchParams,
}: Params): Promise<Metadata> {
  const params = await searchParams;
  const sections = resolveSections(params);
  const paged = sections.filter((section) => section.current > 1);

  // Self-canonical, carrying only the page params that are actually in play.
  const query = new URLSearchParams();
  for (const section of paged)
    query.set(section.param, String(section.current));
  const search = query.toString();

  return {
    title:
      paged.length > 0
        ? `${expertsViewLibrary.title}, more interviews`
        : expertsViewLibrary.title,
    description: expertsViewLibrary.lede,
    alternates: { canonical: `${PATH}${search ? `?${search}` : ""}` },
  };
}

function InterviewCard({
  interview,
  index,
}: {
  interview: ExpertInterview;
  index: number;
}) {
  return (
    <Link
      href={interviewHref(interview)}
      className="group flex flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
      style={step(index)}
    >
      <Image
        src={interview.thumbnail}
        alt=""
        width={640}
        height={360}
        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
        className="mt-1 aspect-video w-full rounded-md object-cover"
      />
      <h3 className="clamp-3 text-base font-semibold transition-colors duration-200 group-hover:text-accent">
        {interview.title}
      </h3>
      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
        {expertsViewLibrary.cardCta}
        <TrailingArrow />
      </span>
    </Link>
  );
}

export default async function ExpertsViewPage({ searchParams }: Params) {
  const params = await searchParams;
  const sections = resolveSections(params);

  return (
    <main id="main">
      <PageHero
        eyebrow="Resources"
        title={expertsViewLibrary.title}
        lede={expertsViewLibrary.lede}
      />

      {sections.map((section, index) => {
        const start = (section.current - 1) * PER_PAGE;
        const interviews = section.interviews.slice(start, start + PER_PAGE);

        return (
          <Section
            key={section.id}
            id={section.param}
            spacing="default"
            bordered={index > 0}
            surface={index % 2 === 1 ? "subtle" : "default"}
            className="scroll-mt-32"
          >
            <Container>
              <SectionHeading title={section.label} className="mb-12" />

              {/* Keyed on the page so the stagger replays when the set changes. */}
              <Reveal
                key={section.current}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {interviews.map((interview, cardIndex) => (
                  <InterviewCard
                    key={interview.slug}
                    interview={interview}
                    index={cardIndex}
                  />
                ))}
              </Reveal>

              <Pagination
                label={`${section.label} pages`}
                current={section.current}
                totalPages={section.totalPages}
                href={(page) => buildHref(params, section.param, page)}
              />
            </Container>
          </Section>
        );
      })}
    </main>
  );
}
