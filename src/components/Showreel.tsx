"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowLeft } from "lucide-react";
import type { ShowreelProject } from "@/content/projects";
import VideoEmbed from "./VideoEmbed";
import SiteHeader from "./SiteHeader";
import ShowreelFilters from "./ShowreelFilters";
import styles from "./Showreel.module.css";

/** Matches the crossfade duration in the CSS: ignore input while it plays. */
const TRANSITION_MS = 900;
/** Minimum swipe distance, in pixels, before it counts as a change. */
const SWIPE_THRESHOLD = 50;
/** How long the full header stays up before shrinking to the name alone. */
const HEADER_COLLAPSE_MS = 10_000;

export default function Showreel({
  projects,
  category,
  subcategory,
  single = false,
}: {
  projects: ShowreelProject[];
  /** Slugs of the page being viewed, for the filter control. */
  category?: string;
  subcategory?: string;
  /**
   * One film on its own: no filters, no view switch, no next arrow,
   * and a way back to wherever you came from.
   */
  single?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);
  const router = useRouter();

  // One step forward (1) or back (-1), wrapping around. Locked during the
  // crossfade so trackpad momentum doesn't skip several videos at once.
  const shift = useCallback(
    (direction: 1 | -1) => {
      if (lockedRef.current || projects.length < 2) return;
      lockedRef.current = true;
      setIndex((i) => (i + direction + projects.length) % projects.length);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, TRANSITION_MS);
    },
    [projects.length],
  );

  // The full header is an intro: it shrinks on its own after a few seconds.
  // Hovering it brings the details back, through CSS alone.
  useEffect(() => {
    const timer = window.setTimeout(
      () => setHeaderCollapsed(true),
      HEADER_COLLAPSE_MS,
    );
    return () => window.clearTimeout(timer);
  }, []);

  // No page scroll while the showreel is mounted: scrolling changes video
  // instead, and the scrollbar disappears.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Keyboard parity with the scroll gesture.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") shift(1);
      if (event.key === "ArrowUp" || event.key === "PageUp") shift(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shift]);

  // Keep only the visible video streaming. Vimeo's player accepts play/pause
  // over postMessage, so this needs no extra SDK script.
  useEffect(() => {
    const frames = stackRef.current?.querySelectorAll("iframe");
    frames?.forEach((frame, i) => {
      frame.contentWindow?.postMessage(
        JSON.stringify({ method: i === index ? "play" : "pause" }),
        "https://player.vimeo.com",
      );
    });
  }, [index]);

  if (projects.length === 0) return null;

  const current = projects[index];

  return (
    <section
      className={styles.showreel}
      aria-roledescription="carrousel"
      aria-label="Bande démo"
      onWheel={(event) => {
        if (Math.abs(event.deltaY) < 10) return;
        shift(event.deltaY > 0 ? 1 : -1);
      }}
      onTouchStart={(event) => {
        touchStartRef.current = event.touches[0].clientY;
      }}
      onTouchEnd={(event) => {
        const start = touchStartRef.current;
        if (start === null) return;
        touchStartRef.current = null;
        const travelled = start - event.changedTouches[0].clientY;
        // Swiping up pulls the next video in, as in any vertical video feed.
        if (Math.abs(travelled) > SWIPE_THRESHOLD) {
          shift(travelled > 0 ? 1 : -1);
        }
      }}
    >
      {/* Full state at first, name only once collapsed or past the first video. */}
      <div className={styles.header}>
        <SiteHeader compact={headerCollapsed || index > 0} />
      </div>

      <div className={styles.filters}>
        {single ? (
          <button
            type="button"
            className={styles.back}
            // Falls back to the gallery when the film was opened directly.
            onClick={() =>
              window.history.length > 1 ? router.back() : router.push("/galerie")
            }
            aria-label="Retour"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
        ) : (
          <ShowreelFilters category={category} subcategory={subcategory} />
        )}
      </div>

      <div ref={stackRef} className={styles.stack}>
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className={`${styles.layer} ${i === index ? styles.active : ""}`}
            aria-hidden={i !== index}
          >
            {/* Oversized wrapper: the 16/9 player overflows the viewport on
                both axes so it covers portrait and landscape alike. */}
            <div className={styles.cover}>
              <VideoEmbed
                video={project.video}
                title={project.title}
                variant="background"
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.hud}>
        {/* `key` restarts the animation whenever the video changes. */}
        <p key={current.slug} className={styles.caption}>
          <span className={styles.captionTitle}>{current.title}</span>
          <span className={styles.captionMeta}>
            {/* Most imported projects have no year yet, so skip empty parts. */}
            {[current.director, current.production, current.year]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </p>

        {/* The view switch lives in ProjectsView, on the same line, so that it
            survives the swap between the two presentations. */}
        {!single && (
          <button
            type="button"
            className={styles.next}
            onClick={() => shift(1)}
            aria-label={`Vidéo suivante (${index + 1} sur ${projects.length})`}
          >
            <ArrowDown size={22} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}
