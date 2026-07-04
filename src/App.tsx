import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowUpLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

const SECTIONS = ['home', 'about', 'services', 'projects', 'skills', 'contact'];
type Lang = 'fr' | 'en';

function PortfolioPage() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const [active, setActive] = useState('home');
  const [showTop, setShowTop] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const { theme, toggle } = useTheme();

  const currentLang: Lang = lang === 'en' || lang === 'fr' ? lang : 'fr';

  // Sync i18n with URL lang
  useEffect(() => {
    i18n.changeLanguage(currentLang);
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
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;
      setScrollPct(pct);
      setShowTop(scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <AnimatedBackground theme={theme} />
      <CustomCursor />
      <Header active={active} theme={theme} onToggleTheme={toggle} lang={currentLang} onSwitchLang={switchLang} />
      <main className="relative z-10 pt-20">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>

      <CookieConsent />

      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200"
            style={{ background: 'var(--card)' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="Back to top"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="20" fill="none" stroke="var(--border)" strokeWidth="2" />
              <circle
                cx="22" cy="22" r="20"
                fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollPct)}`}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
            <RiArrowUpLine size={15} style={{ color: 'var(--cyan)', position: 'relative' }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
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
