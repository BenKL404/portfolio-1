import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { RiEarthLine, RiSmartphoneLine, RiComputerLine, RiServerLine, RiDatabase2Line, RiStackLine, RiPencilRulerLine, RiSearchEyeLine, RiMegaphoneLine } from 'react-icons/ri';

const ICONS = [RiEarthLine, RiSmartphoneLine, RiComputerLine, RiServerLine, RiDatabase2Line, RiStackLine, RiPencilRulerLine, RiSearchEyeLine, RiMegaphoneLine];

export default function Services() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const items = t('services.items', { returnObjects: true }) as { title: string; description: string }[];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" ref={ref}>
      <div className="px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-12">
          <p className="section-tag mb-3">{t('services.tag')}</p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{t('services.title')}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ title, description }, i) => {
            const Icon = ICONS[i] || RiEarthLine;
            const isHov = hovered === i;
            return (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="rounded-2xl p-6 flex flex-col gap-4 cursor-default transition-all duration-300"
                style={{
                  background: 'var(--bg)',
                  boxShadow: isHov ? 'var(--neu-hover)' : 'var(--neu-out)',
                  transform: isHov ? 'translateY(-3px)' : 'none',
                }}>
                {/* Icon badge - neutral neumorphic inset */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'var(--bg)',
                    boxShadow: isHov ? 'var(--neu-out)' : 'var(--neu-in)',
                  }}>
                  <Icon size={20} style={{ color: isHov ? 'var(--accent)' : 'var(--text-muted)' }} />
                </div>

                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>0{i + 1}</span>

                <div>
                  <h3 className="text-base font-semibold mb-2 transition-colors duration-300"
                    style={{ color: 'var(--text)' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>{description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
