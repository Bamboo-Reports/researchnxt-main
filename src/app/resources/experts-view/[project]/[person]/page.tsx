import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadForm } from "@/components/forms/download-form";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { Reveal } from "@/components/motion/reveal";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  expertInterviews,
  getExpertInterview,
  getExpertProject,
  getProjectInterviews,
  interviewHref,
} from "@/content/experts-view";
import { getReportLanding } from "@/content/resources";
import { delay, step } from "@/lib/motion";
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
                href="/resources/experts-view"
                className="text-accent hover:text-accent-hover"
              >
                Experts view
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

            {/* The thumbnail carries the name, role and company, so the hero
                does not repeat them. */}
            <h1 className="text-display-sm font-display text-ink">
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

              <div className="flex flex-col gap-10">
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

            {showForm ? (
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div
                  id="download"
                  className="anim-rise scroll-mt-24 rounded-lg border border-line bg-white p-5 sm:p-7"
                  style={delay(160)}
                >
                  <div className="flex flex-col gap-2 pb-5">
                    <h2 className="text-title font-display-soft">
                      Get the full report
                    </h2>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      This interview is one of the conversations behind the{" "}
                      {projectMeta.name}. Free download, sent straight to your
                      work email.
                    </p>
                  </div>
                  <span aria-hidden="true" className="rule-ticks block h-px" />
                  <div className="pt-5">
                    {jotformId ? (
                      <JotformEmbed
                        formId={jotformId}
                        title="Download the report"
                      />
                    ) : report ? (
                      <DownloadForm
                        report={report.hero.title}
                        submitLabel={report.download.submitLabel}
                        consent={report.download.consent}
                      />
                    ) : null}
                  </div>
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
            <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item, index) => (
                <Link
                  key={item.slug}
                  href={interviewHref(item)}
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
                    Read the interview
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
