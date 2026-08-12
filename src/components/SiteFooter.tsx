import { site } from "@/content/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.contact}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span aria-hidden="true"> · </span>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
        </p>

        <ul className={styles.socials}>
          {site.socials.map((social) => (
            <li key={social.href}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.legal}>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
