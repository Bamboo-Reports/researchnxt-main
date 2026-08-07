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
  /**
   * Standfirst under the title. Optional: a title that already carries the
   * host and the venue does not want them repeated a line below it.
   */
  lede?: string;
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
   * paragraphs; an `image` is a photograph sitting where the source page puts
   * it, which is how a recap paces itself between sections.
   */
  body?: (
    | string
    | { list: string[] }
    | { heading: string }
    | { image: string; alt: string }
  )[];

  /**
   * A highlights video hosted on LinkedIn, given as the `urn:li:ugcPost:…`
   * id from the post URL. It stays an embed rather than a self-hosted file
   * because the post is where the video actually lives, and re-uploading it
   * would fork the view count and the comments away from the original.
   *
   * Where it is set it opens the page in place of the banner, which is the
   * order the source page uses.
   */
  video?: { linkedInPost: string; caption: string };

  /**
   * The recordings of the event's own sessions, in running order, where the
   * source page publishes them. Each carries the YouTube id from the source's
   * player and the still the source uses as its overlay, so the programme is
   * watchable from the page rather than only described in the body.
   */
  sessions?: {
    /** "Keynote", "Panel discussion", "Fireside chat". */
    kind: string;
    title: string;
    /** The `youtu.be/<id>` id from the source page. */
    videoId: string;
    /** Path under /public. */
    poster: string;
  }[];

  /**
   * A slide deck the source page embeds. Linked out rather than embedded:
   * the source's SlideShare iframe renders at 300px square with an empty
   * anchor beneath it, which is worse than a link that says what it is.
   */
  deck?: { title: string; href: string };

  /**
   * Pull quotes the source page runs from the programme's interviews, each
   * pointing back at the full piece. `interview` is the slug inside the
   * event's own `project`.
   */
  quotes?: {
    text: string;
    name: string;
    role: string;
    /**
     * Path under /public. The interview's own thumbnail is a composed
     * banner with the set copy beside the photograph, so it cannot be
     * cropped to a circle; the card carries a square cut of the same
     * photograph instead.
     */
    image?: string;
    interview: string;
  }[];

  /**
   * Jotform id for the download form the source page closes with, where it
   * has one. A conference recap that gives nothing away carries none.
   */
  jotformId?: string;

  /**
   * The report the event launched, as the source page's own panel: the cover
   * artwork, the report's two-line name and the engagement facts, with the
   * href resolved from the programme's `reportSlug`.
   */
  reportBand?: {
    title: string;
    subtitle: string;
    /** Path under /public. */
    artwork: string;
    artworkAlt: string;
    /**
     * Optional: an event that already lists its facts beside the write-up
     * does not repeat them under the cover.
     */
    facts?: { label: string; value: string }[];
  };

  /**
   * The client story the engagement produced, as the source page closes on
   * it. `story` is the success-story slug inside the event's own `project`,
   * `card` is the microsite's testimonial artwork, and the facts are the
   * engagement's own, carried verbatim from the source, pipes and capitals
   * included.
   */
  clientStory?: {
    story: string;
    /** Path under /public. */
    card: string;
    facts: { label: string; value: string }[];
  };

  /**
   * Speakers, in running order. A card carries the portrait, the LinkedIn
   * profile where the source page links one, and a link to the speaker's
   * published interview where the event sets `interview` and the same person
   * appears in the experts-view library under `project`.
   */
  speakers?: {
    name: string;
    role: string;
    /** Path under /public. */
    image?: string;
    /**
     * The speaker's LinkedIn profile, as the source page links each card.
     * Omitted where the source has no link, or links the wrong person.
     */
    linkedIn?: string;
    interview?: string;
  }[];
};
