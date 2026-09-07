"use client";

import { useId, useState } from "react";
import { RemixIcon } from "@/components/ui/remix-icon";
import { engagementSteps } from "@/content/home";

/** Manual stage selection keeps the sequence readable without timed cycling. */
export function EngagementSpotlight() {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const stage = engagementSteps.steps[active];

  return (
    <div className="mt-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <ol aria-label="Choose an engagement stage" className="grid grid-cols-2 gap-x-5 lg:grid-cols-1 lg:pr-12">
        {engagementSteps.steps.map((item, index) => (
          <li key={item.name}>
            <button
              type="button"
              aria-pressed={active === index}
              aria-controls={panelId}
              onClick={() => setActive(index)}
              className={`flex min-h-16 w-full cursor-pointer items-center gap-3 border-b py-5 text-left lg:min-h-24 ${active === index ? "border-accent text-accent" : "border-line text-ink-soft hover:text-accent"}`}
            >
              <span className="text-sm tabular-nums"><span className="sr-only">Step </span>{String(index + 1).padStart(2, "0")}</span>
              <span className="text-title font-display-soft">{item.name}</span>
              <RemixIcon name="arrow-right-line" className={`ml-auto ${active === index ? "visible" : "invisible"}`} />
            </button>
          </li>
        ))}
      </ol>
      <div id={panelId} aria-live="polite" aria-atomic="true" className="mt-8 flex min-h-96 flex-col justify-between gap-8 bg-accent px-7 py-10 text-white sm:p-12 lg:mt-0 lg:rounded-tr-[5rem]">
        <div>
          <p className="text-sm font-semibold">Step {active + 1} / {engagementSteps.steps.length} · {stage.name}</p>
          <h3 className="mt-6 max-w-[19ch] text-display-sm font-display">{stage.outcome}</h3>
        </div>
        <p className="max-w-[48ch] text-lg leading-relaxed">{stage.description}</p>
      </div>
    </div>
  );
}
