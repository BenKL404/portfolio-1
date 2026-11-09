import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, animate, useInView, type MotionValue, useMotionValue, useSpring, useReducedMotion, useScroll, useVelocity, useTransform } from 'framer-motion';

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

/** Grand numéro de section en contour, posé en arrière-plan (le parent doit être `relative isolate`). */
export function GhostIndex({ index }: { index: string }) {
  return (
    <span aria-hidden className="absolute -z-10 right-0 -top-2 display stroke-text opacity-25 text-[clamp(8rem,24vw,22rem)] leading-none select-none pointer-events-none">
      {index}
    </span>
  );
}

/** En-tête de section : filet, numéro + étiquette, grand titre condensé. */
export function SectionHead({ index, tag, title, aside }: { index: string; tag: string; title: string; aside?: ReactNode }) {
  return (
    <div className="relative isolate border-t border-fg pt-5 mb-12 md:mb-16">
      <GhostIndex index={index} />
      <div className="flex items-baseline justify-between gap-6 mb-6">
        <p className="kicker text-signal-text"><Scramble text={`${index} / ${tag}`} /></p>
        {aside}
      </div>
      <Reveal>
        <h2 className="display riso text-[clamp(3rem,9vw,7.5rem)]">{title}</h2>
      </Reveal>
    </div>
  );
}

export const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/** Inclinaison 3D qui suit la souris. */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const still = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (still) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <div className={className} style={{ perspective: 1000 }} onMouseMove={move} onMouseLeave={leave}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>{children}</motion.div>
    </div>
  );
}

/** Curseur personnalisé : grossit au-dessus des liens et boutons. */
export function Cursor() {
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 });
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX); y.set(e.clientY);
      // Position lue par la loupe en demi-teinte (.spotlight)
      root.style.setProperty('--mx', `${e.clientX}px`);
      root.style.setProperty('--my', `${e.clientY}px`);
      const target = e.target as Element;
      setLabel(target.closest?.('[data-cursor]')?.getAttribute('data-cursor') ?? null);
      setActive(!!target.closest?.('a, button, label, input, textarea'));
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);
  return (
    <>
      <div aria-hidden className="spotlight pattern-dots" />
      <motion.div aria-hidden className={`cursor ${label ? 'is-label' : active ? 'is-active' : ''}`} style={{ x, y }}>
        {label && <span className="kicker">{label}</span>}
      </motion.div>
    </>
  );
}

/** Grand bandeau de texte en contour qui défile entre deux sections. */
export function OutlineBand({ items }: { items: string[] }) {
  const still = useReducedMotion();
  const velocity = useSpring(useVelocity(useScroll().scrollY), { stiffness: 300, damping: 50 });
  const skewX = useTransform(velocity, [-2000, 0, 2000], still ? [0, 0, 0] : [14, 0, -14], { clamp: true });
  return (
    <div className="overflow-hidden py-10 md:py-16 border-y border-rule" aria-hidden>
      <motion.div style={{ skewX }} className="marquee marquee-reverse flex w-max">
        {[0, 1].map(k => (
          <div key={k} className="flex shrink-0">
            {[...items, ...items].map((m, i) => (
              <span key={`${k}-${i}`} className={`display text-[clamp(5rem,13vw,12rem)] px-8 whitespace-nowrap ${i % 2 ? 'stroke-signal' : 'stroke-text'}`}>
                {m}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** Lettres qui s'élargissent au survol (axe de largeur d'Archivo). */
export function Stretchy({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(' ').map((word, w) => (
          <span key={w}>
            {w > 0 && ' '}
            {/* Mot insécable : les lettres en inline-block ne doivent pas se séparer */}
            <span className="inline-block whitespace-nowrap">
              {[...word].map((c, i) => <span key={i} className="stretch-letter">{c}</span>)}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

/** Attire légèrement son contenu vers la souris. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const still = useReducedMotion();
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (still) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  return (
    <motion.div className="inline-flex" style={{ x, y }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/*+<>';

/** Texte qui se « décode » caractère par caractère à l'entrée dans la fenêtre. */
export function Scramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const still = useReducedMotion();
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!inView || still) { setOut(text); return; }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const done = Math.floor(frame / 2);
      setOut([...text].map((c, i) => i < done || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(''));
      if (done >= text.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [inView, still, text]);
  return <span ref={ref}>{out}</span>;
}

/** Nombre qui compte jusqu'à sa valeur (« 10+ » → 0…10 puis « + »). */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const still = useReducedMotion();
  const [, num, suffix] = value.match(/^(\d+)(.*)$/) ?? [, '', value];
  const [n, setN] = useState(still ? Number(num) : 0);
  useEffect(() => {
    if (!inView || !num) return;
    if (still) { setN(Number(num)); return; }
    const controls = animate(0, Number(num), { duration: 1.4, ease: [0.2, 0.8, 0.2, 1], onUpdate: v => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, num, still]);
  return <span ref={ref}>{num ? `${n}${suffix}` : value}</span>;
}

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/** Texte dont les mots s'allument un à un au fil du défilement. */
export function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  if (still) return <span>{text}</span>;
  const words = text.split(' ');
  return (
    <span ref={ref}>
      {words.map((w, i) => <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
    </span>
  );
}
