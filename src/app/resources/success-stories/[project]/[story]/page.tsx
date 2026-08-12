import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { VideoEmbed } from "@/components/media/video-embed";
import { Reveal } from "@/components/motion/reveal";
import { StatsCards } from "@/components/stats-band";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { eventHref, getEvent } from "@/content/events";
import { getInsightProject } from "@/content/insights";
import { getReportLanding } from "@/content/resources";
import {
  getSuccessStory,
  successStories,
  successStoryHref,
} from "@/content/success-stories";
import { formatDate } from "@/lib/date";
import { step } from "@/lib/motion";

/**
 * One success story. The engagement already happened, so the page leads with
 * what was delivered rather than with a sign-up: the client card and the facts,
 * then the measured deliverables, then the words of the people the research
 * spoke to. The full document lives off-site, so the one action on the page is
 * an external link to it.
 */

type Params = { params: Promise<{ project: string; story: string }> };

export function generateStaticParams() {
  return successStories.map((story) => ({
    project: story.project,
    story: story.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { project, story: slug } = await params;
  const story = getSuccessStory(project, slug);
  if (!story) return {};

  return {
    title: story.metaTitle,
    description: story.metaDescription,
    alternates: { canonical: successStoryHref(story) },
  };
}

export default async function SuccessStoryPage({ params }: Params) {
  const { project, story: slug } = await params;
  const story = getSuccessStory(project, slug);
  if (!story) notFound();

  const programme = getInsightProject(project);
  const reportHref = programme?.reportSlug
    ? `/resources/reports-whitepapers/${programme.reportSlug}`
    : undefined;
  /* The report the engagement produced, so its cover and the words for it are
     read from the reports registry rather than restated per story. */
  const report = programme?.reportSlug
    ? getReportLanding(programme.reportSlug)
    : undefined;
  /* The launch event, resolved from the events registry so its title, artwork
     and URL are not restated here. A slug that names no event is an authoring
     error, so it fails the build rather than rendering a dead band. */
  const launch = story.launchEvent
    ? getEvent(story.project, story.launchEvent.slug)
    : undefined;
  if (story.launchEvent && !launch) {
    throw new Error(
      `Unknown launch event: ${story.project}/${story.launchEvent.slug}`,
    );
  }
  /* An ongoing data engagement produced no report and states no research
     parameters, so there is no report band to run and the case study link
     belongs back with the copy it follows from. */
  const hasReportBand = Boolean(report) || story.facts.length > 0;

  return (
    <main id="main">
      {/* Hero. The title carries the piece, so the band stays a slim wash with
          the trail back to the library and the date above it. */}
      <Section spacing="none" className="hero-wash border-b border-line">
        <Container className="py-12 sm:py-16">
          <div className="anim-rise flex flex-col gap-6" style={step(0)}>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-ink-muted"
            >
              <Link
                href="/resources/success-stories"
                className="text-accent hover:text-accent-hover"
              >
                Success stories
              </Link>
              <span aria-hidden="true">/</span>
              {reportHref && programme ? (
                <Link
                  href={reportHref}
                  className="text-accent hover:text-accent-hover"
                >
                  {programme.name}
                </Link>
              ) : programme ? (
                <span>{programme.name}</span>
              ) : null}
              <span aria-hidden="true">/</span>
              <time dateTime={story.published}>
                {formatDate(story.published)}
              </time>
            </nav>

            {/* No client mark in the hero. It was set to a fixed 432x91 box
                whatever the file's own ratio, so a 720x232 lockup rendered
                squashed, and the client is already named in the title and
                carried by the testimonial artwork below. */}

            <h1 className="max-w-[24ch] text-display-sm font-display text-ink">
              {story.title}
            </h1>
            <p className="max-w-[60ch] text-lg leading-relaxed text-ink-soft">
              {story.lede}
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              {/* A story whose artwork fronts a recording runs it in the
                  testimonial band below instead, where the copy has already
                  introduced the engagement. */}
              {story.video || story.testimonial ? null : (
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  width={1024}
                  height={576}
                  priority
                  className="anim-rise aspect-video w-full rounded-lg border border-line object-cover"
                />
              )}
              {story.body?.length ? (
                <div className="flex flex-col gap-5">
                  {story.body.map((block, index) => (
                    <Fragment key={typeof block === "string" ? block : index}>
                      {typeof block === "string" ? (
                        <p className="text-base leading-relaxed text-ink-soft">
                          <Emphasised text={block} />
                        </p>
                      ) : (
                        <ul className="flex flex-col gap-3">
                          {block.list.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 text-base leading-relaxed text-ink-soft"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2.5 h-1 w-3 shrink-0 rounded-[1px] bg-signal"
                              />
                              <span>
                                <Emphasised text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* The case study is the page's own document, so its link
                        follows the opening paragraph the way the source pages
                        put it near the top, not at the foot of the page. */}
                      {index === 0 && story.document ? (
                        <div className="pt-1">
                          <Button href={story.document.href} external>
                            {story.document.label}
                          </Button>
                        </div>
                      ) : null}
                    </Fragment>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* The client's own account of the engagement: the recording, then what
          they said, both at the page's full measure. The artwork has a play
          button baked into it, so where the source page backs it with a
          recording it has to be the poster of a real player, not a still. */}
      {story.video || story.testimonial ? (
        <Section bordered spacing="tight">
          <Container>
            <div className="flex flex-col gap-10">
              {story.video ? (
                <VideoEmbed
                  videoId={story.video.videoId}
                  host={story.video.host}
                  poster={story.image}
                  title={story.video.title}
                />
              ) : (
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  width={1024}
                  height={576}
                  className="aspect-video w-full rounded-lg border border-line object-cover"
                />
              )}
              {story.testimonial ? (
                <figure className="flex flex-col gap-5">
                  {story.testimonial.quote ? (
                    <blockquote className="text-lg leading-relaxed text-ink">
                      {story.testimonial.quote}
                    </blockquote>
                  ) : null}
                  <figcaption className="flex flex-col">
                    <span className="text-base font-semibold text-ink">
                      {story.testimonial.name}
                    </span>
                    <span className="text-base leading-relaxed text-ink-soft">
                      {story.testimonial.company
                        ? `${story.testimonial.role}, ${story.testimonial.company}`
                        : story.testimonial.role}
                    </span>
                  </figcaption>
                </figure>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {story.deliverables?.length ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <SectionHeading title="Key deliverables" className="mb-10" />
            <StatsCards stats={story.deliverables} />
          </Container>
        </Section>
      ) : null}

      {story.quotes?.length ? (
        <Section bordered spacing="tight">
          <Container>
            <SectionHeading title="In their words" className="mb-10" />
            {/* Three across is the full shelf. A story that ran fewer than
                three quotes centres the set on the measure instead of leaving
                a gap where the third card would be; the cards themselves stay
                left-aligned on their shared top rule. */}
            <Reveal
              as="ul"
              className={`grid gap-x-8 gap-y-10 sm:grid-cols-2 ${
                story.quotes.length >= 3
                  ? "lg:grid-cols-3"
                  : "mx-auto max-w-3xl"
              }`}
            >
              {story.quotes.map((quote, index) => (
                <li
                  key={quote.name}
                  className="flex flex-col gap-4 border-t border-line pt-6"
                  style={step(index)}
                >
                  <blockquote className="text-base leading-relaxed text-ink">
                    {quote.quote}
                  </blockquote>
                  <div className="mt-auto flex items-center gap-3 pt-2">
                    {quote.image ? (
                      <Image
                        src={quote.image}
                        alt=""
                        width={96}
                        height={96}
                        className="size-11 shrink-0 rounded-full object-cover"
                      />
                    ) : null}
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-ink">
                        {quote.name}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-soft">
                        {quote.company
                          ? `${quote.role}, ${quote.company}`
                          : quote.role}
                      </span>
                    </div>
                  </div>
                  {quote.href ? (
                    <Link
                      href={quote.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
                    >
                      View entire interview
                      <TrailingArrow />
                    </Link>
                  ) : null}
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* The report the engagement produced: its cover on the left, the
          programme's own facts and the ways in on the right, as the source
          page sets out its report details. */}
      {hasReportBand ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
              {report ? (
                <Image
                  src={report.hero.cover}
                  alt={report.hero.coverAlt}
                  width={1024}
                  height={768}
                  className="w-full rounded-lg object-contain"
                />
              ) : null}
              <div className="flex flex-col gap-8">
                {/* The report is named here, as the source pages name it above
                    their report details. */}
                {report ? (
                  <h2 className="text-title font-display-soft text-ink">
                    {report.hero.title}
                  </h2>
                ) : null}
                {story.facts.length ? (
                  <dl className="flex flex-col">
                    {story.facts.map((fact, index) => (
                      <div
                        key={fact.label}
                        className={`flex flex-col gap-1 py-4 ${
                          index > 0 ? "border-t border-line" : "pt-0"
                        }`}
                      >
                        <dt className="text-sm font-semibold text-ink-muted">
                          {fact.label}
                        </dt>
                        <dd className="text-base leading-relaxed text-ink">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : story.deliverables?.length ? (
                  /* A source page that lists no research parameters sets what
                     the programme produced under the report's name instead, so
                     the deliverables read again here as a plain list. */
                  <ul className="flex flex-col">
                    {story.deliverables.map((item, index) => (
                      <li
                        key={item.label}
                        className={`flex gap-3 py-3 text-base leading-relaxed text-ink ${
                          index > 0 ? "border-t border-line" : "pt-0"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-3 shrink-0 rounded-[1px] bg-signal"
                        />
                        <span>
                          <span className="font-semibold">{item.value}</span>{" "}
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {reportHref ? (
                    <Link
                      href={reportHref}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
                    >
                      Read the full report
                      <TrailingArrow />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* The event the programme closed with, closing the page in turn. The
          artwork is the way in, so it is the link, and the copy sits beside it
          rather than under a second heading of its own. */}
      {story.launchEvent && launch ? (
        <Section bordered spacing="tight">
          <Container>
            <SectionHeading title={story.launchEvent.title} className="mb-10" />
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Link
                href={eventHref(launch)}
                className="group block overflow-hidden rounded-lg border border-line transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
              >
                <Image
                  src={launch.image}
                  alt={launch.imageAlt}
                  width={1024}
                  height={576}
                  className="aspect-video w-full object-cover transition-transform duration-500 [transition-timing-function:var(--ease-out-quart)] group-hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-col gap-5">
                {story.launchEvent.description.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
                <div>
                  <Link
                    href={eventHref(launch)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
                  >
                    {story.launchEvent.linkLabel}
                    <TrailingArrow />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
