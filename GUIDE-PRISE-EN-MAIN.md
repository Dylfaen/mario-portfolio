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
| **Git** | L'outil qui enregistre les versions du code et les synchronise avec GitHub. Tu ne tapes presque jamais de commande : VS Code s'en charge avec des boutons. |
| **Git Graph** | Une extension de VS Code qui affiche l'historique des modifications sous forme de graphe, et permet d'annuler une modification d'un clic droit. |
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

Installe les outils dans l'ordre. Garde les options par défaut des installateurs, sauf indication contraire.

### 3.1 VS Code (l'éditeur)

1. Télécharge-le sur <https://code.visualstudio.com/>. Le bouton détecte ton système.
2. 🪟 **Windows** : lance l'installateur. À l'écran « Tâches supplémentaires », coche **Ajouter « Ouvrir avec Code » au menu contextuel** (fichiers et dossiers) et **Ajouter à PATH**.
3. 🍎 **Mac** : ouvre le `.zip` téléchargé et **glisse Visual Studio Code dans le dossier Applications**. Ne le lance pas depuis Téléchargements.
4. Ouvre VS Code. Pour l'avoir en français : `Ctrl+Shift+P` (🍎 `Cmd+Shift+P`), tape `Configure Display Language`, choisis **Français** et redémarre.

### 3.2 Node.js (pour faire tourner le site en local)

1. Va sur <https://nodejs.org/> et télécharge la version **LTS** (le bouton recommandé, pas « Current »).
2. 🪟 **Windows** : lance le `.msi` et clique sur Suivant jusqu'au bout. Une case « Automatically install the necessary tools » propose d'installer **Chocolatey** (un installateur de logiciels en ligne de commande). Tu peux la cocher : elle simplifie l'installation de Git à l'étape suivante. L'installation complémentaire ouvre une fenêtre noire et prend plusieurs minutes : laisse-la finir. Si tu ne la coches pas, ce n'est pas grave : il existe un installateur classique pour Git.
3. 🍎 **Mac** : lance le `.pkg` et clique sur Continuer jusqu'au bout.
4. **Vérification** : ferme et rouvre VS Code, puis ouvre un terminal (menu **Terminal → Nouveau terminal**) et tape :
   ```
   node -v
   npm -v
   ```
   Tu dois voir deux numéros de version (par exemple `v24.x.x` et `11.x.x`). Si tu obtiens « commande introuvable », redémarre l'ordinateur et réessaie.

   > 🪟 **Si `node -v` marche mais que `npm -v` affiche une erreur en rouge** du type `npm.ps1 cannot be loaded because running scripts is disabled on this system` (ou « l'exécution de scripts est désactivée sur ce système ») : c'est une protection de PowerShell, qui bloque les scripts comme `npm`. Tape une fois cette commande, réponds `O` (ou `Y`), puis ferme et rouvre le terminal :
   > ```
   > Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
   > ```

### 3.3 Git

🪟 **Windows, avec Chocolatey** (si tu as coché la case à l'étape précédente) :
1. Ouvre le menu Démarrer, tape `PowerShell`, fais un clic droit sur **Windows PowerShell** → **Exécuter en tant qu'administrateur** → **Oui**.
2. Vérifie que Chocolatey est là en tapant `choco -v`. Un numéro de version doit s'afficher. Si tu obtiens une erreur, utilise la méthode sans Chocolatey ci-dessous.
3. Tape :
```
   choco install git -y
   ```
4. Attends le message `The install of git was successful`, puis ferme la fenêtre.

🪟 **Windows, sans Chocolatey** : télécharge l'installateur sur <https://git-scm.com/download/win> (« Click here to download »), lance-le et clique sur **Next** jusqu'au bout, sans rien changer.

🍎 **Mac** : ouvre l'application **Terminal** (Cmd+Espace, tape `Terminal`) et tape :
```
xcode-select --install
```
Une fenêtre propose d'installer les « outils de développement en ligne de commande » : clique sur **Installer** et accepte la licence. Cela prend quelques minutes. Si le Terminal répond `already installed`, Git est déjà là.

**Vérification** (Windows et Mac) : ferme complètement VS Code, rouvre-le, ouvre un terminal (**Terminal → Nouveau terminal**) et tape `git --version`. Tu dois voir un numéro de version, par exemple `git version 2.5x.x`.

**Te présenter à Git** (une seule fois). Chaque modification que tu enregistres est signée d'un nom et d'un e-mail. Dans le même terminal, tape ces deux lignes avec **ton** nom et **l'e-mail de ton compte GitHub** :
```
git config --global user.name "Mario Le Sergent"
git config --global user.email "ton-email@exemple.com"
```
Ces commandes n'affichent rien quand elles réussissent, c'est normal.

### 3.4 L'extension Git Graph

1. Dans VS Code, ouvre le panneau des extensions : icône des quatre carrés dans la barre de gauche, ou `Ctrl+Shift+X` (🍎 `Cmd+Shift+X`).
2. Cherche `Git Graph`. Choisis celle de l'auteur **mhutchie** (des millions de téléchargements) et clique sur **Installer**.

---

## 4. Télécharger le code sur ton ordinateur

C'est ce qu'on appelle « cloner » le dépôt. Tout se fait depuis VS Code.

1. `Ctrl+Shift+P` (🍎 `Cmd+Shift+P`), tape `Git: Clone` et valide avec Entrée.
2. Choisis **Cloner à partir de GitHub** (*Clone from GitHub*).
3. VS Code demande l'autorisation de se connecter à GitHub : clique sur **Autoriser**. Le navigateur s'ouvre : connecte-toi à GitHub et autorise **Visual Studio Code**, puis reviens dans VS Code. C'est cette connexion qui te permettra ensuite de publier tes modifications.
4. Tape `Dylfaen/mario-portfolio` et sélectionne-le dans la liste. S'il n'apparaît pas, colle plutôt l'adresse `https://github.com/Dylfaen/mario-portfolio.git` à l'étape 2 et valide.
5. Choisis le dossier **dans lequel** ranger le projet, par exemple `Documents`. VS Code y crée un sous-dossier `mario-portfolio`. Évite un dossier synchronisé par **OneDrive / iCloud / Dropbox** : cela pose des problèmes avec le dossier `node_modules`.
6. À la fin du téléchargement, clique sur **Ouvrir** (*Open*).
7. Si VS Code demande « Faites-vous confiance aux auteurs des fichiers de ce dossier ? », réponds **Oui**.

Tu dois voir à gauche les dossiers `public`, `src`, le fichier `package.json`, etc.

Pour rouvrir le projet les fois suivantes : **Fichier → Ouvrir un dossier récent** (*Open Recent*) → `mario-portfolio`.

---

## 5. Lancer le site en local

Tout se passe dans le terminal de VS Code (**Terminal → Nouveau terminal**). Il s'ouvre déjà dans le bon dossier.

### 5.1 Installer les dépendances (une seule fois, ou quand `package.json` change)

```
npm install
```

Le téléchargement prend une minute ou deux, puis un dossier `node_modules` apparaît. Des messages « warn » ou « vulnerabilities » peuvent s'afficher : c'est normal, ignore-les.

> 🪟 Si `npm` affiche une erreur « scripts désactivés » / `npm.ps1`, voir l'encadré de l'[étape 3.2](#32-nodejs-pour-faire-tourner-le-site-en-local).

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
En bas à gauche de VS Code, dans la barre d'état bleue, à côté de `main`, clique sur l'icône de synchronisation ⟳. Elle télécharge les éventuelles modifications faites par quelqu'un d'autre (César, par exemple) et évite les conflits. Si VS Code te demande de confirmer, clique sur **OK**.

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
1. Ouvre le panneau **Contrôle de code source** (*Source Control*) : l'icône à trois ronds reliés dans la barre de gauche, ou `Ctrl+Shift+G` (🍎 `Cmd+Shift+G`). Un chiffre bleu sur l'icône indique le nombre de fichiers modifiés.
2. La liste **Modifications** (*Changes*) affiche les fichiers touchés. Clique sur l'un d'eux pour voir le détail : à gauche l'ancienne version, à droite la nouvelle. Les lignes en rouge sont supprimées, celles en vert ajoutées.
3. Dans le champ **Message** en haut du panneau, écris une phrase courte qui décrit le changement, par exemple `Ajout du clip Nuit Blanche`.
4. Clique sur **✓ Valider** (*Commit*).
5. La première fois, VS Code demande s'il doit « indexer automatiquement toutes les modifications ». Réponds **Toujours** (*Always*) : tous les fichiers modifiés seront inclus dans le commit.

### Étape 5 : publier (push)
Le bouton bleu du panneau devient **Synchroniser les modifications ↑1** (*Sync Changes*). Clique dessus, puis sur **OK** si VS Code demande confirmation.

> 🪟 La toute première fois, une fenêtre « Connect to GitHub » peut s'ouvrir : choisis **Sign in with your browser** et autorise dans le navigateur. Elle ne réapparaîtra plus ensuite.

Pour vérifier que c'est bien parti, ouvre **Git Graph** : clique sur `Git Graph` dans la barre d'état en bas, ou sur l'icône Git Graph en haut du panneau Contrôle de code source. Ton commit est en haut de la liste, et les étiquettes `main` et `origin/main` sont sur la même ligne. `origin/main` représente la version sur GitHub : si elle est restée sur une ligne plus bas, le push n'a pas encore eu lieu.

### Étape 6 : vérifier la mise en ligne
1. Va sur <https://github.com/Dylfaen/mario-portfolio>. À côté du dernier commit (en haut de la liste des fichiers), une petite icône indique où en est le déploiement Vercel :
   - 🟡 point orange : en cours (environ une minute) ;
   - ✅ coche verte : en ligne ;
   - ❌ croix rouge : échec. Clique dessus puis sur **Details** pour voir l'erreur.
2. Ouvre <https://mariolesergent.com> : la modification est en ligne. (Si tu ne la vois pas, recharge avec `Ctrl+Shift+R` / 🍎 `Cmd+Shift+R`.)

---

## 7. Exemples de modifications courantes

Voici l'essentiel. **Pour le détail de chaque champ, d'autres exemples (modifier, réordonner, masquer ou supprimer un projet) et la page d'accueil, voir la section « Modifier le contenu » du [README](README.md#modifier-le-contenu).**

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
| 🪟 « scripts désactivés » / `npm.ps1` | Voir l'encadré de l'[étape 3.2](#32-nodejs-pour-faire-tourner-le-site-en-local). |
| `Port 3000 is in use` | Un ancien `npm run dev` tourne encore dans un autre terminal : ferme-le. Next.js propose sinon le port 3001, ça marche aussi. |
| Erreur bizarre après un *Pull* | Relance `npm install` : une dépendance a peut-être changé. |
| Le site local ne se met pas à jour | Vérifie que le fichier est enregistré (un point ● sur l'onglet signale qu'il ne l'est pas). Recharge la page. |
| Croix rouge ❌ à côté du commit sur GitHub | Le déploiement a échoué. Clique sur la croix → **Details** pour voir les logs. C'est la même erreur que `npm run build` montrerait en local : corrige, commit, push. L'ancien site reste en ligne en attendant. |
| J'ai cassé le site en ligne | Annule le commit fautif (ligne suivante) et pousse : l'ancienne version revient en ligne en une minute. En cas d'urgence, César peut aussi revenir instantanément à une version précédente depuis Vercel. |
| Je veux annuler un commit | Ouvre **Git Graph**, fais un clic droit sur le commit → **Revert…** → **Yes, revert**. Git crée un nouveau commit qui défait l'ancien. Clique ensuite sur **Synchroniser les modifications** pour le publier. |
| Je veux annuler des modifications pas encore commitées | Panneau **Contrôle de code source** → survole le fichier → icône ↶ **Ignorer les modifications** (*Discard Changes*). Attention : c'est définitif. |
| `git` « introuvable », ou VS Code affiche « Git introuvable » | Ferme complètement VS Code et rouvre-le. Sinon, redémarre l'ordinateur. Sinon, refais l'[étape 3.3](#33-git). |
| « Please tell me who you are » / « Make sure you configure your user.name » | Tu as sauté la partie « Te présenter à Git » de l'[étape 3.3](#33-git). Tape les deux commandes `git config`, puis refais le commit. |
| Le push échoue (`Permission denied`, `403`, `Authentication failed`) | Vérifie que tu as bien accepté l'invitation de César (étape 2). Puis, dans VS Code, clique sur l'icône du compte (en bas à gauche) → déconnecte-toi de GitHub, et refais le push : VS Code redemande la connexion. |
| Le push est refusé (`rejected`, `fetch first`) | Quelqu'un a publié une modification entre-temps. Clique sur ⟳ (étape 1), puis à nouveau sur **Synchroniser les modifications**. |
| VS Code parle de **conflit** (*merge conflict*) | Quelqu'un a modifié la même ligne que toi. VS Code ouvre le fichier et affiche les deux versions avec des boutons « Accepter la modification actuelle / entrante / les deux ». Choisis, enregistre, puis valide et synchronise. En cas de doute, appelle César. |

---

## 9. Aide-mémoire

**La première fois** : compte GitHub → accepter l'invitation de César → installer VS Code, Node.js, Git (+ `git config`) et Git Graph → `Git: Clone` dans VS Code → `npm install`.

**À chaque modification** :

1. VS Code : ⟳ en bas à gauche
2. VS Code, terminal : `npm run dev` → modifier → vérifier sur <http://localhost:3000>
3. `Ctrl+C`, puis `npm run build` → pas d'erreur
4. Contrôle de code source (`Ctrl+Shift+G`) : message → **✓ Valider** → **Synchroniser les modifications**
5. GitHub : coche verte ✅ à côté du commit → vérifier <https://mariolesergent.com>

**Les fichiers à connaître**

| Quoi | Où |
| --- | --- |
| Nom, métier, description, Instagram | `src/content/site.ts` |
| Les films | `src/content/projects.ts` |
| Les images | `public/images/` |
| Couleurs et typographie | début de `src/app/globals.css` (bloc `:root`) |
| Documentation complète | `README.md` |
