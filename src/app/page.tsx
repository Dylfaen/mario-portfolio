import Link from "next/link";
import { site } from "@/content/site";
import { featuredProjects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <section className={`container ${styles.hero}`}>
        <h1>{site.name}</h1>
        <p className={styles.tagline}>{site.tagline}</p>
      </section>

      <section className="container section">
        <h2 className={styles.sectionTitle}>Sélection</h2>
        <ul className={styles.grid}>
          {featuredProjects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} priority={index === 0} />
            </li>
          ))}
        </ul>
        <p className={styles.more}>
          <Link href="/travaux">Voir toute la filmographie →</Link>
        </p>
      </section>
    </>
  );
}
