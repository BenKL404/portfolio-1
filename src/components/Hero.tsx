import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { RiArrowRightLine, RiDownloadLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { cvFiles, personalInfo } from '../data/portfolio';
import { scrollTo, Stretchy, Magnetic, CountUp } from './ui';

const S = (v: Record<string, string>) => v as CSSProperties;
const SHAPES = [
  { glyph: '✦', cls: 'text-signal text-5xl top-[14%] left-[6%]',  style: S({ '--dur': '9s', '--fr': '90deg' }) },
  { glyph: '+', cls: 'text-fg text-6xl font-light top-[20%] left-[40%]', style: S({ '--dur': '7s', '--delay': '-2s', '--fx': '-14px' }) },
  { glyph: '○', cls: 'text-signal text-7xl top-[10%] right-[38%]', style: S({ '--dur': '11s', '--fy': '30px' }) },
  { glyph: '✕', cls: 'text-fg text-4xl bottom-[38%] left-[3%]', style: S({ '--dur': '8s', '--delay': '-4s', '--fr': '-60deg' }) },
  { glyph: '◆', cls: 'text-signal text-3xl bottom-[30%] right-[4%]', style: S({ '--dur': '6s', '--fx': '-20px', '--fr': '45deg' }) },
  { glyph: '✦', cls: 'text-fg text-2xl top-[16%] left-[26%]', style: S({ '--dur': '10s', '--delay': '-6s' }) },
];

/** Bandeau défilant ; `items` doublés pour une boucle sans couture. */
function Tape({ items, className, reverse }: { items: string[]; className: string; reverse?: boolean }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`marquee ${reverse ? 'marquee-reverse' : ''} flex w-max`}>
        {[0, 1].map(k => (
          <div key={k} className="flex shrink-0">
            {[...items, ...items].map((m, i) => (
              <span key={`${k}-${i}`} className="display text-3xl md:text-4xl py-4 px-6 flex items-center gap-6 whitespace-nowrap">
                {m} <span className={reverse ? '' : 'text-signal'}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Badge rond au texte circulaire qui tourne lentement. */
function SpinBadge({ text }: { text: string }) {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-bg border border-fg flex items-center justify-center" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full spin-slow">
        <defs><path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="kicker" style={{ fontSize: '8.4px', fill: 'var(--fg)' }}>
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <span className="text-signal text-2xl md:text-3xl">✦</span>
    </div>
  );
}

export default function Hero() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Parallaxe : chaque plan défile à sa propre vitesse pour créer de la profondeur
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 90]);
  const yDots  = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 180]);
  const yMark  = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -140]);
  const cv = i18n.language === 'en' ? cvFiles.en : cvFiles.fr;
  const marquee = t('hero.marquee', { returnObjects: true }) as string[];

  const stats = [
    { v: '10+', l: t('hero.stats.projects') },
    { v: '3+',  l: t('hero.stats.experience') },
    { v: '3',   l: t('hero.stats.platforms') },
  ];

  return (
    <section ref={ref} id="home" className="relative isolate min-h-[100svh] flex flex-col pt-16">
      {/* Trame de plan en fond, estompée vers les bords */}
      <div aria-hidden className="absolute inset-0 -z-10 pattern-grid fade-edges opacity-70" />
      {/* Formes qui flottent lentement */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {SHAPES.map((sh, i) => (
          <span key={i} className={`absolute float hidden md:block ${sh.cls}`} style={sh.style}>{sh.glyph}</span>
        ))}
      </div>
      {/* Texte vertical en marge */}
      <p aria-hidden className="hidden xl:block absolute left-4 top-1/2 -translate-y-1/2 -rotate-180 [writing-mode:vertical-rl] meta text-muted tracking-[0.3em]">
        PORTFOLIO — {new Date().getFullYear()} — {personalInfo.location.toUpperCase()}
      </p>
      <div className="max-w-page w-full mx-auto px-4 sm:px-6 lg:px-10 flex-1 flex flex-col justify-end pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="relative lg:grid lg:grid-cols-12 lg:items-end lg:gap-8">
          {/* Repères d'imprimerie aux coins */}
          <span aria-hidden className="crop crop-tl -translate-x-3 -translate-y-3" />
          <span aria-hidden className="crop crop-tr translate-x-3 -translate-y-3 hidden lg:block" />
          <div className="lg:col-span-7 lg:pb-10">
            <h1 className="display text-[clamp(3rem,11.5vw,10.5rem)] lg:text-[clamp(5rem,9.4vw,9.5rem)]">
              <span className="rise" style={{ ['--i' as string]: 0 }}><Stretchy className="riso" text={t('hero.line1')} /></span>
              <span className="rise text-signal" style={{ ['--i' as string]: 1 }}><Stretchy className="riso-ink" text={t('hero.line2')} /></span>
            </h1>
            {/* Taille relative à la largeur de la colonne (~13em de texte) pour tenir sur une ligne */}
            <div className="mt-5 md:mt-8 [container-type:inline-size]">
              <p className="rise" style={{ ['--i' as string]: 2 }}>
                <span className="display [font-size:min(4.25rem,7.4cqi)] whitespace-nowrap">{t('hero.kicker')}</span>
              </p>
            </div>
          </div>
          <div className="relative lg:col-span-5 mt-10 lg:mt-0 flex justify-center lg:justify-end">
            {/* Monogramme géant en contour, derrière la photo */}
            <motion.span aria-hidden style={{ y: yMark }}
              className="absolute -z-10 right-0 lg:-right-6 -top-8 display stroke-text opacity-25 text-[clamp(11rem,40vw,17rem)] lg:text-[clamp(14rem,22vw,22rem)] select-none pointer-events-none">
              LK
            </motion.span>
            {/* Disque en demi-teinte cyan */}
            <motion.div aria-hidden style={{ y: yDots, ['--dot' as string]: 'var(--signal)' }}
              className="absolute -z-10 top-[8%] left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-[8%] w-[min(85vw,26rem)] lg:w-[min(36vw,32rem)] aspect-square rounded-full pattern-dots fade-radial" />

            {/* Copie contourée (masquée par endroits) sous la photo nette */}
            <motion.div className="group relative" style={{ y: yPhoto }}>
              {/* Passage cyan décalé, façon impression risographe */}
              <div aria-hidden className="silhouette absolute inset-0 bg-signal translate-x-3 -translate-y-2 md:translate-x-5 md:-translate-y-3" />
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
                className="relative photo-ink h-[clamp(18rem,72vw,26rem)] lg:h-[min(70vh,40rem)] max-w-full w-auto object-contain object-bottom select-none"
              />
              {/* Trame en demi-teinte limitée à la silhouette */}
              <div aria-hidden className="silhouette photo-dots pattern-dots absolute inset-0" />
              <div className="absolute -left-4 md:-left-10 bottom-[18%]">
                <SpinBadge text={`${t('hero.kicker')} ✦ ${personalInfo.location} ✦ `} />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="pt-6 border-t border-fg grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-lg md:text-xl leading-relaxed text-muted">{t('hero.bio')}</p>
            <p className="kicker mt-5">{t('hero.available')}</p>
          </div>
          <div className="md:col-span-6 lg:col-span-7 flex flex-wrap gap-3 md:justify-end">
            <Magnetic>
              <button onClick={() => scrollTo('contact')} className="btn btn-signal">
                {t('hero.cta_contact')} <RiArrowRightLine size={16} />
              </button>
            </Magnetic>
            <Magnetic>
              <button onClick={() => scrollTo('projects')} className="btn btn-line">
                {t('hero.cta_projects')}
              </button>
            </Magnetic>
            <Magnetic>
              <a href={cv} download className="btn btn-line">
                <RiDownloadLine size={16} /> {t('hero.cta_cv')}
              </a>
            </Magnetic>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-3 border-t border-rule">
          {stats.map(({ v, l }, i) => (
            <div key={l} className={`pt-5 ${i > 0 ? 'pl-4 sm:pl-6 border-l border-rule' : ''}`}>
              <dt className="sr-only">{l}</dt>
              <dd className="display text-5xl md:text-6xl"><CountUp value={v} /></dd>
              <dd className="kicker text-muted mt-2 text-[0.68rem] sm:text-[0.8125rem] break-words">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Deux bandeaux croisés : cyan en arrière-plan, encre au premier plan */}
      <div className="relative overflow-hidden py-[max(2rem,3vw)]" aria-hidden>
        <Tape items={marquee} reverse
          className="absolute -inset-x-[5%] top-1/2 -translate-y-1/2 rotate-[2deg] bg-signal text-[color:var(--on-signal)]" />
        <Tape items={marquee}
          className="relative -mx-[5%] -rotate-[1.5deg] bg-fg text-bg shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]" />
      </div>
    </section>
  );
}
