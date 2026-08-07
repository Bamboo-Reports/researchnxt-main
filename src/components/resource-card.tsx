import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TrailingArrow } from "@/components/ui/button";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import type { FeaturedResource } from "@/content/types";

/**
 * Source titles run to very different lengths, so the title and summary are
 * clamped to a fixed number of lines. A row of cards then keeps one hierarchy
 * instead of one card being three lines taller than its neighbours.
 *
 * A card carries the real cover or interview banner where the resource has
 * one, and falls back to the placeholder plate where it does not.
 */
export function ResourceCard({
  resource,
  withPlate = false,
  portrait = false,
  style,
}: {
  resource: FeaturedResource;
  withPlate?: boolean;
  /** A4 plate for report covers, matching the library's book-shelf grid. */
  portrait?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <Card
      href={resource.href}
      external={resource.external}
      className="gap-4"
      style={style}
    >
      {withPlate ? (
        <Image
          src={resource.image ?? "/resource-placeholder.svg"}
          alt=""
          width={portrait ? 840 : 640}
          height={portrait ? 1188 : 360}
          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 100vw"
          className={`mt-1 w-full rounded-md object-cover ${
            portrait ? "aspect-[210/297]" : "aspect-video"
          }`}
        />
      ) : (
        <Badge className="self-start">{resource.kind}</Badge>
      )}

      <CardTitle className="clamp-2 text-base">{resource.title}</CardTitle>

      {resource.summary ? (
        <CardBody className="clamp-2">{resource.summary}</CardBody>
      ) : null}

      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-accent">
        Read more
        {resource.external ? (
          <span className="sr-only">(opens in a new tab)</span>
        ) : null}
        <TrailingArrow />
      </span>
    </Card>
  );
}
