import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services';
import type { Booking, BookingStatus } from '../../types';
import { LoadingSpinner, EmptyState, StatusBadge, ConfirmDialog } from '../../components/common/UIComponents';

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => { if (!user) return; bookingService.getByUser(user.id).then(setBookings).finally(() => setLoading(false)); }, [user]);

  const filtered = useMemo(() => filter === 'all' ? bookings : bookings.filter((b) => b.status === filter), [bookings, filter]);

  const handleCancel = useCallback(async () => {
    if (!cancelId) return;
    await bookingService.updateStatus(cancelId, 'cancelled');
    setBookings((p) => p.map((b) => b.id === cancelId ? { ...b, status: 'cancelled' as BookingStatus } : b));
    setCancelId(null);
  }, [cancelId]);

  if (loading) return <LoadingSpinner />;

  const tabs: { value: BookingStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'Toate (' + bookings.length + ')' },
    { value: 'confirmed', label: 'Confirmate (' + bookings.filter((b) => b.status === 'confirmed').length + ')' },
    { value: 'pending', label: 'In asteptare (' + bookings.filter((b) => b.status === 'pending').length + ')' },
    { value: 'completed', label: 'Finalizate (' + bookings.filter((b) => b.status === 'completed').length + ')' },
    { value: 'cancelled', label: 'Anulate (' + bookings.filter((b) => b.status === 'cancelled').length + ')' },
  ];

  return (
    <div className="pb-16 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-2xl font-bold text-slate-900 mb-6">Rezervarile mele</h1>
        <div className="flex flex-wrap gap-2 mb-6">{tabs.map((t) => (
          <button key={t.value} onClick={() => setFilter(t.value)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === t.value ? 'bg-brand-500 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-200'}`}>{t.label}</button>
        ))}</div>
        {filtered.length > 0 ? <div className="space-y-4">{filtered.map((b) => (
          <div key={b.id} className="card p-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <img src={b.tourImage} alt="" className="w-full sm:w-32 h-24 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3"><div><h3 className="font-display font-bold text-base text-slate-800">{b.tourTitle}</h3><p className="text-sm text-slate-500 mt-1">Ghid: {b.guideName}</p></div><StatusBadge status={b.status} /></div>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400"><span>{b.date}</span><span>{b.participants} participanti</span><span className="font-semibold text-slate-600">{b.totalPrice} {b.currency}</span></div>
                <p className="text-xs text-slate-400 mt-2">Punct de intalnire: {b.meetingPoint}</p>
                {(b.status === 'confirmed' || b.status === 'pending') && <div className="mt-3 pt-3 border-t border-slate-50"><button onClick={() => setCancelId(b.id)} className="text-xs text-red-500 font-medium hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">Anuleaza rezervarea</button></div>}
              </div>
            </div>
          </div>
        ))}</div> : <EmptyState title="Nicio rezervare" description="Nu ai inca rezervari in aceasta categorie." />}
      </div>
      <ConfirmDialog isOpen={!!cancelId} onClose={() => setCancelId(null)} onConfirm={handleCancel} title="Anuleaza rezervarea" message="Esti sigur ca vrei sa anulezi aceasta rezervare?" confirmText="Anuleaza" variant="danger" />
    </div>
  );
}