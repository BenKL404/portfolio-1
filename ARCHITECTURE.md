# Architecture du Projet - Portfolio (BENLK404)

Ce document est conçu pour les développeurs et les **agents IA** afin de comprendre rapidement et efficacement l'architecture, les conventions et le fonctionnement de ce projet.

## 1. Présentation Générale
Il s'agit du portfolio personnel de **Bernard Kokou Kpedzi**, Développeur Full-Stack. C'est une application Single Page Application (SPA) moderne développée en React. Le projet inclut également un fichier de CV séparé (`cv.html` / `cv.md`).

## 2. Stack Technique
- **Framework** : React 19 (TypeScript)
- **Bundler** : Vite v7
- **Styling** : Tailwind CSS v3.4, PostCSS, et CSS pur (`index.css` pour les variables CSS)
- **Animations** : Framer Motion v12
- **Icônes** : Lucide React, React Icons
- **Routage** : React Router DOM v7 (Gestion des routes linguistiques `/:lang`)
- **Internationalisation (i18n)** : React-i18next (Français et Anglais)
- **Effets UI** : React Typed (effet machine à écrire)
- **Déploiement** : Cloudflare Pages / Workers (via `@cloudflare/vite-plugin` et `wrangler`)

## 3. Structure des Dossiers
- `/src/` : Code source principal de l'application React.
  - `/components/` : Composants UI de l'application. Chaque section du portfolio a son composant dédié (ex: `Hero.tsx`, `About.tsx`, `Projects.tsx`, `Header.tsx`). On y trouve aussi des composants transverses (`AnimatedBackground.tsx`, `CustomCursor.tsx`, `CookieConsent.tsx`).
  - `/data/` : Contient le fichier `portfolio.ts`. **Point crucial :** C'est ici que sont stockées toutes les données du portfolio (informations personnelles, expériences, projets, compétences, services). L'application n'utilise pas d'API externe pour son contenu, tout est géré localement dans ce fichier.
  - `/hooks/` : Hooks personnalisés React. Contient `useTheme.ts` (gestion du mode sombre/clair) et `useInView.ts` (détection d'éléments lors du défilement pour les animations).
  - `/i18n/` : Fichiers de traduction (`en.json`, `fr.json`) et fichier d'initialisation (`index.ts`).
  - `App.tsx` : Composant racine qui gère le routage, la synchronisation du scroll (pour le menu actif et le bouton "retour en haut"), la gestion de la langue, et l'intégration de toutes les sections de la page.
  - `main.tsx` : Point d'entrée de l'application React (monteur dans le DOM).
  - `index.css` : Styles globaux, définition des polices, et surtout les **variables CSS** utilisées pour le thème dynamique.
- `/public/` : Fichiers statiques (images, icônes, documents).
- `vite.config.ts` : Configuration de Vite. **Attention :** configuré pour un build multi-pages avec des points d'entrée séparés pour l'application principale (`index.html`) et le CV (`cv.html`).
- `tailwind.config.js` : Configuration de Tailwind (Définit les polices *Inter* et *JetBrains Mono*).
- `wrangler.jsonc` & `.wrangler/` : Fichiers de configuration liés au déploiement via Cloudflare.

## 4. Concepts Clés pour les Agents IA

### A. Gestion des Données (Où modifier le contenu ?)
- **Données structurées (Projets, Expériences, Compétences) :** **Ne cherchez pas dans les composants !** Modifiez directement le fichier `src/data/portfolio.ts`. Les composants (comme `Projects.tsx` ou `Skills.tsx`) importent et itèrent (map) sur ces données.
- **Textes statiques de l'interface (Boutons, Titres de sections, Menus) :** Modifiez les fichiers JSON dans `src/i18n/` (`fr.json` et `en.json`).

### B. Routage et i18n
L'application est conçue pour fonctionner avec la langue en paramètre d'URL (`/:lang`).
- Les valeurs acceptées sont `/fr` et `/en`.
- Si l'utilisateur visite `/` directement, il est redirigé vers `/fr` ou `/en` selon la langue détectée de son navigateur.
- Le composant `App.tsx` synchronise activement le paramètre de l'URL avec l'instance de `react-i18next`.

### C. Thème et Styles (Dark/Light Mode)
- Le thème est géré via le hook `src/hooks/useTheme.ts`. Il modifie les variables appliquées au document.
- Les couleurs principales sont définies via des **variables CSS natives** dans `src/index.css` (ex: `--bg`, `--text`, `--card`, `--cyan`).
- Tailwind CSS est principalement utilisé pour la mise en page (flex, margin, padding), tandis que les couleurs dynamiques s'appuient souvent sur le `style={{ background: 'var(--bg)' }}` ou sur les classes personnalisées définies globalement.

### D. Animations et Interactivité
- **Framer Motion** est massivement utilisé pour les animations d'entrée et de sortie (`AnimatePresence`, `motion.div`).
- **Effets au scroll :** Une instance de `IntersectionObserver` parcourt les sections de la page dans `App.tsx` pour mettre à jour la navigation active.
- L'application dispose d'un curseur personnalisé (`CustomCursor.tsx`) et d'un fond animé en arrière-plan (`AnimatedBackground.tsx`).

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
