/**
 * Site-wide content.
 * All editable copy lives in this folder (`src/content`).
 * Edit this file, save, and the site is up to date.
 */

// Linked from the header.
const instagram = {
  handle: "@mariolesergent",
  url: "https://instagram.com/mariolesergent",
} as const;

export const site = {
  name: "Mario Le Sergent",
  instagram,
  role: "Director of Photography",
  // Used for <title> tags / SEO
  description:
    "Portfolio of Mario Le Sergent, director of photography based in Paris. Fiction, documentary, music video and commercials.",
  // Put the real domain here (used by the sitemap and the metadata)
  url: "https://mariolesergent.com",
} as const;
