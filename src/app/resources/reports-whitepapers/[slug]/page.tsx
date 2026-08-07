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
import { FigureValue } from "@/components/motion/figure-value";
import { Reveal } from "@/components/motion/reveal";
import { QuoteCarousel } from "@/components/quote-carousel";
import { ReportCardRail } from "@/components/report-card-rail";
import { StatsBento } from "@/components/stats-band";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getReportLanding,
  reportLandings,
  type ReportCardItem,
} from "@/content/resources";
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
 * Splits a finding that leads with a figure into its parts, so the number
 * can be pulled out into the tabular figure face: currency prefix, numeric
 * head, percent mark, spelled-out unit, then the claim. "83% of consumers
 * choose email" and "$385 billion worth of ad budgets" both match; a label
 * like "Digital-First Approach" does not, and stays a label.
 */
const FIGURE_LEAD =
  /^([$€£]?)(\d[\d,.]*)(%?)((?:\s(?:billion|million|trillion|lakh|crore|bn|mn|x))?)\s+(.+)$/i;

/**
 * The highlights band's two treatments, chosen by the copy itself: a ledger
 * for figure-led findings, an index for plain labels. Mixed sets use the
 * ledger, where an unfigured row carries the signal dash in the figure
 * column instead.
 */
function HighlightsBand({ items }: { items: string[] }) {
  const parsed = items.map((item) => {
    const match = FIGURE_LEAD.exec(item);
    return match
      ? {
          item,
          prefix: match[1],
          head: match[2],
          percent: match[3],
          unit: match[4],
          claim: match[5],
        }
      : { item };
  });
  const figures = parsed.filter((p) => "head" in p && p.head).length;

  /* No figures anywhere: the index. The themes are the content, so they are
     set at title size and allowed to wrap as a centred field. */
  if (figures === 0) {
    return (
      <Reveal
        as="ul"
        className="mx-auto flex max-w-5xl flex-wrap items-baseline justify-center gap-x-12 gap-y-6"
      >
        {items.map((item, index) => (
          <li
            key={item}
            className="flex items-baseline gap-3 text-title font-display-soft text-ink"
            style={step(index)}
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-[1px] bg-signal"
            />
            {item}
          </li>
        ))}
      </Reveal>
    );
  }

  /* The ledger. `font-figure` runs tabular so the numbers align down the
     shared column, which is the token's stated purpose. */
  return (
    <Reveal as="ul" className="mx-auto flex max-w-4xl flex-col">
      {parsed.map((entry, index) => (
        <li
          key={entry.item}
          // Fixed figure column, not auto: every row measures the same, so
          // the numbers align down the band the way the tabular face wants.
          className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-6 border-t border-line py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-x-10"
          style={step(index)}
        >
          {"claim" in entry ? (
            <>
              <span className="text-headline font-figure font-display-soft text-ink">
                {entry.prefix}
                <FigureValue value={`${entry.head}${entry.percent}`} />
                {entry.unit ? (
                  <span className="text-title">{entry.unit}</span>
                ) : null}
              </span>
              <span className="text-base leading-relaxed text-ink-soft">
                {entry.claim}
              </span>
            </>
          ) : (
            <>
              <span className="flex self-center">
                <span
                  aria-hidden="true"
                  className="h-1 w-6 rounded-[1px] bg-signal"
                />
              </span>
              <span className="text-base font-semibold leading-relaxed text-ink">
                {entry.item}
              </span>
            </>
          )}
        </li>
      ))}
    </Reveal>
  );
}

/**
 * One card presented as a spotlight: the band heading beside the artwork, in
 * the grammar the launch-event and success-story bands use. A lone card in a
 * grid or rail reads as a starved carousel, so both the quick-reads and the
 * experts bands fall back to this when they hold a single item.
 */
function CardSpotlight({
  heading,
  item,
  linkLabel,
}: {
  heading: string;
  item: ReportCardItem;
  linkLabel: string;
}) {
  const image = (
    <Image
      src={item.image ?? "/resource-placeholder.svg"}
      alt=""
      width={1280}
      height={720}
      sizes="(min-width: 1024px) 32rem, 100vw"
      className="aspect-video w-full object-cover"
    />
  );

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="anim-rise flex flex-col gap-5">
        <SectionHeading title={heading} />
        <p className="max-w-[26ch] text-title font-display-soft text-ink">
          {item.title}
        </p>
        {item.href ? (
          <div className="pt-1">
            <Button href={item.href} variant="secondary">
              {linkLabel}
            </Button>
          </div>
        ) : null}
      </div>

      {item.href ? (
        <Link
          href={item.href}
          className="anim-rise group block overflow-hidden rounded-lg border border-line transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
          style={delay(120)}
        >
          {image}
        </Link>
      ) : (
        <div
          className="anim-rise overflow-hidden rounded-lg border border-line"
          style={delay(120)}
        >
          {image}
        </div>
      )}
    </div>
  );
}

/**
 * Cards sized to their count, shared by the quick-reads band and the
 * single-group experts band. A pair sits centred at half width, exactly
 * three fill the one grid row, and anything more scrolls as a single-row
 * rail rather than stacking into a taller and taller band; the rail
 * centres and drops its arrows whenever everything fits. The single-card
 * case is CardSpotlight, handled by the caller because it restructures
 * the whole band.
 */
function CardCountLayout({
  items,
  label,
}: {
  items: ReportCardItem[];
  label: string;
}) {
  if (items.length === 2) {
    return (
      <Reveal className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
        {items.map((item, index) => (
          <ReportCard key={item.title} item={item} style={step(index)} />
        ))}
      </Reveal>
    );
  }
  if (items.length === 3) {
    return <ReportCardGrid items={items} />;
  }
  return <ReportCardRail items={items} label={label} />;
}

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

      {/* Headline findings, where the report lists them instead of chapters.
          Two treatments, chosen by what the copy actually is. Findings that
          lead with a figure become a ledger: the number pulled out into the
          tabular figure face on a shared column, counting up on first view,
          with the claim reading as a sentence beside it. Labels without
          figures become an index: the report's themes set at title size in
          a centred wrap, since padding them into cards would fake a depth
          they do not have. */}
      {report.highlights ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <SectionHeading
              title={report.highlights.title}
              align="center"
              className="mb-10"
            />
            <HighlightsBand items={report.highlights.items} />
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

      {/* Quick reads, sized to how many there are: one is a spotlight, a
          pair sits centred, full rows keep the grid, and a count that would
          leave an orphan row scrolls as a rail. */}
      {report.quickReads ? (
        <Section bordered spacing="tight">
          <Container>
            {report.quickReads.items.length === 1 ? (
              <CardSpotlight
                heading={report.quickReads.title}
                item={report.quickReads.items[0]}
                linkLabel="Read the article"
              />
            ) : (
              <>
                <SectionHeading
                  title={report.quickReads.title}
                  align="center"
                  className="mb-10"
                />
                <CardCountLayout
                  items={report.quickReads.items}
                  label={report.quickReads.title}
                />
              </>
            )}
          </Container>
        </Section>
      ) : null}

      {/* Expert insights, one tab per AI maturity stage rather than all four
          stacked, so the band stays short enough to read. Not every programme
          ran interviews, so the band is skipped rather than left empty.
          A single group needs no tab rail, and sizes itself to its count the
          same way the quick reads do: the orphan rows the 3-up grid left on
          the 4- and 5-interview landings were the tell. */}
      {report.expertInsights ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            {report.expertInsights.groups.length > 1 ? (
              <>
                <SectionHeading
                  title={report.expertInsights.title}
                  align="center"
                  className="mb-8"
                />
                <ExpertInsightsTabs groups={report.expertInsights.groups} />
              </>
            ) : report.expertInsights.groups[0].items.length === 1 ? (
              <CardSpotlight
                heading={report.expertInsights.title}
                item={report.expertInsights.groups[0].items[0]}
                linkLabel="Read the interview"
              />
            ) : (
              <>
                <SectionHeading
                  title={report.expertInsights.title}
                  align="center"
                  className="mb-8"
                />
                <CardCountLayout
                  items={report.expertInsights.groups[0].items}
                  label={report.expertInsights.title}
                />
              </>
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
