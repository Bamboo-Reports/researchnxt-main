import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { FigureValue } from "@/components/motion/figure-value";
import { Reveal } from "@/components/motion/reveal";
import { accentedTitle } from "@/components/ui/accented-title";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialIcon } from "@/components/ui/social-icon";
import {
  aboutFacts,
  aboutHero,
  aboutIntro,
  advisoryBoard,
  howWeWork,
  milestones,
  story,
  team,
} from "@/content/about";
import { step } from "@/lib/motion";

export const metadata: Metadata = {
  title: "About Us",
  description: aboutIntro.lede,
  alternates: { canonical: "/about" },
};

type Person = (typeof team.people)[number];

/** Section opener in the solution-page style, for bands that open on a
    headline with no eyebrow: the title over a short orange rule. */
function RuledHeading({ title }: { title: string }) {
  return (
    <>
      <h2 className="text-headline font-display-soft">
        {accentedTitle(title)}
      </h2>
      <span aria-hidden="true" className="h-0.5 w-12 rounded-[1px] bg-signal" />
    </>
  );
}

/** A fact's figure. Years read as dates, so only measurements count up. */
function FactValue({ value, count }: { value: string; count?: boolean }) {
  if (count) return <FigureValue value={value} />;
  return <span className="font-figure tabular-nums">{value}</span>;
}

/** The chosen fact treatment: the founding story sits on a soft-accent
    panel left; the four measurements stack as ruled cells beside it. */
function FactsSplit() {
  const [featureFact, ...quietFacts] = aboutFacts;

  return (
    <Reveal className="grid gap-x-3 gap-y-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
      <div
        className="flex flex-col justify-between gap-12 rounded-md bg-accent-soft p-6 sm:p-7"
        style={step(0)}
      >
        <span aria-hidden="true" className="h-1 w-6 rounded-[1px] bg-signal" />
        <div className="flex flex-col gap-3">
          <span className="font-display text-5xl sm:text-6xl">
            <FactValue value={featureFact.value} count={featureFact.count} />
          </span>
          <span className="text-base font-semibold text-ink">
            {featureFact.label}
          </span>
          {featureFact.detail ? (
            <p className="text-sm leading-relaxed text-ink-soft">
              {featureFact.detail}
            </p>
          ) : null}
        </div>
      </div>
      <div className="grid content-start gap-x-10 gap-y-8 sm:grid-cols-2 lg:pl-10">
        {quietFacts.map((fact, index) => (
          <div
            key={fact.label}
            className="flex flex-col gap-3 border-t border-line pt-5"
            style={step(index + 1)}
          >
            <span className="font-display text-3xl leading-tight sm:text-4xl">
              <FactValue value={fact.value} count={fact.count} />
            </span>
            <p className="text-sm leading-relaxed text-ink-soft">
              {fact.label}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Team variants: Santosh's profile plus the advisory board.          */
/* ------------------------------------------------------------------ */

/** The founder's affiliation list, shared by the team variants. */
function AffiliationsList({
  person,
  className,
}: {
  person: Person;
  className?: string;
}) {
  return (
    <ul className={className ?? "flex flex-col gap-2"}>
      {person.affiliations.map((affiliation) => (
        <li
          key={affiliation}
          className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
        >
          <span
            aria-hidden="true"
            className="mt-2 size-1 shrink-0 rounded-[1px] bg-line-strong"
          />
          {affiliation}
        </li>
      ))}
    </ul>
  );
}

/** The founder's social links, shared by the team variants. */
function PersonSocials({ person }: { person: Person }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {person.social.map((channel) => (
        <a
          key={channel.label}
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink transition-opacity duration-150 hover:opacity-70"
        >
          <SocialIcon label={channel.label} className="size-5" />
          <span className="sr-only">
            {person.name} on {channel.label} (opens in a new tab)
          </span>
        </a>
      ))}
    </div>
  );
}

function PersonPortrait({
  person,
  sizes,
}: {
  person: Person;
  sizes: string;
}) {
  return (
    <div className="relative aspect-square w-full max-w-sm self-start overflow-hidden rounded-md">
      <Image
        src={person.image}
        alt={person.name}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

/** The team as the same grammar as the facts treatment: the founder's
    identity on an accent-soft panel left, the working detail (bio,
    affiliations, advisory board, bench note) as ruled blocks right. */
function TeamSplit() {
  return (
    <Reveal className="grid gap-x-3 gap-y-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
      {/* The two columns sit directly under the Reveal: a `display: contents`
          wrapper here would swallow the stagger, since the animation lands on
          an element that generates no box. */}
      {team.people.map((person) => (
        <Fragment key={person.name}>
          <div
            className="flex flex-col gap-6 self-start rounded-md bg-accent-soft p-6 sm:p-7"
            style={step(0)}
          >
            <PersonPortrait
              person={person}
              sizes="(min-width: 1024px) 22rem, 100vw"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-title font-display-soft">{person.name}</h3>
              <p className="text-sm font-semibold leading-relaxed text-accent">
                {person.role}
              </p>
            </div>
            <PersonSocials person={person} />
          </div>
          <div className="flex flex-col gap-8 lg:pl-10" style={step(1)}>
            <div className="flex flex-col gap-4">
              {person.bio.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <AffiliationsList
              person={person}
              className="flex flex-col gap-2 border-t border-line pt-5"
            />
            <div className="flex flex-col gap-5 border-t border-line pt-5">
              <h4 className="font-display-soft text-lg">
                {advisoryBoard.title}
              </h4>
              <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {advisoryBoard.members.map((member) => (
                  <div key={member.role} className="flex flex-col gap-2">
                    <p className="whitespace-pre-line text-sm font-semibold leading-relaxed text-ink">
                      {member.role}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {member.credential}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 border-t border-line pt-5">
              <h4 className="font-display-soft text-lg">
                {advisoryBoard.noteTitle}
              </h4>
              <p className="text-sm leading-relaxed text-ink-soft">
                {advisoryBoard.note}
              </p>
            </div>
          </div>
        </Fragment>
      ))}
    </Reveal>
  );
}

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero title={aboutHero.title} />

      {/* The positioning statement is the page's thesis, so it carries the
          display face, with the fact split beneath it. */}
      <Section spacing="default">
        <Container>
          <div className="mb-16 flex flex-col gap-6">
            <h2 className="text-display-sm font-display">
              {accentedTitle(aboutIntro.title)}
            </h2>
            <p className="max-w-[72ch] text-lg leading-relaxed text-ink-soft">
              {aboutIntro.lede}
            </p>
          </div>
          <FactsSplit />
        </Container>
      </Section>

      <Section bordered spacing="default">
        <Container>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={story.eyebrow}
              title={accentedTitle(story.title)}
            />
            <div className="flex flex-col gap-5">
              {story.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="pt-2">
              <Button
                href={story.cta.href}
                external={story.cta.external}
                variant="secondary"
                className="group"
              >
                {story.cta.label}
                <TrailingArrow />
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="muted" bordered spacing="default">
        <Container>
          <div className="mb-12 flex flex-col gap-6">
            <RuledHeading title={milestones.title} />
          </div>
          {/* Stations on one line: no horizontal gap, so each column's top
              rule joins its neighbour's into a single timeline; the tick and
              year mark the stations along it. */}
          <Reveal className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.items.map((milestone, index) => (
              <div
                key={milestone.year}
                className="row-span-3 grid grid-rows-subgrid gap-y-3 border-t border-line pt-6 sm:pr-8 lg:pr-10"
                style={step(index)}
              >
                <span className="flex items-center gap-3 text-sm font-semibold text-accent">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-[1px] bg-signal"
                  />
                  <span className="font-figure tabular-nums">
                    {milestone.year}
                  </span>
                </span>
                {/* The chosen "\n" break applies once the cards sit in a
                    grid; in the single mobile column it collapses to a
                    space. */}
                <h3 className="text-title font-display-soft sm:whitespace-pre-line">
                  {milestone.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {milestone.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={howWeWork.eyebrow}
            title={accentedTitle(howWeWork.title)}
            className="mb-6"
          />
          {/* Outside the heading so it runs the container width; the
              heading's own lede is capped at 64ch. */}
          <p className="mb-12 text-lg leading-relaxed text-ink-soft">
            {howWeWork.lede}
          </p>
          {/* The habits share one rule like the timeline above; the signal
              tick marks each station without numbering them. */}
          <Reveal className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {howWeWork.habits.map((habit, index) => (
              <div
                key={habit.title}
                className="row-span-3 grid grid-rows-subgrid gap-y-3 border-t border-line pt-6 sm:pr-8 lg:pr-10"
                style={step(index)}
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-6 self-start rounded-[1px] bg-signal"
                />
                <h3 className="text-title font-display-soft sm:whitespace-pre-line">
                  {habit.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {habit.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section surface="subtle" bordered spacing="default">
        <Container>
          <SectionHeading
            eyebrow={team.eyebrow}
            title={accentedTitle(team.title)}
            className="mb-12"
          />
          <TeamSplit />
        </Container>
      </Section>

    </main>
  );
}
