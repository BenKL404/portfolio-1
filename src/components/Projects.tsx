import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { RiArrowRightUpLine, RiExternalLinkLine } from 'react-icons/ri';
import { projects as projectsData } from '../data/portfolio';

export default function Projects() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.05 });
  const projectsI18n = t('projects.items', { returnObjects: true }) as {
    name: string; type: string; description: string;
  }[];
  const projects = projectsData.map((p, i) => ({
    ...p,
    name: projectsI18n[i]?.name ?? p.name,
    type: projectsI18n[i]?.type ?? p.type,
    description: projectsI18n[i]?.description ?? p.description,
  }));
  const [hovered, setHovered] = useState<number | null>(null);
  const [featured, ...rest] = projects;

  const openLink = (url?: string) => { if (url && url !== '#') window.open(url, '_blank'); };

  return (
    <section id="projects" ref={ref}>
      <div className="px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-12">
          <p className="section-tag mb-3">{t('projects.tag')}</p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{t('projects.title')}</h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            onClick={() => openLink(featured.link)}
            onMouseEnter={() => setHovered(0)} onMouseLeave={() => setHovered(null)}
            className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 p-6 lg:p-8"
            style={{ background: 'var(--bg)', boxShadow: hovered === 0 ? 'var(--neu-hover)' : 'var(--neu-out)', transform: hovered === 0 ? 'translateY(-3px)' : 'none' }}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold"
                    style={{ background: 'var(--bg)', boxShadow: 'var(--neu-in)', color: 'var(--text-sub)' }}>
                    ★ Projet phare
                  </span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{featured.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 transition-colors duration-300"
                  style={{ color: 'var(--text)' }}>
                  {featured.name}
                </h3>
                <p className="text-sm leading-relaxed mb-4 max-w-xl" style={{ color: 'var(--text-sub)' }}>{featured.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {featured.stack.map(tech => <span key={tech} className="px-2 py-0.5 rounded text-xs font-mono" style={{boxShadow: 'var(--neu-sm)', color: 'var(--text-muted)'}}>{tech}</span>)}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group"
                style={{ background: 'var(--bg)', boxShadow: hovered === 0 ? 'var(--neu-out)' : 'var(--neu-in)' }}>
                <RiArrowRightUpLine size={20} style={{ color: hovered === 0 ? 'var(--accent)' : 'var(--text-muted)' }} />
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p, idx) => {
              const i = idx + 1;
              const isHov = hovered === i;
              return (
                <motion.div key={p.name}
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.08 + idx * 0.08 }}
                  onClick={() => openLink(p.link)}
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                  className="rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 p-5"
                  style={{ background: 'var(--bg)', boxShadow: isHov ? 'var(--neu-hover)' : 'var(--neu-out)', transform: isHov ? 'translateY(-3px)' : 'none' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{p.type} · {p.year}</span>
                      <h3 className="text-sm font-bold mt-1 transition-colors duration-300"
                        style={{ color: 'var(--text)' }}>{p.name}</h3>
                    </div>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{ background: 'var(--bg)', boxShadow: isHov ? 'var(--neu-out)' : 'var(--neu-in)' }}>
                      <RiExternalLinkLine size={14} style={{ color: isHov ? 'var(--accent)' : 'var(--text-muted)' }} />
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-sub)' }}>{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map(tech => <span key={tech} className="px-2 py-0.5 rounded text-xs font-mono" style={{boxShadow: 'var(--neu-sm)', color: 'var(--text-muted)'}}>{tech}</span>)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
