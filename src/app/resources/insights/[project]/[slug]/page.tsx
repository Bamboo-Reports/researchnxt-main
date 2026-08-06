import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { Reveal } from "@/components/motion/reveal";
import { StatsBento } from "@/components/stats-band";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getInsight,
  getInsightProject,
  getProjectInsights,
  insightHref,
  insights,
} from "@/content/insights";
import { getReportLanding } from "@/content/resources";
import { formatDate } from "@/lib/date";
import { delay, step } from "@/lib/motion";
import type { ArticleBlock } from "@/content/insights";

/**
 * One insights article. The piece runs at reading measure with its own
 * download form parked beside it: unlike the interviews, which share the
 * form of the report they were conducted for, every article here carries a
 * different Jotform.
 */

type Params = { params: Promise<{ project: string; slug: string }> };

/** A heading, a paragraph, a list, a figure set or named points. */
function Block({ block }: { block: ArticleBlock }) {
  if (typeof block === "string") {
    return (
      <p className="text-base leading-relaxed text-ink-soft">
        <Emphasised text={block} />
      </p>
    );
  }

  if ("heading" in block) {
    return (
      <h2 className="mt-4 text-title font-display-soft text-ink">
        {block.heading}
      </h2>
    );
  }

  /* Rebuilt from a source infographic: the site's own stat tiles, so the
     numbers stay selectable and reflow, with the survey credited beneath. */
  if ("figures" in block) {
    return (
      <div className="my-2 flex flex-col gap-4">
        <StatsBento stats={block.figures} />
        {block.source ? (
          <p className="text-sm text-ink-muted">{block.source}</p>
        ) : null}
      </div>
    );
  }

  if ("points" in block) {
    return (
      <Reveal as="dl" className="my-2 flex flex-col gap-6">
        {block.points.map((point, index) => (
          <div
            key={point.title}
            className="flex flex-col gap-2 border-t border-line pt-4"
            style={step(index)}
          >
            <dt className="text-title font-display-soft text-ink">
              {point.title}
            </dt>
            <dd className="flex flex-col gap-2 text-base leading-relaxed text-ink-soft">
              {point.description ? (
                <span>
                  <Emphasised text={point.description} />
                </span>
              ) : null}
              {point.items ? (
                <ul className="flex list-disc flex-col gap-1.5 pl-5">
                  {point.items.map((item) => (
                    <li key={item} className="pl-1">
                      <Emphasised text={item} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </dd>
          </div>
        ))}
      </Reveal>
    );
  }

  const Tag = block.ordered ? "ol" : "ul";
  return (
    <Tag
      className={
        block.ordered
          ? "flex list-decimal flex-col gap-3 pl-5"
          : "flex list-disc flex-col gap-3 pl-5"
      }
    >
      {block.list.map((item) => (
        <li key={item} className="pl-1 text-base leading-relaxed text-ink-soft">
          <Emphasised text={item} />
        </li>
      ))}
    </Tag>
  );
}

export function generateStaticParams() {
  return insights.map((insight) => ({
    project: insight.project,
    slug: insight.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { project, slug } = await params;
  const insight = getInsight(project, slug);
  if (!insight) return {};

  return {
    title: insight.metaTitle,
    description: insight.metaDescription,
    alternates: { canonical: insightHref(insight) },
  };
}

export default async function InsightPage({ params }: Params) {
  const { project, slug } = await params;
  const insight = getInsight(project, slug);
  const projectMeta = getInsightProject(project);
  if (!insight || !projectMeta) notFound();

  // The programme's report landing, when it has been built; the breadcrumb
  // links to it and falls back to plain text when it has not.
  const report = projectMeta.reportSlug
    ? getReportLanding(projectMeta.reportSlug)
    : undefined;
  const reportHref = report
    ? `/resources/reports-whitepapers/${report.slug}`
    : undefined;

  const others = getProjectInsights(project).filter(
    (item) => item.slug !== insight.slug,
  );

  return (
    <main id="main">
      {/* Hero. The title carries the piece, so the band stays a slim wash with
          the trail back to the library above it. */}
      <Section spacing="none" className="hero-wash border-b border-line">
        <Container className="py-12 sm:py-16">
          <div className="anim-rise flex flex-col gap-6" style={step(0)}>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-ink-muted"
            >
              <Link
                href="/resources/insights"
                className="text-accent hover:text-accent-hover"
              >
                Insights
              </Link>
              <span aria-hidden="true">/</span>
              {reportHref ? (
                <Link
                  href={reportHref}
                  className="text-accent hover:text-accent-hover"
                >
                  {projectMeta.name}
                </Link>
              ) : (
                <span>{projectMeta.name}</span>
              )}
              <span aria-hidden="true">/</span>
              <time dateTime={insight.published}>
                {formatDate(insight.published)}
              </time>
            </nav>

            <h1 className="max-w-[24ch] text-display-sm font-display text-ink">
              {insight.title}
            </h1>
          </div>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-16">
            <article className="flex max-w-[68ch] flex-col gap-5">
              <Image
                src={insight.thumbnail}
                alt={insight.thumbnailAlt}
                width={1920}
                height={1080}
                priority
                className="anim-rise mb-5 aspect-video w-full rounded-lg border border-line object-cover"
              />

              {insight.body.map((block, index) => (
                <Block
                  key={typeof block === "string" ? block : index}
                  block={block}
                />
              ))}
            </article>

            {/* The form sits on the page with no panel and no heading of its
                own: the embed carries its own title and framing. */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div
                id="download"
                className="anim-rise scroll-mt-24"
                style={delay(160)}
              >
                <JotformEmbed
                  formId={insight.jotformId}
                  title="Download the report"
                />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {others.length > 0 ? (
        <Section surface="subtle" bordered spacing="default">
          <Container>
            <SectionHeading
              eyebrow={projectMeta.name}
              title="More insights"
              className="mb-12"
            />
            <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item, index) => (
                <Link
                  key={item.slug}
                  href={insightHref(item)}
                  className="group flex flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                  style={step(index)}
                >
                  <Image
                    src={item.thumbnail}
                    alt=""
                    width={640}
                    height={360}
                    className="mt-1 aspect-video w-full rounded-md object-cover"
                  />
                  <h3 className="clamp-3 text-base font-semibold transition-colors duration-200 group-hover:text-accent">
                    {item.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
                    Read the article
                    <TrailingArrow />
                  </span>
                </Link>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
