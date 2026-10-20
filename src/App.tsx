import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { RiArrowUpLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { scrollTo } from './components/ui';

const SECTIONS = ['home', 'about', 'services', 'projects', 'skills', 'contact'];
export type Lang = 'fr' | 'en';

function PortfolioPage() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState('home');
  const [showTop, setShowTop] = useState(false);
  const { theme, toggle } = useTheme();

  const currentLang: Lang = lang === 'en' || lang === 'fr' ? lang : 'fr';

  // Sync i18n with URL lang
  useEffect(() => {
    i18n.changeLanguage(currentLang);
    document.documentElement.lang = currentLang;
  }, [currentLang, i18n]);

  const switchLang = (l: Lang) => {
    const newPath = location.pathname.replace(`/${currentLang}`, `/${l}`);
    navigate(newPath || `/${l}`);
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-fg">
        <Header active={active} theme={theme} onToggleTheme={toggle} lang={currentLang} onSwitchLang={switchLang} />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer lang={currentLang} onSwitchLang={switchLang} />
        <CookieConsent />

        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={() => scrollTo('home')}
              className="fixed bottom-5 right-5 z-40 w-12 h-12 flex items-center justify-center bg-signal text-[color:var(--on-signal)] hover:bg-fg hover:text-bg transition-colors"
              aria-label={t('footer.top')}
              title={t('footer.top')}
            >
              <RiArrowUpLine size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default function App() {
  // Detect browser language for default redirect
  const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${browserLang}`} replace />} />
      <Route path="/:lang" element={<PortfolioPage />} />
      <Route path="*" element={<Navigate to={`/${browserLang}`} replace />} />
    </Routes>
  );
}
