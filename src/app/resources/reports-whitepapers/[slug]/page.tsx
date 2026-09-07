import type { Metadata } from "next";
import { RemixIcon } from "@/components/ui/remix-icon";
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
  type ReportLanding,
} from "@/content/resources";
import { delay, step } from "@/lib/motion";
import { og } from "@/lib/og";

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

/** Official Remix glyphs matched to existing report theme names. */
const THEME_GLYPHS = {
  "route": "route-line",
  "coins": "coins-line",
  "tap": "smartphone-line",
  "waveform": "voiceprint-line",
  "sliders": "equalizer-line",
  "nodes": "node-tree",
  "laptop": "macbook-line",
  "chip": "cpu-line",
  "bulb": "lightbulb-line",
  "chart": "bar-chart-line",
  "target": "focus-3-line",
  "heart": "heart-line",
  "chat": "discuss-line",
  "flag": "flag-line",
  "gear": "settings-3-line",
  "compass": "compass-3-line"
} as const;

type ThemeGlyphName = keyof typeof THEME_GLYPHS;

/**
 * Keyword to glyph, first match wins; ordered so the specific beats the
 * general ("Service Delivery Innovations" is a bulb before "delivery" can
 * make it a route, "Data is the currency" is coins before "data" makes it
 * a chart). Checked against every label the two index reports carry.
 */
const THEME_KEYWORDS: [RegExp, ThemeGlyphName][] = [
  [/personali[sz]ation/i, "target"],
  [/empathy/i, "heart"],
  [/engagement/i, "chat"],
  [/success/i, "flag"],
  [/tech-powered/i, "gear"],
  [/innovation/i, "bulb"],
  /* Added for the figure-led sets, where the claim is a sentence rather
     than a label: checked against every highlight the reports carry. */
  [/technology stack|tech stack/i, "nodes"],
  [/\bvideo\b/i, "waveform"],
  [/social media|channel/i, "tap"],
  [/plan to|intend to|next year/i, "flag"],
  [/budget|ad spend|invested|gifting/i, "coins"],
  [/effective|effectiveness/i, "chart"],
  [/optimis|programme/i, "sliders"],
  [/align sales|collaborate|pipeline/i, "nodes"],
  [/\bABM\b|target accounts/i, "target"],
  [/\bemail\b/i, "chat"],
  [/\bmobile\b/i, "tap"],
  [/last-mile|delivery/i, "route"],
  [/currency|revenue/i, "coins"],
  [/audio/i, "waveform"],
  [/self-service/i, "sliders"],
  [/supply/i, "nodes"],
  [/remote|virtual/i, "laptop"],
  [/data/i, "chart"],
  [/\bai\b/i, "chip"],
  [/digital/i, "tap"],
];

function themeGlyph(label: string): ThemeGlyphName {
  for (const [pattern, glyph] of THEME_KEYWORDS) {
    if (pattern.test(label)) return glyph;
  }
  return "compass";
}

function ThemeIcon({ name }: { name: ThemeGlyphName }) {
  return <RemixIcon name={THEME_GLYPHS[name]} className="size-5" />;
}

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
 * The highlights band's two treatments, chosen by the copy itself: a card
 * plate for figure-led findings, a ruled index for plain labels. Mixed sets
 * use the plate, where an unfigured finding leads it at full width, since a
 * claim with no number is the headline of the set rather than one more row
 * of it.
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

  /* No figures anywhere: the index, set as a ruled specimen plate. One
     hairline mesh (a 1px line ground showing through the cell gaps), each
     cell a theme with its glyph in the solutions pages' icon chip, so the
     band reads as one instrument plate rather than the source's floating
     white cards. Columns divide the count exactly so the plate is always
     a full rectangle. */
  if (figures === 0) {
    const columns =
      items.length % 5 === 0
        ? "lg:grid-cols-5"
        : items.length % 4 === 0
          ? "lg:grid-cols-4"
          : "lg:grid-cols-3";
    return (
      <Reveal
        as="ul"
        className={`mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line ${columns}`}
      >
        {items.map((item, index) => (
          <li
            key={item}
            className="flex flex-col items-start gap-4 bg-surface-subtle p-5 sm:p-6"
            style={step(index)}
          >
            <span className="grid size-11 place-items-center rounded-md bg-accent-soft text-accent">
              <ThemeIcon name={themeGlyph(item)} />
            </span>
            <span className="text-base font-semibold leading-snug text-ink">
              {item}
            </span>
          </li>
        ))}
      </Reveal>
    );
  }

  /* Figures: a card plate. A set of statistics reads as a set of separate
     findings, so each gets its own card with its theme glyph, the figure at
     display size on the tabular face, and the claim as a sentence beneath.
     A finding with no figure is the headline of the set rather than one more
     row of it, so it leads the plate at full width. */
  const labels = parsed.filter((entry) => !("claim" in entry));
  const stats = parsed.filter((entry) => "claim" in entry);

  /* Never more than three across: these claims are sentences, and a fourth
     column squeezes them to two words a line. */
  const columns =
    stats.length === 2
      ? "sm:grid-cols-2"
      : stats.length === 4
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Reveal
      as="ul"
      className={`mx-auto grid max-w-6xl gap-4 sm:gap-5 ${columns}`}
    >
      {labels.map((entry, index) => (
        <li
          key={entry.item}
          style={step(index)}
          className="flex items-start gap-5 rounded-lg border border-accent-soft bg-accent-soft p-6 sm:col-span-full sm:items-center"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-md bg-surface text-accent">
            <ThemeIcon name={themeGlyph(entry.item)} />
          </span>
          <span className="text-title font-display-soft text-ink">
            {entry.item}
          </span>
        </li>
      ))}

      {stats.map((entry, index) => (
        <li
          key={entry.item}
          style={step(labels.length + index)}
          className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6"
        >
          <span className="grid size-11 place-items-center rounded-md bg-accent-soft text-accent">
            <ThemeIcon name={themeGlyph(entry.claim ?? entry.item)} />
          </span>
          <span className="text-display-sm font-figure font-display text-ink">
            {entry.prefix}
            <FigureValue value={`${entry.head}${entry.percent}`} />
            {entry.unit ? (
              <span className="text-headline">{entry.unit}</span>
            ) : null}
          </span>
          <span className="text-base leading-relaxed text-ink-soft">
            {entry.claim}
          </span>
        </li>
      ))}
    </Reveal>
  );
}

/**
 * What the source landing points at in a band of its own: a launch event, a
 * client success story. A single card apiece rather than a rail, since each
 * band reads as a pointer rather than as another library.
 */
function SpotlightBand({
  spotlight,
  bandIndex,
}: {
  spotlight: NonNullable<ReportLanding["spotlights"]>[number];
  bandIndex: number;
}) {
  if (!spotlight.card.href) return null;

  return (
    <Section bordered spacing="tight">
      <Container>
        {/* Image-and-text bands zigzag so consecutive spotlights do not read
            as one column. A facts band does not alternate: its copy, artwork
            and action stay left, the facts right, as the source sets them. */}
        <div
          className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
            bandIndex % 2 === 1 && !spotlight.facts?.length
              ? "lg:[&>*:first-child]:order-last"
              : ""
          }`}
        >
          <div className="anim-rise flex flex-col gap-5">
            <SectionHeading title={spotlight.title} />
            {spotlight.description ? (
              <p className="max-w-[52ch] text-base leading-relaxed text-ink-soft">
                <Emphasised text={spotlight.description} />
              </p>
            ) : null}
            {/* With the facts holding the right column, the card's artwork
                moves up here, above its own action. */}
            {spotlight.facts?.length && spotlight.card.image ? (
              <Link
                href={spotlight.card.href}
                className="group block max-w-[32rem] overflow-hidden rounded-lg border border-line transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
              >
                <Image
                  src={spotlight.card.image}
                  alt={spotlight.card.title}
                  width={1024}
                  height={576}
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="aspect-video w-full object-cover"
                />
              </Link>
            ) : null}
            <div className="pt-1">
              <Button href={spotlight.card.href} variant="secondary">
                {spotlight.linkLabel}
              </Button>
            </div>
          </div>

          {spotlight.facts?.length ? (
            /* The programme facts beside the copy instead of the card's
               image, as the AI-led microsite sets them beside its client
               testimonial. The button carries the link. */
            <dl
              className="anim-rise grid gap-x-8 gap-y-5 sm:grid-cols-2"
              style={delay(120)}
            >
              {spotlight.facts.map((fact) => (
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
          ) : (
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
          )}
        </div>
      </Container>
    </Section>
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
  /* When the artwork is the whole link, it must carry the accessible name;
     beside the plain figure it stays decorative. */
  const image = (linked: boolean) => (
    <Image
      src={item.image ?? "/resource-placeholder.svg"}
      alt={linked ? item.title : ""}
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
          {image(true)}
        </Link>
      ) : (
        <div
          className="anim-rise overflow-hidden rounded-lg border border-line"
          style={delay(120)}
        >
          {image(false)}
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

/** Official Remix icons for consulting, assessment and fee waivers. */
function OfferIcon({ name }: { name: "consulting" | "assessment" | "waiver" }) {
  const icons = { consulting: "team-line", assessment: "cloud-line", waiver: "coupon-line" } as const;
  return <RemixIcon name={icons[name]} className="size-9 text-accent" />;
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
    openGraph: og(report.hero.cover),
  };
}

export default async function ReportLandingPage({ params }: Params) {
  const { slug } = await params;
  const report = getReportLanding(slug);
  if (!report) notFound();

  /* Most spotlights close the page; one that mirrors a source microsite's
     order can ask to sit above the interviews instead. */
  const leadingSpotlights =
    report.spotlights?.filter((s) => s.beforeInterviews) ?? [];
  const trailingSpotlights =
    report.spotlights?.filter((s) => !s.beforeInterviews) ?? [];

  return (
    <main id="main">
      {/* Hero. The cover carries the title, so the visible band is only the
          artifact and the single action: the cover on the light brand wash,
          the form beside it. The h1 stays for assistive tech and the document
          outline. Below `lg` the hero is the form alone, on user direction,
          and the mockup moves down to open the About band instead.

          The two columns are sized and centred as a pair rather than letting
          the cover float in a 1fr column, which left a lot of dead width at
          desktop. The Jotform iframe is a fixed 539px and sets the band's
          height, so the padding stays tight around it. */}
      <Section spacing="none" className="hero-wash border-b border-line">
        <Container className="py-8 sm:py-10">
          {/* No breadcrumb here: the report landings read as microsites, and
              a trail crowds their cover-and-form hero. */}
          <h1 className="sr-only">{report.hero.title}</h1>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,26rem)] lg:justify-center lg:gap-16">
            <div className="hidden flex-col justify-center lg:flex">
              {/* The tablet mockup set: every hero cover is the same 768x909
                  frame, so the intrinsic ratio here matches the files. */}
              <Image
                src={report.hero.cover}
                alt={report.hero.coverAlt}
                width={768}
                height={909}
                priority
                className="anim-rise w-full"
              />
            </div>

            <div
              id="download"
              className="anim-rise scroll-mt-32"
              style={delay(160)}
            >
              {/* The form sits directly on the hero wash: no panel, no
                  heading. The embed carries its own title and framing. */}
              {report.download.jotformId ? (
                <JotformEmbed
                  formId={report.download.jotformId}
                  title="Report download form"
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
          {/* The mockup's phone and tablet home: above the paragraphs, where
              the hero no longer shows it. Not `priority`, since it sits below
              the form and the fold. */}
          <Image
            src={report.hero.cover}
            alt={report.hero.coverAlt}
            width={768}
            height={909}
            className="mx-auto mb-8 w-52 sm:w-64 lg:hidden"
          />
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
          lead with a figure become a card plate: one card each, the theme
          glyph, the figure at display size on the tabular face and the claim
          beneath, counting up on first view. Labels without figures
          become an index instead: the report's themes set as a ruled
          specimen plate, since a card with no number in it would fake a
          depth the label does not have. */}
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

      {leadingSpotlights.map((spotlight, bandIndex) => (
        <SpotlightBand
          key={spotlight.title}
          spotlight={spotlight}
          bandIndex={bandIndex}
        />
      ))}

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

      {trailingSpotlights.map((spotlight, bandIndex) => (
        <SpotlightBand
          key={spotlight.title}
          spotlight={spotlight}
          bandIndex={bandIndex}
        />
      ))}

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
                on another. Marks are bounded on BOTH axes rather than scaled
                by height alone: the sponsor set runs from a 1.4:1 square to a
                5:1 wordmark, and matching only their heights made the wide
                ones twice the optical size of the tall ones. Capping height
                and width lands every mark inside the same box, so the
                sponsor and the research partner read as equals. */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16">
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm font-semibold text-ink-muted">
                  {report.credits.sponsor.label}
                </p>
                <span className="flex h-16 items-center">
                  {report.credits.sponsor.logos ? (
                    <span className="flex flex-wrap items-center justify-center gap-3">
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
                            /* Both paired marks are wordmark lockups, so they
                               share a cap height: equal height is equal text
                               size, and the wider lockup simply runs longer,
                               wrapping to its own line where the column is
                               narrow. The height must be definite, not a max:
                               these lazy images have no intrinsic size before
                               they load, and a 0x0 box never intersects the
                               viewport, so the load never fires. */
                            className="h-6 w-auto"
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
                      className="h-12 w-auto max-w-44 object-contain"
                    />
                  ) : null}
                </span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm font-semibold text-ink-muted">
                  {report.credits.partnerLabel}
                </p>
                <span className="flex h-16 items-center">
                  {/* The wordmark's default h-5 is the navbar's size; here it
                      sits beside a 48px sponsor mark and has to hold its
                      own. */}
                  <Logo markClassName="h-7 w-auto" />
                </span>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
