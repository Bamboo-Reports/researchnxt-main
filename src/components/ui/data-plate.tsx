import { cn } from "@/lib/cn";

/**
 * Stand-in for real imagery until the WordPress media library is migrated
 * (Phase C).
 *
 * Renders a deterministic gradient block drawn from the brand palette, so the
 * same piece of content always gets the same treatment across renders and
 * across pages. Replacing this one component swaps in real images everywhere.
 */

/** Brand blue led, with a single orange-tipped ramp used sparingly. */
const grounds = [
  "bg-[linear-gradient(135deg,#04243a_0%,#0079bf_100%)]",
  "bg-[linear-gradient(135deg,#0079bf_0%,#58b6ea_100%)]",
  "bg-[linear-gradient(160deg,#072f4a_0%,#04243a_100%)]",
  "bg-[linear-gradient(135deg,#04243a_0%,#16496c_55%,#0079bf_100%)]",
  "bg-[linear-gradient(135deg,#0079bf_0%,#ff7d24_140%)]",
  "bg-[linear-gradient(200deg,#58b6ea_0%,#04243a_85%)]",
] as const;

const aspects = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
} as const;

function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

type DataPlateProps = {
  seed: string;
  aspect?: keyof typeof aspects;
  /** Short caption over the block, usually the content type. */
  label?: string;
  className?: string;
};

export function DataPlate({
  seed,
  aspect = "video",
  label,
  className,
}: DataPlateProps) {
  const seedHash = hash(seed);
  const ground = grounds[seedHash % grounds.length];

  return (
    <div
      role="presentation"
      className={cn(
        "relative isolate overflow-hidden rounded-md",
        ground,
        aspects[aspect],
        className,
      )}
    >
      {label ? (
        <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/85">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/**
 * People are not given a gradient block. Leadership portraits get a monogram on
 * the deep surface, so the treatment stays coherent without standing in for a
 * face with abstract colour.
 */
export function MonogramPlate({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative grid aspect-square place-items-center overflow-hidden rounded-full bg-deep",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[16%] rounded-full border border-plate/30"
      />
      <span className="font-figure relative text-sm font-semibold text-on-deep">
        {initials}
      </span>
    </div>
  );
}
