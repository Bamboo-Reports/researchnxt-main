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

  /**
   * The client testimonial recording, where the source page carries one. The
   * artwork in `image` is its poster and has a play button baked into it, so
   * without this the page shows a control that does nothing.
   *
   * Read the source's markup, not just its embed ids, when transcribing one:
   * the Zycus page carries two Wistia embeds but the first is an Elementor
   * widget marked hidden on desktop, tablet and phone alike, so only the
   * second ever plays.
   */
  video?: { host: "youtube" | "wistia"; videoId: string; title: string };

  /**
   * The client speaking about the engagement, which the source pages set under
   * the recordings at full measure rather than as one card among the
   * participants' quotes. Kept apart from `quotes` for that reason: it is the
   * client speaking about the work, not a participant speaking about the
   * subject.
   */
  testimonial?: {
    /**
     * Optional: the Zycus page names its speaker under the recordings without
     * setting any of their words as text, and inventing a sentence to fill the
     * gap would put copy on the page the source never carried.
     */
    quote?: string;
    name: string;
    role: string;
    company?: string;
  };

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
    /**
     * A square portrait, shown as the disc beside the attribution. Path under
     * /public. Must be a head shot, not interview key art: key art is 16:9
     * and a disc crop of it keeps a sliver of the artwork and none of the
     * face.
     */
    image?: string;
    /**
     * The speaker's published interview, where the source page links one
     * under the quote.
     */
    href?: string;
  }[];

  /**
   * The event the programme closed with, where the source page points at one.
   * Only the story's own heading and sentences live here: the event's title,
   * artwork and URL are resolved from the events registry by slug, so the
   * event stays described in exactly one place and a typo fails the build.
   */
  launchEvent?: {
    title: string;
    /** Paragraphs, in order, as the source page sets them. */
    description: string[];
    linkLabel: string;
    /** Slug within the story's own `project`. */
    slug: string;
  };

  /**
   * The full case study document. It is hosted off-site on the live pages, so
   * the link is external and is rendered as such.
   */
  document?: { label: string; href: string };
};
