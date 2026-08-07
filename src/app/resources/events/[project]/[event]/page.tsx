import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { VideoEmbed } from "@/components/media/video-embed";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SocialIcon } from "@/components/ui/social-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { eventHref, events, getEvent } from "@/content/events";
import { getExpertInterview, interviewHref } from "@/content/experts-view";
import { getInsightProject } from "@/content/insights";
import { getSuccessStory, successStoryHref } from "@/content/success-stories";
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

  /* An event with recordings leads with them: the poster stills are the
     artwork, so the banner is dropped and the write-up follows the sessions
     rather than preceding them. Everything else keeps the write-up band. */
  const hasSessions = Boolean(event.sessions?.length);
  const introBody = hasSessions ? undefined : event.body;

  /* The write-up band's left column. Where it is empty the facts stand on
     their own, so they run the full width rather than leaving a column of
     air beside them. */
  const hasPiece = Boolean(event.video || !hasSessions || introBody?.length);
  const hasAside = Boolean(event.facts?.length || event.jotformId);
  const intro = hasPiece || hasAside;

  /* The client story band, where the event names one. Resolved here so the
     band is dropped whole if the story record is ever renamed away. */
  const clientStory = event.clientStory;
  const story = clientStory
    ? getSuccessStory(project, clientStory.story)
    : undefined;

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

      {/* The write-up band, and only where there is a write-up. An event whose
          record is its recordings and its speakers goes straight from the
          title to the sessions rather than opening on a banner with nothing
          under it. */}
      {intro ? (
        <Section spacing="default">
          <Container>
            {/* Two columns whenever there is anything to park beside the piece,
              on the interview pages' measurements so the two read as one
              template. With no piece the facts take the width instead. */}
            <div
              className={
                !hasPiece
                  ? "grid gap-12"
                  : hasAside
                    ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-16"
                    : "grid gap-12"
              }
            >
              {hasPiece ? (
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
                  {introBody?.length ? (
                    <div className="flex max-w-[68ch] flex-col gap-5">
                      {introBody.map((block) =>
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
              ) : null}

              {/* The column beside the piece: the event's own facts where the
                source lists them, and the download form where it has one.
                A conference participation has neither, so the aside is
                dropped and the body runs the full width. */}
              {hasAside ? (
                <aside
                  className={
                    hasPiece
                      ? "flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start"
                      : "flex flex-col gap-10"
                  }
                >
                  {event.facts?.length ? (
                    /* Stacked beside a piece, spread across the width when
                       they stand alone. */
                    <dl
                      className={
                        hasPiece
                          ? "flex flex-col"
                          : "grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4"
                      }
                    >
                      {event.facts.map((fact, index) => (
                        <div
                          key={fact.label}
                          className={
                            hasPiece
                              ? `flex flex-col gap-1 py-4 ${
                                  index > 0 ? "border-t border-line" : "pt-0"
                                }`
                              : "flex flex-col gap-1 border-t border-line pt-4"
                          }
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
      ) : null}

      {/* The programme as it ran. The opening session leads at full width
          because it is the keynote and the source page gives it the same
          weight; the rest sit three up beneath it. */}
      {event.sessions?.length ? (
        <Section bordered spacing="tight">
          <Container>
            <SectionHeading
              eyebrow="From the day"
              title="Watch the sessions"
              className="mb-10"
            />
            <Reveal
              as="ul"
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {event.sessions.map((session, index) => {
                /* The opening session runs the width of the band with its
                   label set beside it, so the row that follows reads as the
                   rest of the programme rather than as four equal clips. */
                const lead = index === 0;

                return (
                  <li
                    key={session.videoId}
                    style={step(index)}
                    className={
                      lead
                        ? "grid items-center gap-6 lg:col-span-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10"
                        : "flex flex-col gap-4"
                    }
                  >
                    <VideoEmbed
                      videoId={session.videoId}
                      poster={session.poster}
                      title={`${session.kind}: ${session.title}`}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-ink-muted">
                        {session.kind}
                      </span>
                      <span
                        className={
                          lead
                            ? "text-title font-display-soft text-ink"
                            : "text-base leading-relaxed text-ink"
                        }
                      >
                        {session.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </Reveal>

            {/* The source embeds this as a 300px SlideShare iframe with an
                empty anchor under it. A link that names the deck is more
                use than the embed was. */}
            {event.deck ? (
              <p className="mt-8">
                <a
                  href={event.deck.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-accent hover:text-accent-hover"
                >
                  {event.deck.title}
                </a>
              </p>
            ) : null}

            {/* The write-up sits here rather than above, because the
                recordings are what the page leads with. */}
            {hasSessions && event.body?.length ? (
              <div className="mt-10 flex max-w-[68ch] flex-col gap-5 border-t border-line pt-8">
                {event.body.map((block) =>
                  typeof block === "string" ? (
                    <p
                      key={block}
                      className="text-base leading-relaxed text-ink-soft"
                    >
                      <Emphasised text={block} />
                    </p>
                  ) : "heading" in block ? (
                    <h3
                      key={block.heading}
                      className="mt-4 text-title font-display-soft text-ink"
                    >
                      {block.heading}
                    </h3>
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
          </Container>
        </Section>
      ) : null}

      {/* What the interviewees said, as the source runs it beside the
          recording: the quote carries the card, the attribution sits under
          it, and the whole card is the way into the full interview. */}
      {event.quotes?.length ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <SectionHeading
              eyebrow="From the interviews"
              title="What the leaders said"
              className="mb-10"
            />
            <Reveal as="ul" className="grid gap-6 md:grid-cols-2">
              {event.quotes.map((quote, index) => {
                const interview = getExpertInterview(
                  event.project,
                  quote.interview,
                );
                if (!interview) return null;

                return (
                  <li key={quote.interview} style={step(index)}>
                    <Link
                      href={interviewHref(interview)}
                      className="flex h-full flex-col gap-5 rounded-lg border border-line bg-surface p-6 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent sm:p-8"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-8 rounded-[1px] bg-signal"
                      />
                      <blockquote className="text-title font-display-soft leading-snug text-ink">
                        {quote.text}
                      </blockquote>
                      <span className="mt-auto flex items-center gap-4">
                        {quote.image ? (
                          <Image
                            src={quote.image}
                            alt=""
                            width={112}
                            height={112}
                            loading="lazy"
                            sizes="56px"
                            className="size-14 shrink-0 rounded-full border border-line object-cover"
                          />
                        ) : null}
                        <span className="flex flex-col gap-0.5">
                          <span className="text-base font-semibold text-ink">
                            {quote.name}
                          </span>
                          <span className="text-sm leading-relaxed text-ink-soft">
                            {quote.role}
                          </span>
                          <span className="mt-1 text-sm font-semibold text-accent">
                            Read the full interview
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {event.speakers?.length ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <SectionHeading title="Who spoke" className="mb-10" />
            <Reveal
              as="ul"
              className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {event.speakers.map((speaker, index) => {
                /* Only where the event sets one: the ai-led launch links its
                   speakers to LinkedIn alone, the two report launches that
                   name their interviewees still link the interview. */
                const interview = speaker.interview
                  ? getExpertInterview(event.project, speaker.interview)
                  : undefined;

                return (
                  <li
                    key={speaker.name}
                    style={step(index)}
                    className="flex flex-col gap-1 border-t border-line pt-4"
                  >
                    {/* Decorative: the name sits right beside it, so an alt
                      repeating it would only double up for a screen
                      reader. */}
                    {speaker.image ? (
                      <Image
                        src={speaker.image}
                        alt=""
                        width={112}
                        height={112}
                        loading="lazy"
                        sizes="56px"
                        className="mb-1 size-14 rounded-full border border-line object-cover"
                      />
                    ) : null}
                    {/* The name carries the profile link, as the source page
                      has it. Where the source links the wrong person the
                      field is unset and the name is plain text. */}
                    {speaker.linkedIn ? (
                      <a
                        href={speaker.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-base font-semibold text-ink transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:text-accent"
                      >
                        {speaker.name}
                        <SocialIcon
                          label="LinkedIn"
                          className="size-3.5 shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100"
                        />
                        <span className="sr-only">on LinkedIn</span>
                      </a>
                    ) : (
                      <span className="text-base font-semibold text-ink">
                        {speaker.name}
                      </span>
                    )}
                    <span className="text-sm leading-relaxed text-ink-soft">
                      {speaker.role}
                    </span>
                    {interview ? (
                      <Link
                        href={interviewHref(interview)}
                        className="mt-1 self-start text-sm font-semibold text-accent hover:text-accent-hover"
                      >
                        Read the interview
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* The report the event launched. Copy at left on the reading measure,
          the cover mockup at right, which is the order the source panel uses
          and the one the report landings already follow. */}
      {event.reportBand && reportHref ? (
        <Section bordered spacing="tight">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="anim-rise flex flex-col gap-6">
                <SectionHeading
                  title={event.reportBand.title}
                  lede={event.reportBand.subtitle}
                  size="headline"
                />
                {event.reportBand.facts?.length ? (
                  <ul className="flex flex-col gap-3">
                    {event.reportBand.facts.map((fact) => (
                      <li
                        key={fact.label}
                        className="flex gap-3 text-base leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-3 shrink-0 rounded-[1px] bg-signal"
                        />
                        <span>
                          <span className="font-semibold text-ink">
                            {fact.label}
                          </span>
                          , {fact.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="pt-1">
                  <Button href={reportHref}>Read the full report</Button>
                </div>
              </div>

              <Image
                src={event.reportBand.artwork}
                alt={event.reportBand.artworkAlt}
                width={768}
                height={912}
                loading="lazy"
                sizes="(min-width: 1024px) 28rem, 70vw"
                className="anim-rise mx-auto w-full max-w-sm lg:justify-self-end"
                style={delay(120)}
              />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* The client half of the engagement, on the report landing's own
          measurements so the two pages carry one band: the microsite's
          testimonial artwork and the CTA at left, the engagement facts at
          right. */}
      {clientStory && story ? (
        <Section bordered spacing="tight">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="anim-rise flex flex-col gap-5">
                <SectionHeading title="Client success story" size="headline" />
                <Link
                  href={successStoryHref(story)}
                  className="group block max-w-[32rem] overflow-hidden rounded-lg border border-line transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                >
                  <Image
                    src={clientStory.card}
                    alt={story.title}
                    width={1024}
                    height={576}
                    loading="lazy"
                    sizes="(min-width: 1024px) 32rem, 100vw"
                    className="aspect-video w-full object-cover"
                  />
                </Link>
                <div className="pt-1">
                  <Button href={successStoryHref(story)} variant="secondary">
                    Read the story
                  </Button>
                </div>
              </div>

              {/* Verbatim from the source, pipes, capitals and en dash
                  included, as the report landing carries them. */}
              <dl
                className="anim-rise grid gap-x-8 gap-y-5 sm:grid-cols-2"
                style={delay(120)}
              >
                {clientStory.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-1 border-t border-line pt-4"
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
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
