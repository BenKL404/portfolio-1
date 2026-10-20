import { useTranslation } from 'react-i18next';
import { RiEarthLine, RiSmartphoneLine, RiComputerLine, RiServerLine, RiDatabase2Line, RiStackLine, RiPencilRulerLine, RiSearchEyeLine, RiMegaphoneLine } from 'react-icons/ri';
import { Reveal, SectionHead } from './ui';

const ICONS = [RiEarthLine, RiSmartphoneLine, RiComputerLine, RiServerLine, RiDatabase2Line, RiStackLine, RiPencilRulerLine, RiSearchEyeLine, RiMegaphoneLine];

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section id="services" className="py-24 md:py-32 bg-bg-2">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHead index="02" tag={t('services.tag')} title={t('services.title')} />

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-rule">
          {items.map(({ title, description }, i) => {
            const Icon = ICONS[i] || RiEarthLine;
            return (
              <li key={title} className="border-r border-b border-rule">
                <Reveal delay={(i % 3) * 0.05} className="group h-full p-6 md:p-8 flex flex-col gap-6 hover:bg-bg transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="meta text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <Icon size={22} className="text-muted group-hover:text-signal transition-colors" />
                  </div>
                  <div>
                    <h3 className="display text-3xl md:text-4xl mb-3">{title}</h3>
                    <p className="leading-relaxed text-muted">{description}</p>
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
