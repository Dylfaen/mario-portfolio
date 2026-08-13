# Mario Le Sergent — portfolio

Site vitrine de Mario Le Sergent, chef opérateur.
Next.js 16 (App Router) + TypeScript + CSS Modules. Aucune base de données, aucun CMS :
tout le contenu est dans des fichiers TypeScript.

## Démarrer

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # vérifie que tout compile avant de déployer
```

## Modifier le contenu

| Quoi | Où |
| --- | --- |
| Nom, métier, ville, Instagram | [`src/content/site.ts`](src/content/site.ts) |
| Projets (titres, réalisation, production, vidéos, catégories) | [`src/content/projects.ts`](src/content/projects.ts) |
| Couleurs, typo, espacements | `:root` dans [`src/app/globals.css`](src/app/globals.css) |

### Ajouter un projet

1. Copier une entrée du tableau `projects` dans `src/content/projects.ts`.
2. Donner un `slug` unique (il devient l'URL : `/film/mon-slug`).
3. Déposer l'image dans `public/images/` et la référencer par `"/images/nom.jpg"`.
4. `featured: true` pour qu'il apparaisse dans les showreels et la galerie.

Les pages catégorie, la galerie, la page film et le sitemap se mettent à jour
tout seuls.

### Les deux vues

Chaque URL existe en deux présentations, pilotées par le paramètre `?vue=` :

| URL | Ce qui est affiché |
| --- | --- |
| `/` | plein écran, ce que définit `homeShowreel` |
| `/?vue=galerie` | les mêmes projets en cartes |
| `/pub` · `/pub/mode` | plein écran, filtré |
| `/tout` | plein écran, tous les projets `featured` |
| `/film/mon-slug` | un seul film en plein écran, avec retour |

Le bouton en bas à droite bascule entre les deux : il ne recharge rien, il
réécrit seulement la query string.

### Catégories

`category` et `subcategory` sont du texte libre — aucune liste à tenir à jour.
La comparaison passe par `slugify`, donc « Pub », " pub " et « PUB » sont la même
catégorie, accessible à `/pub`. Les accents et les espaces deviennent des tirets
(`"Beauté & Mode"` → `/beaute-mode`).

Seuls les projets `featured: true` avec une `video` sont affichés, dans les
showreels comme dans la galerie. Une page catégorie n'est générée que si au moins
un projet correspond ; sinon l'URL renvoie une 404.

Pour changer ce que montre `/`, éditer une seule ligne dans `projects.ts` :

```ts
export const homeShowreel: ShowreelFilter = {};                        // tout
export const homeShowreel: ShowreelFilter = { category: "pub" };       // une catégorie
export const homeShowreel: ShowreelFilter = { category: "pub", subcategory: "mode" };
```

### Vidéos

```ts
// Vimeo : les chiffres de l'URL vimeo.com/90509568
video: { provider: "vimeo", id: "90509568" },
// + `hash: "abc123"` si la vidéo est « non répertoriée »

// Adobe Portfolio : l'identifiant de l'URL /player/ccv/<id>/embed
video: { provider: "adobe", id: "LZ-iAYBzxL3" },
```

[`VideoEmbed`](src/components/VideoEmbed.tsx) gère les deux hébergeurs et les deux
variantes (plein écran muet / lecteur avec contrôles). Sans `video`, le projet
n'apparaît nulle part.

### Images

- Format conseillé : JPEG/WebP, 16/9, ~1600 px de large, compressé.
- Utilisées par les cartes de la galerie (`cover`, `coverAlt`).
- `public/images/placeholder.svg` sert de bouchon en attendant les vraies images.

## Structure

```
src/
├─ app/
│  ├─ layout.tsx                     métadonnées, police, viewport
│  ├─ page.tsx                       accueil (showreel ou galerie)
│  ├─ tout/page.tsx                  tous les projets featured
│  ├─ [category]/page.tsx            /pub
│  ├─ [category]/[subcategory]/…     /pub/mode
│  ├─ film/[slug]/page.tsx           un film en plein écran
│  ├─ globals.css                    tokens de design + base mobile first
│  ├─ sitemap.ts · robots.ts         SEO
│  └─ not-found.tsx
├─ components/
│  ├─ ProjectsView.tsx               choisit la vue, garde le switch monté
│  ├─ Showreel.tsx                   plein écran, scroll/swipe, flèche
│  ├─ Gallery.tsx                    grille de cartes
│  ├─ ShowreelFilters.tsx            les deux menus déroulants
│  ├─ ViewSwitch.tsx                 bascule plein écran / galerie
│  ├─ VideoEmbed.tsx                 Vimeo + Adobe Portfolio
│  ├─ SiteHeader.tsx                 nom, métier, ville, Instagram
└─ content/                          site.ts, projects.ts  ← le contenu éditable
```

## CSS

Mobile first : le style de base cible le téléphone, les `@media (min-width: …)`
n'ajoutent que ce qui change au-dessus. Points de rupture utilisés : `40em` (~640 px),
`48em` (~768 px) et `64em` (~1024 px). Les variables de couleur, d'espacement et la
taille des boutons ronds (`--control-size`) sont dans `:root`.

## Déploiement

Prévu pour Vercel : importer le dépôt, aucune variable d'environnement nécessaire.
Penser à mettre le vrai domaine dans `site.url` (`src/content/site.ts`) pour les
métadonnées et le sitemap.
