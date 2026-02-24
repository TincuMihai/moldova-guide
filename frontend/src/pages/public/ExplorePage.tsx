import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { attractionService } from '../../services';
import type { Attraction, AttractionCategory, PriceLevel } from '../../types';
import { CATEGORY_LABELS, PRICE_OPTIONS, SORT_ATTRACTIONS } from '../../constants';
import AttractionCard from '../../components/ui/AttractionCard';
import { LoadingSpinner, EmptyState, ErrorState } from '../../components/common/UIComponents';

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState<AttractionCategory | 'all'>((searchParams.get('category') as AttractionCategory) || 'all');
  const [price, setPrice] = useState<PriceLevel | 'all'>('all');
  const [sort, setSort] = useState('rating');

  const load = useCallback(async () => {
    setIsLoading(true); setError('');
    try {
      const data = await attractionService.getAll({ category, price, search, sort });
      setAttractions(data);
    } catch (err) { setError((err as Error).message); }
    finally { setIsLoading(false); }
  }, [category, price, search, sort]);

  useEffect(() => { load(); }, [load]);

  const catOptions = useMemo(() => [
    { value: 'all' as const, label: 'Toate categoriile' },
    ...Object.entries(CATEGORY_LABELS).map(([v, l]) => ({ value: v as AttractionCategory, label: l })),
  ], []);

  const handleCategoryChange = (val: AttractionCategory | 'all') => {
    setCategory(val);
    const params = new URLSearchParams(searchParams);
    if (val === 'all') params.delete('category'); else params.set('category', val);
    setSearchParams(params);
  };

  return (
    <div className="pb-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="section-heading mb-2">Explorează orașul</h1>
          <p className="section-subheading">Descoperă atracții, restaurante, parcuri și multe altele</p>
        </div>

        {/* Filters bar */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" placeholder="Caută atracții..." />
            </div>
            <select value={category} onChange={(e) => handleCategoryChange(e.target.value as AttractionCategory | 'all')} className="input-field w-full lg:w-48">
              {catOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <select value={price} onChange={(e) => setPrice(e.target.value as PriceLevel | 'all')} className="input-field w-full lg:w-40">
              {PRICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field w-full lg:w-48">
              {SORT_ATTRACTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-emerald-100 via-sky-50 to-violet-100 border border-slate-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-10 h-10 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>
              <p className="text-sm font-medium text-slate-500">Hartă interactivă</p>
              <p className="text-xs text-slate-400 mt-1">{attractions.length} locuri pe hartă</p>
            </div>
          </div>
          {/* Decorative pins */}
          <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-brand-200 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-200 animate-pulse animate-delay-200" />
          <div className="absolute top-2/5 right-1/3 w-4 h-4 rounded-full bg-violet-500 ring-4 ring-violet-200 animate-pulse animate-delay-400" />
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">{attractions.length} rezultate</p>
        </div>

        {isLoading ? <LoadingSpinner /> : error ? <ErrorState message={error} onRetry={load} /> : attractions.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {attractions.map((a) => <AttractionCard key={a.id} attraction={a} />)}
          </div>
        ) : (
          <EmptyState title="Niciun rezultat" description="Modifică filtrele pentru a vedea mai multe atracții." />
        )}
      </div>
    </div>
  );
}
