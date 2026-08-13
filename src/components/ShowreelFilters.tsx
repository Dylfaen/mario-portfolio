"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { homeShowreel, showreelTaxonomy, slugify } from "@/content/projects";
import { useViewMode, withView } from "./ProjectsView";
import styles from "./ShowreelFilters.module.css";

function Dropdown({
  name,
  value,
  children,
}: {
  /** Announced to screen readers, since only the value is drawn. */
  name: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <details className={styles.dropdown}>
      <summary className={styles.trigger} aria-label={name}>
        {value}
        <ChevronDown className={styles.chevron} size="1em" aria-hidden="true" />
      </summary>
      <ul className={styles.panel}>{children}</ul>
    </details>
  );
}

function Option({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`${styles.option} ${active ? styles.active : ""}`}
        aria-current={active ? "page" : undefined}
      >
        {children}
      </Link>
    </li>
  );
}

export default function ShowreelFilters({
  /** Slugs of the page being viewed; both absent on `/`. */
  category,
  subcategory,
}: {
  category?: string;
  subcategory?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { gallery } = useViewMode();

  // <details> stays open on its own: close it when focus or a click lands
  // outside it, and on Escape.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /** Closes every open panel except the one holding `keep`. */
    const closeAll = (keep?: Node | null) => {
      root.querySelectorAll("details[open]").forEach((element) => {
        if (keep && element.contains(keep)) return;
        element.removeAttribute("open");
      });
    };

    const onPointerDown = (event: PointerEvent) =>
      closeAll(event.target as Node);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    // Tabbing away, or focus going nowhere at all, closes the panel too.
    const onFocusOut = (event: FocusEvent) =>
      closeAll(event.relatedTarget as Node | null);

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    root.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const taxonomy = showreelTaxonomy();
  if (taxonomy.length === 0) return null;

  // Pages pass what they play, `/` included, so no default to resolve here.
  const activeCategory = slugify(category ?? "");
  const activeSubcategory = slugify(subcategory ?? "");
  const current = taxonomy.find((entry) => entry.slug === activeCategory);

  // "Tout" is `/` only when nothing narrows the home page down; otherwise the
  // everything-showreel lives at its own route.
  const allPath =
    !homeShowreel.category && !homeShowreel.subcategory ? "/" : "/tout";

  // Changing the filter keeps you in the view you are already in.
  const href = (path: string) => withView(path, gallery);

  const activeSubLabel = current?.subcategories.find(
    (sub) => sub.slug === activeSubcategory,
  )?.label;

  return (
    <nav ref={rootRef} className={styles.filters} aria-label="Filtrer les projets">
      <Dropdown name="Catégorie" value={current?.label ?? "Tout"}>
        <Option href={href(allPath)} active={!activeCategory}>
          Tout
        </Option>
        {taxonomy.map((entry) => (
          <Option
            key={entry.slug}
            href={href(`/${entry.slug}`)}
            active={entry.slug === activeCategory}
          >
            {entry.label}
          </Option>
        ))}
      </Dropdown>

      {/* No subcategory picker: subcategories are reached from the tag under a
          film's title. Once one is on, it shows here as a pill you can drop. */}
      {current && activeSubLabel && (
        <Link
          href={href(`/${current.slug}`)}
          className={styles.activeTag}
          aria-label={`Retirer le filtre ${activeSubLabel}`}
        >
          {activeSubLabel}
          <X className={styles.tagIcon} size="1em" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
