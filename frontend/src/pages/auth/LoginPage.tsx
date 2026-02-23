import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

type Tab = 'login' | 'register';

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('tourist');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();
  const nav = useNavigate();

  const validate = useCallback((): boolean => {
    const e: Record<string, string> = {};
    if (tab === 'register' && !name.trim()) e.name = 'Numele este obligatoriu';
    if (!email.trim()) e.email = 'Email-ul este obligatoriu';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email invalid';
    if (!password.trim()) e.password = 'Parola este obligatorie';
    else if (password.length < 6) e.password = 'Minim 6 caractere';
    setErrors(e); return Object.keys(e).length === 0;
  }, [tab, name, email, password]);

  const handleSubmit = useCallback(async (ev: React.FormEvent) => {
    ev.preventDefault(); if (!validate()) return;
    setSubmitting(true); setErrors({});
    try { if (tab === 'login') await login({ email, password }); else await register({ name, email, password, role }); nav('/dashboard'); }
    catch (err) { setErrors({ general: (err as Error).message }); } finally { setSubmitting(false); }
  }, [tab, email, password, name, role, validate, login, register, nav]);

  const fillDemo = (e: string, p: string) => { setEmail(e); setPassword(p); setErrors({}); };

  const roles: { value: UserRole; label: string; icon: string; desc: string }[] = [
    { value: 'tourist', label: 'Turist', icon: '🧳', desc: 'Exploreaza si rezerva' },
    { value: 'guide', label: 'Ghid turistic', icon: '🗺️', desc: 'Creeaza tururi' },
    { value: 'admin', label: 'Proprietar', icon: '🏛️', desc: 'Gestioneaza locatii' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25"><span className="text-white font-display font-bold text-xl">M</span></div>
            <span className="font-display font-bold text-xl text-slate-900">MoldovaGuide</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-slate-900">{tab === 'login' ? 'Bine ai revenit!' : 'Creeaza un cont'}</h1>
          <p className="text-sm text-slate-500 mt-1">{tab === 'login' ? 'Conecteaza-te pentru a continua' : 'Alatura-te comunitatii MoldovaGuide'}</p>
        </div>

        <div className="card overflow-hidden shadow-xl">
          <div className="flex border-b border-slate-100">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button key={t} onClick={() => { setTab(t); setErrors({}); }} className={`flex-1 py-3.5 text-sm font-semibold transition-all ${tab === t ? 'text-brand-600 border-b-2 border-brand-500 bg-brand-50/30' : 'text-slate-400 hover:text-slate-600'}`}>{t === 'login' ? 'Autentificare' : 'Inregistrare'}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errors.general && <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{errors.general}</div>}
            {tab === 'register' && <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Numele complet</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`input-field ${errors.name ? 'border-red-300' : ''}`} placeholder="Ion Popescu" />{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}</div>}
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`input-field ${errors.email ? 'border-red-300' : ''}`} placeholder="email@exemplu.md" />{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}</div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Parola</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`input-field ${errors.password ? 'border-red-300' : ''}`} placeholder="Minim 6 caractere" />{errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}</div>
            {tab === 'register' && <div><label className="block text-xs font-semibold text-slate-600 mb-2">Tip de cont</label><div className="grid grid-cols-3 gap-2">{roles.map((r) => (<button type="button" key={r.value} onClick={() => setRole(r.value)} className={`p-3 rounded-xl border-2 text-center transition-all ${role === r.value ? 'border-brand-500 bg-brand-50' : 'border-slate-100 hover:border-slate-200'}`}><span className="text-xl block mb-1">{r.icon}</span><span className="text-xs font-semibold text-slate-700 block">{r.label}</span></button>))}</div></div>}
            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">{submitting ? 'Se proceseaza...' : tab === 'login' ? 'Conecteaza-te' : 'Creeaza contul'}</button>
          </form>

          {tab === 'login' && <div className="px-6 pb-6"><div className="border-t border-slate-100 pt-4"><p className="text-xs font-semibold text-slate-500 mb-3 text-center">Conturi demo:</p><div className="space-y-2">
            {[{ label: '🧳 Turist', email: 'tourist@demo.md', pass: 'tourist123' },{ label: '🗺️ Ghid', email: 'guide@demo.md', pass: 'guide123' },{ label: '🔑 Admin', email: 'admin@demo.md', pass: 'admin123' }].map((d) => (
              <button key={d.email} type="button" onClick={() => fillDemo(d.email, d.pass)} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-sm"><span className="font-medium text-slate-600">{d.label}</span><span className="text-xs text-slate-400">{d.email}</span></button>
            ))}
          </div></div></div>}
        </div>
      </div>
    </div>
  );
}