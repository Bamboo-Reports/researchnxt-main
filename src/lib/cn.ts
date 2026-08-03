import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default scale, so the project's custom
 * type roles (`text-display`, `text-headline`, …) would be classified as text
 * colours and dropped whenever a real colour like `text-ink` follows in the
 * same call. Registering them in the font-size group keeps size and colour
 * from ever competing.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "display-sm", "headline", "title"] },
      ],
    },
  },
});

/** Join class names, letting later Tailwind utilities win over earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
