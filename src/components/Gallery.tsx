import Image from "next/image";
import Link from "next/link";
import type { ShowreelProject } from "@/content/projects";
import SiteHeader from "./SiteHeader";
import ShowreelFilters from "./ShowreelFilters";
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
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Link href={`/film/${project.slug}`} className={styles.card}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
