import { useState, useEffect, useCallback } from 'react';
import { tourService } from '../../services';
import type { Tour } from '../../types';
import { THEME_OPTIONS, DURATION_OPTIONS, LANGUAGE_OPTIONS, SORT_TOURS } from '../../constants';
import TourCard from '../../components/ui/TourCard';
import { LoadingSpinner, EmptyState, ErrorState } from '../../components/common/UIComponents';

export default function BrowseToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('all');
  const [duration, setDuration] = useState('all');
  const [language, setLanguage] = useState('all');
  const [sort, setSort] = useState('rating');

  const load = useCallback(async () => {
    setIsLoading(true); setError('');
    try { setTours(await tourService.getAll({ theme, duration, language, search, sort })); }
    catch (err) { setError((err as Error).message); }
    finally { setIsLoading(false); }
  }, [theme, duration, language, search, sort]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="pb-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="section-heading mb-2">Tururi ghidate</h1>
          <p className="section-subheading">Experiențe unice cu ghizi locali pasionați</p>
        </div>

        {/* Theme pills */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {THEME_OPTIONS.map((t) => (
            <button key={t.value} onClick={() => setTheme(t.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${theme === t.value ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-200'}`}>
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" placeholder="Caută tururi..." />
            </div>
            <select value={duration} onChange={(e) => setDuration(e.target.value)} className="input-field sm:w-40">
              {DURATION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input-field sm:w-44">
              {LANGUAGE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field sm:w-48">
              {SORT_TOURS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-6">{tours.length} tururi disponibile</p>

        {isLoading ? <LoadingSpinner /> : error ? <ErrorState message={error} onRetry={load} /> : tours.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((t) => <TourCard key={t.id} tour={t} />)}
          </div>
        ) : (
          <EmptyState title="Niciun tur găsit" description="Modifică filtrele pentru a vedea mai multe tururi." />
        )}
      </div>
    </div>
  );
}
