/**
 * Renders a title whose `**`-wrapped phrase carries the brand accent, echoing
 * the old site's two-tone headlines. The old pages set the phrase in orange;
 * orange fails contrast as text on every surface here, so blue carries it.
 * Only for use on light surfaces, where `text-accent` clears contrast.
 */
export function accentedTitle(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <span key={part} className="text-accent">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
