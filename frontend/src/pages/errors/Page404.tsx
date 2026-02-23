import { Link } from 'react-router-dom';
export default function Page404() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-violet-50 flex items-center justify-center"><svg className="w-12 h-12 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg></div>
        <h1 className="font-display text-7xl font-bold text-slate-900 mb-2">404</h1>
        <h2 className="font-display text-xl font-semibold text-slate-700 mb-3">Pagina nu a fost gasita</h2>
        <p className="text-sm text-slate-500 mb-8">Se pare ca te-ai ratacit. Pagina pe care o cauti nu exista sau a fost mutata.</p>
        <div className="flex items-center justify-center gap-3"><Link to="/" className="btn-primary">Acasa</Link><Link to="/explore" className="btn-secondary">Exploreaza</Link></div>
      </div>
    </div>
  );
}
