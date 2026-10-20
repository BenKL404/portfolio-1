# Portfolio — Bernard Kokou Kpedzi

> Portfolio personnel fullstack — Frontend React + Backend Node.js

[![web](https://img.shields.io/badge/branch-web-00cfe0?style=flat-square&logo=react)](https://github.com/BENLK404/portfolio/tree/web)
[![backend](https://img.shields.io/badge/branch-backend-6db33f?style=flat-square&logo=nodedotjs)](https://github.com/BENLK404/portfolio/tree/backend)

---

## Structure du projet

```
portfolio/
├── branch: web       → Frontend React 18 + TypeScript + Vite
└── branch: backend   → API Node.js + Express + MongoDB
```

## Branches

| Branche | Description | Stack |
|---------|-------------|-------|
| [`web`](https://github.com/BENLK404/portfolio/tree/web) | Interface utilisateur bilingue FR/EN, thème clair/sombre | React · TypeScript · Vite · Tailwind · Framer Motion |
| [`backend`](https://github.com/BENLK404/portfolio/tree/backend) | API REST — formulaire de contact, sauvegarde MongoDB, envoi email | Node.js · Express · MongoDB · Nodemailer |

## Fonctionnalités

- **Bilingue** : `/fr` et `/en` avec détection automatique de la langue du navigateur
- **Thème** : clair / sombre, persisté dans `localStorage`
- **Sections** : Hero, À propos, Services, Expérience, Projets, Stack technique, Contact
- **Formulaire de contact** : messages sauvegardés en MongoDB + email automatique
- **Sécurité backend** : rate-limiting, validation, CORS, Helmet

## Démarrage

```bash
# Frontend
git checkout web
npm install && npm run dev

# Backend (dans un second terminal)
git checkout backend
npm install && npm run dev
```

> Consulter le `README.md` de chaque branche pour la configuration détaillée.

## Auteur

**Bernard Kokou Kpedzi** — Développeur Full-Stack  
[GitHub](https://github.com/BENLK404) · [LinkedIn](https://www.linkedin.com/in/kokou-bernard-kpedzi-b47b2418a/) · [X](https://x.com/BLKB44058)
