import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { skillCategories, techStack } from '../data/portfolio';
import {
  SiReact, SiTypescript, SiVuedotjs, SiFlutter,
  SiNodedotjs, SiSpringboot, SiExpress,
  SiPostgresql, SiMongodb, SiRedis, SiMysql,
  SiDocker, SiGit, SiGithubactions, SiLinux, SiTailwindcss,
  SiNextdotjs, SiFigma, SiFirebase, SiVite, SiSass, SiNginx,
  SiPrisma, SiGraphql, SiSupabase, SiAmazonwebservices, SiCloudflare, SiVercel, SiPostman
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { Reveal, SectionHead } from './ui';

const TECH_ICONS: Record<string, IconType> = {
  'React': SiReact, 'Next.js': SiNextdotjs, 'TypeScript': SiTypescript, 'Vue.js': SiVuedotjs,
  'Tailwind CSS': SiTailwindcss, 'Sass': SiSass, 'Flutter': SiFlutter, 'Node.js': SiNodedotjs,
  'Express': SiExpress, 'Spring Boot': SiSpringboot, 'Java': FaJava, 'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb, 'Redis': SiRedis, 'MySQL': SiMysql, 'Firebase': SiFirebase,
  'Docker': SiDocker, 'GitHub Actions': SiGithubactions, 'Nginx': SiNginx, 'Linux VPS': SiLinux,
  'AWS': SiAmazonwebservices, 'Cloudflare': SiCloudflare, 'Git': SiGit, 'Figma': SiFigma,
  'Vite': SiVite, 'Vercel': SiVercel, 'Postman': SiPostman, 'Prisma': SiPrisma,
  'GraphQL': SiGraphql, 'Supabase': SiSupabase,
};

export default function Skills() {
  const { t } = useTranslation();
  const catLabels = t('skills.categories', { returnObjects: true }) as string[];
  const paragraphs = t('skills.description', { returnObjects: true }) as string[];

  return (
    <section id="skills" className="relative isolate py-24 md:py-32 bg-bg-2">
      <div aria-hidden className="absolute inset-0 -z-10 pattern-grid fade-edges opacity-50" />
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHead index="04" tag={t('skills.tag')} title={t('skills.title')} />

        <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
          {skillCategories.map((cat, ci) => (
            <Reveal key={cat.category} delay={ci * 0.05}>
              <div className="flex items-baseline gap-3 pb-3 border-b-2 border-fg">
                <span className="display stroke-text text-5xl leading-none">{String(ci + 1).padStart(2, '0')}</span>
                <p className="display text-3xl">{catLabels[ci] ?? cat.category}</p>
              </div>
              <ul>
                {cat.skills.map(skill => {
                  const filled = Math.round(skill.level / 5);
                  return (
                    <li key={skill.name} className="py-4 border-b border-rule">
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <span className="font-semibold">{skill.name}</span>
                        <span className="display text-2xl text-signal-text">{skill.level}<span className="text-base">%</span></span>
                      </div>
                      {/* Barre segmentée, façon égaliseur */}
                      <div className="flex gap-[3px] h-3" role="presentation">
                        {Array.from({ length: 20 }, (_, j) => (
                          <motion.span
                            key={j}
                            className={`flex-1 origin-bottom ${j < filled ? 'bg-signal' : 'bg-rule'}`}
                            initial={{ scaleY: 0.2 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: j * 0.025, ease: [0.2, 0.8, 0.2, 1] }}
                          />
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 grid gap-8 md:grid-cols-3 text-muted leading-relaxed">
          {paragraphs.map((p, i) => <p key={i} className={i === 0 ? 'dropcap' : ''}>{p}</p>)}
        </Reveal>

        {/* Mur typographique des outils */}
        <div className="mt-24">
          <p className="kicker mb-8">{t('skills.tools')}</p>
          <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 md:gap-x-8">
            {techStack.map((tech, i) => {
              const Icon = TECH_ICONS[tech];
              const style = ['', 'stroke-text', 'text-signal', 'stroke-text', ''][i % 5];
              return (
                <li key={tech} className={`group relative display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] cursor-default transition-colors hover:text-signal hover:[-webkit-text-stroke:0] ${style}`}>
                  {tech}
                  {Icon && <Icon aria-hidden className="absolute -top-1 -right-5 text-xl text-muted group-hover:text-signal transition-transform group-hover:rotate-12 group-hover:scale-125" />}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
