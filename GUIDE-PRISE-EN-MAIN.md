# Reprendre la main sur mariolesergent.com

Ce guide t'accompagne de zéro jusqu'à ta première modification en ligne : installer les outils, récupérer le code du site, le lancer sur ton ordinateur, faire un changement et le publier.

Une fois tout installé (compte une heure la première fois), une modification se résume à : **modifier un fichier → vérifier en local → commit → push**. Vercel met le site à jour tout seul en une minute environ.

Quand les instructions diffèrent selon ton système, elles sont marquées 🪟 **Windows** ou 🍎 **Mac**.

---

## Sommaire

0. [Comment ça marche, en deux mots](#0-comment-ça-marche-en-deux-mots)
1. [Créer un compte GitHub](#1-créer-un-compte-github)
2. [Accéder au dépôt (avec César)](#2-accéder-au-dépôt-avec-césar)
3. [Installer les outils](#3-installer-les-outils)
4. [Télécharger le code sur ton ordinateur](#4-télécharger-le-code-sur-ton-ordinateur)
5. [Lancer le site en local](#5-lancer-le-site-en-local)
6. [Faire une modification et la publier](#6-faire-une-modification-et-la-publier)
7. [Exemples de modifications courantes](#7-exemples-de-modifications-courantes)
8. [En cas de problème](#8-en-cas-de-problème)
9. [Aide-mémoire](#9-aide-mémoire)

---

## 0. Comment ça marche, en deux mots

| Élément | Rôle |
| --- | --- |
| **GitHub** | Stocke le code du site et tout son historique. C'est la « source de vérité ». |
| **GitHub Desktop** | L'application (avec interface graphique) qui synchronise ton ordinateur avec GitHub. Elle remplace les commandes `git`. |
| **VS Code** | L'éditeur dans lequel tu modifies les fichiers. |
| **Node.js** | Fait tourner le site sur ton ordinateur pour que tu le voies avant de publier. |
| **Vercel** | Héberge le site (sur le compte de César). Dès que tu pousses (*push*) une modification sur GitHub, Vercel reconstruit le site et le met en ligne. Tu n'as rien à y faire. |

Le site n'a ni base de données ni back-office : **tout le contenu (textes, projets, vidéos) se trouve dans deux fichiers**, `src/content/site.ts` et `src/content/projects.ts`. Les images sont dans `public/images/`.

---

## 1. Créer un compte GitHub

> Tu as déjà un compte GitHub ? Passe directement à l'[étape 2](#2-accéder-au-dépôt-avec-césar).

1. Va sur <https://github.com/signup>.
2. Saisis ton e-mail, un mot de passe et un nom d'utilisateur (par exemple `mariolesergent`). Ce nom apparaîtra dans l'adresse du dépôt.
3. Valide le code reçu par e-mail.
4. Choisis l'offre **Free** : elle suffit largement.
5. **Active l'authentification à deux facteurs** (GitHub l'exige de toute façon assez vite) : photo de profil en haut à droite → **Settings** → **Password and authentication** → **Enable two-factor authentication**. Une application comme Google Authenticator, 1Password ou l'app GitHub Mobile fait l'affaire. **Garde les codes de récupération** dans un endroit sûr.

Envoie ensuite ton **nom d'utilisateur GitHub** à César.

---

## 2. Accéder au dépôt (avec César)

Le code du site se trouve sur le compte GitHub de César, dans le dépôt public `Dylfaen/mario-portfolio` : <https://github.com/Dylfaen/mario-portfolio>. Comme le dépôt est public, tout le monde peut lire le code, mais seuls les collaborateurs peuvent le modifier.

1. **César** t'ajoute comme collaborateur : sur la page du dépôt → **Settings** → **Collaborators** → **Add people** → ton nom d'utilisateur GitHub.
2. **Toi** : tu reçois un e-mail de GitHub (« Dylfaen invited you to collaborate »). Clique sur **View invitation** puis sur **Accept invitation**. L'invitation expire au bout de 7 jours : si c'est trop tard, demande à César de la renvoyer.

C'est tout. **Tu n'as pas besoin de compte Vercel** : le site est hébergé sur celui de César, qui est déjà relié au dépôt. Chaque fois que tu pousses une modification sur GitHub, Vercel la met en ligne automatiquement.

> Comme le dépôt est public, ne mets jamais d'informations privées dans le code (mots de passe, adresse personnelle, numéro de téléphone que tu ne veux pas voir circuler…). Tout ce qui est dans le dépôt est visible par n'importe qui.

---

## 3. Installer les outils

Installe les trois outils dans l'ordre. Garde les options par défaut des installateurs, sauf indication contraire.

### 3.1 VS Code (l'éditeur)

1. Télécharge-le sur <https://code.visualstudio.com/>. Le bouton détecte ton système.
2. 🪟 **Windows** : lance l'installateur. À l'écran « Tâches supplémentaires », coche **Ajouter « Ouvrir avec Code » au menu contextuel** (fichiers et dossiers) et **Ajouter à PATH**.
3. 🍎 **Mac** : ouvre le `.zip` téléchargé et **glisse Visual Studio Code dans le dossier Applications**. Ne le lance pas depuis Téléchargements.
4. Ouvre VS Code. Pour l'avoir en français : `Ctrl+Shift+P` (🍎 `Cmd+Shift+P`), tape `Configure Display Language`, choisis **Français** et redémarre.

### 3.2 Node.js (pour faire tourner le site en local)

1. Va sur <https://nodejs.org/> et télécharge la version **LTS** (le bouton recommandé, pas « Current »).
2. 🪟 **Windows** : lance le `.msi` et clique sur Suivant jusqu'au bout. Si une case « Automatically install the necessary tools » (Chocolatey) apparaît, **ne la coche pas** : ce n'est pas nécessaire.
3. 🍎 **Mac** : lance le `.pkg` et clique sur Continuer jusqu'au bout.
4. **Vérification** : ferme et rouvre VS Code, puis ouvre un terminal (menu **Terminal → Nouveau terminal**) et tape :
   ```
   node -v
   npm -v
   ```
   Tu dois voir deux numéros de version (par exemple `v24.x.x` et `11.x.x`). Si tu obtiens « commande introuvable », redémarre l'ordinateur et réessaie.

### 3.3 GitHub Desktop (Git avec une interface graphique)

1. Télécharge-le sur <https://desktop.github.com/>.
2. 🪟 **Windows** : lance l'installateur. Il s'installe et s'ouvre tout seul.
3. 🍎 **Mac** : ouvre le `.zip` et glisse **GitHub Desktop** dans **Applications**.
4. Au premier lancement, clique sur **Sign in to GitHub.com**. Le navigateur s'ouvre : connecte-toi, puis clique sur **Authorize desktop**.
5. Dans l'écran « Configure Git », garde ton nom et ton e-mail. Ils signent chacune de tes modifications.
6. Pour que les boutons « Open in Visual Studio Code » fonctionnent : 🪟 **File → Options → Integrations** / 🍎 **GitHub Desktop → Settings → Integrations** → **External editor : Visual Studio Code**.

> GitHub Desktop contient sa propre version de Git : **tu n'as pas besoin d'installer Git à part**.
> 🍎 Si macOS te propose un jour d'installer les « outils de développement en ligne de commande », tu peux accepter sans risque.
> Si VS Code affiche « Git introuvable », ignore le message : tu utilises GitHub Desktop pour tout ce qui concerne Git.

---

## 4. Télécharger le code sur ton ordinateur

C'est ce qu'on appelle « cloner » le dépôt.

1. Dans GitHub Desktop : **File → Clone repository…**
2. Onglet **GitHub.com** → sélectionne `Dylfaen/mario-portfolio`. Il apparaît une fois l'invitation acceptée. Sinon, onglet **URL** → colle `https://github.com/Dylfaen/mario-portfolio`.
3. **Local path** : choisis où ranger le dossier, par exemple `Documents\GitHub\mario-portfolio`. Évite un dossier synchronisé par **OneDrive / iCloud / Dropbox**, cela pose des problèmes avec le dossier `node_modules`.
4. Clique sur **Clone**.
5. Une fois le clonage terminé, clique sur **Open in Visual Studio Code** (ou menu **Repository → Open in Visual Studio Code**).
6. Si VS Code demande « Faites-vous confiance aux auteurs de ce dossier ? », réponds **Oui**.

Tu dois voir à gauche les dossiers `public`, `src`, le fichier `package.json`, etc.

---

## 5. Lancer le site en local

Tout se passe dans le terminal de VS Code (**Terminal → Nouveau terminal**). Il s'ouvre déjà dans le bon dossier.

### 5.1 Installer les dépendances (une seule fois, ou quand `package.json` change)

```
npm install
```

Le téléchargement prend une minute ou deux, puis un dossier `node_modules` apparaît. Des messages « warn » ou « vulnerabilities » peuvent s'afficher : c'est normal, ignore-les.

> 🪟 **Si tu as l'erreur** `npm.ps1 cannot be loaded because running scripts is disabled on this system` (ou « l'exécution de scripts est désactivée sur ce système ») : c'est une protection de PowerShell. Tape une fois cette commande, réponds `O` (ou `Y`), puis relance `npm install` :
> ```
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

### 5.2 Démarrer le site

```
npm run dev
```

Quand tu vois `Ready` et `http://localhost:3000`, ouvre <http://localhost:3000> dans ton navigateur. **C'est ton site, qui tourne sur ton ordinateur.** Toi seul le vois.

- Laisse ce terminal ouvert pendant que tu travailles. Chaque fois que tu enregistres un fichier (`Ctrl+S` / 🍎 `Cmd+S`), la page se met à jour toute seule.
- Pour arrêter : clique dans le terminal et fais `Ctrl+C` (aussi `Ctrl+C` sur Mac).

---

## 6. Faire une modification et la publier

Voici la routine à suivre à chaque fois.

### Étape 1 : récupérer la dernière version
Dans GitHub Desktop, clique sur **Fetch origin** (en haut). S'il devient **Pull origin**, clique encore. Ça évite les conflits si quelqu'un d'autre (César, par exemple) a modifié le site entre-temps.

### Étape 2 : modifier
Dans VS Code, ouvre le fichier voulu (voir la [section 7](#7-exemples-de-modifications-courantes)), modifie-le et **enregistre**. Vérifie le résultat sur <http://localhost:3000> (avec `npm run dev` lancé).

### Étape 3 : vérifier que tout compile
Arrête `npm run dev` (`Ctrl+C`) puis lance :

```
npm run build
```

- Si ça se termine **sans erreur** (une liste de pages avec des ○ et ●), c'est bon.
- **En cas d'erreur** (texte rouge, `Failed to compile`, `Type error`) : le message indique le fichier et la ligne. Souvent, c'est une virgule ou un guillemet oublié. Corrige et relance. **Ne publie pas tant que le build échoue** : Vercel échouerait de la même façon. (Rassure-toi : dans ce cas, l'ancienne version du site reste en ligne.)

### Étape 4 : enregistrer la modification (commit)
Dans GitHub Desktop :
1. À gauche, tu vois la liste des fichiers modifiés. Clique dessus pour voir le détail (en rouge ce qui est supprimé, en vert ce qui est ajouté).
2. En bas à gauche, dans **Summary**, écris une phrase courte qui décrit le changement, par exemple `Ajout du clip Untel`.
3. Clique sur **Commit to main**.

### Étape 5 : publier (push)
Clique sur **Push origin** en haut.

### Étape 6 : vérifier la mise en ligne
1. Va sur <https://github.com/Dylfaen/mario-portfolio>. À côté du dernier commit (en haut de la liste des fichiers), une petite icône indique où en est le déploiement Vercel :
   - 🟡 point orange : en cours (environ une minute) ;
   - ✅ coche verte : en ligne ;
   - ❌ croix rouge : échec. Clique dessus puis sur **Details** pour voir l'erreur.
2. Ouvre <https://mariolesergent.com> : la modification est en ligne. (Si tu ne la vois pas, recharge avec `Ctrl+Shift+R` / 🍎 `Cmd+Shift+R`.)

---

## 7. Exemples de modifications courantes

Le fichier `README.md` du projet détaille tout. Voici l'essentiel.

### Changer le métier, la description ou l'Instagram
Fichier `src/content/site.ts`. Modifie le texte **entre les guillemets**, sans toucher au reste.

### Ajouter un film
Fichier `src/content/projects.ts`.

1. Copie un bloc existant, de `{` jusqu'à `},` inclus, et colle-le à l'endroit voulu dans la liste. **L'ordre de la liste est l'ordre de défilement sur le site.**
2. Modifie les valeurs :
   ```ts
   {
     slug: "mon-nouveau-clip",            // unique, en minuscules avec des tirets → /film/mon-nouveau-clip
     title: "Mon nouveau clip",
     year: 2026,                          // facultatif : supprime la ligne si inconnue
     director: "Nom du réalisateur",
     production: "Nom de la prod",        // facultatif
     category: "music video",             // texte libre → /music-video
     cover: "/images/mon-nouveau-clip.jpg",
     video: { provider: "vimeo", id: "123456789" },
     featured: true,                      // obligatoire pour qu'il apparaisse
   },
   ```
3. **La vidéo Vimeo** : l'identifiant correspond aux chiffres de l'adresse `vimeo.com/123456789`. Si la vidéo est « non répertoriée », l'adresse ressemble à `vimeo.com/123456789/abc123def` : ajoute alors `hash: "abc123def"` :
   `video: { provider: "vimeo", id: "123456789", hash: "abc123def" },`
4. **L'image** : un JPEG au format 16/9, d'environ 1600 px de large et compressé (moins de 300 Ko si possible). Glisse-la dans `public/images/` depuis l'explorateur de fichiers ou le Finder, ou directement dans le panneau de gauche de VS Code. Le nom du fichier doit correspondre à `cover`.
5. La ligne `glow` (couleur de halo dans la galerie) est facultative : sans elle, tout fonctionne.

### Retirer un film sans le supprimer
Passe `featured: true` à `featured: false`.

### Les règles de syntaxe à respecter
- Le texte va toujours **entre guillemets droits** `"…"`. Pour mettre un guillemet *dans* un texte, utilise les guillemets typographiques `« »` ou `’`.
- Chaque ligne d'un bloc se termine par une **virgule**, et chaque bloc `{ … }` aussi.
- VS Code souligne en rouge les erreurs : survole le soulignement pour lire l'explication.

---

## 8. En cas de problème

| Problème | Solution |
| --- | --- |
| `node` ou `npm` « introuvable » | Ferme et rouvre VS Code. Sinon, redémarre l'ordinateur. Sinon, réinstalle Node.js (étape 3.2). |
| 🪟 « scripts désactivés » / `npm.ps1` | Voir l'encadré de l'[étape 5.1](#51-installer-les-dépendances-une-seule-fois-ou-quand-packagejson-change). |
| `Port 3000 is in use` | Un ancien `npm run dev` tourne encore dans un autre terminal : ferme-le. Next.js propose sinon le port 3001, ça marche aussi. |
| Erreur bizarre après un *Pull* | Relance `npm install` : une dépendance a peut-être changé. |
| Le site local ne se met pas à jour | Vérifie que le fichier est enregistré (un point ● sur l'onglet signale qu'il ne l'est pas). Recharge la page. |
| Croix rouge ❌ à côté du commit sur GitHub | Le déploiement a échoué. Clique sur la croix → **Details** pour voir les logs. C'est la même erreur que `npm run build` montrerait en local : corrige, commit, push. L'ancien site reste en ligne en attendant. |
| J'ai cassé le site en ligne | Annule le commit fautif (ligne suivante) et pousse : l'ancienne version revient en ligne en une minute. En cas d'urgence, César peut aussi revenir instantanément à une version précédente depuis Vercel. |
| Je veux annuler un commit | GitHub Desktop → onglet **History** → clic droit sur le commit → **Revert changes in commit**, puis **Push origin**. |
| Je veux annuler des modifications pas encore commitées | GitHub Desktop → clic droit sur le fichier dans la liste → **Discard changes…** |
| GitHub Desktop parle de **conflit** | Quelqu'un a modifié la même ligne que toi. GitHub Desktop propose d'ouvrir le fichier dans VS Code, qui affiche les deux versions avec des boutons « Accept Current / Incoming / Both ». Choisis, enregistre, puis commit. En cas de doute, appelle César. |

---

## 9. Aide-mémoire

**La première fois** : compte GitHub → accepter l'invitation de César → VS Code, Node.js et GitHub Desktop → Clone → `npm install`.

**À chaque modification** :

1. GitHub Desktop : **Fetch / Pull origin**
2. VS Code, terminal : `npm run dev` → modifier → vérifier sur <http://localhost:3000>
3. `Ctrl+C`, puis `npm run build` → pas d'erreur
4. GitHub Desktop : message → **Commit to main** → **Push origin**
5. GitHub : coche verte ✅ à côté du commit → vérifier <https://mariolesergent.com>

**Les fichiers à connaître**

| Quoi | Où |
| --- | --- |
| Nom, métier, description, Instagram | `src/content/site.ts` |
| Les films | `src/content/projects.ts` |
| Les images | `public/images/` |
| Couleurs et typographie | début de `src/app/globals.css` (bloc `:root`) |
| Documentation complète | `README.md` |
