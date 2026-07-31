import { useState } from "react";
import { Play } from "lucide-react";

export type VideoItem = {
  src: string;
  poster: string;
  title: string;
  meta: string;
  /** Aspect ratio css value, e.g. "9 / 16" or "4 / 5". */
  ratio?: string;
};

/**
 * Poster-first video panel. The <video> element is only mounted after the
 * viewer clicks play, so the page never downloads video bytes up front.
 */
export function VideoPanel({ item, className = "" }: { item: VideoItem; className?: string }) {
  const [playing, setPlaying] = useState(false);

  // Determine if this is an Instagram URL
  const isInstagramVideo = item.src.includes('instagram.com/reel/');

  return (
    <figure className={`video-panel ${className} ${isInstagramVideo ? 'instagram-video' : ''}`} style={{ aspectRatio: item.ratio ?? "9 / 16" }}>
      {isInstagramVideo && playing ? (
        <div className="instagram-embed-wrapper">
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink={item.src}
            data-instgrm-version="14"
          />
          <script async src="//www.instagram.com/embed.js" />
        </div>
      ) : (
        <button
          type="button"
          className="video-poster"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${item.title}`}
        >
          <img src={item.poster} alt={item.title} loading="lazy" />
          <span className="video-scrim" aria-hidden="true" />
          <span className="video-play" aria-hidden="true">
            <Play />
          </span>
          <figcaption className="video-caption">
            <span className="video-meta">{item.meta}</span>
            <span className="video-title">{item.title}</span>
          </figcaption>
        </button>
      )}
    </figure>
  );
}
