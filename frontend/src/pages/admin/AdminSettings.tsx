import { useState } from 'react';

export default function AdminSettings() {
  const [siteName] = useState('MoldovaGuide');
  const [siteVersion] = useState('4.0.0');
  const [saved, setSaved] = useState(false);

  const handleClearCache = () => {
    const keys = ['moldovaguide_bookings','moldovaguide_tours','moldovaguide_reviews','moldovaguide_notifications','moldovaguide_saved','moldovaguide_trips'];
    keys.forEach(k => localStorage.removeItem(k));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page-shell py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="page-title">Setări platformă</h1>
          <p className="page-subtitle">Configurare generală a platformei.</p>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Cache-ul a fost curățat cu succes.</p>
          </div>
        )}

        <div className="card p-6">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">Informații platformă</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-400">Nume platformă</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{siteName}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-400">Versiune</span>
              <span className="badge bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">v{siteVersion}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-400">Tailwind CSS</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">v4.1</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-600 dark:text-slate-400">React</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">v18.3</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">Dark mode</span>
              <span className="badge bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Activ</span>
            </div>
          </div>
        </div>

        <div className="card p-6 border-red-200 dark:border-red-900">
          <h2 className="font-display text-lg font-bold text-red-600 dark:text-red-400 mb-2">Zonă periculoasă</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Acțiuni ireversibile care afectează datele platformei.</p>
          <div className="space-y-3">
            <button onClick={handleClearCache} className="btn-danger text-sm">Curăță cache-ul platformei</button>
            <p className="text-xs text-slate-400">Resetează datele locale (rezervări, recenzii, notificări). Conturile și tururile rămân intacte.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
