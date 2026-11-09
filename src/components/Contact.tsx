import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiArrowRightLine, RiCheckLine, RiErrorWarningLine, RiArrowRightUpLine } from 'react-icons/ri';
import { personalInfo } from '../data/portfolio';
import { Reveal, GhostIndex } from './ui';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang: i18n.language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur serveur');
      setSent(true); setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur réseau.');
    } finally { setLoading(false); }
  };

  const contactItems = [
    { label: t('contact.labels.email'), value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { label: t('contact.labels.phone'), value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, '')}` },
    { label: t('contact.labels.github'), value: `@${personalInfo.githubUsername}`, href: personalInfo.github },
    { label: t('contact.labels.linkedin'), value: personalInfo.linkedinName, href: personalInfo.linkedin },
    { label: t('contact.labels.location'), value: personalInfo.location },
  ];

  const field = (key: keyof typeof form, label: string, ph: string, opts: { type?: string; required?: boolean; area?: boolean } = {}) => (
    <label className="block">
      <span className="kicker text-muted">{label}</span>
      {opts.area ? (
        <textarea required={opts.required} rows={5} value={form[key]} placeholder={ph}
          onChange={e => setForm({ ...form, [key]: e.target.value })} className="field resize-none" />
      ) : (
        <input type={opts.type ?? 'text'} required={opts.required} value={form[key]} placeholder={ph}
          onChange={e => setForm({ ...form, [key]: e.target.value })} className="field" />
      )}
    </label>
  );

  return (
    <section id="contact" className="invert-scope relative isolate overflow-hidden bg-bg text-fg py-24 md:py-32">
      <div aria-hidden style={{ ['--dot' as string]: 'var(--signal)' }}
        className="absolute -z-10 -right-40 -bottom-40 w-[42rem] aspect-square rounded-full pattern-dots fade-radial opacity-60" />
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative isolate border-t border-fg pt-5 mb-12 md:mb-16">
          <GhostIndex index="05" />
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
            <p className="kicker text-signal-text">05 / {t('contact.tag')}</p>
            <p className="kicker">{t('contact.available')}</p>
          </div>
          <Reveal>
            <h2 className="display riso text-[clamp(3.5rem,12vw,11rem)]">{t('contact.title')}</h2>
          </Reveal>
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-xl md:text-2xl leading-snug">{t('contact.subtitle')}</p>
            <p className="mt-3 text-muted leading-relaxed">{t('contact.intro')}</p>
            <ul className="mt-10 border-t border-rule">
              {contactItems.map(({ label, value, href }) => (
                <li key={label} className="border-b border-rule">
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4">
                      <span className="kicker text-muted w-28 shrink-0">{label}</span>
                      <span className="flex-1 font-medium truncate group-hover:text-signal-text transition-colors">{value}</span>
                      <RiArrowRightUpLine size={16} className="text-muted group-hover:text-signal-text" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-4">
                      <span className="kicker text-muted w-28 shrink-0">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            {sent ? (
              <div className="border border-fg p-8 md:p-12 flex flex-col items-start gap-6">
                <span className="w-12 h-12 bg-signal text-[color:var(--on-signal)] flex items-center justify-center"><RiCheckLine size={24} /></span>
                <div>
                  <h3 className="display text-5xl">{t('contact.sent_title')}</h3>
                  <p className="mt-3 text-muted">{t('contact.sent_body')}</p>
                </div>
                <button onClick={() => setSent(false)} className="btn btn-line">{t('contact.sent_again')}</button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  {field('name', t('contact.form.name'), t('contact.form.name_placeholder'), { required: true })}
                  {field('email', t('contact.form.email'), t('contact.form.email_placeholder'), { type: 'email', required: true })}
                </div>
                {field('subject', t('contact.form.subject'), t('contact.form.subject_placeholder'))}
                {field('message', t('contact.form.message'), t('contact.form.message_placeholder'), { required: true, area: true })}
                {error && (
                  <p role="alert" className="flex items-center gap-2 text-sm text-signal-text">
                    <RiErrorWarningLine size={16} /> {error}
                  </p>
                )}
                <div>
                  <button type="submit" disabled={loading} className="btn btn-signal disabled:opacity-60 w-full sm:w-auto">
                    {loading ? t('contact.sending') : <>{t('contact.form.send')} <RiArrowRightLine size={16} /></>}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
