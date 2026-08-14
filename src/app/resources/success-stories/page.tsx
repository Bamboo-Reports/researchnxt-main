import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  successStories,
  successStoriesLibrary,
  successStoryHref,
} from "@/content/success-stories";
import { step } from "@/lib/motion";

/**
 * Success stories library: client engagements, newest first, in the same card
 * grammar as the events, insights and experts-view libraries. The client leads
 * the card rather than the title, since that is what a reader scans for.
 * Pagination joins when the list outgrows one view, as those libraries page.
 */

export const metadata: Metadata = {
  title: successStoriesLibrary.title,
  description: successStoriesLibrary.lede,
  alternates: { canonical: "/resources/success-stories" },
};

export default function SuccessStoriesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Resources"
        title={successStoriesLibrary.title}
        lede={successStoriesLibrary.lede}
      />

      <Section spacing="default">
        <Container>
          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <Link
                key={`${story.project}/${story.slug}`}
                href={successStoryHref(story)}
                className="group flex flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
                style={step(index)}
              >
                <Image
                  src={story.image}
                  alt=""
                  width={1024}
                  height={576}
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
                  className="mt-1 aspect-video w-full rounded-md object-cover"
                />
                <span className="text-sm font-semibold text-ink-muted">
                  {story.client}
                </span>
                <h2 className="clamp-3 text-base font-semibold transition-colors duration-200 group-hover:text-accent">
                  {story.title}
                </h2>
                <p className="clamp-3 text-sm leading-relaxed text-ink-soft">
                  {story.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
                  {successStoriesLibrary.cardCta}
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
