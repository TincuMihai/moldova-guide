import { useState, useEffect, useMemo } from 'react';
import { attractionService } from '../../services';
import type { Attraction } from '../../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../constants';
import { LoadingSpinner, SvgIcon } from '../../components/common/UIComponents';

export default function AdminAttractions() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  useEffect(() => { attractionService.getAll().then(setAttractions).finally(() => setIsLoading(false)); }, []);

  const cats = useMemo(() => {
    const set = new Set(attractions.map(a => a.category));
    return Array.from(set);
  }, [attractions]);

  const filtered = useMemo(() => {
    let res = [...attractions];
    if (catFilter !== 'all') res = res.filter(a => a.category === catFilter);
    if (search.trim()) { const q = search.toLowerCase(); res = res.filter(a => a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q)); }
    return res;
  }, [attractions, catFilter, search]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Gestionare atracții</h1>
        <p className="text-sm text-slate-500 mt-1">{attractions.length} atracții turistice</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <SvgIcon d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" placeholder="Caută atracții..." />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setCatFilter('all')} className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${catFilter === 'all' ? 'bg-brand-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>Toate</button>
          {cats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${catFilter === c ? 'bg-brand-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="card overflow-hidden hover:shadow-md transition-shadow">
            <img src={a.images[0]} alt="" className="w-full h-36 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-sm text-slate-800">{a.name}</h3>
                <span className={`badge border text-[10px] ${CATEGORY_COLORS[a.category]}`}>{CATEGORY_LABELS[a.category]}</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{a.city} · ⭐ {a.rating} · {a.reviewCount} recenzii</p>
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-1 rounded-lg ${a.isFeatured ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                  {a.isFeatured ? '⭐ Featured' : '— Normal'}
                </span>
                <span className="px-2 py-1 rounded-lg bg-slate-50 text-slate-500">{a.priceLevel === 'free' ? 'Gratuit' : a.priceLevel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-12"><p className="text-sm text-slate-400">Nicio atracție găsită</p></div>}
    </div>
  );
}
