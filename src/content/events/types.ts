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
  /**
   * Date the event ran, ISO `YYYY-MM-DD`.
   *
   * Optional, because a source page does not always state one: the marketing
   * automation roundtable is written up as a recap with no date anywhere on
   * the article, the events listing or its metadata. Where it is absent the
   * templates omit the `<time>` rather than showing the write-up's own
   * publication date, which would be a different fact.
   */
  date?: string;
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
   * emphasis; a `list` is a bulleted set, as the NASSCOM pages use to set out
   * what participants take away; a `heading` opens a section, which the
   * longer recaps need so the piece is navigable rather than a wall of
   * paragraphs. Same three shapes an insights article uses.
   */
  body?: (string | { list: string[] } | { heading: string })[];

  /**
   * Photographs from the day, where the source page publishes them. Rendered
   * as a plain grid under the write-up, not a carousel: there are only ever a
   * handful and they are worth seeing at once.
   */
  gallery?: { src: string; alt: string }[];

  /**
   * A highlights video hosted on LinkedIn, given as the `urn:li:ugcPost:…`
   * id from the post URL. It stays an embed rather than a self-hosted file
   * because the post is where the video actually lives, and re-uploading it
   * would fork the view count and the comments away from the original.
   */
  video?: { linkedInPost: string; caption: string };

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
