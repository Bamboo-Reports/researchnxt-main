import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { eventHref, events, getEvent } from "@/content/events";
import { getExpertInterview, interviewHref } from "@/content/experts-view";
import { getInsightProject } from "@/content/insights";
import { formatDate } from "@/lib/date";
import { delay, step } from "@/lib/motion";

/**
 * One event. An event is a record of something that already happened, so the
 * page leads with what it was and who spoke rather than with a sign-up: the
 * facts sit beside the image, and each speaker links to their interview where
 * one is published.
 */

type Params = { params: Promise<{ project: string; event: string }> };

export function generateStaticParams() {
  return events.map((event) => ({
    project: event.project,
    event: event.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { project, event: slug } = await params;
  const event = getEvent(project, slug);
  if (!event) return {};

  return {
    title: event.metaTitle,
    description: event.metaDescription,
    alternates: { canonical: eventHref(event) },
  };
}

export default async function EventPage({ params }: Params) {
  const { project, event: slug } = await params;
  const event = getEvent(project, slug);
  if (!event) notFound();

  const programme = getInsightProject(project);
  const reportHref = programme?.reportSlug
    ? `/resources/reports-whitepapers/${programme.reportSlug}`
    : undefined;

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
                href="/resources/events"
                className="text-accent hover:text-accent-hover"
              >
                Events
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
              {/* The separator belongs to the date, so a recap with no stated
                  event date ends the trail at the programme rather than on a
                  dangling slash. */}
              {event.date ? (
                <>
                  <span aria-hidden="true">/</span>
                  <time dateTime={event.date}>{formatDate(event.date)}</time>
                </>
              ) : null}
            </nav>

            <h1 className="max-w-[24ch] text-display-sm font-display text-ink">
              {event.title}
            </h1>
            {event.lede ? (
              <p className="max-w-[60ch] text-lg leading-relaxed text-ink-soft">
                {event.lede}
              </p>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          {/* Two columns whenever there is anything to park beside the piece,
              on the interview pages' measurements so the two read as one
              template. */}
          <div
            className={
              event.facts?.length || event.jotformId
                ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-16"
                : "grid gap-12"
            }
          >
            <div className="flex flex-col gap-8">
              {/* Where a recap has a highlights reel it opens with it, in
                  place of the banner, which is the order the source uses.
                  Not lazy here: above the fold, it is the first thing. */}
              {event.video ? (
                <iframe
                  src={`https://www.linkedin.com/embed/feed/update/${event.video.linkedInPost}?compact=1`}
                  title={event.video.caption}
                  allowFullScreen
                  className="anim-rise aspect-[71/45] w-full rounded-lg border border-line"
                />
              ) : (
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  width={1280}
                  height={583}
                  priority
                  className="anim-rise aspect-video w-full rounded-lg border border-line object-cover"
                />
              )}
              {event.body?.length ? (
                <div className="flex max-w-[68ch] flex-col gap-5">
                  {event.body.map((block) =>
                    typeof block === "string" ? (
                      <p
                        key={block}
                        className="text-base leading-relaxed text-ink-soft"
                      >
                        <Emphasised text={block} />
                      </p>
                    ) : "heading" in block ? (
                      <h2
                        key={block.heading}
                        className="mt-4 text-title font-display-soft text-ink"
                      >
                        {block.heading}
                      </h2>
                    ) : "image" in block ? (
                      <Image
                        key={block.image}
                        src={block.image}
                        alt={block.alt}
                        width={2048}
                        height={1152}
                        loading="lazy"
                        sizes="(min-width: 1024px) 34rem, (min-width: 640px) 60vw, 100vw"
                        className="my-2 aspect-video w-full rounded-md border border-line object-cover"
                      />
                    ) : (
                      <ul
                        key={block.list.join("")}
                        className="flex flex-col gap-3"
                      >
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
                    ),
                  )}
                </div>
              ) : null}
            </div>

            {/* The column beside the piece: the event's own facts where the
                source lists them, and the download form where it has one.
                A conference participation has neither, so the aside is
                dropped and the body runs the full width. */}
            {event.facts?.length || event.jotformId ? (
              <aside className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
                {event.facts?.length ? (
                  <dl className="flex flex-col">
                    {event.facts.map((fact, index) => (
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
                ) : null}

                {/* No panel and no heading of its own, as on the interview
                    pages: the embed carries its own title and framing. */}
                {event.jotformId ? (
                  <div
                    id="download"
                    className="anim-rise scroll-mt-24"
                    style={delay(160)}
                  >
                    <JotformEmbed
                      formId={event.jotformId}
                      title="Download the handbook"
                    />
                  </div>
                ) : null}
              </aside>
            ) : null}
          </div>
        </Container>
      </Section>

      {event.speakers?.length ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <SectionHeading title="Who spoke" className="mb-10" />
            <Reveal
              as="ul"
              className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {event.speakers.map((speaker, index) => {
                const interview = speaker.interview
                  ? getExpertInterview(event.project, speaker.interview)
                  : undefined;

                const inner = (
                  <>
                    <span className="text-base font-semibold text-ink">
                      {speaker.name}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">
                      {speaker.role}
                    </span>
                    {interview ? (
                      <span className="mt-1 text-sm font-semibold text-accent">
                        Read the interview
                      </span>
                    ) : null}
                  </>
                );

                return (
                  <li key={speaker.name} style={step(index)}>
                    {interview ? (
                      <Link
                        href={interviewHref(interview)}
                        className="flex flex-col gap-1 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex flex-col gap-1 border-t border-line pt-4">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
