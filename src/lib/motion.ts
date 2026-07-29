import type { CSSProperties } from "react";

/**
 * Per-item stagger index. The keyframes in `globals.css` read `--i` to offset
 * each sibling's `animation-delay`, so a list only needs its position, not a
 * hand-written delay per element.
 */
export function step(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}
