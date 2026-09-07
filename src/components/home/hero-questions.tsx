"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { syncMotionPreference } from "@/lib/motion";

/**
 * The rotating questions that open the hero: one is shown at a time and they
 * advance on a dwell timer. Every question stays in the DOM, so assistive
 * technology reads all three rather than whichever happened to be on screen;
 * the stacking and the hidden/shown base states are CSS behind
 * `[data-motion="on"]`, while GSAP drives the swap: the outgoing question
 * fades and the incoming one types itself in, character by character.
 *
 * The typewriter is a character reveal, not text mutation: every character
 * is a span whose space is reserved from the start, so multi-line centred
 * text never reflows mid-type, and the characters are real text so a screen
 * reader reads the whole question regardless of where the type is up to.
 * Spaces and line breaks stay raw text nodes: `pre-line` needs them intact,
 * and they have nothing to reveal.
 *
 * Without JavaScript or under reduced motion the same markup renders as a
 * plain list of all three questions, which is the honest fallback: nothing is
 * hidden behind a transition that will never fire.
 */

/** How long each question holds before the next one takes over, including
    the ~1s it spends typing in. */
const DWELL = 3800;

/** Seconds between character reveals while a question types in. */
const CHAR_STAGGER = 0.02;

function QuestionChars({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, index) =>
        char === " " || char === "\n" ? (
          char
        ) : (
          <span key={index} data-q-char>
            {char}
          </span>
        ),
      )}
    </>
  );
}

export function HeroQuestions({
  questions,
  toneClass = "text-ink-soft",
  dotClass = "bg-line-strong",
  centered = false,
}: {
  questions: readonly string[];
  /** Colour for the question text, so the rotator works on light and on the
      hero's orange field without the component knowing which band it is in. */
  toneClass?: string;
  /** Colour for the inactive dots, for the same reason. */
  dotClass?: string;
  /** Centre the questions and their dots, for the centred hero composition. */
  centered?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const previousRef = useRef(0);

  // The swap. Runs before paint so the incoming question never flashes fully
  // typed, and kills both parties' tweens on every change so interrupting a
  // swap mid-type stays smooth. On first mount (previous === active) the
  // opening question types itself once as the hero block rises in.
  useLayoutEffect(() => {
    const previous = previousRef.current;
    previousRef.current = active;
    if (!syncMotionPreference()) return;

    const items = listRef.current?.children;
    const incoming = items?.[active] as HTMLElement | undefined;
    if (!incoming) return;
    const chars = incoming.querySelectorAll("[data-q-char]");

    const type = (delay: number) =>
      gsap.fromTo(
        chars,
        { opacity: 0 },
        { opacity: 1, duration: 0.01, stagger: CHAR_STAGGER, ease: "none", delay },
      );

    if (previous === active) {
      type(0.55);
      return;
    }

    const outgoing = items?.[previous] as HTMLElement | undefined;
    if (!outgoing) return;

    gsap.killTweensOf([
      outgoing,
      incoming,
      ...outgoing.querySelectorAll("[data-q-char]"),
      ...chars,
    ]);
    gsap.fromTo(
      outgoing,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.24, ease: "power1.in" },
    );
    gsap.set(incoming, { autoAlpha: 1 });
    type(0.2);
  }, [active]);

  // Keyed on `active`, so jumping to a question restarts its full dwell rather
  // than inheriting whatever was left of the previous one.
  useEffect(() => {
    if (!syncMotionPreference()) return;
    if (paused) return;

    const timer = setTimeout(
      () => setActive((current) => (current + 1) % questions.length),
      DWELL,
    );
    return () => clearTimeout(timer);
  }, [active, paused, questions.length]);

  return (
    <div
      className="max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul ref={listRef} className="q-rotator gap-5">
        {questions.map((question, index) => (
          <li
            key={question}
            data-active={index === active}
            className={`flex ${
              centered ? "items-end justify-center" : "items-start"
            }`}
          >
            <p
              className={`max-w-[44ch] text-title font-semibold sm:whitespace-pre-line ${
                centered ? "text-center" : ""
              } ${toneClass}`}
            >
              <QuestionChars text={question} />
            </p>
          </li>
        ))}
      </ul>

      {/* Hidden unless the rotator is actually running, where these are the
          only way to steer it. The active dot stretches into a pill whose fill
          tracks the dwell, so the advance is announced rather than surprising.
          The 44px touch targets carry ~19px of invisible padding around the
          6px dots, so the negative margin is what makes the VISIBLE gap to
          the question read tight; the hit area is untouched. */}
      <div
        className={`q-rotator-controls -mt-1 items-center ${
          centered ? "justify-center" : ""
        }`}
      >
        {questions.map((question, index) => (
          <button
            key={question}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show question ${index + 1} of ${questions.length}`}
            aria-pressed={index === active}
            className="group flex size-11 items-center justify-center"
          >
            <span
              className={`block h-1.5 overflow-hidden rounded-full transition-all duration-300 ${dotClass} ${
                index === active ? "w-8" : "w-1.5"
              }`}
            >
              {index === active ? (
                <span
                  key={active}
                  className="q-dwell block h-full w-full bg-white"
                  style={{
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              ) : null}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
