/**
 * Success stories content types.
 *
 * Kept apart from `index.ts` so each story module can import the type without
 * importing the registry that imports it back, the same arrangement the
 * experts-view, insights and events libraries use.
 */

/**
 * One client engagement, as the WordPress `/case-study/` pages record them: a
 * client, what the programme delivered, what the client and the participants
 * said, and a link to the full document.
 */
export type SuccessStory = {
  /** Last segment of the URL. */
  slug: string;
  /**
   * Slug of the research programme the engagement produced, matching the
   * report landing where one exists, so
   * `/resources/success-stories/<project>/<story>` reads as the same programme
   * as the rest of `/resources`.
   */
  project: string;

  metaTitle: string;
  metaDescription: string;

  /** The client, which is what the story is filed under. */
  client: string;
  title: string;
  /** Standfirst under the title. */
  lede: string;
  /** Publication date on the source page, ISO `YYYY-MM-DD`. */
  published: string;
  /** One or two sentences for the library card. */
  excerpt: string;

  /** Path under /public. */
  image: string;
  imageAlt: string;

  /** The client's mark, on a light surface. Path under /public. */
  logo?: string;

  /**
   * The engagement's own facts, as the source page lists them: research focus,
   * technology, geography, timeframe. Rendered as a definition list, the same
   * device the event pages use.
   */
  facts: { label: string; value: string }[];

  /** What the engagement delivered, rendered through the site's stat tiles. */
  deliverables?: { value: string; label: string }[];

  /**
   * Body blocks. A plain string is a paragraph, and `**` inside it marks bold
   * emphasis; an object is a list, as the ABM case study uses to set out what
   * the research was aimed at.
   */
  body?: (string | { list: string[] })[];

  /** Quotes from the people the research spoke to, in the order given. */
  quotes?: {
    quote: string;
    name: string;
    role: string;
    /** Omitted where the source page names no company. */
    company?: string;
    /** Path under /public. */
    image?: string;
  }[];

  /**
   * The full case study document. It is hosted off-site on the live pages, so
   * the link is external and is rendered as such.
   */
  document?: { label: string; href: string };
};
