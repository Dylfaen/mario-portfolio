/**
 * Filmographie.
 *
 * Pour ajouter un projet : copie un bloc, change les valeurs.
 * - `slug` doit être unique (il devient l'URL : /travaux/mon-slug)
 * - les images vont dans /public/images/ et se réfèrent en "/images/xxx.jpg"
 * - `featured: true` fait remonter le projet sur la page d'accueil
 */

export type ProjectFormat =
  | "Long métrage"
  | "Court métrage"
  | "Série"
  | "Documentaire"
  | "Clip"
  | "Publicité";

export type Project = {
  slug: string;
  title: string;
  year: number;
  format: ProjectFormat;
  director: string;
  production?: string;
  /** Rôle sur le projet, si différent de « Chef opérateur » */
  role?: string;
  /** Résumé court, affiché sur la fiche projet */
  synopsis?: string;
  /** Image de couverture (16:9 conseillé, ~1600px de large) */
  cover: string;
  /** Texte alternatif de l'image de couverture (accessibilité) */
  coverAlt?: string;
  /** Photogrammes supplémentaires affichés sur la fiche projet */
  stills?: { src: string; alt?: string }[];
  /** Lien Vimeo / YouTube de la bande-annonce ou du film */
  videoUrl?: string;
  /** Sélections en festival, prix… */
  awards?: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "les-heures-bleues",
    title: "Les Heures bleues",
    year: 2025,
    format: "Long métrage",
    director: "Prénom Nom",
    production: "Nom de la production",
    synopsis:
      "Remplace ce texte par le synopsis du film. Deux ou trois phrases suffisent.",
    cover: "/images/placeholder.svg",
    coverAlt: "Photogramme du film Les Heures bleues",
    stills: [
      { src: "/images/placeholder.svg", alt: "Photogramme 1" },
      { src: "/images/placeholder.svg", alt: "Photogramme 2" },
    ],
    videoUrl: "https://vimeo.com/",
    awards: ["Sélection officielle — Festival X 2025"],
    featured: true,
  },
  {
    slug: "nuit-blanche",
    title: "Nuit blanche",
    year: 2024,
    format: "Court métrage",
    director: "Prénom Nom",
    cover: "/images/placeholder.svg",
    featured: true,
  },
  {
    slug: "campagne-marque",
    title: "Campagne — Marque",
    year: 2024,
    format: "Publicité",
    director: "Prénom Nom",
    production: "Agence / Boîte de prod",
    cover: "/images/placeholder.svg",
  },
];

/** Projets mis en avant sur la page d'accueil. */
export const featuredProjects = projects.filter((p) => p.featured);

/** Filmographie triée du plus récent au plus ancien. */
export const projectsByYear = [...projects].sort((a, b) => b.year - a.year);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
