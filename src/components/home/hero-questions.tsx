"use client";

import { useEffect, useState } from "react";

/**
 * The hero's one moving part.
 *
 * The headline is fixed, so the questions carry the motion: one is shown at a
 * time and they advance on a dwell timer. Every question stays in the DOM, so
 * assistive technology reads all three rather than whichever happened to be on
 * screen, and the stacking is done in CSS behind `[data-motion="on"]`.
 *
 * Without JavaScript or under reduced motion the same markup renders as a plain
 * ruled list of all three questions, which is the honest fallback: nothing is
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
      className="mt-10 max-w-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul className="q-rotator border-b border-deep-line">
        {questions.map((question, index) => (
          <li
            key={question}
            data-active={index === active}
            className="flex items-baseline gap-4 border-t border-deep-line py-5"
          >
            <span
              aria-hidden="true"
              className="font-figure shrink-0 text-xs text-accent-on-deep"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-lg leading-snug text-on-deep">{question}</p>
          </li>
        ))}
      </ul>

      {/* Hidden unless the rotator is actually running, where these are the
          only way to steer it. The active track fills over the dwell, so the
          advance is announced rather than surprising. */}
      <div className="q-rotator-controls mt-5 items-center gap-2">
        {questions.map((question, index) => (
          <button
            key={question}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show question ${index + 1} of ${questions.length}`}
            aria-pressed={index === active}
            className="group py-2"
          >
            <span className="block h-0.5 w-10 overflow-hidden rounded-[1px] bg-deep-line transition-colors duration-200 group-hover:bg-plate">
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
