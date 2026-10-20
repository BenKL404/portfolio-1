# Architecture du Projet - Portfolio (BENLK404)

Ce document est conçu pour les développeurs et les **agents IA** afin de comprendre rapidement et efficacement l'architecture, les conventions et le fonctionnement de ce projet.

## 1. Présentation Générale
Il s'agit du portfolio personnel de **Bernard Kokou Kpedzi**, Développeur Full-Stack. C'est une application Single Page Application (SPA) moderne développée en React. Le projet inclut également un fichier de CV séparé (`cv.html` / `cv.md`).

## 2. Stack Technique
- **Framework** : React 19 (TypeScript)
- **Bundler** : Vite v7
- **Styling** : Tailwind CSS v3.4, PostCSS, et CSS pur (`index.css` pour les variables CSS)
- **Animations** : Framer Motion v12
- **Icônes** : React Icons
- **Routage** : React Router DOM v7 (Gestion des routes linguistiques `/:lang`)
- **Internationalisation (i18n)** : React-i18next (Français et Anglais)
- **Déploiement** : Cloudflare Pages / Workers (via `@cloudflare/vite-plugin` et `wrangler`)

## 3. Structure des Dossiers
- `/src/` : Code source principal de l'application React.
  - `/components/` : Composants UI de l'application. Chaque section du portfolio a son composant dédié (ex: `Hero.tsx`, `About.tsx`, `Projects.tsx`, `Header.tsx`). On y trouve aussi des composants transverses (`CookieConsent.tsx`) et `ui.tsx` (primitives partagées : `Reveal`, `SectionHead`, `scrollTo`).
  - `/data/` : Contient le fichier `portfolio.ts`. **Point crucial :** C'est ici que sont stockées toutes les données du portfolio (informations personnelles, expériences, projets, compétences, services). L'application n'utilise pas d'API externe pour son contenu, tout est géré localement dans ce fichier.
  - `/hooks/` : Hooks personnalisés React. Contient `useTheme.ts` (gestion du mode sombre/clair).
  - `/i18n/` : Fichiers de traduction (`en.json`, `fr.json`) et fichier d'initialisation (`index.ts`).
  - `App.tsx` : Composant racine qui gère le routage, la synchronisation du scroll (pour le menu actif et le bouton "retour en haut"), la gestion de la langue, et l'intégration de toutes les sections de la page.
  - `main.tsx` : Point d'entrée de l'application React (monteur dans le DOM).
  - `index.css` : Styles globaux, définition des polices, et surtout les **variables CSS** utilisées pour le thème dynamique.
- `/public/` : Fichiers statiques servis tels quels (CV PDF, favicons, photo du hero, captures des projets).
- `/design/` : Photos sources en haute définition (non déployées), d'où sont tirées les images WebP de `public/`.
- `vite.config.ts` : Configuration de Vite. **Attention :** configuré pour un build multi-pages avec des points d'entrée séparés pour l'application principale (`index.html`) et le CV (`cv.html`).
- `tailwind.config.js` : Configuration de Tailwind (polices *Archivo* et *JetBrains Mono*, couleurs `bg`, `bg-2`, `fg`, `muted`, `rule`, `signal`, `signal-text` reliées aux variables CSS).
- `/public/projects/` : Captures des projets (WebP) affichées dans la section Projets.
- `wrangler.jsonc` & `.wrangler/` : Fichiers de configuration liés au déploiement via Cloudflare.

## 4. Concepts Clés pour les Agents IA

### A. Gestion des Données (Où modifier le contenu ?)
- **Données structurées (Projets, Expériences, Compétences) :** **Ne cherchez pas dans les composants !** Modifiez directement le fichier `src/data/portfolio.ts`. Les composants (comme `Projects.tsx` ou `Skills.tsx`) importent et itèrent (map) sur ces données.
- **Projets :** chaque projet a un `id` dans `portfolio.ts` (année, stack, image, lien, `featured`). Ses textes (nom, type, description) sont dans `projects.items[id]` des fichiers `src/i18n/*.json`. `link.kind` vaut `live` (site en ligne), `source` (dépôt public) ou `private` (pas de lien affiché).
- **Textes statiques de l'interface (Boutons, Titres de sections, Menus) :** Modifiez les fichiers JSON dans `src/i18n/` (`fr.json` et `en.json`).

### B. Routage et i18n
L'application est conçue pour fonctionner avec la langue en paramètre d'URL (`/:lang`).
- Les valeurs acceptées sont `/fr` et `/en`.
- Si l'utilisateur visite `/` directement, il est redirigé vers `/fr` ou `/en` selon la langue détectée de son navigateur.
- Le composant `App.tsx` synchronise activement le paramètre de l'URL avec l'instance de `react-i18next`.

### C. Thème et Styles (Dark/Light Mode)
- Identité LK-FONDATION : fond « os » `#efebe3`, encre `#111110`, accent cyan `#00a6b8` (`--signal`, texte posé dessus en encre via `--on-signal`). Titres en Archivo condensé capitales (classe `.display`), étiquettes `.kicker`, boutons `.btn-signal` / `.btn-ink` / `.btn-line`, champs `.field`.
- Le thème est géré via le hook `src/hooks/useTheme.ts` (préférence système par défaut, puis choix mémorisé). Il pose `data-theme` sur `<html>`.
- Les couleurs sont des **variables CSS** dans `src/index.css` (`--bg`, `--bg-2`, `--fg`, `--muted`, `--rule`, `--signal`, `--signal-text`), exposées à Tailwind (`bg-bg`, `text-fg`, `border-rule`…). La classe `.invert-scope` inverse ces variables pour un bloc (Contact, pied de page).
- Après une modification de `tailwind.config.js`, redémarrer le serveur Vite.

### D. Animations et Interactivité
- **Framer Motion** est massivement utilisé pour les animations d'entrée et de sortie (`AnimatePresence`, `motion.div`).
- **Effets au scroll :** Une instance de `IntersectionObserver` parcourt les sections de la page dans `App.tsx` pour mettre à jour la navigation active.
- Les apparitions au défilement passent par `Reveal` (`ui.tsx`). `MotionConfig reducedMotion="user"` et les media queries `prefers-reduced-motion` désactivent les animations si l'utilisateur le demande.

### E. Build & Déploiement
- Le projet est pensé pour le déploiement **Edge** sur Cloudflare (intégration de `@cloudflare/vite-plugin`).
- Le processus de build (via `npm run build`) génère les assets dans le dossier `/dist/` avec deux pages HTML distinctes, gérées par `rollupOptions` dans `vite.config.ts`.

## 5. Guide Rapide de Modification
- **Ajouter un projet :** Éditer le tableau `projects` dans `src/data/portfolio.ts`.
- **Mettre à jour une traduction :** Éditer `src/i18n/fr.json` et `src/i18n/en.json`.
- **Corriger un style d'un composant :** Aller dans `src/components/<NomComposant>.tsx`. Les styles sont principalement faits avec les classes utilitaires de Tailwind CSS.
- **Ajouter une nouvelle section à la page :** 
  1. Créer `src/components/NouvelleSection.tsx`.
  2. L'importer et l'ajouter dans l'arborescence de `src/App.tsx` (dans la balise `<main>`).
  3. Ajouter son ID HTML dans le tableau `SECTIONS` au début de `App.tsx` pour assurer la détection du scroll.
