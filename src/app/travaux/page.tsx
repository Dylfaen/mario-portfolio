import type { Metadata } from "next";
import { projectsByYear } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";
import styles from "./travaux.module.css";

export const metadata: Metadata = {
  title: "Travaux",
  description: "Filmographie complète : fiction, documentaire, clip, publicité.",
};

export default function TravauxPage() {
  return (
    <section className="container section">
      <h1 className={styles.title}>Travaux</h1>
      <ul className={styles.grid}>
        {projectsByYear.map((project, index) => (
          <li key={project.slug}>
            <ProjectCard project={project} priority={index === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
