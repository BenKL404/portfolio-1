export const personalInfo = {
  name: "Bernard Kokou Kpedzi",
  title: "Software Engineer",
  roles: ["Web Developer.", "Backend Engineer.", "Mobile Developer."],
  bio: "Développeur d'application web passionné, fort d'une expérience éprouvée dans la création de projets concrets et à fort impact. Solide culture architecture propre, CI/CD et sécurité API. À l'aise du design d'API jusqu'au déploiement production.",
  phone: "+228 92 86 60 99",
  email: "kpedzibernard@gmail.com",
  location: "Lomé, Togo",
  github: "https://github.com/BENLK404",
  linkedin: "https://www.linkedin.com/in/kokou-bernard-kpedzi-b47b2418a/",
  twitter: "https://x.com/BLKB44058",
  githubUsername: "BENLK404",
  linkedinName: "Kokou Bernard Kpedzi",
  twitterUsername: "@BLKB44058",
};

export const education = [
  {
    degree: "Licence en Génie Logiciel",
    school: "ESIBA Business School",
    location: "Lomé, Togo",
    period: "2022 – 2025 (Soutenance fin-2026)",
    note: "Développement Web & APIs, Méthodes Agiles, Git & CI/CD",
  },
];

export const experiences = [
  {
    title: "Fondateur & Lead Developer",
    company: "LKFondation",
    subtitle: "Lomé, Togo",
    period: "2025 – Présent",
    tasks: [
      "Création et gestion de l'infrastructure technique et de la stratégie de marque.",
      "Projets clés : LK Vault, KoriTech / Proxima, UrgenceVie, AlloArtisan.",
    ],
  },
  {
    title: "Opérateur d'Enregistrement de Données Biométriques",
    company: "ANID",
    subtitle: "Lomé, Togo",
    period: "Avril 2025 – Avril 2026",
    tasks: [
      "Enregistrement et vérification des données biométriques des usagers.",
      "Accueil et accompagnement des citoyens, respect des procédures de confidentialité.",
    ],
  },
  {
    title: "Développeur Full-Stack",
    company: "BuildStack Labs",
    subtitle: "Cotonou, Bénin (Remote)",
    period: "Mars – Août 2025",
    tasks: [
      "Développement de nouvelles fonctionnalités SaaS (tableaux de bord, notifications, exports).",
      "Pipeline CI/CD via GitHub Actions (lint, tests Jest, déploiement) - livraison accélérée de 40%.",
    ],
  },
  {
    title: "Développeur Backend Node.js",
    company: "DataBridge Inc.",
    subtitle: "Dakar, Sénégal (Remote)",
    period: "Septembre – Décembre 2024",
    tasks: [
      "API REST haute disponibilité pour gestion de stocks multi-entrepôts (> 800 req/min).",
      "Cache Redis : -60% de charge BD sur les endpoints sollicités.",
      "Sécurisation JWT/refresh tokens + rate limiting.",
    ],
  },
  {
    title: "Développeur Full-Stack",
    company: "Startup / Client",
    subtitle: "Abidjan, Côte d'Ivoire (Remote)",
    period: "Juin – Novembre 2024",
    tasks: [
      "Outils internes et interfaces de gestion, collaboration remote.",
    ],
  },
  {
    title: "Développeur Full-Stack (Stage)",
    company: "PayTicket",
    subtitle: "Lomé, Togo",
    period: "Janvier – Avril 2025",
    tasks: [
      "App mobile billetterie Flutter : achat, gestion et validation de tickets en temps réel.",
      "API REST Spring Boot sécurisée (JWT) avec intégration mobile money (Flooz/T-Money).",
    ],
  },
  {
    title: "Développeur Logiciel (Stage)",
    company: "Ministère EPST (DPSSE)",
    subtitle: "Lomé, Togo",
    period: "Juin – Novembre 2024",
    tasks: [
      "Application desktop de gestion scolaire (JavaFX, Spring Boot, Hibernate, PostgreSQL).",
      "Exports automatiques PDF/Excel pour les directions régionales.",
    ],
  },
  {
    title: "Développeur Web Full-Stack",
    company: "TogoInnov Digital",
    subtitle: "Lomé, Togo",
    period: "Janvier – Mai 2024",
    tasks: [
      "Plateforme de mise en relation freelances/entreprises. Déploiement VPS.",
    ],
  },
  {
    title: "Développeur Web Freelance",
    company: "Auto-entrepreneur",
    subtitle: "Clients PME (Togo & diaspora)",
    period: "2023 – 2025",
    tasks: [
      "Sites vitrines et applications web sur mesure.",
      "Déploiement VPS Linux, SEO technique.",
    ],
  },
];

export const projects = [
  {
    name: "LK Vault - Gestion de serveurs et SSH",
    year: "2025",
    type: "Web App",
    description: "Outil de gestion de serveurs et connexions SSH avec workflows d'intégration et de déploiement automatisés.",
    stack: ["Next.js", "CI/CD", "LKFondation"],
    highlights: ["Gestion de serveurs", "Workflows CI/CD", "Déploiement automatisé"],
    link: "https://lkvault.lkfondation.com/",
    color: "#00b4c8",
  },
  {
    name: "LOKI — Loky Application",
    year: "2025",
    type: "Desktop App",
    description: "Application desktop Electron pour explorer visuellement une base PostgreSQL (tables/vues, filtres, jointures, requêtes rapides) et exporter (Excel, PDF, CSV, PNG).",
    stack: ["Electron", "React", "TypeScript", "PostgreSQL", "Prisma", "Exports"],
    highlights: ["Exploration PostgreSQL", "Exports multiples"],
    link: "https://github.com/BENLK404/LOKI-ELECTRO",
    color: "#00b4c8",
  },
  {
    name: "BLOC-SERVICE",
    year: "2024",
    type: "Web App",
    description: "Web app \"BLOC-SERVICE\" : gestion/suivi des factures et contrôles, avec authentification OAuth (Google, GitHub) et workflow de traitement.",
    stack: ["Next.js", "OAuth", "Facturation", "Contrôle"],
    highlights: ["OAuth", "Workflow facturation"],
    link: "https://github.com/BENLK404/facture-controle",
    color: "#00b4c8",
  },
  {
    name: "KoriTech (Proxima) - SaaS RH",
    year: "2025",
    type: "SaaS",
    description: "SaaS dédié à la gestion des ressources humaines : conception de l'architecture base de données et des fonctionnalités clés.",
    stack: ["LKFondation", "SaaS", "PostgreSQL"],
    highlights: ["Gestion RH", "Architecture BDD"],
    link: "#",
    color: "#00b4c8",
  },
  {
    name: "LKM Player – Lecteur Audio",
    year: "2025",
    type: "App Mobile Open Source",
    description: "Lecteur audio mobile 100% local : scan bibliothèque, playlists, paroles synchronisées, égaliseur, stats d'écoute.",
    stack: ["Flutter", "Android", "Open Source"],
    highlights: ["Paroles synchronisées", "Lecture hors-ligne"],
    link: "https://github.com/BENLK404/lkm-player",
    color: "#00b4c8",
  },
  {
    name: "TogoMarché — Marketplace e-commerce",
    year: "2025",
    type: "Marketplace",
    description: "Catalogue, panier, recherche - déployé en edge sur Cloudflare Workers pour le marché togolais.",
    stack: ["React", "Cloudflare Workers", "Edge"],
    highlights: ["Déploiement edge", "Interface moderne"],
    link: "https://e-commerce.kpedzibernard.workers.dev/",
    color: "#00b4c8",
  },
  {
    name: "UrgenceVie - Plateforme Médicale",
    year: "2025",
    type: "Web App",
    description: "Plateforme de gestion des urgences et dons de sang, connectant donneurs et centres médicaux en temps réel avec notifications.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Socket.io"],
    highlights: ["Temps réel", "Santé publique"],
    link: "#",
    color: "#00b4c8",
  },
  {
    name: "AlloArtisan - Mise en relation",
    year: "2025",
    type: "Mobile App",
    description: "Application mobile permettant aux utilisateurs de trouver, contacter et réserver des artisans locaux pour divers travaux.",
    stack: ["Flutter", "Firebase", "Node.js"],
    highlights: ["Réservation", "Géolocalisation"],
    link: "#",
    color: "#00b4c8",
  },
  {
    name: "StockBridge API",
    year: "2024",
    type: "Backend API",
    description: "API REST haute disponibilité pour la gestion de stocks multi-entrepôts, supportant une forte charge avec un système de cache avancé.",
    stack: ["Express", "Redis", "MongoDB", "JWT"],
    highlights: ["Haute disponibilité", "Mise en cache"],
    link: "#",
    color: "#00b4c8",
  },
  {
    name: "EduManager Desktop",
    year: "2024",
    type: "Desktop App",
    description: "Logiciel de gestion scolaire complet avec exports PDF/Excel automatisés pour le suivi des notes et la facturation.",
    stack: ["JavaFX", "Spring Boot", "Hibernate", "PostgreSQL"],
    highlights: ["Architecture MVC", "Exports automatisés"],
    link: "#",
    color: "#00b4c8",
  },
  {
    name: "TogoFreelance",
    year: "2024",
    type: "Web Platform",
    description: "Plateforme centralisée de mise en relation entre entreprises togolaises et freelances qualifiés dans le numérique.",
    stack: ["React", "Tailwind", "Express", "MySQL"],
    highlights: ["Mise en relation", "Profils vérifiés"],
    link: "#",
    color: "#00b4c8",
  },
  {
    name: "PayTicket Pro API",
    year: "2024",
    type: "Fintech API",
    description: "Passerelle de paiement et billetterie intégrant Flooz et T-Money, avec gestion des transactions et génération de QR Codes sécurisés.",
    stack: ["Spring Boot", "PostgreSQL", "Redis", "OAuth2"],
    highlights: ["Mobile Money", "Sécurité Bancaire"],
    link: "#",
    color: "#00b4c8",
  },
  {
    name: "CloudBuild CI",
    year: "2024",
    type: "DevOps Tool",
    description: "Pipeline personnalisé d'intégration et de déploiement continu, analysant le code et déployant automatiquement sur des conteneurs Linux.",
    stack: ["GitHub Actions", "Docker", "Node.js", "Bash"],
    highlights: ["Automatisation", "Déploiement Continu"],
    link: "#",
    color: "#00b4c8",
  }
];

export const services = [
  {
    icon: "Globe",
    title: "Développement Web",
    description: "Création d'applications web modernes et performantes avec React, Vue.js et Node.js. Focus sur l'expérience utilisateur et l'accessibilité.",
  },
  {
    icon: "Smartphone",
    title: "Développement Mobile",
    description: "Applications mobiles cross-platform avec Flutter pour iOS et Android. Interfaces belles et fluides.",
  },
  {
    icon: "Server",
    title: "Backend & API",
    description: "Conception d'APIs REST sécurisées avec Node.js, Express et Spring Boot. Architecture propre, JWT et déploiement.",
  },
  {
    icon: "Layers",
    title: "DevOps & CI/CD",
    description: "Dockerisation, pipelines GitHub Actions, déploiement sur VPS Linux (Nginx) et Edge Computing (Cloudflare).",
  },
];

export const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "React / TypeScript", level: 90 },
      { name: "Vue.js 3", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Flutter", level: 80 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "Spring Boot", level: 82 },
      { name: "REST API / JWT / OAuth2", level: 85 },
    ],
  },
  {
    category: "Bases de données & DevOps",
    skills: [
      { name: "PostgreSQL / MySQL", level: 85 },
      { name: "MongoDB / Redis", level: 80 },
      { name: "Docker / GitHub Actions", level: 85 },
      { name: "Nginx / Linux VPS", level: 80 },
    ],
  },
];

export const techStack = [
  "React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "Sass", "Flutter",
  "Node.js", "Express", "Spring Boot", "Java", "Prisma", "GraphQL",
  "PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase", "Supabase",
  "Docker", "GitHub Actions", "Nginx", "Linux VPS", "AWS", "Cloudflare",
  "Git", "Figma", "Vite", "Vercel", "Postman"
];
