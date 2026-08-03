"use client";

import { useEffect, useState } from "react";

/**
 * The hero's one moving part.
 *
 * The questions open the hero: one is shown at a time and they advance on a
 * dwell timer. Every question stays in the DOM, so
 * assistive technology reads all three rather than whichever happened to be on
 * screen, and the stacking is done in CSS behind `[data-motion="on"]`.
 *
 * Without JavaScript or under reduced motion the same markup renders as a plain
 * list of all three questions, which is the honest fallback: nothing is
 * hidden behind a transition that will never fire.
 */

/** How long each question holds before the next one takes over. */
const DWELL = 4400;

export function HeroQuestions({
  questions,
}: {
  questions: readonly string[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Keyed on `active`, so jumping to a question restarts its full dwell rather
  // than inheriting whatever was left of the previous one.
  useEffect(() => {
    if (document.documentElement.dataset.motion !== "on") return;
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
      <ul className="q-rotator gap-5">
        {questions.map((question, index) => (
          <li
            key={question}
            data-active={index === active}
            className="flex items-start"
          >
            <p className="max-w-[44ch] text-title font-display-soft text-ink-soft">
              {question}
            </p>
          </li>
        ))}
      </ul>

      {/* Hidden unless the rotator is actually running, where these are the
          only way to steer it. The active dot stretches into a pill whose fill
          tracks the dwell, so the advance is announced rather than surprising. */}
      <div className="q-rotator-controls mt-2 items-center">
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
              className={`block h-1.5 overflow-hidden rounded-full bg-line-strong transition-all duration-300 ${
                index === active ? "w-8" : "w-1.5 group-hover:bg-accent"
              }`}
            >
              {index === active ? (
                <span
                  key={active}
                  className="q-dwell block h-full w-full bg-signal"
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
