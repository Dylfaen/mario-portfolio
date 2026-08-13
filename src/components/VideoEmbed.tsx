import type { VideoSource } from "@/content/projects";
import styles from "./VideoEmbed.module.css";

type VideoEmbedProps = {
  video: VideoSource;
  /** Title announced by screen readers (required on an iframe) */
  title: string;
  /**
   * - `player`: full player with controls (project page)
   * - `background`: muted loop, no controls, not clickable (showreel, cards)
   */
  variant?: "player" | "background";
};

function buildSrc(video: VideoSource, variant: "player" | "background") {
  if (video.provider === "vimeo") {
    const params = new URLSearchParams({ dnt: "1" }); // dnt = do not track
    if (video.hash) params.set("h", video.hash);

    if (variant === "background") {
      // `background=1` hides the controls and the Vimeo chrome;
      // `muted=1` is required, otherwise browsers block autoplay.
      params.set("background", "1");
      params.set("autoplay", "1");
      params.set("muted", "1");
      params.set("loop", "1");
    } else {
      params.set("title", "0");
      params.set("byline", "0");
      params.set("portrait", "0");
    }

    return `https://player.vimeo.com/video/${video.id}?${params}`;
  }

  // Adobe Portfolio's player. Its embed parameters are undocumented beyond
  // the two the old site used, so a background variant cannot be guaranteed
  // to autoplay muted and loop the way Vimeo's can.
  const params = new URLSearchParams({
    bgcolor: "#000000",
    api_key: "BehancePro2View",
  });
  if (variant === "background") {
    params.set("autoplay", "true");
    params.set("muted", "true");
    params.set("loop", "true");
  }

  return `https://www-ccv.adobe.io/v1/player/ccv/${video.id}/embed?${params}`;
}

export default function VideoEmbed({
  video,
  title,
  variant = "player",
}: VideoEmbedProps) {
  return (
    <iframe
      className={`${styles.frame} ${variant === "background" ? styles.background : ""}`}
      src={buildSrc(video, variant)}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}
