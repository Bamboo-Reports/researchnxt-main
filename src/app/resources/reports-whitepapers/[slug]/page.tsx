import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExpertInsightsTabs } from "@/components/expert-insights-tabs";
import { ReportCard } from "@/components/report-card";
import { ReportCardGrid } from "@/components/report-card-grid";
import { DownloadForm } from "@/components/forms/download-form";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { Logo } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { QuoteCarousel } from "@/components/quote-carousel";
import { ReportCardRail } from "@/components/report-card-rail";
import { StatsBento } from "@/components/stats-band";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getReportLanding, reportLandings } from "@/content/resources";
import { delay, step } from "@/lib/motion";

/**
 * Landing page template for a single report, mirroring the structure of the
 * live WordPress microsites: hero with the cover and the download form,
 * description, chapters, quick reads, expert insights by AI maturity stage,
 * sponsor credits. Every report in `content/resources.ts` gets its own page
 * here; only the data differs.
 *
 * The page runs on `tight` bands throughout rather than the site's `default`
 * rhythm. It is a single-decision landing read in one scroll, so the bands are
 * separated by surface and hairline rather than by a lot of air; the pulse
 * comes from the interval inside each band instead.
 */

type Params = { params: Promise<{ slug: string }> };

/**
 * The offer band's three line icons, drawn in the house stroke so the band
 * does not pull in an icon library for three marks: heads in conversation for
 * consulting, a checked cloud for the assessment, a ticket for the waiver.
 */
function OfferIcon({ name }: { name: "consulting" | "assessment" | "waiver" }) {
  const paths = {
    consulting: (
      <>
        <circle cx="8" cy="9" r="3" />
        <path d="M2.8 20c.6-3.2 2.7-5 5.2-5s4.6 1.8 5.2 5" />
        <path d="M15 4.6a4 4 0 0 1 4.7 6.3" />
        <path d="M16.6 15.2c2.4.3 4.1 2 4.6 4.8" />
      </>
    ),
    assessment: (
      <>
        <path d="M7 18a4.5 4.5 0 0 1-.4-9 6 6 0 0 1 11.6 1.6A4 4 0 0 1 17.5 18H7Z" />
        <path d="m9.5 13.5 2 2 3.5-4" />
      </>
    ),
    waiver: (
      <>
        <path d="M3 9.5V7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.5a2.5 2.5 0 0 0 0 5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2.5a2.5 2.5 0 0 0 0-5Z" />
        <path d="M14 6v2.2M14 11v2M14 15.8V18" />
      </>
    ),
  } as const;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-9 text-accent"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export function generateStaticParams() {
  return reportLandings.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const report = getReportLanding(slug);
  if (!report) return {};

  return {
    title: report.metaTitle,
    description: report.metaDescription,
    alternates: {
      canonical: `/resources/reports-whitepapers/${report.slug}`,
    },
  };
}

export default async function ReportLandingPage({ params }: Params) {
  const { slug } = await params;
  const report = getReportLanding(slug);
  if (!report) notFound();

  return (
    <main id="main">
      {/* Hero. The cover carries the title, so the visible band is only the
          artifact and the single action: the cover on the light brand wash,
          the form beside it. The h1 stays for assistive tech and the document
          outline.

          The two columns are sized and centred as a pair rather than letting
          the cover float in a 1fr column, which left a lot of dead width at
          desktop. The Jotform iframe is a fixed 539px and sets the band's
          height, so the padding stays tight around it. */}
      <Section spacing="none" className="hero-wash border-b border-line">
        <Container className="py-8 sm:py-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,26rem)] lg:justify-center lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="sr-only">{report.hero.title}</h1>
              {/* The tablet mockup set: every hero cover is the same 768x909
                  frame, so the intrinsic ratio here matches the files. */}
              <Image
                src={report.hero.cover}
                alt={report.hero.coverAlt}
                width={768}
                height={909}
                priority
                className="anim-rise w-52 self-center sm:w-64 lg:w-full"
              />
            </div>

            <div
              id="download"
              className="anim-rise scroll-mt-24"
              style={delay(160)}
            >
              {/* The form sits directly on the hero wash: no panel, no
                  heading. The embed carries its own title and framing. */}
              {report.download.jotformId ? (
                <JotformEmbed
                  formId={report.download.jotformId}
                  title="Download the report"
                />
              ) : (
                <DownloadForm
                  report={report.hero.title}
                  submitLabel={report.download.submitLabel}
                  consent={report.download.consent}
                />
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* About the report. Held to a reading measure instead of running the
          full page width, and the opening paragraph carries the weight so the
          band has a lead rather than two paragraphs of equal voice. */}
      <Section spacing="tight">
        <Container>
          {/* Justified on user direction, with `hyphens-auto` so the flush
              right edge does not open rivers of white space between words. */}
          <div className="mx-auto flex max-w-[68ch] flex-col gap-5 text-justify hyphens-auto">
            {report.description.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-xl leading-relaxed text-ink"
                    : "text-lg leading-relaxed text-ink-soft"
                }
              >
                <Emphasised text={paragraph} />
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* The report's chapters, in reading order. Not every report runs a
          chapter band: the 2021 cloud microsite has none. */}
      {report.expect ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <SectionHeading
              title={report.expect.title}
              align="center"
              className="mb-10"
            />
            <Reveal className="grid gap-x-8 gap-y-10 md:grid-cols-3">
              {report.expect.sections.map((section, index) => (
                <div
                  key={section.name}
                  className="flex flex-col items-center border-t border-line pt-5 text-center"
                  style={step(index)}
                >
                  {section.image ? (
                    <Image
                      src={section.image}
                      alt=""
                      width={1024}
                      height={1024}
                      className="size-20 object-contain"
                    />
                  ) : null}
                  <h3 className="mt-4 text-title font-display-soft">
                    {section.name}
                  </h3>
                  {/* The hard wraps in the copy only apply from `lg`, where the
                      column is wide enough for them; below that the `\n`
                      collapses to a space and the text wraps to the column. */}
                  <p className="mt-2 whitespace-normal text-sm leading-relaxed text-ink-soft lg:whitespace-pre-line">
                    {section.description}
                  </p>
                </div>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* Figures about the research itself, where the report carries them.
          The site's own stat tiles, so the numbers count up as they do on
          About and the solution pages. */}
      {report.figures ? (
        <Section bordered spacing="tight">
          <Container>
            <SectionHeading
              title={report.figures.title}
              align="center"
              className="mb-10"
            />
            <StatsBento stats={report.figures.items} />
          </Container>
        </Section>
      ) : null}

      {/* Headline findings, where the report lists them instead of chapters:
          a dense tick list, since the source gives labels without prose and
          padding them into cards would fake a depth they do not have. */}
      {report.highlights ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <SectionHeading
              title={report.highlights.title}
              align="center"
              className="mb-10"
            />
            <Reveal
              as="ul"
              className="mx-auto grid max-w-4xl gap-x-10 gap-y-0 sm:grid-cols-2"
            >
              {report.highlights.items.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 border-t border-line py-3.5 text-base font-semibold text-ink"
                  style={step(index)}
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-[1px] bg-signal"
                  />
                  {item}
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* The sponsor's offer to readers, where the report carries one. The
          source microsite ran this as a four-cell strip, sponsor first; here
          that becomes the site's bento grammar: the sponsor on the accent
          feature tile with the mark's white variant, and each promise on a
          quiet tile under a drawn line icon. */}
      {report.offer ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div
                className="flex min-h-44 flex-col justify-between gap-6 rounded-md bg-accent p-6 text-white sm:p-7"
                style={step(0)}
              >
                <p className="flex items-center gap-3 text-sm font-semibold text-white/85">
                  <span
                    aria-hidden="true"
                    className="h-1 w-6 rounded-[1px] bg-white/60"
                  />
                  {report.offer.label}
                </p>
                {report.offer.logo ? (
                  <Image
                    src={report.offer.logo.src}
                    alt={report.offer.logo.alt}
                    width={240}
                    height={76}
                    unoptimized
                    className="h-9 w-auto self-start"
                  />
                ) : null}
              </div>

              {report.offer.items.map((item, index) => (
                <div
                  key={item.text}
                  className="flex min-h-44 flex-col justify-between gap-6 rounded-md border border-line bg-surface p-6 sm:p-7"
                  style={step(index + 1)}
                >
                  <OfferIcon name={item.icon} />
                  <p className="text-base leading-snug font-semibold text-ink">
                    {item.text}
                  </p>
                </div>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* The programme's own facts, where the source page states them. A short
          definition list, the same device the event pages use. */}
      {report.facts?.length ? (
        <Section bordered spacing="tight">
          <Container>
            <Reveal
              as="dl"
              className="mx-auto grid max-w-4xl gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {report.facts.map((fact, index) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-t border-line pt-4"
                  style={step(index)}
                >
                  <dt className="text-sm font-semibold text-ink-muted">
                    {fact.label}
                  </dt>
                  <dd className="text-base leading-relaxed text-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* A single quick read gets the spotlight grammar the launch-event and
          success-story bands already use: one pointer, image beside text.
          A lone card in the rail read as a starved carousel. */}
      {report.quickReads && report.quickReads.items.length === 1 ? (
        <Section bordered spacing="tight">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="anim-rise flex flex-col gap-5">
                <SectionHeading title={report.quickReads.title} />
                <p className="max-w-[26ch] text-title font-display-soft text-ink">
                  {report.quickReads.items[0].title}
                </p>
                {report.quickReads.items[0].href ? (
                  <div className="pt-1">
                    <Button
                      href={report.quickReads.items[0].href}
                      variant="secondary"
                    >
                      Read the article
                    </Button>
                  </div>
                ) : null}
              </div>

              {report.quickReads.items[0].href ? (
                <Link
                  href={report.quickReads.items[0].href}
                  className="anim-rise group block overflow-hidden rounded-lg border border-line transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                  style={delay(120)}
                >
                  <Image
                    src={
                      report.quickReads.items[0].image ??
                      "/resource-placeholder.svg"
                    }
                    alt=""
                    width={1280}
                    height={720}
                    sizes="(min-width: 1024px) 32rem, 100vw"
                    className="aspect-video w-full object-cover"
                  />
                </Link>
              ) : (
                <Image
                  src={
                    report.quickReads.items[0].image ??
                    "/resource-placeholder.svg"
                  }
                  alt=""
                  width={1280}
                  height={720}
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="anim-rise aspect-video w-full rounded-lg border border-line object-cover"
                  style={delay(120)}
                />
              )}
            </div>
          </Container>
        </Section>
      ) : report.quickReads ? (
        <Section bordered spacing="tight">
          <Container>
            <SectionHeading
              title={report.quickReads.title}
              align="center"
              className="mb-10"
            />
            {/* The rail earns its arrows only once it can overflow. Two cards
                sit as a centred pair at half width, three as the standard
                three-up grid; four or more scroll. */}
            {report.quickReads.items.length === 2 ? (
              <Reveal className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
                {report.quickReads.items.map((item, index) => (
                  <ReportCard key={item.title} item={item} style={step(index)} />
                ))}
              </Reveal>
            ) : report.quickReads.items.length === 3 ? (
              <ReportCardGrid items={report.quickReads.items} />
            ) : (
              <ReportCardRail
                items={report.quickReads.items}
                label={report.quickReads.title}
              />
            )}
          </Container>
        </Section>
      ) : null}

      {/* Expert insights, one tab per AI maturity stage rather than all four
          stacked, so the band stays short enough to read. Not every programme
          ran interviews, so the band is skipped rather than left empty. */}
      {report.expertInsights ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <SectionHeading
              title={report.expertInsights.title}
              align="center"
              className="mb-8"
            />
            {/* A single group needs no tab rail; the cards stand alone. */}
            {report.expertInsights.groups.length === 1 ? (
              <ReportCardGrid items={report.expertInsights.groups[0].items} />
            ) : (
              <ExpertInsightsTabs groups={report.expertInsights.groups} />
            )}
          </Container>
        </Section>
      ) : null}

      {/* What the source landing points at in bands of its own: a launch
          event, a client success story. A single card apiece rather than a
          rail, since each band reads as a pointer rather than as another
          library. */}
      {report.spotlights?.map((spotlight, bandIndex) =>
        spotlight.card.href ? (
          <Section key={spotlight.title} bordered spacing="tight">
            <Container>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  bandIndex % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
                }`}
              >
                <div className="anim-rise flex flex-col gap-5">
                  <SectionHeading title={spotlight.title} />
                  <p className="max-w-[52ch] text-base leading-relaxed text-ink-soft">
                    <Emphasised text={spotlight.description} />
                  </p>
                  <div className="pt-1">
                    <Button href={spotlight.card.href} variant="secondary">
                      {spotlight.linkLabel}
                    </Button>
                  </div>
                </div>

                <Link
                  href={spotlight.card.href}
                  className="anim-rise group block overflow-hidden rounded-lg border border-line transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                  style={delay(120)}
                >
                  {spotlight.card.image ? (
                    <Image
                      src={spotlight.card.image}
                      alt={spotlight.card.title}
                      width={1280}
                      height={720}
                      sizes="(min-width: 1024px) 32rem, 100vw"
                      className="aspect-video w-full object-cover"
                    />
                  ) : null}
                </Link>
              </div>
            </Container>
          </Section>
        ) : null,
      )}

      {/* The participants' own words, straight from the microsite's quote
          cards, sitting between the interviews and the credits. No heading:
          the cards say who is speaking, and the band reads as a breather. */}
      {report.voices ? (
        <Section bordered spacing="tight">
          <Container>
            <QuoteCarousel voices={report.voices} />
          </Container>
        </Section>
      ) : null}

      {report.credits ? (
        <Section bordered spacing="tight">
          <Container>
            {/* Two equal columns so the labels sit on one line and the marks
                on another, whatever their aspect ratios: each mark is centred
                in a fixed-height box rather than sizing its own row. */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16">
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm font-semibold text-ink-muted">
                  {report.credits.sponsor.label}
                </p>
                <span className="flex h-14 items-center">
                  {report.credits.sponsor.logos ? (
                    <span className="flex items-center gap-3">
                      {report.credits.sponsor.logos.map((sponsor, index) => (
                        <span
                          key={sponsor.name}
                          className="flex items-center gap-3"
                        >
                          {index > 0 ? (
                            <span
                              aria-hidden="true"
                              className="text-lg text-ink-muted"
                            >
                              +
                            </span>
                          ) : null}
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={180}
                            height={48}
                            unoptimized
                            className="h-10 w-auto"
                          />
                        </span>
                      ))}
                    </span>
                  ) : report.credits.sponsor.logo ? (
                    <Image
                      src={report.credits.sponsor.logo}
                      alt={report.credits.sponsor.name}
                      width={240}
                      height={168}
                      unoptimized
                      className="h-12 w-auto"
                    />
                  ) : null}
                </span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm font-semibold text-ink-muted">
                  {report.credits.partnerLabel}
                </p>
                <span className="flex h-14 items-center">
                  <Logo />
                </span>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
