import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { RiSendPlaneFill, RiCheckLine, RiErrorWarningLine, RiMailLine, RiPhoneLine, RiGithubFill, RiLinkedinFill, RiMapPinLine } from 'react-icons/ri';
import { personalInfo } from '../data/portfolio';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });
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
    { icon: RiMailLine, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: RiPhoneLine, label: 'Téléphone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: RiGithubFill, label: 'GitHub', value: `@${personalInfo.githubUsername}`, href: personalInfo.github },
    { icon: RiLinkedinFill, label: 'LinkedIn', value: personalInfo.linkedinName, href: personalInfo.linkedin },
    { icon: RiMapPinLine, label: 'Localisation', value: personalInfo.location, href: undefined },
  ];

  return (
    <section id="contact" ref={ref}>
      <div className="px-6 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="mb-12">
          <p className="section-tag mb-3">{t('contact.tag')}</p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{t('contact.title')}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }} className="lg:col-span-5 flex flex-col gap-4">


            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-sub)' }}>
              {t('contact.subtitle')} Disponible pour des missions freelance, collaborations ou tout nouveau projet.
            </p>

            <div className="flex flex-col gap-2.5">
              {contactItems.map(({ icon: Icon, label, value, href }, idx) => {
                const El = href ? 'a' : 'div';
                return (
                  <El key={idx}
                    {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-220 cursor-pointer group"
                    style={{ background: 'var(--bg)', boxShadow: 'var(--neu-sm)' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--neu-hover)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--neu-sm)'; }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{ background: 'var(--bg)', boxShadow: 'var(--neu-in)' }}>
                      <Icon size={15} style={{ color: 'var(--text-muted)' }} className="group-hover:text-[var(--accent)] transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
                      <p className="text-xs font-medium truncate mt-0.5" style={{ color: 'var(--text)' }}>{value}</p>
                    </div>
                  </El>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }} className="lg:col-span-7">
            {sent ? (
              <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-5"
                style={{ background: 'var(--bg)', boxShadow: 'var(--neu-out)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--bg)', boxShadow: 'var(--neu-in)' }}>
                  <RiCheckLine size={28} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>Message envoyé !</h3>
                  <p className="text-sm" style={{ color: 'var(--text-sub)' }}>Je vous répondrai très prochainement.</p>
                </div>
                <button onClick={() => setSent(false)} className="btn-neu text-sm">Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-2xl p-6 lg:p-7 flex flex-col gap-4"
                style={{ background: 'var(--bg)', boxShadow: 'var(--neu-out)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'name', type: 'text', label: t('contact.form.name'), ph: t('contact.form.name_placeholder') },
                    { key: 'email', type: 'email', label: t('contact.form.email'), ph: t('contact.form.email_placeholder') },
                  ].map(({ key, type, label, ph }) => (
                    <div key={key}>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>{label}</label>
                      <input type={type} required value={form[key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        placeholder={ph} className="input" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>{t('contact.form.subject')}</label>
                  <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    placeholder={t('contact.form.subject_placeholder')} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>{t('contact.form.message')}</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder={t('contact.form.message_placeholder')} className="input resize-none" />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-lg"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}>
                    <RiErrorWarningLine size={14} />{error}
                  </div>
                )}
                <button type="submit" disabled={loading} className="btn-neu-accent btn disabled:opacity-50 w-full gap-2">
                  {loading ? <span className="font-mono text-xs">Envoi…</span>
                    : <><RiSendPlaneFill size={15} /><span>{t('contact.form.send')}</span></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
