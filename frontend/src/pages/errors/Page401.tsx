import { Link } from 'react-router-dom';
export default function Page401() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-amber-50 flex items-center justify-center"><svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg></div>
        <h1 className="font-display text-7xl font-bold text-slate-900 mb-2">401</h1>
        <h2 className="font-display text-xl font-semibold text-slate-700 mb-3">Neautorizat</h2>
        <p className="text-sm text-slate-500 mb-8">Trebuie sa fii autentificat pentru a accesa aceasta pagina.</p>
        <div className="flex items-center justify-center gap-3"><Link to="/login" className="btn-primary">Autentifica-te</Link><Link to="/" className="btn-secondary">Acasa</Link></div>
      </div>
    </div>
  );
}
