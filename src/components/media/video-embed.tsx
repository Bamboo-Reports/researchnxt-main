"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A YouTube recording that stays a poster until it is asked for.
 *
 * The launch event carries four full session recordings. Mounting four
 * YouTube iframes to show four still frames would pull in the player and its
 * cookies on every visit, so the poster is the default and the iframe only
 * replaces it on the click that means to watch. That trade is the reason this
 * is one of the few client components in the tree.
 */

type VideoEmbedProps = {
  /** The `youtu.be/<id>` id from the source page. */
  videoId: string;
  /** Path under /public: the thumbnail the source page uses as its overlay. */
  poster: string;
  /** Names the recording for the play control and the iframe. */
  title: string;
};

export function VideoEmbed({ videoId, poster, title }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-lg border border-line bg-deep"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play the recording: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-line bg-deep"
    >
      <Image
        src={poster}
        alt=""
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
        className="object-cover transition-transform duration-500 [transition-timing-function:var(--ease-out-quart)] group-hover:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-deep/20 transition-colors duration-200 group-hover:bg-deep/35"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-200 [transition-timing-function:var(--ease-out-quart)] group-hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="ml-0.5 size-6 fill-accent">
          <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.1-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
        </svg>
      </span>
    </button>
  );
}
