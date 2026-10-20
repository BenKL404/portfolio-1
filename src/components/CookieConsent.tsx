import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'cookie_consent';

function Toggle({ on, onClick, disabled }: { on: boolean; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={onClick}
      className={`shrink-0 w-10 h-5 p-0.5 flex border transition-colors ${on ? 'bg-signal border-signal' : 'bg-transparent border-rule'} disabled:opacity-70`}
    >
      <span className={`w-3.5 h-3.5 transition-transform ${on ? 'bg-[color:var(--on-signal)] translate-x-5' : 'bg-muted'}`} />
    </button>
  );
}

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* stockage indisponible */ }
    if (!stored) {
      const id = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(id);
    }
  }, []);

  const save = (acceptAll: boolean) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ necessary: true, analytics: acceptAll || analytics, date: Date.now() })
      );
    } catch { /* stockage indisponible */ }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-title"
          className="fixed bottom-0 sm:bottom-5 inset-x-0 sm:left-5 sm:right-auto z-[100] sm:max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-bg text-fg border border-fg p-5 shadow-[6px_6px_0_0_var(--signal)] max-h-[90dvh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 id="cookie-title" className="display text-2xl">{t('cookies.title')}</h3>
              <button onClick={() => save(false)} className="text-muted hover:text-fg" aria-label={t('nav.close')}>
                <RiCloseLine size={18} />
              </button>
            </div>
            <p className="text-sm leading-relaxed text-muted mb-4">{t('cookies.description')}</p>

            <button onClick={() => setExpanded(v => !v)} className="kicker flex items-center gap-1 text-signal-text mb-4" aria-expanded={expanded}>
              {expanded ? <RiArrowUpSLine size={16} /> : <RiArrowDownSLine size={16} />}
              {t('cookies.settings')}
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-rule mb-4">
                    <div className="flex items-start justify-between gap-4 py-3 border-b border-rule">
                      <div>
                        <p className="text-sm font-semibold">{t('cookies.necessary')}</p>
                        <p className="text-xs text-muted mt-0.5">{t('cookies.necessary_desc')}</p>
                      </div>
                      <Toggle on disabled />
                    </div>
                    <div className="flex items-start justify-between gap-4 py-3 border-b border-rule">
                      <div>
                        <p className="text-sm font-semibold">{t('cookies.analytics')}</p>
                        <p className="text-xs text-muted mt-0.5">{t('cookies.analytics_desc')}</p>
                      </div>
                      <Toggle on={analytics} onClick={() => setAnalytics(v => !v)} />
                    </div>
                    <button onClick={() => save(false)} className="btn btn-line w-full mt-3 min-h-[2.5rem]">{t('cookies.save')}</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              <button onClick={() => save(false)} className="btn btn-line flex-1 min-h-[2.5rem]">{t('cookies.decline')}</button>
              <button onClick={() => save(true)} className="btn btn-signal flex-1 min-h-[2.5rem]">{t('cookies.accept')}</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
