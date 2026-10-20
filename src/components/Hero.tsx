import { RiArrowRightLine, RiDownloadLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { cvFiles } from '../data/portfolio';
import { scrollTo } from './ui';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const cv = i18n.language === 'en' ? cvFiles.en : cvFiles.fr;
  const marquee = t('hero.marquee', { returnObjects: true }) as string[];

  const stats = [
    { v: '10+', l: t('hero.stats.projects') },
    { v: '3+',  l: t('hero.stats.experience') },
    { v: '3',   l: t('hero.stats.platforms') },
  ];

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col pt-16">
      <div className="max-w-page w-full mx-auto px-4 sm:px-6 lg:px-10 flex-1 flex flex-col justify-end pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7 lg:pb-10">
            <h1 className="display text-[clamp(3rem,11.5vw,10.5rem)] lg:text-[clamp(5rem,9.4vw,9.5rem)]">
              <span className="rise" style={{ ['--i' as string]: 0 }}><span>{t('hero.line1')}</span></span>
              <span className="rise text-signal" style={{ ['--i' as string]: 1 }}><span>{t('hero.line2')}</span></span>
            </h1>
            <div className="mt-5 md:mt-8">
              <p className="rise" style={{ ['--i' as string]: 2 }}>
                <span className="display text-[clamp(1.45rem,4.6vw,4.25rem)] lg:text-[clamp(2.5rem,4vw,4rem)] whitespace-nowrap">{t('hero.kicker')}</span>
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 mt-10 lg:mt-0 flex justify-center lg:justify-end">
            {/* Copie contourée (masquée par endroits) sous la photo nette */}
            <div className="relative">
              <img
                src="/photo-hero.webp"
                alt=""
                aria-hidden
                width={900}
                height={992}
                className="absolute inset-0 h-full w-full object-contain object-bottom select-none cutout-outline"
              />
              <img
                src="/photo-hero.webp"
                alt="Bernard Kokou Kpedzi"
                width={900}
                height={992}
                fetchPriority="high"
                className="relative h-[clamp(18rem,72vw,26rem)] lg:h-[min(70vh,40rem)] max-w-full w-auto object-contain object-bottom select-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-fg grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-lg md:text-xl leading-relaxed text-muted">{t('hero.bio')}</p>
            <p className="kicker mt-5">{t('hero.available')}</p>
          </div>
          <div className="md:col-span-6 lg:col-span-7 flex flex-wrap gap-3 md:justify-end">
            <button onClick={() => scrollTo('contact')} className="btn btn-signal">
              {t('hero.cta_contact')} <RiArrowRightLine size={16} />
            </button>
            <button onClick={() => scrollTo('projects')} className="btn btn-line">
              {t('hero.cta_projects')}
            </button>
            <a href={cv} download className="btn btn-line">
              <RiDownloadLine size={16} /> {t('hero.cta_cv')}
            </a>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-3 border-t border-rule">
          {stats.map(({ v, l }, i) => (
            <div key={l} className={`pt-5 ${i > 0 ? 'pl-4 sm:pl-6 border-l border-rule' : ''}`}>
              <dt className="sr-only">{l}</dt>
              <dd className="display text-5xl md:text-6xl">{v}</dd>
              <dd className="kicker text-muted mt-2">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Bandeau défilant */}
      <div className="bg-fg text-bg overflow-hidden border-y border-fg" aria-hidden>
        <div className="marquee flex w-max">
          {[0, 1].map(k => (
            <div key={k} className="flex shrink-0">
              {[...marquee, ...marquee].map((m, i) => (
                <span key={`${k}-${i}`} className="display text-3xl md:text-4xl py-4 px-6 flex items-center gap-6 whitespace-nowrap">
                  {m} <span className="text-signal">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
