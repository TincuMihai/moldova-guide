import { Link } from 'react-router-dom';
export default function Page403() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-red-50 flex items-center justify-center"><svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" /></svg></div>
        <h1 className="font-display text-7xl font-bold text-slate-900 mb-2">403</h1>
        <h2 className="font-display text-xl font-semibold text-slate-700 mb-3">Acces interzis</h2>
        <p className="text-sm text-slate-500 mb-8">Nu ai permisiunea necesara pentru a accesa aceasta sectiune. Rolul tau curent nu permite aceasta actiune.</p>
        <div className="flex items-center justify-center gap-3"><Link to="/dashboard" className="btn-primary">Panoul meu</Link><Link to="/" className="btn-secondary">Acasa</Link></div>
      </div>
    </div>
  );
}
