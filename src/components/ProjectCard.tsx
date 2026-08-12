import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className={styles.card}>
      <Link href={`/travaux/${project.slug}`} className={styles.link}>
        <div className={styles.media}>
          <Image
            src={project.cover}
            alt={project.coverAlt ?? project.title}
            fill
            sizes="(min-width: 64em) 33vw, (min-width: 40em) 50vw, 100vw"
            priority={priority}
            className={styles.image}
          />
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.meta}>
          {project.format} · {project.year} · {project.director}
        </p>
      </Link>
    </article>
  );
}
