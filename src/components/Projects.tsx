import { useTranslation } from 'react-i18next';
import { RiArrowRightUpLine, RiGithubFill, RiLockLine } from 'react-icons/ri';
import { projects, type Project } from '../data/portfolio';
import { Reveal, SectionHead } from './ui';

type ProjectText = { name: string; type: string; description: string; highlights?: string[] };

function ProjectLink({ project, label }: { project: Project; label: Record<'live' | 'source' | 'private', string> }) {
  const { kind, href } = project.link;
  if (kind === 'private' || !href) {
    return <span className="kicker text-muted flex items-center gap-2"><RiLockLine size={14} /> {label.private}</span>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="kicker flex items-center gap-2 text-signal-text hover:text-fg">
      {kind === 'source' ? <RiGithubFill size={15} /> : null}
      {label[kind]} <RiArrowRightUpLine size={15} />
    </a>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const texts = t('projects.items', { returnObjects: true }) as Record<string, ProjectText>;
  const label = { live: t('projects.live'), source: t('projects.source'), private: t('projects.private') };

  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);
  // Première et dernière cartes en pleine largeur quand le nombre restant est impair
  const wide = (i: number) => i === 0 || (i === featured.length - 1 && (featured.length - 1) % 2 === 1);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHead
          index="03"
          tag={t('projects.tag')}
          title={t('projects.title')}
          aside={<span className="meta text-muted">{String(projects.length).padStart(2, '0')}</span>}
        />

        <p className="kicker mb-6">{t('projects.featured')}</p>
        <div className="grid gap-x-8 gap-y-16 lg:grid-cols-2">
          {featured.map((p, i) => {
            const text = texts[p.id];
            const href = p.link.kind !== 'private' ? p.link.href : undefined;
            const Img = (
              <div className="relative">
                <span aria-hidden className="partial-frame" />
                <div className="aspect-video overflow-hidden border border-fg bg-bg-2">
                  <img
                    src={p.image}
                    alt={text?.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            );
            return (
              <Reveal key={p.id} className={wide(i) ? 'lg:col-span-2' : ''}>
                <article className={`group ${wide(i) ? 'lg:grid lg:grid-cols-12 lg:gap-8 lg:items-end' : ''}`}>
                  <div className={wide(i) ? 'lg:col-span-8' : ''}>
                    {href ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label={text?.name}>{Img}</a> : Img}
                  </div>
                  <div className={`mt-5 ${wide(i) ? 'lg:col-span-4 lg:mt-0' : ''}`}>
                    <p className="meta text-muted flex gap-3">
                      <span className="text-signal-text">{String(i + 1).padStart(2, '0')}</span>
                      <span>{p.year}</span>
                      <span>{text?.type}</span>
                    </p>
                    <h3 className={`display mt-3 ${wide(i) ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl'}`}>{text?.name}</h3>
                    <p className="mt-4 leading-relaxed text-muted max-w-xl">{text?.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 meta">
                      {p.stack.map(s => <li key={s}>{s}</li>)}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-rule">
                      <ProjectLink project={p} label={label} />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-24">
          <p className="kicker mb-6">{t('projects.others')}</p>
          <ul className="border-t border-fg">
            {others.map(p => {
              const text = texts[p.id];
              return (
                <li key={p.id} className="grid grid-cols-12 gap-x-4 gap-y-1 py-5 border-b border-rule items-baseline">
                  <span className="col-span-2 md:col-span-1 meta text-muted">{p.year}</span>
                  <div className="col-span-10 md:col-span-5">
                    <h3 className="font-semibold text-lg">{text?.name}</h3>
                    <p className="text-sm text-muted mt-1 md:pr-6">{text?.description}</p>
                  </div>
                  <span className="hidden md:block md:col-span-2 kicker text-muted">{text?.type}</span>
                  <ul className="col-start-3 col-span-10 md:col-start-auto md:col-span-4 flex flex-wrap gap-x-3 meta text-muted">
                    {p.stack.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
