import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { Building2, MapPin, ChevronDown, ChevronRight } from 'lucide-react';

export default function Resume() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.05 });
  const experiences = t('experiences', { returnObjects: true }) as {
    title: string; company: string; subtitle: string; period: string; tasks: string[];
  }[];
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  return (
    <section id="resume" ref={ref}>
      <div className="px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-12">
          <p className="section-tag mb-3">{t('resume.tag')}</p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{t('resume.title')}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-2 sticky top-24">
            {experiences.map((exp, i) => {
              const isActive = expandedIdx === i;
              return (
                <button key={i} onClick={() => setExpandedIdx(isActive ? null : i)}
                  className="flex items-center justify-between text-left px-4 py-3 rounded-xl transition-all duration-250 cursor-pointer"
                  style={{
                    background: 'var(--bg)',
                    boxShadow: isActive ? 'var(--neu-in)' : 'var(--neu-sm)',
                    color: isActive ? 'var(--text)' : 'var(--text-sub)',
                  }}>
                  <div>
                    <p className="text-sm font-semibold">{exp.company}</p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{exp.period}</p>
                  </div>
                  <ChevronRight size={14} style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)', transform: isActive ? 'scale(1.2)' : 'none' }} />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                {expandedIdx !== null && (() => {
                  const exp = experiences[expandedIdx];
                  return (
                    <motion.div key={expandedIdx}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl overflow-hidden"
                      style={{ background: 'var(--bg)', boxShadow: 'var(--neu-out)' }}>
                      <div className="p-6 pb-5" style={{ borderBottom: '1px solid var(--line)' }}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: 'var(--bg)', boxShadow: 'var(--neu-in)' }}>
                            <Building2 size={18} style={{ color: 'var(--text-muted)' }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>{exp.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs">
                              <span className="font-semibold font-mono" style={{ color: 'var(--text-sub)' }}>{exp.company}</span>
                              {exp.subtitle && (
                                <span className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                  <MapPin size={11} />{exp.subtitle}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="shrink-0 px-3 py-1.5 rounded-full text-xs font-mono font-medium"
                            style={{ background: 'var(--bg)', boxShadow: 'var(--neu-in)', color: 'var(--text-muted)' }}>
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        {exp.tasks.map((task, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: 'var(--bg)', boxShadow: 'var(--neu-in)' }}>
                              <ChevronRight size={11} style={{ color: 'var(--text-muted)' }} />
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>{task}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-3 lg:hidden">
              {experiences.map((exp, i) => {
                const isOpen = expandedIdx === i;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: 'var(--bg)', boxShadow: isOpen ? 'var(--neu-in)' : 'var(--neu-out)' }}>
                    <button onClick={() => setExpandedIdx(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left">
                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>{exp.title}</p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{exp.company} · {exp.period}</p>
                      </div>
                      <ChevronDown size={16} className="shrink-0 ml-3 transition-transform duration-250"
                        style={{ color: 'var(--text-muted)', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="px-4 pb-4 pt-3 space-y-2.5" style={{ borderTop: '1px solid var(--line)' }}>
                            {exp.subtitle && (
                              <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                <MapPin size={11} />{exp.subtitle}
                              </p>
                            )}
                            {exp.tasks.map((task, j) => (
                              <div key={j} className="flex items-start gap-2.5">
                                <ChevronRight size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }} />
                                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>{task}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
