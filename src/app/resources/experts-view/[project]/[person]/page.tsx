import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DownloadForm } from "@/components/forms/download-form";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { Reveal } from "@/components/motion/reveal";
import { ReportCardRail } from "@/components/report-card-rail";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  expertInterviews,
  expertsViewLibrary,
  getExpertInterview,
  getExpertProject,
  getProjectInterviews,
  interviewHref,
} from "@/content/experts-view";
import { getReportLanding } from "@/content/resources";
import { delay, step } from "@/lib/motion";
import { og } from "@/lib/og";
import type { InterviewBlock } from "@/content/experts-view";

/**
 * One expert interview. The article runs at reading measure with the report's
 * download form parked beside it, so the offer stays in view for the length of
 * a long transcript rather than only at the end.
 */

type Params = { params: Promise<{ project: string; person: string }> };

/** A paragraph or a list inside an answer. */
function AnswerBlock({ block }: { block: InterviewBlock }) {
  if (typeof block === "string") {
    return (
      <p className="text-base leading-relaxed text-ink-soft">
        <Emphasised text={block} />
      </p>
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
  return expertInterviews.map((interview) => ({
    project: interview.project,
    person: interview.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { project, person } = await params;
  const interview = getExpertInterview(project, person);
  if (!interview) return {};

  return {
    title: interview.metaTitle,
    description: interview.metaDescription,
    alternates: { canonical: interviewHref(interview) },
    openGraph: og(interview.thumbnail),
  };
}

export default async function ExpertInterviewPage({ params }: Params) {
  const { project, person } = await params;
  const interview = getExpertInterview(project, person);
  const projectMeta = getExpertProject(project);
  if (!interview || !projectMeta) notFound();

  // A project keeps its download form on its report landing once that exists;
  // until then it carries a Jotform id of its own.
  const report = projectMeta.reportSlug
    ? getReportLanding(projectMeta.reportSlug)
    : undefined;
  const reportHref = report
    ? `/resources/reports-whitepapers/${report.slug}`
    : undefined;
  const jotformId = report?.download.jotformId ?? projectMeta.jotformId;
  const showForm = Boolean(report ?? jotformId);

  const others = getProjectInterviews(project).filter(
    (item) => item.slug !== interview.slug,
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
                {
                  label: expertsViewLibrary.title,
                  href: "/resources/experts-view",
                },
                { label: projectMeta.name, href: reportHref },
              ]}
            />
            {/* The thumbnail carries the name, role and company, so the hero
                does not repeat them. */}
            <h1 className="max-w-[24ch] text-display-sm font-display text-ink">
              {interview.title}
            </h1>
          </div>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-16">
            <article className="flex max-w-[68ch] flex-col gap-10">
              <Image
                src={interview.thumbnail}
                alt={interview.thumbnailAlt}
                width={1920}
                height={1080}
                priority
                className="anim-rise aspect-video w-full rounded-lg border border-line object-cover"
              />

              <div className="flex flex-col gap-5">
                {interview.intro.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-lg leading-relaxed text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Some source articles carry no highlights list; the band is
                  dropped rather than left as a heading over nothing. */}
              {interview.highlights.length > 0 ? (
                <div className="flex flex-col gap-6">
                  <SectionHeading
                    as="h2"
                    size="title"
                    eyebrow="Key highlights"
                    title="What this conversation covers"
                  />
                  <Reveal as="ul" className="flex flex-col gap-5">
                    {interview.highlights.map((highlight, index) => {
                      const labelled = typeof highlight !== "string";
                      return (
                        <li
                          key={labelled ? highlight.title : highlight}
                          className="border-t border-line pt-4 text-base leading-relaxed text-ink-soft"
                          style={step(index)}
                        >
                          {labelled ? (
                            <>
                              <strong className="block font-semibold text-ink">
                                {highlight.title}
                              </strong>
                              <span className="mt-1 block">
                                {highlight.description}
                              </span>
                            </>
                          ) : (
                            highlight
                          )}
                        </li>
                      );
                    })}
                  </Reveal>
                </div>
              ) : null}

              {interview.pullQuote ? (
                <blockquote className="border-l-2 border-signal pl-6">
                  <p className="text-title font-display-soft text-ink">
                    {interview.pullQuote}
                  </p>
                  <footer className="mt-3 text-sm font-semibold text-ink-muted">
                    {[interview.person.name, interview.person.company]
                      .filter(Boolean)
                      .join(", ")}
                  </footer>
                </blockquote>
              ) : null}

              {/* Some source pages are video interviews carrying only a
                  summary and a biography, so there is no transcript to run. */}
              <div
                className={
                  interview.exchanges.length > 0 ? "flex flex-col gap-10" : ""
                }
              >
                {interview.exchanges.map((exchange) => (
                  <div key={exchange.question} className="flex flex-col gap-4">
                    <h2 className="text-title font-display-soft text-ink">
                      {exchange.question}
                    </h2>
                    {exchange.answer.map((block, index) => (
                      <AnswerBlock
                        key={typeof block === "string" ? block : index}
                        block={block}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </article>

            {/* The form sits on the page with no panel and no heading of its
                own: the embed carries its own title and framing. */}
            {showForm ? (
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div
                  id="download"
                  className="anim-rise scroll-mt-32"
                  style={delay(160)}
                >
                  {jotformId ? (
                    <JotformEmbed
                      formId={jotformId}
                      title="Report download form"
                    />
                  ) : report ? (
                    <DownloadForm
                      report={report.hero.title}
                      submitLabel={report.download.submitLabel}
                      consent={report.download.consent}
                    />
                  ) : null}
                </div>
              </aside>
            ) : null}
          </div>
        </Container>
      </Section>

      {others.length > 0 ? (
        <Section surface="subtle" bordered spacing="default">
          <Container>
            <SectionHeading
              eyebrow={projectMeta.name}
              title="More interviews"
              className="mb-12"
            />
            {/* A single scrolling row rather than a stack of rows: the ACM
                programme has 18 sibling interviews, which stacked six rows
                deep under every one of its interview pages. */}
            <ReportCardRail
              items={others.map((item) => ({
                title: item.title,
                href: interviewHref(item),
                image: item.thumbnail,
              }))}
              label="More interviews"
            />
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
