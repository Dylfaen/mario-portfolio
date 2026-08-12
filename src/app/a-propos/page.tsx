import type { Metadata } from "next";
import { site } from "@/content/site";
import styles from "./a-propos.module.css";

export const metadata: Metadata = {
  title: "À propos",
  description: site.bio[0],
};

export default function AProposPage() {
  return (
    <section className="container section">
      <h1 className={styles.title}>À propos</h1>

      <div className={styles.bio}>
        {site.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <dl className={styles.facts}>
        {site.facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      {site.cvUrl && (
        <p className={styles.cv}>
          <a href={site.cvUrl} target="_blank" rel="noreferrer">
            Télécharger le CV (PDF) →
          </a>
        </p>
      )}
    </section>
  );
}
