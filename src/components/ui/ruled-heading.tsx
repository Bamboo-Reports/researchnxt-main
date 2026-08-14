import { accentedTitle } from "@/components/ui/accented-title";

/**
 * Section opener in the solution-page style, for bands that open on a
 * headline with no eyebrow: the title over a short orange rule. Shared by
 * the About and Careers pages, which previously each carried their own copy.
 */
export function RuledHeading({ title }: { title: string }) {
  return (
    <>
      <h2 className="text-headline font-display-soft">
        {accentedTitle(title)}
      </h2>
      <span aria-hidden="true" className="h-0.5 w-12 rounded-[1px] bg-signal" />
    </>
  );
}
