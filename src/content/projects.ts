/**
 * Filmography.
 *
 * To add a project: copy a block and change the values.
 * - `slug` must be unique (it becomes the URL: /film/my-slug)
 * - images live in /public/images/ and are referenced as "/images/xxx.jpg"
 * - `featured: true` is required to appear in a showreel or the gallery
 *
 * Imported from mariolesergent.com — years were not published there, so they
 * are left blank; fill them in as you go.
 */

/**
 * Categories and subcategories are free text — write anything on a project,
 * there is no list to keep in sync. Everything is compared through `slugify`,
 * so " Ad ", "pub" and "AD" are one and the same category, reachable at /pub.
 */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // drop accents: "Beauté" → "beaute"
    .replace(/[^a-z0-9]+/g, "-") // spaces and punctuation become separators
    .replace(/^-+|-+$/g, "");
}

/**
 * Where the film is hosted.
 * - `vimeo`: the digits in vimeo.com/90509568, plus `hash` when unlisted
 * - `adobe`: an Adobe Portfolio video, the id in the /player/ccv/<id>/embed URL
 */
export type VideoSource =
  | { provider: "vimeo"; id: string; hash?: string }
  | { provider: "adobe"; id: string };

export type Project = {
  slug: string;
  title: string;
  /** Left out when unknown */
  year?: number;
  director: string;
  production?: string;
  /** Showreel it belongs to, free text: "pub", "Fiction", "Clip"… → /pub */
  category?: string;
  /** Narrows it further: "mode" → /pub/mode */
  subcategory?: string;
  /** Cover image (16:9 recommended, ~1600px wide) */
  cover: string;
  /** Alt text for the cover image (accessibility) */
  coverAlt?: string;
  /**
   * Average colour of the cover, lighting the gallery background on hover.
   * Regenerate after changing an image:
   *   ffmpeg -v error -i public/images/<slug>.jpg -vf scale=1:1 \
   *     -sws_flags area -f rawvideo -pix_fmt rgb24 - | xxd -p
   */
  glow?: string;
  /**
   * When set, it replaces the image: fullscreen on the home page,
   * player on the project page.
   */
  video?: VideoSource;
  featured?: boolean;
};

// Order below is the order of the old home page, which is also the order the
// showreel plays them in.
export const projects: Project[] = [
  {
    slug: "campagne-casablanca-ss25",
    title: "Campagne Casablanca SS25",
    director: "Andrée Dubois",
    production: "Vanta",
    category: "pub",
    subcategory: "mode",
    cover: "/images/campagne-casablanca-ss25.jpg",
    glow: "#a59f95",
    video: { provider: "adobe", id: "LZ-iAYBzxL3" },
    featured: true,
  },
  {
    slug: "campagne-undiz-ss25",
    title: "Campagne UNDIZ SS25",
    director: "Andrée Dubois",
    production: "Royal Cheese",
    category: "pub",
    subcategory: "auto",
    cover: "/images/campagne-undiz-ss25.jpg",
    glow: "#897b6c",
    video: { provider: "adobe", id: "Tt9r76A5tsA" },
    featured: true,
  },
  {
    // The old site listed Casablanca SS25 twice, with two different films.
    slug: "campagne-casablanca-ss25-2",
    title: "Campagne Casablanca SS25",
    director: "Andrée Dubois",
    production: "Vanta",
    category: "pub",
    subcategory: "mode",
    cover: "/images/campagne-casablanca-ss25-2.jpg",
    glow: "#184f44",
    video: { provider: "adobe", id: "2x6RhMo-B_H" },
    featured: true,
  },
  {
    slug: "redshift-mosais-fashion-film",
    title: "REDSHIFT — Mosais Fashion Film",
    director: "Ben Fourmi",
    production: "Helmut Production",
    cover: "/images/redshift-mosais-fashion-film.jpg",
    glow: "#5a200f",
    video: { provider: "adobe", id: "28AEVcQV5Et" },
    category: "pub",
    subcategory: "mode",
    featured: true,
  },
  {
    slug: "conversations",
    title: "Conversations",
    director: "Marion Renerre",
    production: "Hurrah.studio",
    cover: "/images/conversations.jpg",
    glow: "#69413a",
    category: "documentaire",
    subcategory: "musique",
    video: { provider: "adobe", id: "Dj9Lq8cnNiU" },
    featured: true,
  },
  {
    slug: "le-rayon-vert",
    title: "Le Rayon vert",
    director: "Marion Renerre",
    production: "Cokau Lab",
    category: "fiction",
    subcategory: "scifi",
    cover: "/images/le-rayon-vert.jpg",
    glow: "#b8bebe",
    video: { provider: "adobe", id: "CGSS8N4fCz3" },
    featured: true,
  },
  {
    slug: "edito-gheir-cartier",
    title: "Edito gheir x CARTIER",
    director: "Angie Kremer",
    production: "Angie Kremer Studio",
    cover: "/images/edito-gheir-cartier.jpg",
    glow: "#57210d",
    video: { provider: "adobe", id: "CIX2WVyYsYp" },
    category: "pub",
    subcategory: "mode",
    featured: true,
  },
  {
    slug: "g-shock-cedric-doumbe",
    title: "G-SHOCK x Cédric Doumbé",
    director: "Yannis Labdaoui",
    production: "Téléphone Maison Films",
    cover: "/images/g-shock-cedric-doumbe.jpg",
    glow: "#161b1f",
    video: { provider: "vimeo", id: "866567198" },
    category: "pub",
    subcategory: "mode",
    featured: true,
  },
  {
    slug: "g-shock-prince-waly-playground-ep07",
    title: "G-SHOCK x Prince Waly — playground ep07",
    director: "Yannis Labdaoui",
    production: "AES Films",
    cover: "/images/g-shock-prince-waly-playground-ep07.jpg",
    glow: "#4c120a",
    video: { provider: "vimeo", id: "814314963", hash: "a5e4cb3256" },
    category: "pub",
    subcategory: "mode",
    featured: true,
  },
];

/**
 * What `/` plays. Case and stray spaces do not matter.
 * - `{}` — every featured project
 * - `{ category: "pub" }` — the featured projects of that category
 * - `{ category: "pub", subcategory: "mode" }` — narrowed further
 * - `{ subcategory: "mode" }` — that subcategory, whatever the category
 */
export const homeShowreel: ShowreelFilter = {"category": "pub"};

/** A project that is guaranteed to have a video, for the fullscreen showreel. */
export type ShowreelProject = Project & { video: VideoSource };

export type ShowreelFilter = { category?: string; subcategory?: string };

/** True when both sides slugify to the same thing, or nothing is asked for. */
function matches(value: string | undefined, wanted: string | undefined) {
  if (wanted === undefined || slugify(wanted) === "") return true;
  return value !== undefined && slugify(value) === slugify(wanted);
}

/**
 * The projects a showreel plays, in the order of the list above.
 * Always featured, always with a video — anything else is filtered out,
 * on `/` as much as on the category pages.
 */
export function selectShowreel({
  category,
  subcategory,
}: ShowreelFilter = {}): ShowreelProject[] {
  return projects.filter(
    (project): project is ShowreelProject =>
      Boolean(project.featured && project.video) &&
      matches(project.category, category) &&
      matches(project.subcategory, subcategory),
  );
}

/**
 * Path of the showreel a project belongs to, for the tag under its title.
 * Null when it is not filed under both a category and a subcategory.
 */
export function projectFilterPath(project: Project): string | null {
  const category = slugify(project.category ?? "");
  const subcategory = slugify(project.subcategory ?? "");
  return category && subcategory ? `/${category}/${subcategory}` : null;
}

/** Every project with a video, featured or not, for /film/[slug]. */
export const playableProjects = projects.filter(
  (project): project is ShowreelProject => Boolean(project.video),
);

/** One playable project by slug. */
export function getPlayableProject(slug: string): ShowreelProject | undefined {
  return playableProjects.find((project) => project.slug === slug);
}

/** Category slugs with at least one playable project, for /[category]. */
export function showreelCategories(): string[] {
  const slugs = selectShowreel()
    .map((project) => slugify(project.category ?? ""))
    .filter(Boolean);

  return [...new Set(slugs)];
}

export type ShowreelCategory = {
  /** URL segment */
  slug: string;
  /** Label as typed on the project, for display */
  label: string;
  subcategories: { slug: string; label: string }[];
};

/**
 * Everything the filter control offers: only categories that actually have a
 * playable project, so a filter can never lead to an empty showreel.
 */
export function showreelTaxonomy(): ShowreelCategory[] {
  const categories = new Map<
    string,
    ShowreelCategory & { subs: Map<string, { slug: string; label: string }> }
  >();

  for (const project of selectShowreel()) {
    const categorySlug = slugify(project.category ?? "");
    if (!categorySlug) continue;

    let entry = categories.get(categorySlug);
    if (!entry) {
      entry = {
        slug: categorySlug,
        label: (project.category ?? "").trim(),
        subcategories: [],
        subs: new Map(),
      };
      categories.set(categorySlug, entry);
    }

    const subcategorySlug = slugify(project.subcategory ?? "");
    if (subcategorySlug && !entry.subs.has(subcategorySlug)) {
      entry.subs.set(subcategorySlug, {
        slug: subcategorySlug,
        label: (project.subcategory ?? "").trim(),
      });
    }
  }

  return [...categories.values()].map(({ slug, label, subs }) => ({
    slug,
    label,
    subcategories: [...subs.values()],
  }));
}

/** Category/subcategory slug pairs with at least one playable project. */
export function showreelSubcategories(): {
  category: string;
  subcategory: string;
}[] {
  const pairs = selectShowreel()
    .map((project) => ({
      category: slugify(project.category ?? ""),
      subcategory: slugify(project.subcategory ?? ""),
    }))
    .filter((pair) => pair.category && pair.subcategory);

  return [
    ...new Map(pairs.map((p) => [`${p.category}/${p.subcategory}`, p])).values(),
  ];
}
