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
| Nom, métier, description, Instagram | [`src/content/site.ts`](src/content/site.ts) |
| Projets (titres, réalisation, production, vidéos, catégories) | [`src/content/projects.ts`](src/content/projects.ts) |
| Images des projets | [`public/images/`](public/images/) |
| Couleurs, typo, espacements | `:root` dans [`src/app/globals.css`](src/app/globals.css) |

Pour installer le projet et publier une modification, voir [GUIDE-PRISE-EN-MAIN.md](GUIDE-PRISE-EN-MAIN.md).

### Anatomie d'un projet

Chaque projet est un bloc `{ … }` dans la liste `projects` de `src/content/projects.ts` :

```ts
{
  slug: "g-shock-cedric-doumbe",
  title: "G-SHOCK x Cédric Doumbé",
  year: 2024,
  director: "Yannis Labdaoui",
  production: "Téléphone Maison Films",
  category: "ads",
  subcategory: "fashion",
  cover: "/images/g-shock-cedric-doumbe.jpg",
  coverAlt: "Cédric Doumbé sur un ring, éclairé en contre-jour",
  glow: "#171b1e",
  video: { provider: "vimeo", id: "866567198", hash: "0352b2dbc0" },
  featured: true,
},
```

| Champ | Obligatoire | Rôle | Exemple |
| --- | --- | --- | --- |
| `slug` | oui | Identifiant unique, devient l'URL `/film/<slug>`. Minuscules, chiffres et tirets uniquement. | `"g-shock-cedric-doumbe"` |
| `title` | oui | Titre affiché. Accents, majuscules et ponctuation autorisés. | `"G-SHOCK x Cédric Doumbé"` |
| `year` | non | Année. **Un nombre, sans guillemets.** Supprimer la ligne si inconnue. | `2024` |
| `director` | oui | Réalisateur·rice. | `"Yannis Labdaoui"` |
| `production` | non | Société de production. | `"Téléphone Maison Films"` |
| `category` | non | Showreel du projet, texte libre (voir [Catégories](#catégories)). Sans catégorie, le projet n'apparaît que sur `/` (si `homeShowreel` vaut `{}`) et `/all`. | `"ads"` |
| `subcategory` | non | Précise la catégorie. | `"fashion"` |
| `cover` | oui | Image de la carte dans la galerie (voir [Images](#images)). Commence toujours par `/images/`. | `"/images/g-shock-cedric-doumbe.jpg"` |
| `coverAlt` | non | Description de l'image pour les malvoyants et le référencement. | `"Cédric Doumbé sur un ring"` |
| `glow` | non | Couleur du halo derrière la galerie au survol (voir [Images](#images)). | `"#171b1e"` |
| `video` | en pratique oui | Le film (voir [Vidéos](#vidéos)). **Sans vidéo, le projet n'apparaît nulle part.** | `{ provider: "vimeo", id: "866567198" }` |
| `featured` | en pratique oui | `true` pour l'afficher dans les showreels et la galerie. Avec `false`, le film reste accessible par son lien direct `/film/<slug>` mais n'est plus listé. | `true` |

Règles de syntaxe :

- Le texte va **entre guillemets droits** `"…"`. Pour un guillemet *dans* le texte, utiliser `’` ou `« »` : `"L’Été"`, pas `"L'Été"` mal fermé.
- Chaque ligne se termine par une **virgule**, et chaque bloc aussi (`},`).
- `year`, `true` et `false` s'écrivent **sans** guillemets.
- Les lignes commençant par `//` sont des commentaires, ignorés par le site.
- VS Code souligne les erreurs en rouge. `npm run build` les liste toutes.

### Ajouter un projet

Exemple : ajouter le clip « Nuit Blanche » de Léa Martin, produit par Pastel Films, hébergé sur Vimeo à l'adresse `vimeo.com/912345678`.

1. **Préparer l'image** : une capture du film en 16/9, JPEG, environ 1600 px de large et moins de 300 Ko (par exemple avec <https://squoosh.app>). La nommer comme le slug, `nuit-blanche.jpg`, et la déposer dans `public/images/`.
2. **Copier un bloc existant** dans `src/content/projects.ts`, de `{` à `},` inclus, et le coller à l'endroit voulu. **L'ordre de la liste est l'ordre de défilement des showreels et de la galerie** : pour le mettre en premier, le coller juste après `export const projects: Project[] = [`.
3. **Remplacer les valeurs** :
   ```ts
   {
     slug: "nuit-blanche",
     title: "Nuit Blanche",
     year: 2026,
     director: "Léa Martin",
     production: "Pastel Films",
     category: "music video",
     cover: "/images/nuit-blanche.jpg",
     coverAlt: "Une chanteuse seule dans une rue déserte, la nuit",
     video: { provider: "vimeo", id: "912345678" },
     featured: true,
   },
   ```
   Ici, pas de `subcategory` ni de `glow` : les lignes sont simplement supprimées.
4. **Vérifier** avec `npm run dev` :
   - <http://localhost:3000/film/nuit-blanche> : la page du film ;
   - <http://localhost:3000/music-video> : le showreel de la catégorie, créé automatiquement ;
   - <http://localhost:3000/?view=gallery> : la carte dans la galerie.
5. `npm run build`, puis commit et push.

Les pages catégorie, la galerie, les menus de filtre, la page du film et le sitemap se mettent à jour tout seuls.

### Modifier un projet

Retrouver le projet : `Ctrl+F` (🍎 `Cmd+F`) dans `projects.ts`, taper une partie du titre. Puis :

| Je veux… | Je fais… |
| --- | --- |
| Corriger un titre, un nom, une prod | Modifier le texte entre guillemets. |
| Ajouter l'année | Ajouter une ligne `year: 2023,` sous `title`. |
| Remplacer la vidéo | Changer l'`id` (et le `hash`) dans `video`. Voir [Vidéos](#vidéos). |
| Remplacer l'image | Déposer la nouvelle image dans `public/images/` **sous le même nom** (en écrasant l'ancienne) ; ou sous un nouveau nom, et mettre `cover` à jour. Supprimer ou mettre à jour `glow`. |
| Changer de catégorie | Modifier `category` / `subcategory`. Si plus aucun projet n'utilise l'ancienne catégorie, sa page disparaît (404). |
| Changer l'ordre | Couper le bloc entier (`Ctrl+X`), le coller ailleurs dans la liste (`Ctrl+V`). Astuce : `Alt+↑` / `Alt+↓` (🍎 `Option+↑/↓`) déplace les lignes sélectionnées. |
| Masquer le projet | `featured: false`. Le lien direct `/film/<slug>` continue de marcher. |
| Supprimer le projet | Supprimer le bloc entier, de `{` à `},`, et son image dans `public/images/`. |
| Changer le `slug` | Possible, mais l'ancienne adresse `/film/<ancien-slug>` renverra une 404 : à éviter si le lien a déjà été partagé. |

Exemple : la campagne UNDIZ est classée par erreur en `cars` au lieu de `lingerie`, et on connaît l'année.

```diff
   {
     slug: "campagne-undiz-ss25",
     title: "Campagne UNDIZ SS25",
+    year: 2025,
     director: "Andrée Dubois",
     production: "Royal Cheese",
     category: "ads",
-    subcategory: "cars",
+    subcategory: "lingerie",
     cover: "/images/campagne-undiz-ss25.jpg",
```

### Catégories

`category` et `subcategory` sont du texte libre : aucune liste à tenir à jour. Pour créer une catégorie, il suffit de l'écrire sur un projet.

La comparaison passe par `slugify` : « Ads », " ads " et « ADS » sont la même catégorie, accessible à `/ads`. Les accents et les espaces deviennent des tirets :

| Écrit sur le projet | URL |
| --- | --- |
| `category: "ads"` | `/ads` |
| `category: "Music Video"` | `/music-video` |
| `category: "ads", subcategory: "Beauté & Mode"` | `/ads/beaute-mode` |

**Attention aux fautes de frappe** : `"fashion"` et `"fahsion"` donnent deux sous-catégories différentes. Le libellé affiché dans les menus est celui du premier projet de la liste qui l'utilise : écrire la catégorie partout de la même façon.

Seuls les projets `featured: true` avec une `video` sont affichés, dans les showreels comme dans la galerie. Une page catégorie n'est générée que si au moins un projet correspond ; sinon l'URL renvoie une 404.

### Page d'accueil

Ce que joue `/` se règle sur une seule ligne, vers la fin de `projects.ts` :

```ts
export const homeShowreel: ShowreelFilter = {};                                  // tous les projets
export const homeShowreel: ShowreelFilter = { category: "ads" };                 // une catégorie (réglage actuel)
export const homeShowreel: ShowreelFilter = { category: "ads", subcategory: "fashion" };
export const homeShowreel: ShowreelFilter = { subcategory: "fashion" };          // une sous-catégorie, toutes catégories
```

Garder **une seule** de ces lignes.

### Les deux vues

Chaque URL existe en deux présentations, pilotées par le paramètre `?view=` :

| URL | Ce qui est affiché |
| --- | --- |
| `/` | plein écran, ce que définit `homeShowreel` |
| `/?view=gallery` | les mêmes projets en cartes |
| `/ads` · `/ads/fashion` | plein écran, filtré |
| `/all` | plein écran, tous les projets `featured` |
| `/film/mon-slug` | un seul film en plein écran, avec retour |

Le bouton en bas à droite bascule entre les deux : il ne recharge rien, il réécrit seulement la query string.

### Vidéos

**Vimeo** (recommandé pour les nouveaux projets) :

| Adresse de la vidéo | À écrire |
| --- | --- |
| `https://vimeo.com/912345678` (publique) | `video: { provider: "vimeo", id: "912345678" },` |
| `https://vimeo.com/866567198/0352b2dbc0` (non répertoriée) | `video: { provider: "vimeo", id: "866567198", hash: "0352b2dbc0" },` |

Pour une vidéo non répertoriée, le `hash` est obligatoire, sinon le lecteur affiche une erreur. Côté Vimeo, la vidéo doit autoriser l'intégration (*Embed* → « Anywhere », ou au moins le domaine `mariolesergent.com`).

**Adobe Portfolio** (anciens projets) : l'identifiant se trouve dans le code d'intégration, dans l'adresse `…/player/ccv/<id>/embed` :

```ts
video: { provider: "adobe", id: "LZ-iAYBzxL3" },
```

[`VideoEmbed`](src/components/VideoEmbed.tsx) gère les deux hébergeurs et les deux variantes (plein écran muet / lecteur avec contrôles).

### Images

- Format : JPEG (ou WebP), 16/9, ~1600 px de large, compressé (< 300 Ko). Une image d'un autre format est recadrée au centre.
- Nom : en minuscules, sans espaces ni accents, idéalement identique au slug (`nuit-blanche.jpg`). **Le nom dans `cover` doit correspondre exactement**, majuscules et extension comprises (`.jpg` ≠ `.JPG` ≠ `.jpeg`) : sinon l'image s'affiche en local sur Windows/Mac, mais pas en ligne.
- `public/images/placeholder.svg` sert de bouchon en attendant la vraie image : `cover: "/images/placeholder.svg"`.
- `glow` : la couleur moyenne de l'image, en hexadécimal (`"#5a200f"`). Facultatif. Pour l'obtenir sans outil technique, ouvrir l'image dans un sélecteur de couleur en ligne (par exemple <https://imagecolorpicker.com>) et prendre la teinte dominante, ou supprimer la ligne. Avec ffmpeg :
  ```bash
  ffmpeg -v error -i public/images/<slug>.jpg -vf scale=1:1 \
    -sws_flags area -f rawvideo -pix_fmt rgb24 - | xxd -p
  ```

## Structure

```
src/
├─ app/
│  ├─ layout.tsx                     métadonnées, police, viewport
│  ├─ page.tsx                       accueil (showreel ou galerie)
│  ├─ all/page.tsx                   tous les projets featured
│  ├─ [category]/page.tsx            /ads
│  ├─ [category]/[subcategory]/…     /ads/fashion
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
