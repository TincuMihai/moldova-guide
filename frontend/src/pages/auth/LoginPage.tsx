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

  const clearError = (field: string) => {
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; delete n.general; return n; });
  };

  const validate = useCallback((): boolean => {
    const e: Record<string, string> = {};
    if (tab === 'register') {
      if (!name.trim()) e.name = 'Numele este obligatoriu';
      else if (name.trim().length < 2) e.name = 'Numele trebuie să aibă minim 2 caractere';
    }
    if (!email.trim()) e.email = 'Email-ul este obligatoriu';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Formatul email-ului este invalid';
    if (!password.trim()) e.password = 'Parola este obligatorie';
    else if (password.length < 6) e.password = 'Parola trebuie să aibă minim 6 caractere';
    setErrors(e); return Object.keys(e).length === 0;
  }, [tab, name, email, password]);

  const handleSubmit = useCallback(async (ev: React.FormEvent) => {
    ev.preventDefault(); if (!validate()) return;
    setSubmitting(true); setErrors({});
    try {
      if (tab === 'login') {
        await login({ email, password });
      } else {
        await register({ name, email, password, role });
      }
      const session = JSON.parse(localStorage.getItem('moldovaguide_session') || '{}');
      const r = session.role || role;
      nav(r === 'admin' ? '/admin' : r === 'guide' ? '/guide/dashboard' : '/dashboard');
    } catch (err) {
      const msg = (err as Error).message;
      // Map backend messages to field-specific errors
      if (msg.toLowerCase().includes('email') && msg.toLowerCase().includes('parol'))
        setErrors({ general: msg });
      else if (msg.toLowerCase().includes('email') && msg.toLowerCase().includes('înregistrat'))
        setErrors({ email: msg });
      else if (msg.toLowerCase().includes('email'))
        setErrors({ email: msg });
      else if (msg.toLowerCase().includes('parol'))
        setErrors({ password: msg });
      else if (msg.toLowerCase().includes('num'))
        setErrors({ name: msg });
      else
        setErrors({ general: msg });
    } finally { setSubmitting(false); }
  }, [tab, email, password, name, role, validate, login, register, nav]);

  const roles: { value: UserRole; label: string; icon: string; desc: string }[] = [
    { value: 'tourist', label: 'Turist', icon: '🧳', desc: 'Exploreaza si rezerva' },
    { value: 'guide', label: 'Ghid turistic', icon: '🗺️', desc: 'Creeaza tururi' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25"><span className="text-white font-display font-bold text-xl">M</span></div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white">MoldovaGuide</span>
          </Link>
          <h1 className="page-title">{tab === 'login' ? 'Bine ai revenit!' : 'Creeaza un cont'}</h1>
          <p className="page-subtitle">{tab === 'login' ? 'Conecteaza-te pentru a continua' : 'Alatura-te comunitatii MoldovaGuide'}</p>
        </div>

        <div className="card overflow-hidden shadow-xl">
          <div className="flex border-b border-slate-100 dark:border-slate-800">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button key={t} onClick={() => { setTab(t); setErrors({}); }} className={`flex-1 py-3.5 text-sm font-semibold transition-all ${tab === t ? 'text-brand-600 border-b-2 border-brand-500 bg-brand-50/30' : 'text-slate-400 hover:text-slate-600 dark:text-slate-400'}`}>{t === 'login' ? 'Autentificare' : 'Inregistrare'}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errors.general && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                <span>{errors.general}</span>
              </div>
            )}

            {tab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Numele complet</label>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value); clearError('name'); }}
                  className={`input-field ${errors.name ? 'border-red-400 dark:border-red-500 focus:ring-red-500' : ''}`} placeholder="Ion Popescu" />
                {errors.name && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                className={`input-field ${errors.email ? 'border-red-400 dark:border-red-500 focus:ring-red-500' : ''}`} placeholder="email@exemplu.md" />
              {errors.email && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Parola</label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                className={`input-field ${errors.password ? 'border-red-400 dark:border-red-500 focus:ring-red-500' : ''}`} placeholder="Minim 6 caractere" />
              {errors.password && <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.password}</p>}
            </div>

            {tab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Tip de cont</label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((r) => (
                    <button type="button" key={r.value} onClick={() => setRole(r.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${role === r.value ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}`}>
                      <span className="text-2xl block mb-1">{r.icon}</span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">{r.label}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
              {submitting ? 'Se proceseaza...' : tab === 'login' ? 'Conecteaza-te' : 'Creeaza contul'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
