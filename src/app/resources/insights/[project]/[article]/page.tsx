import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { Reveal } from "@/components/motion/reveal";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  articleHref,
  getInsightArticle,
  getInsightProject,
  getProjectArticles,
  insightArticles,
} from "@/content/insights";
import { getReportLanding } from "@/content/resources";
import { delay, step } from "@/lib/motion";
import type { InsightBlock } from "@/content/insights";

/**
 * One insight article. The piece runs at reading measure with its own download
 * form parked beside it: each sector edition of a report has a separate
 * Jotform, so the form comes from the article rather than from the project.
 */

type Params = { params: Promise<{ project: string; article: string }> };

/** A paragraph, a subheading or a list inside an article body. */
function BodyBlock({ block }: { block: InsightBlock }) {
  if (typeof block === "string") {
    return (
      <p className="text-base leading-relaxed text-ink-soft">
        <Emphasised text={block} />
      </p>
    );
  }

  if ("heading" in block) {
    return (
      <h2 className="text-title font-display-soft mt-2 text-ink">
        {block.heading}
      </h2>
    );
  }

  if ("quote" in block) {
    return (
      <blockquote className="border-l-2 border-signal pl-6">
        <p className="text-title font-display-soft text-ink">{block.quote}</p>
        <footer className="mt-3 text-sm font-semibold text-ink-muted">
          {block.attribution}
        </footer>
      </blockquote>
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
  return insightArticles.map((article) => ({
    project: article.project,
    article: article.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { project, article: slug } = await params;
  const article = getInsightArticle(project, slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: articleHref(article) },
  };
}

export default async function InsightArticlePage({ params }: Params) {
  const { project, article: slug } = await params;
  const article = getInsightArticle(project, slug);
  const projectMeta = getInsightProject(project);
  if (!article || !projectMeta) notFound();

  const report = projectMeta.reportSlug
    ? getReportLanding(projectMeta.reportSlug)
    : undefined;
  const reportHref = report
    ? `/resources/reports-whitepapers/${report.slug}`
    : undefined;

  const others = getProjectArticles(project).filter(
    (item) => item.slug !== article.slug,
  );

  return (
    <main id="main">
      {/* Hero. The title carries the piece, so the band stays a slim wash with
          the trail back to the library and the project above it. */}
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
                /* No report landing for this project yet, so the trail ends
                   in plain text rather than a link to nothing. */
                <span>{projectMeta.name}</span>
              )}
            </nav>

            <h1 className="text-display-sm font-display text-ink">
              {article.title}
            </h1>
          </div>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-16">
            <article className="flex max-w-[68ch] flex-col gap-10">
              <Image
                src={article.thumbnail}
                alt={article.thumbnailAlt}
                width={1200}
                height={628}
                priority
                className="anim-rise aspect-video w-full rounded-lg border border-line object-cover"
              />

              <div className="flex flex-col gap-5">
                {article.intro.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-lg leading-relaxed text-ink-soft"
                  >
                    <Emphasised text={paragraph} />
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-5">
                {article.body.map((block, index) => (
                  <BodyBlock
                    key={typeof block === "string" ? block : index}
                    block={block}
                  />
                ))}
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div
                id="download"
                className="anim-rise scroll-mt-24 rounded-lg border border-line bg-white p-5 sm:p-7"
                style={delay(160)}
              >
                <div className="flex flex-col gap-2 pb-5">
                  <h2 className="text-title font-display-soft">
                    Get the report
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {article.download.blurb}
                  </p>
                </div>
                <span aria-hidden="true" className="rule-ticks block h-px" />
                <div className="pt-5">
                  <JotformEmbed
                    formId={article.download.jotformId}
                    title={article.download.formTitle}
                  />
                </div>
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
              title="More articles"
              className="mb-12"
            />
            <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item, index) => (
                <Link
                  key={item.slug}
                  href={articleHref(item)}
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
