"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectFilterPath, type ShowreelProject } from "@/content/projects";
import SiteHeader from "./SiteHeader";
import ShowreelFilters from "./ShowreelFilters";
import { useViewMode, withView } from "./ProjectsView";
import styles from "./Gallery.module.css";

export default function Gallery({
  projects,
  category,
  subcategory,
}: {
  projects: ShowreelProject[];
  /** Slugs of the page being viewed, for the filter control. */
  category?: string;
  subcategory?: string;
}) {
  // Tags keep you in the gallery rather than dropping you into fullscreen.
  const { gallery } = useViewMode();
  // Average colour of the card in play, lighting the page behind the grid.
  const [glow, setGlow] = useState<string | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  // Touch devices never hover, so there the glow follows the card nearest the
  // middle of the screen as you scroll — the way mobile video previews start.
  // Nearest wins rather than "crossing the centre", so the first and last
  // cards, which can never reach the middle, still get their turn.
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;

    const grid = gridRef.current;
    if (!grid) return;

    let frame = 0;
    const pick = () => {
      frame = 0;

      // The reference line travels with the scroll: the top of the screen when
      // scrolled to the top, the middle in the middle, the bottom at the end.
      // A fixed centre line would strand the first and last cards, which never
      // reach the middle of the viewport.
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      const line = window.innerHeight * progress;

      let closest: Element | null = null;
      let smallest = Infinity;

      // Attributes rather than the projects array: the callback outlives it.
      grid.querySelectorAll("[data-glow]").forEach((card) => {
        const box = card.getBoundingClientRect();
        const distance = Math.abs(box.top + box.height / 2 - line);
        if (distance < smallest) {
          smallest = distance;
          closest = card;
        }
      });

      setGlow((closest as Element | null)?.getAttribute("data-glow") ?? null);
    };

    // Coalesced into one measurement per frame while scrolling.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [projects]);

  return (
    <div className={styles.gallery}>
      <div
        className={`${styles.glow} ${glow ? styles.glowOn : ""}`}
        style={glow ? { backgroundColor: glow } : undefined}
        aria-hidden="true"
      />

      {/* Same stack as the fullscreen view: out of the flow so it never
          reflows the grid, and expanding the header on hover pushes the
          filters down rather than over them. */}
      <div className={styles.chrome}>
        <SiteHeader compact />

        <div className={styles.filters}>
          <ShowreelFilters category={category} subcategory={subcategory} />
        </div>
      </div>

      <ul
        ref={gridRef}
        className={styles.grid}
        onMouseLeave={() => setGlow(null)}
        onBlur={() => setGlow(null)}
      >
        {projects.map((project, index) => {
          const filterPath = projectFilterPath(project);

          return (
            <li
              key={project.slug}
              className={styles.card}
              // Read by the observer above, so it never closes over stale data.
              data-glow={project.glow}
              onMouseEnter={() => setGlow(project.glow ?? null)}
              onFocus={() => setGlow(project.glow ?? null)}
            >
              <Link href={`/film/${project.slug}`} className={styles.cardLink}>
                <div className={styles.media}>
                  <Image
                    src={project.cover}
                    alt={project.coverAlt ?? project.title}
                    fill
                    sizes="(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw"
                    priority={index < 2}
                    className={styles.image}
                  />
                </div>
                <h2 className={styles.title}>{project.title}</h2>
                <p className={styles.meta}>
                  {[project.director, project.production]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </Link>

              {/* Outside the card's link: anchors cannot be nested. */}
              {filterPath && (
                <Link
                  href={withView(filterPath, gallery)}
                  className={styles.tag}
                >
                  {project.subcategory}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
