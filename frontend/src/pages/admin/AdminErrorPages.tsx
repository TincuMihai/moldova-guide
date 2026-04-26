import { useState } from 'react';
import Page401 from '../errors/Page401';
import Page403 from '../errors/Page403';
import Page404 from '../errors/Page404';
import Page500 from '../errors/Page500';

type ErrorCode = '401' | '403' | '404' | '500';

const ERROR_INFO: Record<ErrorCode, { title: string; desc: string; color: string }> = {
  '401': { title: '401 — Unauthorized', desc: 'Utilizatorul nu este autentificat', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  '403': { title: '403 — Forbidden', desc: 'Utilizatorul nu are permisiuni', color: 'bg-red-50 text-red-600 border-red-200' },
  '404': { title: '404 — Not Found', desc: 'Pagina nu a fost găsită', color: 'bg-violet-50 text-violet-600 border-violet-200' },
  '500': { title: '500 — Server Error', desc: 'Eroare internă a serverului', color: 'bg-sky-50 text-sky-600 border-sky-200' },
};

export default function AdminErrorPages() {
  const [active, setActive] = useState<ErrorCode | null>(null);

  if (active) {
    const PageComponent = { '401': Page401, '403': Page403, '404': Page404, '500': Page500 }[active];
    return (
      <div className="relative">
        <div className="fixed top-4 right-4 z-[99999]">
          <button onClick={() => setActive(null)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-2xl hover:bg-slate-800 transition-colors">
            ← Înapoi la admin
          </button>
        </div>
        <PageComponent />
      </div>
    );
  }

  return (
    <div className="page-shell py-8 px-4 sm:px-6 lg:px-8"><div className="space-y-6">
      <div>
        <h1 className="page-title">Pagini de eroare HTTP</h1>
        <p className="page-subtitle">Previzualizează și testează paginile de eroare ale platformei.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {(Object.entries(ERROR_INFO) as [ErrorCode, typeof ERROR_INFO[ErrorCode]][]).map(([code, info]) => (
          <button key={code} onClick={() => setActive(code)}
            className="card p-6 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all group">
            <div className={`inline-flex items-center px-3 py-1.5 rounded-xl border text-xs font-bold mb-3 ${info.color}`}>
              {code}
            </div>
            <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 mb-1 group-hover:text-brand-600 transition-colors">{info.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{info.desc}</p>
            <div className="mt-4 text-xs text-brand-500 font-medium group-hover:underline">Previzualizează →</div>
          </button>
        ))}
      </div>

      <div className="card p-6 bg-slate-50/50">
        <h3 className="font-display font-bold text-slate-700 dark:text-slate-300 text-sm mb-2">💡 Cum funcționează</h3>
        <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
          <p>• <strong>401</strong> — Se afișează când un utilizator neautentificat accesează o rută protejată</p>
          <p>• <strong>403</strong> — Se afișează când un utilizator autentificat nu are rolul necesar</p>
          <p>• <strong>404</strong> — Se afișează pentru orice URL inexistent</p>
          <p>• <strong>500</strong> — Se afișează la erori de server</p>
        </div>
      </div>
    </div></div>
  );
}