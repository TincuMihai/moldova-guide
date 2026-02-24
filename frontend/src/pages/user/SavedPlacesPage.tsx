import { useState, useEffect, useMemo, useCallback } from 'react';
import { savedPlacesService } from '../../services';
import type { SavedPlace } from '../../types';
import { CATEGORY_LABELS } from '../../constants';
import StarRating from '../../components/ui/StarRating';
import { LoadingSpinner, EmptyState, ConfirmDialog, Modal } from '../../components/common/UIComponents';

export default function SavedPlacesPage() {
  const [places, setPlaces] = useState<SavedPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editPlace, setEditPlace] = useState<SavedPlace | null>(null);
  const [editNotes, setEditNotes] = useState('');

  useEffect(() => { savedPlacesService.getAll().then(setPlaces).finally(() => setLoading(false)); }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(places.map((p) => p.category))];
    return [{ value: 'all', label: 'Toate', count: places.length }, ...cats.map((c) => ({ value: c, label: (CATEGORY_LABELS as Record<string, string>)[c] || c, count: places.filter((p) => p.category === c).length }))];
  }, [places]);

  const filtered = useMemo(() => filter === 'all' ? places : places.filter((p) => p.category === filter), [places, filter]);

  const handleDelete = useCallback(async () => { if (!deleteId) return; await savedPlacesService.remove(deleteId); setPlaces((p) => p.filter((x) => x.id !== deleteId)); setDeleteId(null); }, [deleteId]);
  const handleSaveNotes = useCallback(async () => { if (!editPlace) return; const u = await savedPlacesService.updateNotes(editPlace.id, editNotes); setPlaces((p) => p.map((x) => x.id === u.id ? u : x)); setEditPlace(null); }, [editPlace, editNotes]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="pb-16 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900 mb-6">Locuri salvate</h1>
        <div className="flex flex-wrap gap-2 mb-6">{categories.map((c) => (<button key={c.value} onClick={() => setFilter(c.value)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === c.value ? 'bg-brand-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>{c.label} ({c.count})</button>))}</div>
        {filtered.length > 0 ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.map((p) => (
          <div key={p.id} className="card overflow-hidden group">
            <div className="relative h-40 overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 flex gap-1">
                <button onClick={() => { setEditPlace(p); setEditNotes(p.notes); }} className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white text-slate-600"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" /></svg></button>
                <button onClick={() => setDeleteId(p.id)} className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-50 text-slate-600 hover:text-red-500"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
              </div>
            </div>
            <div className="p-4"><h3 className="font-display font-bold text-sm text-slate-800 mb-1">{p.name}</h3><p className="text-xs text-slate-400 mb-2">{p.city}</p><StarRating rating={p.rating} size="sm" />{p.notes && <div className="mt-3 pt-3 border-t border-slate-50"><p className="text-xs text-slate-500 italic">{p.notes}</p></div>}</div>
          </div>
        ))}</div> : <EmptyState title="Niciun loc salvat" description="Exploreaza atractiile si salveaza-le la favorite." />}
      </div>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Sterge din favorite" message="Elimini acest loc din favorite?" confirmText="Elimina" variant="danger" />
      <Modal isOpen={!!editPlace} onClose={() => setEditPlace(null)} title="Editeaza notitele" size="sm">
        <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} className="input-field min-h-[100px] resize-none" placeholder="Adauga o notita..." />
        <div className="flex justify-end gap-3 mt-4"><button onClick={() => setEditPlace(null)} className="btn-secondary text-sm">Anuleaza</button><button onClick={handleSaveNotes} className="btn-primary text-sm">Salveaza</button></div>
      </Modal>
    </div>
  );
}