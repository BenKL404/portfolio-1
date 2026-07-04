import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuLine, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import type { Theme } from '../hooks/useTheme';

type Lang = 'fr' | 'en';

interface Props {
  active: string;
  theme: Theme;
  onToggleTheme: () => void;
  lang?: Lang;
  onSwitchLang?: (l: Lang) => void;
}

export default function Header({ active, theme, onToggleTheme }: Props) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isDark = theme === 'dark';


  const NAV = [
    { id: 'home',     label: t('nav.home') },
    { id: 'about',    label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'skills',   label: t('nav.skills') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const bg = scrolled ? 'var(--bg)' : 'transparent';
  const border = scrolled ? '1px solid var(--line)' : '1px solid transparent';
  const shadow = scrolled ? 'var(--neu-sm)' : 'none';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >

        {/* ── MOBILE: old pill layout ── */}
        <div className="md:hidden flex justify-center">
          <div
            className="w-full flex items-center justify-between px-5 py-3 rounded-2xl"
            style={{
              background: bg,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: border,
              boxShadow: shadow,
              transition: 'all 0.25s ease',
            }}
          >
            <button onClick={() => go('home')} className="flex items-center gap-2.5 shrink-0">
              <img src="/icon.ico" alt="logo" className="w-7 h-7 rounded-lg object-contain" style={{ transform: 'scaleX(-1)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                BERNARD <strong>KPEDZI</strong>
              </span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--cyan-dim)', border: '1px solid var(--cyan-border)', color: 'var(--cyan)' }}
              >
                {isDark ? <RiSunLine size={14} /> : <RiMoonLine size={14} />}
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="p-1.5 rounded-lg"
                style={{ color: 'var(--text-muted)' }}
              >
                {open ? <RiCloseLine size={18} /> : <RiMenuLine size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── DESKTOP: logo left / pill center / CTA right ── */}
        <div className="hidden md:flex items-center px-8" style={{ height: '52px' }}>

          {/* Left — logo + name (fade on scroll) */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2.5 shrink-0"
            style={{
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? 'none' : 'auto',
              transition: 'opacity 0.3s ease',
            }}
          >
            <img src="/icon.ico" alt="logo" className="w-10 h-10 rounded-xl object-contain" style={{ transform: 'scaleX(-1)' }} />
            <span className="text-base font-bold" style={{ color: 'var(--text)' }}>
            BERNARD <strong>KPEDZI</strong>
            </span>
          </button>

          {/* Center — floating nav pill */}
          <div className="flex-1 flex justify-center">
            <div
              className="flex items-center gap-0.5 px-3 py-2 rounded-2xl"
              style={{
                background: bg,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: border,
                boxShadow: shadow,
                transition: 'all 0.25s ease',
              }}
            >
              {NAV.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => go(id)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg"
                    style={{
                      color: isActive ? 'var(--cyan)' : 'var(--text-muted)',
                      background: isActive ? 'var(--cyan-dim)' : 'transparent',
                      border: `1px solid ${isActive ? 'var(--cyan-border)' : 'transparent'}`,
                      transition: 'color 0.22s ease, background 0.22s ease, border-color 0.22s ease',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
              {/* Theme toggle */}
              <button
                onClick={onToggleTheme}
                className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--cyan-dim)', border: '1px solid var(--cyan-border)', color: 'var(--cyan)' }}
                title={isDark ? 'Light mode' : 'Dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    {isDark ? <RiSunLine size={14} /> : <RiMoonLine size={14} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Right — CTA (fade on scroll) */}
          <button
            onClick={() => go('contact')}
            className="px-5 py-2 text-sm font-semibold rounded-lg hover:opacity-80 shrink-0"
            style={{
              background: 'var(--cyan)',
              color: isDark ? '#0a0a0a' : '#fff',
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? 'none' : 'auto',
              transition: 'opacity 0.3s ease',
            }}
          >
            {t('hero.cta_contact')}
          </button>
        </div>

      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-3"
            style={{
              background: isDark ? 'rgba(10,10,10,0.95)' : 'rgba(236,240,243,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--cyan-border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors"
                style={{ color: active === id ? 'var(--cyan)' : 'var(--text-dim)' }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
