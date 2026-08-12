import type { Metadata } from "next";
import { site } from "@/content/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${site.name}, ${site.role.toLowerCase()}.`,
};

export default function ContactPage() {
  return (
    <section className="container section">
      <h1 className={styles.title}>Contact</h1>

      <ul className={styles.list}>
        <li>
          <span className={styles.label}>E-mail</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <span className={styles.label}>Téléphone</span>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
        </li>
        <li>
          <span className={styles.label}>Basé à</span>
          <span>{site.location}</span>
        </li>
        {site.agent && (
          <li>
            <span className={styles.label}>Agent</span>
            <span>
              {site.agent.name} — <a href={`mailto:${site.agent.email}`}>{site.agent.email}</a>
            </span>
          </li>
        )}
      </ul>

      <ul className={styles.socials}>
        {site.socials.map((social) => (
          <li key={social.href}>
            <a href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
