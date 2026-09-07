import { cn } from "@/lib/cn";

/**
 * Form primitives.
 *
 * Controls are underlined rather than boxed: a field grid then reads as a set
 * of ruled entries on the page, in the same language as the section rules,
 * instead of a stack of rounded boxes. The rule thickens and turns accent on
 * focus, so the active field is unmistakable at a glance.
 */
const control =
  "w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-2.5 " +
  "text-base text-ink placeholder:text-ink-muted " +
  "transition-[border-color,box-shadow] duration-200 [transition-timing-function:var(--ease-out-quart)] " +
  /* Mouse focus keeps the quiet accent underline; keyboard focus keeps the
     global ring on top of it rather than suppressing it, so the only control
     on the site does not have the weakest focus treatment. */
  "hover:border-ink-muted focus:border-accent focus:shadow-[inset_0_-1px_0_0_var(--color-accent)]";

export function Field({
  label,
  htmlFor,
  required,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? <p className="text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(control, "min-h-32 resize-y", className)}
      {...props}
    />
  );
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return <select className={cn(control, "pr-8", className)} {...props} />;
}

export function Checkbox({
  label,
  className,
  ...props
}: React.ComponentProps<"input"> & { label: React.ReactNode }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-ink-soft",
        className,
      )}
    >
      <input
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 rounded-[3px] border-line-strong accent-accent"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
