import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { personalInfo } from '../data/portfolio';
import { RiMailLine, RiGithubFill, RiLinkedinFill, RiTwitterXFill } from 'react-icons/ri';

function Counter({ to, inView }: { to: number; inView: boolean }) {
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <>{n}</>;
}

export default function About() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const links = [
    { label: 'Email', icon: RiMailLine, href: `mailto:${personalInfo.email}`, value: personalInfo.email },
    { label: 'GitHub', icon: RiGithubFill, href: personalInfo.github, value: `@${personalInfo.githubUsername}` },
    { label: 'LinkedIn', icon: RiLinkedinFill, href: personalInfo.linkedin, value: 'LinkedIn' },
    { label: 'X', icon: RiTwitterXFill, href: personalInfo.twitter, value: personalInfo.twitterUsername },
  ];

  return (
    <section id="about" ref={ref}>
      <div className="px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-12">
          <p className="section-tag mb-3">{t('about.tag')}</p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{t('about.title')}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Photo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }} className="lg:col-span-4 flex flex-col gap-5">
            <div className="relative overflow-hidden group" style={{ borderRadius: '20px', aspectRatio: '4/5', boxShadow: 'var(--neu-out)' }}>
              <img src="/photo.jpg" alt={personalInfo.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ transform: 'scaleX(-1)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-sm font-bold leading-tight">{personalInfo.name}</p>
                <p className="text-white/60 text-xs font-mono mt-0.5">{personalInfo.location}</p>
              </div>
            </div>

            {/* Links horizontaux */}
            <div className="flex flex-wrap gap-3 mt-1">
              {links.map(({ label, icon: Icon, href }, idx) => (
                <a key={idx} href={href} target="_blank" rel="noopener noreferrer"
                  title={label}
                  className="flex-1 h-14 rounded-2xl flex items-center justify-center transition-all duration-250 group"
                  style={{ boxShadow: 'var(--neu-sm)', background: 'var(--bg)' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--neu-hover)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--neu-sm)'; }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300"
                    style={{ background: 'var(--bg)', boxShadow: 'var(--neu-in)', color: 'var(--text-muted)' }}>
                    <Icon size={18} className="group-hover:text-[var(--accent)] transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right col */}
          <div className="lg:col-span-8 flex flex-col gap-7">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}>
              <p className="text-base leading-relaxed mb-3" style={{ color: 'var(--text-sub)' }}>{t('about.bio1')}</p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-sub)' }}>{t('about.bio2')}</p>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.22 }} className="grid grid-cols-3 gap-4">
              {[
                { v: 3, label: t('about.stats.experience') },
                { v: 10, label: t('about.stats.projects') },
                { v: 5, label: t('about.stats.clients') },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-5 text-center" style={{ boxShadow: 'var(--neu-in)', background: 'var(--bg)' }}>
                  <p className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                    <Counter to={s.v} inView={inView} />+
                  </p>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Traits */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Soft skills</p>
              <div className="flex flex-wrap gap-2">
                {(t('about.traits', { returnObjects: true }) as string[]).map((trait) => (
                  <span key={trait} className="px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-default transition-all duration-200"
                    style={{ boxShadow: 'var(--neu-sm)', background: 'var(--bg)', color: 'var(--text-sub)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.boxShadow = 'var(--neu-hover)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-sub)'; e.currentTarget.style.boxShadow = 'var(--neu-sm)'; }}>
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.36 }}>
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Langues</p>
              <div className="flex flex-col sm:flex-row gap-3">
                {[{ lang: 'Français', level: 'Courant', pct: 95 }, { lang: 'Anglais', level: 'Technique', pct: 65 }].map(({ lang, level, pct }) => (
                  <div key={lang} className="flex-1 rounded-xl p-4" style={{ boxShadow: 'var(--neu-out)', background: 'var(--bg)' }}>
                    <div className="flex justify-between mb-2.5">
                      <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{lang}</span>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{level}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg)', boxShadow: 'var(--neu-in)' }}>
                      <motion.div className="h-full rounded-full" style={{ background: 'var(--accent)' }}
                        initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : { width: 0 }}
                        transition={{ duration: 1.1, ease: 'easeOut', delay: 0.5 }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
