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
    <section id="skills" className="py-24 md:py-32 bg-bg-2">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHead index="04" tag={t('skills.tag')} title={t('skills.title')} />

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {skillCategories.map((cat, ci) => (
            <Reveal key={cat.category} delay={ci * 0.05}>
              <p className="kicker text-signal-text pb-3 border-b border-fg">{catLabels[ci] ?? cat.category}</p>
              <ul>
                {cat.skills.map(skill => (
                  <li key={skill.name} className="py-4 border-b border-rule">
                    <div className="flex justify-between items-baseline gap-4 mb-3">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="meta text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-[3px] bg-rule" role="presentation">
                      <motion.div
                        className="h-full bg-signal origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: skill.level / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 grid gap-8 md:grid-cols-3 text-muted leading-relaxed">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </Reveal>

        <div className="mt-20">
          <p className="kicker mb-6">{t('skills.tools')}</p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 border-t border-l border-rule">
            {techStack.map(tech => {
              const Icon = TECH_ICONS[tech];
              return (
                <li key={tech} className="group border-r border-b border-rule flex items-center gap-3 px-4 py-4 hover:bg-fg hover:text-bg transition-colors">
                  {Icon ? <Icon size={18} className="shrink-0 text-muted group-hover:text-signal transition-colors" /> : <span className="w-[18px] h-[18px] shrink-0 bg-rule" aria-hidden />}
                  <span className="text-sm font-medium truncate">{tech}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
