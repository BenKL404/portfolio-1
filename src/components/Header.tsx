import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuLine, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import type { Theme } from '../hooks/useTheme';
import type { Lang } from '../App';
import { scrollTo } from './ui';

interface Props {
  active: string;
  theme: Theme;
  onToggleTheme: () => void;
  lang: Lang;
  onSwitchLang: (l: Lang) => void;
}

export default function Header({ active, theme, onToggleTheme, lang, onSwitchLang }: Props) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isDark = theme === 'dark';

  const NAV = [
    { id: 'about',    label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'skills',   label: t('nav.skills') },
    { id: 'contact',  label: t('nav.contact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloque le défilement de la page quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (id: string) => { scrollTo(id); setOpen(false); };

  const themeLabel = isDark ? t('theme.light') : t('theme.dark');

  const LangSwitch = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-1 meta ${className}`}>
      {(['fr', 'en'] as Lang[]).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted">/</span>}
          <button
            onClick={() => onSwitchLang(l)}
            aria-current={lang === l ? 'true' : undefined}
            className={`uppercase px-0.5 ${lang === l ? 'text-fg font-medium underline underline-offset-4 decoration-signal' : 'text-muted hover:text-fg'}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 border-b transition-shadow duration-300 ${
          scrolled || open ? 'shadow-[0_1px_0_0_var(--fg)]' : ''
        }`}
        style={{ background: 'var(--bg)', borderColor: 'var(--rule)' }}
      >
        <div className="max-w-page mx-auto h-16 px-4 sm:px-6 lg:px-10 flex items-center gap-6">
          <button onClick={() => go('home')} className="flex items-baseline gap-1.5 shrink-0" aria-label="Bernard Kokou Kpedzi">
            <span className="display text-[1.9rem] leading-none">Kpedzi</span>
            <span className="w-2 h-2 bg-signal" aria-hidden />
          </button>

          <nav className="hidden lg:flex flex-1 justify-center items-center gap-7" aria-label="Navigation">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`kicker py-1 border-b-2 transition-colors ${
                  active === id ? 'border-signal text-fg' : 'border-transparent text-muted hover:text-fg'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="ml-auto lg:ml-0 flex items-center gap-4">
            <LangSwitch className="hidden sm:flex" />
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 flex items-center justify-center border border-rule hover:border-fg transition-colors"
              aria-label={themeLabel}
              title={themeLabel}
            >
              {isDark ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
            </button>
            <button onClick={() => go('contact')} className="btn btn-signal hidden md:inline-flex min-h-[2.5rem]">
              {t('hero.cta_contact')}
            </button>
            <button
              onClick={() => setOpen(o => !o)}
              className="lg:hidden w-9 h-9 flex items-center justify-center"
              aria-expanded={open}
              aria-label={open ? t('nav.close') : t('nav.menu')}
            >
              {open ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 px-4 sm:px-6 pt-6 pb-10 flex flex-col overflow-y-auto lg:hidden"
            style={{ background: 'var(--bg)' }}
          >
            <nav className="flex flex-col" aria-label="Navigation">
              {NAV.map(({ id, label }, i) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className="flex items-baseline gap-4 py-3 border-b border-rule text-left"
                >
                  <span className="meta text-signal-text">0{i + 1}</span>
                  <span className={`display text-5xl ${active === id ? 'text-signal' : ''}`}>{label}</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto flex items-center justify-between">
              <LangSwitch />
              <button onClick={() => go('contact')} className="btn btn-signal">{t('hero.cta_contact')}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
