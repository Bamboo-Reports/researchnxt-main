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
   * Date the event ran, ISO `YYYY-MM-DD`. Orders the library newest first;
   * nothing renders it since dates were dropped from the cards and pages.
   *
   * Optional, because a source page does not always state one: the marketing
   * automation roundtable is written up as a recap with no date anywhere on
   * the article, the events listing or its metadata.
   */
  date?: string;
  /**
   * When the write-up went live, for an event that carries no `date`. Used
   * only to place the event in the newest-first listing; never rendered.
   */
  published?: string;
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
   * The event's own recording, opening the page in place of the banner, which
   * is the order the source pages use. Either a LinkedIn post, given as the
   * `urn:li:ugcPost:…` id from the post URL, or a YouTube id.
   *
   * A LinkedIn highlights reel stays an embed rather than a self-hosted file
   * because the post is where the video actually lives, and re-uploading it
   * would fork the view count and the comments away from the original. A
   * YouTube recording stays a poster until it is clicked, through
   * `VideoEmbed`, so the player is not pulled in on every visit.
   *
   * Note when transcribing: an Elementor page carries its YouTube recording
   * in the widget's `data-settings` attribute, not as an iframe, so searching
   * the markup for iframes or `youtube.com/embed` finds nothing on a page
   * that plainly has a video. Search for `youtube_url` too, and check the
   * widget for `elementor-hidden-*` classes before carrying it.
   */
  video?:
    | { linkedInPost: string; caption: string }
    | { youTubeId: string; caption: string; poster?: string };

  /**
   * Body blocks that belong below the speaker cards, where the source page
   * introduces the panel first and only then says what it covered. Same block
   * shapes as `body`.
   */
  bodyAfterSpeakers?: (
    | string
    | { list: string[] }
    | { heading: string }
    | { image: string; alt: string }
  )[];

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
   * Photographs from the day, as a source page's own gallery band. Kept apart
   * from `body`'s `image` block, which places one photograph in the reading
   * flow: a set of eight belongs in a grid under its own heading, not as
   * eight full-width images stacked down the column.
   */
  gallery?: {
    title: string;
    images: { src: string; alt: string }[];
  };

  /**
   * A slide deck the source page embeds, shown at the slides' own 4:3 rather
   * than the source's 300px square.
   *
   * `href` must be SlideShare's `embed_code/key/…` URL, which is what the
   * source's own iframe uses: a deck's public page sends
   * `X-Frame-Options: SAMEORIGIN` and renders as a blank frame. `page` is
   * that public URL, for the link out beneath the frame.
   */
  deck?: { title: string; href: string; page?: string };

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
    /**
     * The heading the source page files this speaker under, where it groups
     * them ("CEOs Defining The Next Technology Agenda"). Speakers sharing a
     * group render under one subheading, in the order they first appear; a
     * list where nobody has a group renders as one flat set.
     */
    group?: string;
    /**
     * The speaker's organisation, where the source page sets it apart from the
     * job title rather than running the two together. Rendered on its own line
     * under the title, so a long title does not push the company out of sight.
     */
    company?: string;
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
