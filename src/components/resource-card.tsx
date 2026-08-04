import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TrailingArrow } from "@/components/ui/button";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import type { FeaturedResource } from "@/content/types";

/**
 * PHASE A: every resource still lives on the WordPress site, so these always
 * render as external links. Phase B swaps `external` off and the same markup
 * routes internally.
 *
 * Source titles run to very different lengths, so the title and summary are
 * clamped to a fixed number of lines. A row of cards then keeps one hierarchy
 * instead of one card being three lines taller than its neighbours.
 */
export function ResourceCard({
  resource,
  withPlate = false,
  style,
}: {
  resource: FeaturedResource;
  withPlate?: boolean;
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
          src="/resource-placeholder.svg"
          alt=""
          width={640}
          height={360}
          className="mt-1 aspect-video w-full rounded-md object-cover"
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
