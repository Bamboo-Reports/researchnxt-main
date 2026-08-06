/**
 * Events content types.
 *
 * Kept apart from `index.ts` so each event module can import the type without
 * importing the registry that imports it back, the same arrangement the
 * experts-view and insights libraries use.
 */

export type Event = {
  /** Last segment of the URL. */
  slug: string;
  /**
   * Slug of the research programme the event belongs to, matching the report
   * landing where one exists, so `/resources/events/<project>/<event>` reads
   * as the same programme as the rest of `/resources`.
   */
  project: string;

  metaTitle: string;
  metaDescription: string;

  title: string;
  /** Standfirst under the title. */
  lede: string;
  /** Date the event ran, ISO `YYYY-MM-DD`. */
  date: string;
  /** One or two sentences for the library card. */
  excerpt: string;

  /** Path under /public. */
  image: string;
  imageAlt: string;

  /**
   * The event's own facts, as the source page lists them: research focus,
   * format, geography, timeframe. Rendered as a definition list, so the
   * labels stay meaningful rather than becoming a bulleted blur.
   *
   * Optional: the conference participations carry no research facts, because
   * they are not tied to a research programme.
   */
  facts?: { label: string; value: string }[];

  /**
   * Body blocks. A plain string is a paragraph, and `**` inside it marks bold
   * emphasis; an object is a list, as the NASSCOM pages use to set out what
   * participants take away.
   */
  body?: (string | { list: string[] })[];

  /**
   * Speakers, in running order. `interview` links a speaker to their
   * published interview when the same person appears in the experts-view
   * library; the slug is resolved inside `project`.
   */
  speakers?: {
    name: string;
    role: string;
    /** Path under /public. */
    image?: string;
    interview?: string;
  }[];
};
