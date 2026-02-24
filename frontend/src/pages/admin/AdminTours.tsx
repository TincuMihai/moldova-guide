import { useState, useEffect, useCallback, useMemo } from 'react';
import { tourService } from '../../services';
import type { Tour } from '../../types';
import { THEME_LABELS } from '../../constants';
import { LoadingSpinner, ConfirmDialog, SvgIcon } from '../../components/common/UIComponents';
import StarRating from '../../components/ui/StarRating';

export default function AdminTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { tourService.getAll().then(setTours).finally(() => setIsLoading(false)); }, []);

  const handleToggle = useCallback(async (id: string) => {
    const u = await tourService.toggleActive(id);
    setTours(prev => prev.map(t => t.id === id ? u : t));
  }, []);

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    await tourService.delete(deleteId);
    setTours(prev => prev.filter(t => t.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const filtered = useMemo(() => {
    if (!search.trim()) return tours;
    const q = search.toLowerCase();
    return tours.filter(t => t.title.toLowerCase().includes(q) || t.guide.name.toLowerCase().includes(q));
  }, [tours, search]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Gestionare tururi</h1>
          <p className="text-sm text-slate-500 mt-1">{tours.length} tururi pe platformă</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <SvgIcon d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10" placeholder="Caută tururi sau ghizi..." />
      </div>

      <div className="space-y-3">
        {filtered.map(tour => (
          <div key={tour.id} className="card p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <img src={tour.images[0]} alt="" className="w-full sm:w-36 h-24 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-semibold text-sm text-slate-800">{tour.title}</h3>
                  <span className={`badge border text-[10px] flex-shrink-0 ${tour.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                    {tour.isActive ? '● Activ' : '○ Suspendat'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-slate-500">
                  <span className="badge bg-slate-50 text-slate-500 border border-slate-200 text-[10px]">{THEME_LABELS[tour.theme]}</span>
                  <span>Ghid: {tour.guide.name}</span>
                  <span>{tour.price} {tour.currency}</span>
                  <StarRating rating={tour.rating} size="sm" />
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                  <button onClick={() => handleToggle(tour.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${tour.isActive ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'}`}>
                    {tour.isActive ? '⏸ Suspendă' : '▶ Activează'}
                  </button>
                  <button onClick={() => setDeleteId(tour.id)} className="text-xs font-medium px-3 py-1.5 rounded-lg text-red-500 bg-red-50 hover:bg-red-100 transition-all ml-auto">
                    🗑 Șterge
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-12"><p className="text-sm text-slate-400">Niciun tur găsit</p></div>}
      </div>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Șterge turul" message="Ești sigur? Turul și rezervările asociate vor fi șterse permanent."
        confirmText="Șterge" variant="danger" />
    </div>
  );
}
