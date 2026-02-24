import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tripService } from '../../services';
import type { Trip } from '../../types';
import { LoadingSpinner, EmptyState, ConfirmDialog } from '../../components/common/UIComponents';

export default function MyTripsPage() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { if (!user) return; tripService.getByUser(user.id).then(setTrips).finally(() => setLoading(false)); }, [user]);

  const handleDelete = useCallback(async () => { if (!deleteId) return; await tripService.delete(deleteId); setTrips((p) => p.filter((t) => t.id !== deleteId)); setDeleteId(null); }, [deleteId]);
  const handleToggle = useCallback(async (id: string, pub: boolean) => { await tripService.update(id, { isPublic: !pub }); setTrips((p) => p.map((t) => t.id === id ? { ...t, isPublic: !pub } : t)); }, []);

  if (loading) return <LoadingSpinner />;
  const today = new Date().toISOString().split('T')[0];
  const upcoming = trips.filter((t) => t.endDate >= today);
  const past = trips.filter((t) => t.endDate < today);
  const displayed = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="pb-16 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6"><h1 className="font-display text-2xl font-bold text-slate-900">Calatoriile mele</h1><Link to="/dashboard/planner" className="btn-primary text-sm">+ Planifica</Link></div>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('upcoming')} className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === 'upcoming' ? 'bg-brand-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>Viitoare ({upcoming.length})</button>
          <button onClick={() => setTab('past')} className={`px-4 py-2 rounded-xl text-sm font-medium ${tab === 'past' ? 'bg-brand-500 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>Trecut ({past.length})</button>
        </div>
        {displayed.length > 0 ? <div className="space-y-4">{displayed.map((trip) => (
          <div key={trip.id} className="card p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div><h2 className="font-display font-bold text-lg text-slate-900">{trip.title}</h2><p className="text-sm text-slate-500 mt-0.5">{trip.startDate} — {trip.endDate} · {trip.days.length} zile</p></div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleToggle(trip.id, trip.isPublic)} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${trip.isPublic ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>{trip.isPublic ? 'Public' : 'Privat'}</button>
                <button onClick={() => setDeleteId(trip.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg></button>
              </div>
            </div>
            <div className="space-y-3">{trip.days.map((day, di) => (
              <div key={day.date} className="pl-4 border-l-2 border-brand-200"><p className="text-xs font-semibold text-brand-600 mb-2">Ziua {di + 1} — {day.date}</p><div className="flex flex-wrap gap-2">{day.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100"><img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover" /><div><p className="text-xs font-medium text-slate-700">{item.name}</p><p className="text-[10px] text-slate-400">{item.time} · {item.duration}</p></div></div>
              ))}</div></div>
            ))}</div>
          </div>
        ))}</div> : <EmptyState title="Nicio calatorie" description="Planifica prima ta aventura!" action={<Link to="/dashboard/planner" className="btn-primary text-sm">Planifica acum</Link>} />}
      </div>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Sterge calatoria" message="Esti sigur? Toate datele vor fi pierdute." confirmText="Sterge" variant="danger" />
    </div>
  );
}