import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { Reveal } from "@/components/motion/reveal";
import { ReportCardRail } from "@/components/report-card-rail";
import { StatsBento } from "@/components/stats-band";
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
  insightsLibrary,
} from "@/content/insights";
import { delay, step } from "@/lib/motion";
import { og } from "@/lib/og";
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
    openGraph: og(insight.thumbnail),
  };
}

export default async function InsightPage({ params }: Params) {
  const { project, slug } = await params;
  const insight = getInsight(project, slug);
  const projectMeta = getInsightProject(project);
  if (!insight || !projectMeta) notFound();

  // The programme's report landing, when it has been built; the breadcrumb
  // links to it and falls back to plain text when it has not.
  const reportHref = projectMeta.reportSlug
    ? `/resources/reports-whitepapers/${projectMeta.reportSlug}`
    : undefined;

  const others = getProjectInsights(project).filter(
    (item) => item.slug !== insight.slug,
  );

  return (
    <main id="main">
      {/* Hero. The title carries the piece, so the band stays a slim wash
          with the trail back to the library above it. */}
      <Section spacing="tight" className="hero-wash border-b border-line">
        <Container>
          <div className="anim-rise flex flex-col gap-8" style={step(0)}>
            <Breadcrumbs
              items={[
                { label: insightsLibrary.title, href: "/resources/insights" },
                { label: projectMeta.name, href: reportHref },
              ]}
            />
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
                className="anim-rise scroll-mt-32"
                style={delay(160)}
              >
                <JotformEmbed
                  formId={insight.jotformId}
                  title="Report download form"
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
            {/* A single scrolling row rather than a stack of rows, so the
                band's height does not grow with the programme. */}
            <ReportCardRail
              items={others.map((item) => ({
                title: item.title,
                href: insightHref(item),
                image: item.thumbnail,
              }))}
              label="More insights"
            />
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
