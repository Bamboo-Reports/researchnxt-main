/**
 * Renders `**` emphasis in a content string as bold ink, so copy modules can
 * carry a little inline emphasis without holding JSX.
 */
export function Emphasised({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
        index % 2 === 1 ? (
          <strong key={`${index}-${part}`} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
