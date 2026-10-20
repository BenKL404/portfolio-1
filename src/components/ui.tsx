import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/** Apparition douce à l'entrée dans la fenêtre (désactivée via MotionConfig si animations réduites). */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** En-tête de section : filet, numéro + étiquette, grand titre condensé. */
export function SectionHead({ index, tag, title, aside }: { index: string; tag: string; title: string; aside?: ReactNode }) {
  return (
    <div className="border-t border-fg pt-5 mb-12 md:mb-16">
      <div className="flex items-baseline justify-between gap-6 mb-6">
        <p className="kicker text-signal-text">{index} / {tag}</p>
        {aside}
      </div>
      <Reveal>
        <h2 className="display text-[clamp(3rem,9vw,7.5rem)]">{title}</h2>
      </Reveal>
    </div>
  );
}

export const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
