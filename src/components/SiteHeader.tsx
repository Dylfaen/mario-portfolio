import { MapPin } from "lucide-react";
// lucide dropped brand icons in v1, so the Instagram mark comes from
// react-icons (Simple Icons set).
import { SiInstagram } from "react-icons/si";
import { site } from "@/content/site";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({
  /** Shrinks to the name alone — used from the second video onwards. */
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <header className={`${styles.header} ${compact ? styles.compact : ""}`}>
      <span className={styles.name}>{site.name}</span>

      {/* Collapsed rather than unmounted, so it can animate both ways and
          expand again on hover. Hidden from screen readers while collapsed
          via `visibility` in the CSS, which keeps the two states in sync. */}
      <div className={styles.details}>
        <div className={styles.detailsInner}>
          <span className={styles.role}>{site.role}</span>
          <span className={styles.location}>
            {/* Decorative icon: the adjacent text is enough for screen readers. */}
            <MapPin className={styles.pin} size="1em" aria-hidden="true" />
            {site.location}
          </span>
          <a
            className={styles.instagram}
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
          >
            <SiInstagram className={styles.pin} size="1em" aria-hidden="true" />
            {site.instagram.handle}
          </a>
        </div>
      </div>
    </header>
  );
}
