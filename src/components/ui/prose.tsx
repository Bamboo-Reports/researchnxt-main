import { cn } from "@/lib/cn";

/**
 * Typography wrapper for long-form copy (legal pages, job descriptions).
 * Styles raw HTML/MDX output — we style descendants rather than pull in
 * @tailwindcss/typography, since the surface here is small and opinionated.
 */
export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-none text-base leading-relaxed text-ink-soft",
        "[&>*+*]:mt-5",
        "[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink",
        "[&_h3]:mt-9 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink",
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent-hover",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_li]:mt-2 [&_li]:pl-1",
        "[&_hr]:my-10 [&_hr]:border-line",
        className,
      )}
      {...props}
    />
  );
}
