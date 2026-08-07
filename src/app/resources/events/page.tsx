import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { eventHref, events } from "@/content/events";
import { formatDate } from "@/lib/date";
import { step } from "@/lib/motion";

/**
 * Events library: launches, roundtables and engagements, newest first, in the
 * same card grammar as the insights and experts-view libraries. Pagination
 * joins when the list outgrows one view, as those libraries page.
 */

const lede =
  "Launches, roundtables and engagements from Research NXT, run alongside the research programmes they belong to.";

export const metadata: Metadata = {
  title: "Events",
  description: lede,
  alternates: { canonical: "/resources/events" },
};

export default function EventsPage() {
  return (
    <main id="main">
      <PageHero eyebrow="Resources" title="Events" lede={lede} />

      <Section spacing="default">
        <Container>
          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <Link
                key={`${event.project}/${event.slug}`}
                href={eventHref(event)}
                className="group flex flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                style={step(index)}
              >
                <Image
                  src={event.image}
                  alt=""
                  width={1280}
                  height={583}
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
                  className="mt-1 aspect-video w-full rounded-md object-cover"
                />
                {event.date ? (
                  <time
                    dateTime={event.date}
                    className="text-sm font-semibold text-ink-muted"
                  >
                    {formatDate(event.date)}
                  </time>
                ) : null}
                <h2 className="clamp-3 text-base font-semibold transition-colors duration-200 group-hover:text-accent">
                  {event.title}
                </h2>
                <p className="clamp-3 text-sm leading-relaxed text-ink-soft">
                  {event.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
                  See the event
                  <TrailingArrow />
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
