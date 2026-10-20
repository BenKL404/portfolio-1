export const personalInfo = {
  name: "Bernard Kokou Kpedzi",
  phone: "+228 92 86 60 99",
  email: "kpedzibernard@gmail.com",
  location: "Lomé, Togo",
  github: "https://github.com/BENLK404",
  linkedin: "https://www.linkedin.com/in/kokou-bernard-kpedzi-b47b2418a/",
  twitter: "https://x.com/BLKB44058",
  githubUsername: "BENLK404",
  linkedinName: "Kokou Bernard Kpedzi",
};

export const cvFiles = {
  fr: "/CV_KPEDZI_KOKOU_BERNARD_FR.pdf",
  en: "/CV_KPEDZI_KOKOU_BERNARD_EN.pdf",
} as const;

export type ProjectLink = { kind: 'live' | 'source' | 'private'; href?: string };

export interface Project {
  id: string;
  year: string;
  stack: string[];
  link: ProjectLink;
  image?: string;
  featured?: boolean;
}

// Textes (nom, type, description) : src/i18n/*.json → projects.items[id]
export const projects: Project[] = [
  { id: "lk-vault", year: "2025", featured: true, image: "/projects/lkvault.webp",
    stack: ["Electron", "React", "TypeScript", "Rust", "Prisma"],
    link: { kind: "live", href: "https://lkvault.lkfondation.com/" } },
  { id: "lk-facture", year: "2024", featured: true, image: "/projects/lkfacture.webp",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Auth.js"],
    link: { kind: "private" } },
  { id: "koritech", year: "2025", featured: true, image: "/projects/koritech.webp",
    stack: ["Spring Boot", "Java", "React", "PostgreSQL"],
    link: { kind: "private" } },
  { id: "loki", year: "2025", featured: true, image: "/projects/loky.webp",
    stack: ["Electron", "React", "MUI", "PostgreSQL", "Prisma", "Groq"],
    link: { kind: "private" } },
  { id: "lk-immo", year: "2026", featured: true, image: "/projects/lkimmo.webp",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    link: { kind: "live", href: "https://lk-immo.vercel.app/" } },
  { id: "pydm", year: "2026", featured: true, image: "/projects/pydm.webp",
    stack: ["Python", "Qt 6", "yt-dlp", "GPLv3"],
    link: { kind: "source", href: "https://github.com/BENLK404/pydm" } },
  { id: "lumen", year: "2026", featured: true, image: "/projects/lumen.webp",
    stack: ["Rust", "Qt 6 / QML", "libmpv"],
    link: { kind: "source", href: "https://github.com/BENLK404/lumen" } },
  { id: "lkm-player", year: "2025", featured: true, image: "/projects/lkmplayer.webp",
    stack: ["Flutter", "Dart", "FastAPI", "MIT"],
    link: { kind: "source", href: "https://github.com/BENLK404/lkm-player" } },
  { id: "togomarche", year: "2025", featured: true, image: "/projects/togomarche.webp",
    stack: ["React", "Cloudflare Workers", "Edge"],
    link: { kind: "live", href: "https://e-commerce.kpedzibernard.workers.dev/" } },
  { id: "urgencevie", year: "2025",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Socket.io"],
    link: { kind: "private" } },
  { id: "alloartisan", year: "2025",
    stack: ["Flutter", "Firebase", "Node.js"],
    link: { kind: "private" } },
  { id: "stockbridge", year: "2024",
    stack: ["Express", "Redis", "MongoDB", "JWT"],
    link: { kind: "private" } },
  { id: "edumanager", year: "2024",
    stack: ["JavaFX", "Spring Boot", "Hibernate", "PostgreSQL"],
    link: { kind: "private" } },
  { id: "togofreelance", year: "2024",
    stack: ["React", "Tailwind", "Express", "MySQL"],
    link: { kind: "private" } },
  { id: "payticket", year: "2024",
    stack: ["Spring Boot", "PostgreSQL", "Redis", "OAuth2"],
    link: { kind: "private" } },
  { id: "cloudbuild", year: "2024",
    stack: ["GitHub Actions", "Docker", "Node.js", "Bash"],
    link: { kind: "private" } },
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
