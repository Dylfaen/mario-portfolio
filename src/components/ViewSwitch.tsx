"use client";

import { LayoutGrid, Maximize2 } from "lucide-react";
import { useViewMode } from "./ProjectsView";
import styles from "./ViewSwitch.module.css";

export default function ViewSwitch() {
  const { gallery, setGallery } = useViewMode();

  return (
    <div className={styles.switch} role="group" aria-label="View mode">
      {/* One highlight that slides between the two, rather than two that
          blink on and off. */}
      <span
        className={`${styles.thumb} ${gallery ? styles.thumbEnd : ""}`}
        aria-hidden="true"
      />
      <button
        type="button"
        className={`${styles.option} ${gallery ? "" : styles.active}`}
        onClick={() => setGallery(false)}
        aria-pressed={!gallery}
        aria-label="Fullscreen"
      >
        <Maximize2 size="1.05em" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${styles.option} ${gallery ? styles.active : ""}`}
        onClick={() => setGallery(true)}
        aria-pressed={gallery}
        aria-label="Gallery"
      >
        <LayoutGrid size="1.05em" aria-hidden="true" />
      </button>
    </div>
  );
}
