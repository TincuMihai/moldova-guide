import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tourService, bookingService } from '../../services';
import type { Tour, Booking } from '../../types';
import { LoadingSpinner, StatusBadge, SvgIcon } from '../../components/common/UIComponents';
import StarRating from '../../components/ui/StarRating';

export default function GuideDashboard() {
  const { user } = useAuth();
  const [tours, setTours] = useState<Tour[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      tourService.getByGuide(user.name),
      bookingService.getByGuide(user.name),
    ]).then(([t, b]) => { setTours(t); setBookings(b); })
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isLoading) return <LoadingSpinner />;

  const completedBookings = bookings.filter((b) => b.status === 'completed');
  const totalEarnings = completedBookings.reduce((s, b) => s + b.totalPrice, 0);
  const pendingBookings = bookings.filter((b) => b.status === 'pending' || b.status === 'confirmed');
  const avgRating = tours.length > 0 ? (tours.reduce((s, t) => s + t.rating, 0) / tours.length) : 0;
  const totalReviews = tours.reduce((s, t) => s + t.reviewCount, 0);

  const months = ['Oct', 'Nov', 'Dec', 'Ian', 'Feb'];
  const earnings = [320, 480, 290, 510, 380];
  const maxE = Math.max(...earnings, 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Panou ghid</h1>
          <p className="text-sm text-slate-500 mt-1">Bine ai revenit, {user?.name?.split(' ')[0]}!</p>
        </div>
        <Link to="/guide/create-tour" className="btn-primary text-sm">
          <SvgIcon d="M12 4.5v15m7.5-7.5h-15" className="w-4 h-4" />
          Creează un tur nou
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tururi active', value: tours.filter(t => t.isActive).length, emoji: '🗺️', accent: 'text-brand-600' },
          { label: 'Câștiguri totale', value: `${totalEarnings} €`, emoji: '💰', accent: 'text-emerald-600' },
          { label: 'Rating mediu', value: avgRating.toFixed(1), emoji: '⭐', accent: 'text-amber-600' },
          { label: 'Recenzii totale', value: totalReviews, emoji: '💬', accent: 'text-sky-600' },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.emoji}</span>
            </div>
            <p className={`font-display text-2xl font-bold ${s.accent}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Earnings chart */}
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-6">Câștiguri lunare</h2>
            <div className="flex items-end gap-3 h-44">
              {months.map((m, i) => (
                <div key={m} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">{earnings[i]}€</span>
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-brand-500 to-brand-400 transition-all duration-500"
                    style={{ height: `${(earnings[i] / maxE) * 100}%`, minHeight: '8px' }}
                  />
                  <span className="text-xs text-slate-400">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* My tours */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-slate-900">Tururile mele</h2>
              <Link to="/guide/my-tours" className="text-sm text-brand-500 font-medium hover:underline">Gestionează →</Link>
            </div>
            {tours.length > 0 ? (
              <div className="space-y-3">
                {tours.slice(0, 4).map((t) => (
                  <div key={t.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <img src={t.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-slate-800 truncate">{t.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <StarRating rating={t.rating} size="sm" />
                        <span className="text-xs text-slate-400">{t.price} {t.currency}</span>
                      </div>
                    </div>
                    <span className={`badge border text-[10px] ${t.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      {t.isActive ? 'Activ' : 'Pauză'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-slate-400 mb-3">Nu ai tururi create încă</p>
                <Link to="/guide/create-tour" className="btn-primary text-sm">Creează primul tur</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Rezervări recente</h2>
            {pendingBookings.length > 0 ? (
              <div className="space-y-3">
                {pendingBookings.slice(0, 5).map((b) => (
                  <div key={b.id} className="p-3 rounded-xl bg-slate-50 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-800 truncate">{b.tourTitle}</h3>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-xs text-slate-400">{b.date} · {b.participants} pers.</p>
                    <p className="text-xs font-semibold text-slate-600">{b.totalPrice} {b.currency}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-4">Nicio rezervare viitoare</p>
            )}
          </div>

          {/* Tip card */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-brand-50 to-amber-50 border border-brand-100">
            <h3 className="font-display font-semibold text-brand-800 text-sm mb-2">💡 Sfat</h3>
            <p className="text-xs text-brand-700/70 leading-relaxed">
              Tururile cu fotografii de calitate primesc cu 40% mai multe rezervări. Adaugă cel puțin 3 imagini la fiecare tur!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
