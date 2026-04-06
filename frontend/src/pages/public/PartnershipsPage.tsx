import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function PartnershipsPage() {
  const [form, setForm] = useState({ company: '', name: '', email: '', type: '', message: '' });
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
    if (!form.company.trim()) err.company = 'Numele companiei este obligatoriu';
    if (!form.name.trim()) err.name = 'Numele de contact este obligatoriu';
    if (!form.email.trim()) err.email = 'Email-ul este obligatoriu';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Email invalid';
    if (!form.type) err.type = 'Selectează tipul de parteneriat';
    if (!form.message.trim()) err.message = 'Descrie propunerea ta';
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  }, [form]);

  const partnerTypes = [
    { value: '', label: 'Selectează tipul' },
    { value: 'hotel', label: 'Hotel / Cazare' },
    { value: 'restaurant', label: 'Restaurant / Cafe' },
    { value: 'transport', label: 'Transport' },
    { value: 'winery', label: 'Cramă / Vinificație' },
    { value: 'agency', label: 'Agenție de turism' },
    { value: 'cultural', label: 'Instituție culturală' },
    { value: 'other', label: 'Altele' },
  ];

  const benefits = [
    { icon: '📈', title: 'Vizibilitate crescută', desc: 'Afacerea ta va fi văzută de mii de turiști care explorează Moldova prin platforma noastră.' },
    { icon: '🎯', title: 'Audiență targetată', desc: 'Ajungi direct la persoane interesate de turism, gastronomie și cultură în Moldova.' },
    { icon: '🤝', title: 'Colaborare flexibilă', desc: 'Modele de parteneriat adaptate — de la listare gratuită la campanii premium.' },
    { icon: '📊', title: 'Analiză detaliată', desc: 'Acces la statistici despre performanța listărilor, recenzii și trafic.' },
    { icon: '🌐', title: 'Prezență multilingvă', desc: 'Conținutul tău disponibil în română, engleză, rusă și franceză.' },
    { icon: '⭐', title: 'Sistem de recenzii', desc: 'Recenzii verificate de la turiști reali care-ți cresc reputația online.' },
  ];

  const partners = [
    { name: 'Cricova', type: 'Cramă', logo: '🍷' },
    { name: 'Mileștii Mici', type: 'Cramă', logo: '🏰' },
    { name: 'Orheiul Vechi', type: 'Rezervație', logo: '⛰️' },
    { name: 'Moldova Tourism', type: 'Agenție', logo: '✈️' },
    { name: 'Hotel Nobil', type: 'Cazare', logo: '🏨' },
    { name: 'Carpe Diem', type: 'Restaurant', logo: '🍽️' },
  ];

  return (
    <div className="pb-16 page-shell">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-800" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-15" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium mb-6">
            🤝 Programa de parteneriat
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Crește-ți afacerea cu MoldovaGuide</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Alătură-te rețelei noastre de parteneri și conectează-te cu turiști din toată lumea care descoperă Moldova.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Benefits */}
        <section className="py-16">
          <h2 className="section-heading text-center mb-4">De ce să devii partener?</h2>
          <p className="section-subheading text-center mx-auto mb-12">Beneficii concrete pentru afacerea ta</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="card p-6">
                <span className="text-3xl block mb-3">{b.icon}</span>
                <h3 className="font-display font-bold text-slate-800 dark:text-white mb-2">{b.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current partners */}
        <section className="py-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="section-heading text-center mb-10">Partenerii noștri</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map(p => (
              <div key={p.name} className="card p-5 text-center">
                <span className="text-3xl block mb-2">{p.logo}</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{p.name}</p>
                <p className="text-xs text-slate-400">{p.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partnership form */}
        <section className="py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl mx-auto">
            <div className="card p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">Cerere trimisă!</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Echipa noastră te va contacta în 2-3 zile lucrătoare.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ company:'', name:'', email:'', type:'', message:'' }); }} className="btn-secondary text-sm">Trimite altă cerere</button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">Devino partener</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Completează formularul și echipa noastră te va contacta.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Companie</label>
                        <input value={form.company} onChange={e => handleChange('company', e.target.value)} className={`input-field ${errors.company ? 'border-red-300 dark:border-red-700' : ''}`} placeholder="SC Exemplu SRL" />
                        {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Persoană de contact</label>
                        <input value={form.name} onChange={e => handleChange('name', e.target.value)} className={`input-field ${errors.name ? 'border-red-300 dark:border-red-700' : ''}`} placeholder="Ion Popescu" />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email</label>
                        <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className={`input-field ${errors.email ? 'border-red-300 dark:border-red-700' : ''}`} placeholder="email@companie.md" />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Tip parteneriat</label>
                        <select value={form.type} onChange={e => handleChange('type', e.target.value)} className={`input-field ${errors.type ? 'border-red-300 dark:border-red-700' : ''}`}>
                          {partnerTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                        {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Descrie propunerea</label>
                      <textarea value={form.message} onChange={e => handleChange('message', e.target.value)} className={`input-field min-h-[120px] resize-none ${errors.message ? 'border-red-300 dark:border-red-700' : ''}`} placeholder="Spune-ne despre afacerea ta și ce tip de colaborare te interesează..." />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
                      {sending ? 'Se trimite...' : 'Trimite cererea de parteneriat'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="text-center pb-12">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Ai întrebări? Contactează-ne direct.</p>
          <Link to="/contact" className="btn-secondary text-sm">Pagina de contact</Link>
        </section>
      </div>
    </div>
  );
}
