import { cn } from "@/lib/cn";

/**
 * The hero's ground: layered gradients over the deep brand blue, warming toward
 * the brand orange only at the far edge, where it never sits under copy.
 *
 * Purely decorative and static. Every figure and line in the hero is real text
 * in the DOM above this layer.
 */
export function EvidenceField({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 bg-deep", className)}>
      {/* A wide wash lifting the right side of the band out of flat colour. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_82%_18%,#0079bf_0%,#0a3a5c_38%,#04243a_72%)]" />
      {/* One warm edge, kept to the corner and well clear of the headline. */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_100%_0%,rgba(255,125,36,0.28)_0%,transparent_60%)]" />
      {/* Settles the base back to deep so type contrast holds across the band. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,36,58,0.15)_0%,rgba(4,36,58,0.85)_100%)]" />
    </div>
  );
}
