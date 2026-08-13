"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, X } from "lucide-react";
import { projectFilterPath, type ShowreelProject } from "@/content/projects";
import VideoEmbed from "./VideoEmbed";
import SiteHeader from "./SiteHeader";
import ShowreelFilters from "./ShowreelFilters";
import { GALLERY_VALUE, VIEW_PARAM } from "./ProjectsView";
import styles from "./Showreel.module.css";

/** Matches the crossfade duration in the CSS: ignore input while it plays. */
const TRANSITION_MS = 900;
/** Minimum swipe distance, in pixels, before it counts as a change. */
const SWIPE_THRESHOLD = 50;
/** How long the full header stays up before shrinking to the name alone. */
const HEADER_COLLAPSE_MS = 5_000;

/**
 * When this bundle was loaded, i.e. the start of the visit. The header greeting
 * is timed from here rather than from each mount, so swapping view or changing
 * filter neither restarts it nor cuts it short. Only a full page load resets it.
 */
const visitStart = Date.now();

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
  const [headerCollapsed, setHeaderCollapsed] = useState(
    () =>
      typeof window !== "undefined" &&
      Date.now() - visitStart >= HEADER_COLLAPSE_MS,
  );
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

  // Jump straight to one video, from the dots on the left.
  const goTo = useCallback((next: number) => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setIndex(next);
    window.setTimeout(() => {
      lockedRef.current = false;
    }, TRANSITION_MS);
  }, []);

  // The full header is an intro: it shrinks once the visit is old enough,
  // whichever showreel happens to be mounted at that point.
  // Hovering it brings the details back, through CSS alone.
  useEffect(() => {
    if (headerCollapsed) return;

    // Clamped rather than branching: a 0ms timeout still defers the update to
    // the next tick, which setting state straight from an effect would not.
    const remaining = Math.max(
      0,
      HEADER_COLLAPSE_MS - (Date.now() - visitStart),
    );

    const timer = window.setTimeout(() => setHeaderCollapsed(true), remaining);
    return () => window.clearTimeout(timer);
  }, [headerCollapsed]);

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
  const currentFilterPath = projectFilterPath(current);

  return (
    <section
      className={styles.showreel}
      aria-roledescription="carousel"
      aria-label="Showreel"
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
      {/* One stack: on a phone the filters follow the header down as it
          expands, instead of being sat on. */}
      <div className={`${styles.chrome} ${single ? styles.chromeSingle : ""}`}>
        {/* Full state only as an intro, on arrival: once collapsed it stays
            collapsed, and hovering is the way to read it again. */}
        <SiteHeader compact={headerCollapsed} />

        <div className={styles.filters}>
          {single ? (
            <button
              type="button"
              className={styles.back}
              // Falls back to the gallery when the film was opened directly.
              onClick={() =>
                window.history.length > 1
                  ? router.back()
                  : router.push(`/?${VIEW_PARAM}=${GALLERY_VALUE}`)
              }
              aria-label="Close"
            >
              <X size={20} aria-hidden="true" />
            </button>
          ) : (
            <ShowreelFilters category={category} subcategory={subcategory} />
          )}
        </div>
      </div>

      {/* Carousel indicator: where you are in the reel, and a way to jump. */}
      {!single && projects.length > 1 && (
        <ol className={styles.dots} aria-label="Films in this selection">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <button
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={project.title}
                aria-current={i === index ? "true" : undefined}
              />
            </li>
          ))}
        </ol>
      )}

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

          {/* Third line: the film's subcategory, and a way into that showreel. */}
          {currentFilterPath && (
            <Link href={currentFilterPath} className={styles.captionTag}>
              {current.subcategory}
            </Link>
          )}
        </p>

        {/* Nothing to advance to when the filter leaves a single video. The
            view switch lives in ProjectsView, on the same line, so that it
            survives the swap between the two presentations. */}
        {!single && projects.length > 1 && (
          <button
            type="button"
            className={styles.next}
            onClick={() => shift(1)}
            aria-label={`Next film (${index + 1} of ${projects.length})`}
          >
            <ArrowDown size={22} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}
