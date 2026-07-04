import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useTranslation } from 'react-i18next';
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

const TECH_ICONS: Record<string, { Icon: IconType; color: string }> = {
  'React': { Icon: SiReact, color: '#61dafb' },
  'Next.js': { Icon: SiNextdotjs, color: 'var(--text)' },
  'TypeScript': { Icon: SiTypescript, color: '#3178c6' },
  'Vue.js': { Icon: SiVuedotjs, color: '#42b883' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#38bdf8' },
  'Sass': { Icon: SiSass, color: '#cc6699' },
  'Flutter': { Icon: SiFlutter, color: '#54c5f8' },
  'Node.js': { Icon: SiNodedotjs, color: '#5fa04e' },
  'Express': { Icon: SiExpress, color: '#888' },
  'Spring Boot': { Icon: SiSpringboot, color: '#6db33f' },
  'Java': { Icon: FaJava, color: '#007396' },
  'PostgreSQL': { Icon: SiPostgresql, color: '#336791' },
  'MongoDB': { Icon: SiMongodb, color: '#47a248' },
  'Redis': { Icon: SiRedis, color: '#dc382d' },
  'MySQL': { Icon: SiMysql, color: '#4479a1' },
  'Firebase': { Icon: SiFirebase, color: '#ffca28' },
  'Docker': { Icon: SiDocker, color: '#2496ed' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088ff' },
  'Nginx': { Icon: SiNginx, color: '#009639' },
  'Linux VPS': { Icon: SiLinux, color: '#fcc624' },
  'AWS': { Icon: SiAmazonwebservices, color: '#ff9900' },
  'Cloudflare': { Icon: SiCloudflare, color: '#f38020' },
  'Git': { Icon: SiGit, color: '#f05032' },
  'Figma': { Icon: SiFigma, color: '#f24e1e' },
  'Vite': { Icon: SiVite, color: '#646cff' },
  'Vercel': { Icon: SiVercel, color: 'var(--text)' },
  'Postman': { Icon: SiPostman, color: '#ff6c37' },
  'Prisma': { Icon: SiPrisma, color: '#2d3748' },
  'GraphQL': { Icon: SiGraphql, color: '#e10098' },
  'Supabase': { Icon: SiSupabase, color: '#3ecf8e' },
};

function TechBadge({ tech, delay }: { tech: string; delay: number }) {
  const [hov, setHov] = useState(false);
  const entry = TECH_ICONS[tech];
  const color = entry?.color ?? 'var(--accent)';
  const Icon = entry?.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 w-24"
      style={{ transform: hov ? 'translateY(-4px)' : 'none' }}>
      
      {Icon
        ? <Icon size={68} style={{ color: hov ? color : 'var(--text-muted)', transition: 'color 0.3s' }} />
        : <span className="text-xl font-bold" style={{ color: hov ? color : 'var(--text-muted)', transition: 'color 0.3s' }}>{tech.slice(0, 2)}</span>
      }
      <span className="text-xs font-mono text-center leading-tight transition-all duration-300"
        style={{ color: color, opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(-5px)' }}>{tech}</span>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.05 });
  const catLabels = t('skills.categories', { returnObjects: true }) as string[];

  return (
    <section id="skills" ref={ref}>
      <div className="px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-12">
          <p className="section-tag mb-3">{t('skills.tag')}</p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{t('skills.title')}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 mb-10">
          {skillCategories.map((cat, ci) => (
            <motion.div key={cat.category}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: ci * 0.1 }}
              className="rounded-2xl p-6" style={{ background: 'var(--bg)', boxShadow: 'var(--neu-out)' }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--text-muted)', boxShadow: 'var(--neu-in)' }} />
                <p className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  {catLabels[ci] ?? cat.category}
                </p>
              </div>
              <div className="space-y-5">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>{skill.name}</span>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg)', boxShadow: 'var(--neu-in)' }}>
                      <motion.div className="h-full rounded-full" style={{ background: 'var(--accent)' }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.1, delay: ci * 0.1 + si * 0.07, ease: [0.4, 0, 0.2, 1] }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '3rem' }}>
          <p className="text-xs font-mono uppercase tracking-widest mb-8 text-center" style={{ color: 'var(--text-muted)' }}>
            Technologies & outils
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full mb-14 space-y-5 text-[15px] leading-relaxed"
            style={{ color: 'var(--text-sub)' }}
          >
            {(t('skills.description', { returnObjects: true }) as string[]).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>

          <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-12 gap-y-10 w-full">
            {inView && techStack.map((tech, i) => (
              <TechBadge key={tech} tech={tech} delay={0.1 + i * 0.03} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
