import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { StatsBento } from "@/components/stats-band";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Emphasised } from "@/components/ui/emphasis";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getInsightProject } from "@/content/insights";
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

            {story.logo ? (
              <Image
                src={story.logo}
                alt={story.client}
                width={432}
                height={91}
                className="h-8 w-auto"
              />
            ) : null}

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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
            <div className="flex flex-col gap-8">
              <Image
                src={story.image}
                alt={story.imageAlt}
                width={1024}
                height={576}
                priority
                className="anim-rise aspect-video w-full rounded-lg border border-line object-cover"
              />
              {story.body?.length ? (
                <div className="flex max-w-[68ch] flex-col gap-5">
                  {story.body.map((block) =>
                    typeof block === "string" ? (
                      <p
                        key={block}
                        className="text-base leading-relaxed text-ink-soft"
                      >
                        <Emphasised text={block} />
                      </p>
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
              {story.document ? (
                <div>
                  <Button href={story.document.href} external>
                    {story.document.label}
                  </Button>
                </div>
              ) : null}
            </div>

            {/* The engagement's own facts, as the source page lists them. */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
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
            </aside>
          </div>
        </Container>
      </Section>

      {story.deliverables?.length ? (
        <Section surface="subtle" bordered spacing="tight">
          <Container>
            <SectionHeading title="Key deliverables" className="mb-10" />
            <StatsBento stats={story.deliverables} />
          </Container>
        </Section>
      ) : null}

      {story.quotes?.length ? (
        <Section bordered spacing="tight">
          <Container>
            <SectionHeading title="In their words" className="mb-10" />
            <Reveal
              as="ul"
              className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
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
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
