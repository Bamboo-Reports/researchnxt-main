import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReportCardItem } from "@/content/resources";

/**
 * One plate-and-caption card, shared by the report landing's grids and rails.
 *
 * An item without an `href` renders as an inert plate with the placeholder
 * image, so a card can be listed before its page exists.
 */
export function ReportCard({
  item,
  style,
}: {
  item: ReportCardItem;
  style?: React.CSSProperties;
}) {
  const inner = (
    <>
      <Image
        src={item.image ?? "/resource-placeholder.svg"}
        alt=""
        width={640}
        height={360}
        // Cards sit three or four across at desktop; without this the
        // optimiser assumes full-viewport and serves the large variants.
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
        className="mt-1 aspect-video w-full rounded-md object-cover"
      />
      <h3
        className={cn(
          "clamp-3 text-base font-semibold",
          item.href && "transition-colors duration-200 group-hover:text-accent",
        )}
      >
        {item.title}
      </h3>
    </>
  );

  if (!item.href) {
    return (
      <div
        className="flex h-full flex-col gap-4 border-t border-line pt-4"
        style={style}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col gap-4 border-t border-line pt-4 transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-accent"
      style={style}
    >
      {inner}
    </Link>
  );
}
