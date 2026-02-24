import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tourService } from '../../services';
import type { Tour } from '../../types';
import { THEME_LABELS } from '../../constants';
import StarRating from '../../components/ui/StarRating';
import { LoadingSpinner, EmptyState, ConfirmDialog, SvgIcon } from '../../components/common/UIComponents';

export default function MyToursPage() {
  const { user } = useAuth();
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) return;
    tourService.getByGuide(user.name).then(setTours).finally(() => setIsLoading(false));
  }, [user]);

  const handleToggle = useCallback(async (id: string) => {
    const updated = await tourService.toggleActive(id);
    setTours((prev) => prev.map((t) => t.id === id ? updated : t));
  }, []);

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    await tourService.delete(deleteId);
    setTours((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const filtered = useMemo(() => {
    if (!search.trim()) return tours;
    const q = search.toLowerCase();
    return tours.filter((t) => t.title.toLowerCase().includes(q));
  }, [tours, search]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-slate-900">Tururile mele</h1>
        <Link to="/guide/create-tour" className="btn-primary text-sm">
          <SvgIcon d="M12 4.5v15m7.5-7.5h-15" className="w-4 h-4" /> Tur nou
        </Link>
      </div>

      <div className="relative max-w-md">
        <SvgIcon d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10" placeholder="Caută tururi..." />
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((tour) => (
            <div key={tour.id} className="card p-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <img src={tour.images[0]} alt="" className="w-full sm:w-40 h-28 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-800">{tour.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="badge bg-slate-50 text-slate-500 border border-slate-200 text-xs">
                          {THEME_LABELS[tour.theme] || tour.theme}
                        </span>
                        <span>{tour.duration}</span>
                        <span className="font-semibold">{tour.price} {tour.currency}</span>
                      </div>
                    </div>
                    <span className={`badge border text-xs flex-shrink-0 ${tour.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      {tour.isActive ? '● Activ' : '○ Pauză'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1 mb-3">{tour.shortDescription}</p>
                  <div className="flex items-center gap-4 mb-3">
                    <StarRating rating={tour.rating} reviewCount={tour.reviewCount} />
                    <span className="text-xs text-slate-400">{tour.language.join(', ')}</span>
                    <span className="text-xs text-slate-400">Max {tour.maxParticipants} pers.</span>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                    <button onClick={() => handleToggle(tour.id)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${tour.isActive ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'}`}>
                      {tour.isActive ? '⏸ Pune pe pauză' : '▶ Activează'}
                    </button>
                    <Link to={`/tours/${tour.slug}`}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg text-slate-600 bg-slate-50 hover:bg-slate-100 transition-all">
                      👁 Previzualizare
                    </Link>
                    <button onClick={() => setDeleteId(tour.id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg text-red-500 bg-red-50 hover:bg-red-100 transition-all ml-auto">
                      🗑 Șterge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title={search ? 'Niciun tur găsit' : 'Nu ai tururi'}
          description={search ? 'Modifică termenul de căutare.' : 'Creează primul tău tur ghidat!'}
          action={!search ? <Link to="/guide/create-tour" className="btn-primary text-sm">Creează un tur</Link> : undefined}
        />
      )}

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Șterge turul" message="Ești sigur? Toate datele asociate turului vor fi pierdute."
        confirmText="Șterge definitiv" variant="danger" />
    </div>
  );
}
