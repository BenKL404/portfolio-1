import { useTranslation } from 'react-i18next';
import { RiMailLine, RiGithubFill, RiLinkedinFill, RiTwitterXFill, RiArrowRightUpLine } from 'react-icons/ri';
import { personalInfo } from '../data/portfolio';
import { Reveal, SectionHead, CountUp, ScrollWords } from './ui';

// Inclinaison et couleur de chaque autocollant « soft skill »
const STICKERS = [
  { rot: '-4deg', cls: 'bg-signal text-[color:var(--on-signal)]' },
  { rot: '3deg',  cls: 'bg-fg text-bg' },
  { rot: '-2deg', cls: 'bg-bg border border-fg' },
  { rot: '5deg',  cls: 'pattern-hatch bg-bg border border-fg' },
  { rot: '-3deg', cls: 'bg-fg text-bg' },
];

export default function About() {
  const { t } = useTranslation();
  const traits = t('about.traits', { returnObjects: true }) as string[];
  const languages = t('about.languages', { returnObjects: true }) as { lang: string; level: string }[];

  const stats = [
    { v: '3+',  label: t('about.stats.experience') },
    { v: '10+', label: t('about.stats.projects') },
    { v: '5+',  label: t('about.stats.clients') },
  ];

  const links = [
    { label: t('contact.labels.email'), icon: RiMailLine, href: `mailto:${personalInfo.email}` },
    { label: 'GitHub', icon: RiGithubFill, href: personalInfo.github },
    { label: 'LinkedIn', icon: RiLinkedinFill, href: personalInfo.linkedin },
    { label: 'X', icon: RiTwitterXFill, href: personalInfo.twitter },
  ];

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHead index="01" tag={t('about.tag')} title={t('about.title')} />

        {/* Présentation : les mots s'allument au fil du défilement */}
        <p className="text-[clamp(1.9rem,4.2vw,4rem)] leading-[1.08] font-medium tracking-tight max-w-6xl">
          <ScrollWords text={t('about.bio1')} />
        </p>

        <div className="mt-20 md:mt-28 grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Fiche technique */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="mr-2.5 sm:mr-0 border border-fg bg-bg shadow-[10px_10px_0_var(--signal)] lg:-rotate-1">
              <div className="flex items-center justify-between px-5 py-3 border-b border-fg pattern-hatch">
                <span className="meta">FICHE / {personalInfo.name.toUpperCase()}</span>
                <span className="meta text-signal-text hidden sm:inline">● {t('hero.available')}</span>
              </div>
              <div className="p-5 md:p-7">
                <p className="text-lg leading-relaxed">{t('about.bio2')}</p>
                <p className="kicker text-signal-text mt-8 mb-3">{t('about.languages_title')}</p>
                <ul>
                  {languages.map(({ lang, level }) => (
                    <li key={lang} className="flex items-baseline gap-3 py-2">
                      <span className="font-semibold">{lang}</span>
                      <span className="flex-1 border-b border-dashed border-rule translate-y-[-0.3em]" aria-hidden />
                      <span className="meta text-muted">{level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 flex flex-col gap-16">
            {/* Chiffres empilés */}
            <dl>
              {stats.map(({ v, label }, i) => (
                <Reveal key={label} delay={i * 0.06}>
                  <div className="group flex items-end justify-between gap-6 border-b border-fg py-2">
                    <dd className="display text-[clamp(5rem,12vw,9.5rem)] stroke-text group-hover:text-fg transition-colors">
                      <CountUp value={v} />
                    </dd>
                    <dt className="kicker text-right pb-4 md:pb-6">
                      <span className="meta text-signal-text block mb-1">{String(i + 1).padStart(2, '0')}</span>
                      {label}
                    </dt>
                  </div>
                </Reveal>
              ))}
            </dl>

            {/* Soft skills en autocollants */}
            <Reveal>
              <p className="kicker text-signal-text mb-6">{t('about.traits_title')}</p>
              <ul className="flex flex-wrap gap-4">
                {traits.map((trait, i) => {
                  const s = STICKERS[i % STICKERS.length];
                  return (
                    <li key={trait}
                      style={{ rotate: s.rot }}
                      className={`display text-2xl md:text-3xl px-4 py-2 shadow-[4px_4px_0_var(--fg)] transition-transform duration-300 hover:!rotate-0 hover:scale-110 ${s.cls}`}>
                      {trait}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Liens en grandes lignes qui se remplissent au survol */}
        <ul className="mt-24 border-t border-fg">
          {links.map(({ label, icon: Icon, href }) => (
            <li key={label} className="border-b border-fg">
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group relative isolate flex items-center justify-between gap-6 py-4 md:py-5 overflow-hidden"
              >
                <span aria-hidden className="absolute inset-0 -z-10 bg-signal origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
                <span className="flex items-center gap-4 display text-4xl md:text-6xl group-hover:translate-x-4 group-hover:text-[color:var(--on-signal)] transition-[transform,color] duration-500">
                  <Icon className="text-[0.6em]" /> {label}
                </span>
                <RiArrowRightUpLine className="text-3xl md:text-5xl group-hover:rotate-45 group-hover:text-[color:var(--on-signal)] transition-[transform,color] duration-500 mr-2" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
