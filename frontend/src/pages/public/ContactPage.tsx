import { useState, useCallback } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = 'Numele este obligatoriu';
    if (!form.email.trim()) err.email = 'Email-ul este obligatoriu';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Email invalid';
    if (!form.subject.trim()) err.subject = 'Selectează un subiect';
    if (!form.message.trim()) err.message = 'Mesajul este obligatoriu';
    else if (form.message.trim().length < 10) err.message = 'Minim 10 caractere';
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  }, [form]);

  const subjects = [
    { value: '', label: 'Selectează subiectul' },
    { value: 'general', label: 'Întrebare generală' },
    { value: 'partnership', label: 'Parteneriat' },
    { value: 'guide', label: 'Vreau să devin ghid' },
    { value: 'bug', label: 'Raportez o problemă' },
    { value: 'feedback', label: 'Feedback' },
  ];

  const contacts = [
    { icon: '📧', label: 'Email', value: 'contact@moldovaguide.md' },
    { icon: '📞', label: 'Telefon', value: '+373 22 123 456' },
    { icon: '📍', label: 'Adresă', value: 'Str. Ștefan cel Mare 123, Chișinău' },
    { icon: '🕒', label: 'Program', value: 'Luni — Vineri: 9:00 — 18:00' },
  ];

  const faqs = [
    { q: 'Cum pot deveni ghid turistic?', a: 'Creează un cont de ghid, completează profilul și adaugă primul tur. Echipa noastră va verifica profilul tău.' },
    { q: 'Cât costă platforma?', a: 'Platforma este gratuită pentru turiști. Ghizii plătesc un comision mic doar la rezervările confirmate.' },
    { q: 'Pot anula o rezervare?', a: 'Da, poți anula gratuit cu 48 de ore înainte. Pentru anulări tardive se aplică politica ghidului.' },
    { q: 'Cum funcționează recenziile?', a: 'După finalizarea unui tur primești invitația de a lăsa o recenzie. Recenziile sunt moderate automat.' },
    { q: 'Oferiți parteneriate?', a: 'Da! Contactează-ne prin formularul de pe această pagină selectând „Parteneriat".' },
  ];

  return (
    <div className="pb-16 page-shell">
      <section className="py-16 bg-gradient-to-br from-brand-500 to-brand-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-3">Contactează-ne</h1>
          <p className="text-brand-100 max-w-lg mx-auto">Avem răspunsuri la toate întrebările tale. Scrie-ne și îți vom răspunde în cel mai scurt timp.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contacts.map(c => (
            <div key={c.label} className="card-elevated p-5 text-center">
              <span className="text-2xl block mb-2">{c.icon}</span>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{c.label}</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{c.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="card p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">Mesaj trimis!</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Mulțumim! Îți vom răspunde în 24 de ore.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-secondary text-sm">Trimite alt mesaj</button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">Trimite un mesaj</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Numele tău</label>
                        <input value={form.name} onChange={e => handleChange('name', e.target.value)} className={`input-field ${errors.name ? 'border-red-300' : ''}`} placeholder="Ion Popescu" />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email</label>
                        <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className={`input-field ${errors.email ? 'border-red-300' : ''}`} placeholder="email@exemplu.md" />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Subiect</label>
                      <select value={form.subject} onChange={e => handleChange('subject', e.target.value)} className={`input-field ${errors.subject ? 'border-red-300' : ''}`}>
                        {subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                      {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Mesajul tău</label>
                      <textarea value={form.message} onChange={e => handleChange('message', e.target.value)} className={`input-field min-h-[140px] resize-none ${errors.message ? 'border-red-300' : ''}`} placeholder="Descrie pe scurt ce ai nevoie..." />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
                      {sending ? 'Se trimite...' : 'Trimite mesajul'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">Întrebări frecvente</h2>
            {faqs.map((faq, i) => (
              <details key={i} className="card p-4 group">
                <summary className="font-semibold text-sm text-slate-800 dark:text-slate-200 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
