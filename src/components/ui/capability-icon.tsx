import type { CapabilityIconName } from "@/content/types";

/**
 * Stroke glyphs for the capability cards, drawn to match the site's line
 * language: 1.6 stroke, round caps, no fills. One glyph per capability so a
 * scanning reader can tell the cards apart before reading the titles.
 */

const glyphs: Record<CapabilityIconName, React.ReactNode> = {
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.75" />
      <path d="M12 12h.01" />
    </>
  ),
  "list-search": (
    <>
      <path d="M4 6h10M4 11h6M4 16h5.5" />
      <circle cx="15.5" cy="14.5" r="3.5" />
      <path d="M18.1 17.1l3.4 3.4" />
    </>
  ),
  append: (
    <>
      <ellipse cx="10" cy="5.5" rx="6.5" ry="2.5" />
      <path d="M3.5 5.5v9c0 1.4 2.9 2.5 6.5 2.5.7 0 1.4 0 2-.1" />
      <path d="M16.5 5.5v4.5" />
      <path d="M18.5 14.5v6M15.5 17.5h6" />
    </>
  ),
  cleanse: (
    <>
      <path d="M11 4.5 12.6 8.9 17 10.5l-4.4 1.6L11 16.5 9.4 12.1 5 10.5l4.4-1.6L11 4.5Z" />
      <path d="M18.5 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
    </>
  ),
  account: (
    <>
      <path d="M5.5 21V4.8A1.8 1.8 0 0 1 7.3 3h9.4a1.8 1.8 0 0 1 1.8 1.8V21" />
      <path d="M3 21h18" />
      <path d="M9 7.5h1.5M13.5 7.5H15M9 11.5h1.5M13.5 11.5H15M9 15.5h1.5M13.5 15.5H15" />
    </>
  ),
  competitor: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12l5.5-5.5" />
      <path d="M9 14.5h.01" />
    </>
  ),
  content: (
    <>
      <path d="M17.5 2.9 21.1 6.5 8 19.6l-4.9 1.3 1.3-4.9L17.5 2.9Z" />
      <path d="M15 5.4l3.6 3.6" />
    </>
  ),
  campaign: (
    <>
      <path d="M19.5 4.5v13l-9-3.5H5a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 5 8h5.5l9-3.5Z" />
      <path d="M7.5 14.3v4.2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3.7" />
    </>
  ),
  funnel: (
    <>
      <path d="M3.5 4.5h17L14 12.6v5.9l-4 2v-7.9L3.5 4.5Z" />
    </>
  ),
};

export function CapabilityIcon({
  name,
  className,
}: {
  name: CapabilityIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {glyphs[name]}
    </svg>
  );
}
