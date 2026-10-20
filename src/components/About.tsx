import { useTranslation } from 'react-i18next';
import { RiMailLine, RiGithubFill, RiLinkedinFill, RiTwitterXFill, RiArrowRightUpLine } from 'react-icons/ri';
import { personalInfo } from '../data/portfolio';
import { Reveal, SectionHead } from './ui';

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

        <Reveal>
          <p className="text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.15] font-medium max-w-5xl">{t('about.bio1')}</p>
        </Reveal>

        <div className="mt-14 md:mt-20 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-muted">{t('about.bio2')}</p>
          </Reveal>

          <div className="lg:col-span-8 flex flex-col gap-12">

            <Reveal delay={0.05}>
              <dl className="grid grid-cols-3 border-t border-rule">
                {stats.map(({ v, label }, i) => (
                  <div key={label} className={`pt-5 ${i > 0 ? 'pl-4 sm:pl-6 border-l border-rule' : ''}`}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="display text-5xl md:text-7xl">{v}</dd>
                    <dd className="kicker text-muted mt-2">{label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="grid gap-10 sm:grid-cols-2">
              <div>
                <p className="kicker text-signal-text mb-4">{t('about.traits_title')}</p>
                <ul className="flex flex-wrap gap-2">
                  {traits.map(trait => (
                    <li key={trait} className="px-3 py-1.5 border border-rule text-sm">{trait}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="kicker text-signal-text mb-4">{t('about.languages_title')}</p>
                <ul>
                  {languages.map(({ lang, level }) => (
                    <li key={lang} className="flex justify-between py-2 border-b border-rule">
                      <span className="font-semibold">{lang}</span>
                      <span className="text-muted">{level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-rule">
                {links.map(({ label, icon: Icon, href }) => (
                  <li key={label} className="border-r border-b border-rule">
                    <a
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 p-4 hover:bg-fg hover:text-bg transition-colors"
                    >
                      <span className="flex items-center gap-2 kicker"><Icon size={16} /> {label}</span>
                      <RiArrowRightUpLine size={16} className="text-signal-text group-hover:text-signal" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
