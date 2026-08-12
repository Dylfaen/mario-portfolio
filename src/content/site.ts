/**
 * Contenu global du site.
 * Tout le texte éditable se trouve dans ce dossier (`src/content`).
 * Modifie ce fichier, enregistre, et le site est à jour.
 */

export const site = {
  name: "Mario Le Sergent",
  role: "Chef opérateur",
  // Phrase d'accroche affichée sur la page d'accueil
  tagline: "Directeur de la photographie — fiction, documentaire et publicité.",
  // Utilisé pour les balises <title> / SEO
  description:
    "Portfolio de Mario Le Sergent, chef opérateur basé à Paris. Fiction, documentaire, clip et publicité.",
  location: "Paris, France",
  email: "contact@mariolesergent.fr",
  phone: "+33 6 00 00 00 00",
  // Mets ton vrai domaine ici (utilisé pour le sitemap et les métadonnées)
  url: "https://mariolesergent.fr",
  // Place le PDF dans /public et indique son chemin ici (ou mets null)
  cvUrl: "/cv-mario-le-sergent.pdf",
  // Agent / production (optionnel — mets null pour masquer)
  agent: null as { name: string; email: string; phone?: string } | null,
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "IMDb", href: "https://www.imdb.com/" },
  ],
  // Biographie : un élément du tableau = un paragraphe
  bio: [
    "Mario Le Sergent est chef opérateur. Il travaille entre la fiction, le documentaire et la publicité, avec une attention particulière portée à la lumière naturelle et au cadre en mouvement.",
    "Formé à l'image argentique, il collabore aujourd'hui avec des réalisateurs et réalisatrices en France et à l'étranger.",
  ],
  // Petites lignes de « faits » affichées sur la page À propos
  facts: [
    { label: "Basé à", value: "Paris — disponible en déplacement" },
    { label: "Langues", value: "Français, Anglais" },
    { label: "Adhérent", value: "AFC (associé)" },
  ],
} as const;

export const nav = [
  { label: "Travaux", href: "/travaux" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;
