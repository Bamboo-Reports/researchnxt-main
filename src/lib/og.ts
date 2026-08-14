import { site } from "@/config/site";

/**
 * Open Graph block for a page with its own share artwork. Next merges
 * metadata shallowly, so a page that sets `openGraph` replaces the layout's
 * block entirely; this keeps the site fields while swapping the image.
 */
export function og(image: string) {
  return {
    type: "website" as const,
    siteName: site.name,
    locale: "en_IN",
    images: [image],
  };
}
