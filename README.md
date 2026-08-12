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
| Nom, e-mail, téléphone, réseaux, bio, CV | [`src/content/site.ts`](src/content/site.ts) |
| Filmographie (projets, années, réalisateurs…) | [`src/content/projects.ts`](src/content/projects.ts) |
| Menu de navigation | `nav` dans [`src/content/site.ts`](src/content/site.ts) |
| Couleurs, typo, espacements | `:root` dans [`src/app/globals.css`](src/app/globals.css) |

### Ajouter un projet

1. Copier une entrée du tableau `projects` dans `src/content/projects.ts`.
2. Donner un `slug` unique (il devient l'URL : `/travaux/mon-slug`).
3. Déposer les images dans `public/images/` et les référencer par `"/images/nom.jpg"`.
4. `featured: true` fait apparaître le projet sur la page d'accueil.

La fiche projet, la page « Travaux » et le sitemap se mettent à jour tout seuls.

### Images

- Format conseillé : JPEG/WebP, 16/9, ~1600 px de large, compressé.
- `next/image` s'occupe du redimensionnement et du lazy loading.
- `public/images/placeholder.svg` sert de bouchon en attendant les vraies images.

## Structure

```
src/
├─ app/
│  ├─ layout.tsx              en-tête, pied de page, métadonnées, police
│  ├─ page.tsx                accueil (sélection de projets)
│  ├─ travaux/page.tsx        filmographie complète
│  ├─ travaux/[slug]/page.tsx fiche projet (générée statiquement)
│  ├─ a-propos/page.tsx
│  ├─ contact/page.tsx
│  ├─ globals.css             tokens de design + base mobile first
│  ├─ sitemap.ts / robots.ts  SEO
│  └─ not-found.tsx
├─ components/                SiteHeader, SiteFooter, ProjectCard (+ .module.css)
└─ content/                   site.ts, projects.ts  ← le contenu éditable
```

## CSS

Mobile first : le style de base cible le téléphone, les `@media (min-width: …)`
n'ajoutent que ce qui change au-dessus. Points de rupture utilisés : `40em` (~640 px)
et `64em` (~1024 px). Les variables de couleur/espacement sont dans `:root`.

## Déploiement

Prévu pour Vercel : importer le dépôt, aucune variable d'environnement nécessaire.
Penser à mettre le vrai domaine dans `site.url` (`src/content/site.ts`) pour les
métadonnées et le sitemap.
