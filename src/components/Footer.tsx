import { useTranslation } from 'react-i18next';
import { RiDownloadLine } from 'react-icons/ri';
import { cvFiles, personalInfo } from '../data/portfolio';
import type { Lang } from '../App';
import { scrollTo } from './ui';

export default function Footer({ lang, onSwitchLang }: { lang: Lang; onSwitchLang: (l: Lang) => void }) {
  const { t } = useTranslation();

  return (
    <footer className="invert-scope bg-bg text-fg">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-10 pb-8">
        <div className="border-t border-rule pt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <button onClick={() => scrollTo('home')} className="md:col-span-7 text-left" aria-label={t('footer.top')}>
            <span className="display block text-[clamp(4rem,16vw,13rem)] leading-[0.8]">
              Kpedzi<span className="text-signal">.</span>
            </span>
          </button>
          <div className="md:col-span-5 flex flex-col gap-5 md:items-end">
            <p className="text-muted">{t('footer.tagline')}</p>
            <a href={`mailto:${personalInfo.email}`} className="font-medium link-underline">{personalInfo.email}</a>
            <div className="flex items-center gap-3">
              <span className="kicker text-muted">{t('footer.cv')}</span>
              {([['fr', t('footer.cv_fr')], ['en', t('footer.cv_en')]] as const).map(([l, label]) => (
                <a
                  key={l}
                  href={cvFiles[l]}
                  download
                  className="kicker flex items-center gap-1.5 px-3 py-1.5 border border-rule hover:border-fg hover:bg-fg hover:text-bg transition-colors"
                >
                  <RiDownloadLine size={14} /> {label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="kicker text-muted">{t('footer.language')}</span>
              {(['fr', 'en'] as Lang[]).map(l => (
                <button
                  key={l}
                  onClick={() => onSwitchLang(l)}
                  aria-current={lang === l ? 'true' : undefined}
                  className={`kicker px-3 py-1.5 border ${lang === l ? 'bg-fg text-bg border-fg' : 'border-rule text-muted hover:text-fg hover:border-fg'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-5 border-t border-rule flex flex-wrap justify-between gap-3 meta text-muted">
          <span>© {new Date().getFullYear()} {personalInfo.name}</span>
          <span>{t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
