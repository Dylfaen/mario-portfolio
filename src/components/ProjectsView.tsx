"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ShowreelProject } from "@/content/projects";
import Showreel from "./Showreel";
import Gallery from "./Gallery";
import ViewSwitch from "./ViewSwitch";
import styles from "./ProjectsView.module.css";

/** `?vue=galerie` — a presentation switch, not a different page. */
export const VIEW_PARAM = "vue";
export const GALLERY_VALUE = "galerie";

type ViewMode = { gallery: boolean; setGallery: (value: boolean) => void };

const ViewModeContext = createContext<ViewMode>({
  gallery: false,
  setGallery: () => {},
});

export function useViewMode() {
  return useContext(ViewModeContext);
}

/** Keeps the current view when a link goes to another filter. */
export function withView(path: string, gallery: boolean) {
  return gallery ? `${path}?${VIEW_PARAM}=${GALLERY_VALUE}` : path;
}

function readFromUrl() {
  return (
    new URLSearchParams(window.location.search).get(VIEW_PARAM) ===
    GALLERY_VALUE
  );
}

/**
 * Picks the presentation from the URL and swaps it in place: toggling only
 * rewrites the query string, so nothing is fetched and nothing remounts.
 */
export default function ProjectsView({
  projects,
  category,
  subcategory,
}: {
  projects: ShowreelProject[];
  category?: string;
  subcategory?: string;
}) {
  const [gallery, setGalleryState] = useState(false);

  // The pages are prerendered without the query string, so the value is read
  // once mounted, and again whenever the back/forward buttons change it.
  useEffect(() => {
    const sync = () => setGalleryState(readFromUrl());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const setGallery = useCallback((value: boolean) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(VIEW_PARAM, GALLERY_VALUE);
    else params.delete(VIEW_PARAM);

    const query = params.toString();
    // Native history API: the URL follows without re-running the server render.
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`,
    );
    setGalleryState(value);
  }, []);

  const value = useMemo(() => ({ gallery, setGallery }), [gallery, setGallery]);

  return (
    <ViewModeContext.Provider value={value}>
      {gallery ? (
        <Gallery
          projects={projects}
          category={category}
          subcategory={subcategory}
        />
      ) : (
        <Showreel
          projects={projects}
          category={category}
          subcategory={subcategory}
        />
      )}

      {/* Outside the swap: the same element in both views, so it neither moves
          nor remounts when the presentation changes. */}
      <div className={styles.switchSlot}>
        <ViewSwitch />
      </div>
    </ViewModeContext.Provider>
  );
}
