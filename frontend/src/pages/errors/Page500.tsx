import { Link } from 'react-router-dom';
export default function Page500() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-orange-50 flex items-center justify-center"><svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg></div>
        <h1 className="font-display text-7xl font-bold text-slate-900 mb-2">500</h1>
        <h2 className="font-display text-xl font-semibold text-slate-700 mb-3">Eroare interna</h2>
        <p className="text-sm text-slate-500 mb-8">A aparut o eroare neasteptata pe server. Echipa noastra a fost notificata.</p>
        <div className="flex items-center justify-center gap-3"><button onClick={() => window.location.reload()} className="btn-primary">Reincearca</button><Link to="/" className="btn-secondary">Acasa</Link></div>
      </div>
    </div>
  );
}
