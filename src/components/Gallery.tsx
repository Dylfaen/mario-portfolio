"use client";

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

  return (
    <div className={styles.gallery}>
      {/* Out of the flow, like in the fullscreen view: expanding it on hover
          then overlays the page instead of pushing the filters off screen. */}
      <div className={styles.headerSlot}>
        <SiteHeader compact />
      </div>

      <div className={styles.bar}>
        <ShowreelFilters category={category} subcategory={subcategory} />
      </div>

      <ul className={styles.grid}>
        {projects.map((project, index) => {
          const filterPath = projectFilterPath(project);

          return (
            <li key={project.slug} className={styles.card}>
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
