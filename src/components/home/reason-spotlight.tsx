"use client";

import { useState } from "react";
import { differentiators } from "@/content/home";

export function ReasonSpotlight() {
  const [active, setActive] = useState(0);
  const reason = differentiators.items[active];

  return (
    <div className="mt-12">
      <div role="group" aria-label="Choose a reason" className="flex flex-wrap gap-x-8 gap-y-2 border-b border-line">
        {differentiators.items.map((item, index) => (
          <button key={item.title} type="button" aria-pressed={active === index} aria-controls="reason-spotlight" onClick={() => setActive(index)} className={`min-h-12 cursor-pointer border-b-2 py-4 text-left text-sm font-semibold ${active === index ? "border-accent text-accent" : "border-transparent text-ink-soft hover:text-accent"}`}>
            {item.title}
          </button>
        ))}
      </div>
      <div id="reason-spotlight" aria-live="polite" aria-atomic="true" className="grid min-h-80 content-center gap-8 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end md:gap-16 lg:min-h-96">
        <h3 className="max-w-[14ch] text-display font-display text-accent">{reason.title}</h3>
        <p className="max-w-[34ch] text-xl leading-relaxed text-ink-soft sm:text-2xl">{reason.description}</p>
      </div>
    </div>
  );
}
