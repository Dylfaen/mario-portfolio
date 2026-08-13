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
      <div className={styles.bar}>
        <SiteHeader compact />
        <div className={styles.controls}>
          <ShowreelFilters category={category} subcategory={subcategory} />
        </div>
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
