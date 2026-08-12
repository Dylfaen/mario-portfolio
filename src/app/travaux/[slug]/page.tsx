import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import styles from "./projet.module.css";

type Params = { params: Promise<{ slug: string }> };

// Génère une page statique par projet au build.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.synopsis,
    openGraph: { images: [{ url: project.cover }] },
  };
}

export default async function ProjetPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="container section">
      <p className={styles.back}>
        <Link href="/travaux">← Travaux</Link>
      </p>

      <header className={styles.header}>
        <h1>{project.title}</h1>
        <dl className={styles.meta}>
          <div>
            <dt>Année</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>{project.format}</dd>
          </div>
          <div>
            <dt>Réalisation</dt>
            <dd>{project.director}</dd>
          </div>
          {project.production && (
            <div>
              <dt>Production</dt>
              <dd>{project.production}</dd>
            </div>
          )}
          <div>
            <dt>Poste</dt>
            <dd>{project.role ?? "Chef opérateur"}</dd>
          </div>
        </dl>
      </header>

      <div className={styles.cover}>
        <Image
          src={project.cover}
          alt={project.coverAlt ?? project.title}
          fill
          sizes="(min-width: 72rem) 72rem, 100vw"
          priority
          className={styles.image}
        />
      </div>

      {project.synopsis && <p className={styles.synopsis}>{project.synopsis}</p>}

      {project.videoUrl && (
        <p className={styles.video}>
          <a href={project.videoUrl} target="_blank" rel="noreferrer">
            Voir la vidéo →
          </a>
        </p>
      )}

      {project.awards && project.awards.length > 0 && (
        <section className={styles.awards}>
          <h2>Sélections</h2>
          <ul>
            {project.awards.map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>
        </section>
      )}

      {project.stills && project.stills.length > 0 && (
        <ul className={styles.stills}>
          {project.stills.map((still) => (
            <li key={still.src} className={styles.still}>
              <Image
                src={still.src}
                alt={still.alt ?? ""}
                fill
                sizes="(min-width: 40em) 50vw, 100vw"
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
