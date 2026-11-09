import { useTranslation } from 'react-i18next';
import { RiEarthLine, RiSmartphoneLine, RiComputerLine, RiServerLine, RiDatabase2Line, RiStackLine, RiPencilRulerLine, RiSearchEyeLine, RiMegaphoneLine } from 'react-icons/ri';
import { Reveal, SectionHead } from './ui';

const ICONS = [RiEarthLine, RiSmartphoneLine, RiComputerLine, RiServerLine, RiDatabase2Line, RiStackLine, RiPencilRulerLine, RiSearchEyeLine, RiMegaphoneLine];

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section id="services" className="relative isolate py-24 md:py-32 bg-bg-2">
      <div aria-hidden className="absolute inset-0 -z-10 pattern-hatch opacity-40" />
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHead index="02" tag={t('services.tag')} title={t('services.title')} />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:pb-16">
          {items.map(({ title, description }, i) => {
            const Icon = ICONS[i] || RiEarthLine;
            return (
              <li key={title} className={`relative hover:z-10 ${i % 3 === 1 ? 'lg:translate-y-16' : ''}`}>
                <Reveal delay={(i % 3) * 0.05} className="h-full">
                  <div className={`group lift h-full p-6 md:p-8 flex flex-col gap-6 border border-fg ${i === 4 ? 'invert-scope bg-bg text-fg' : 'bg-bg'}`}>
                    <div className="flex items-start justify-between">
                      <span className="display stroke-text text-6xl md:text-7xl leading-none group-hover:text-signal transition-colors">{String(i + 1).padStart(2, '0')}</span>
                      <Icon size={22} className="text-muted group-hover:text-signal transition-colors" />
                    </div>
                    <div>
                      <h3 className="display text-3xl md:text-4xl mb-3">{title}</h3>
                      <p className="leading-relaxed text-muted">{description}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
