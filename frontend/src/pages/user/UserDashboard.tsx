import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bookingService, savedPlacesService, tripService, notificationService } from '../../services';
import type { Booking, SavedPlace, Trip, Notification } from '../../types';
import { LoadingSpinner, StatusBadge } from '../../components/common/UIComponents';

export default function UserDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [saved, setSaved] = useState<SavedPlace[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      bookingService.getByUser(user.id),
      savedPlacesService.getAll(),
      tripService.getByUser(user.id),
      notificationService.getAll(),
    ]).then(([b, s, t, n]) => {
      setBookings(b); setSaved(s); setTrips(t); setNotifications(n);
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const upcoming = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending');
  const quickLinks = [
    { to: '/dashboard/bookings', label: 'Rezervări', icon: '🎫', count: bookings.length },
    { to: '/dashboard/saved', label: 'Locuri salvate', icon: '❤️', count: saved.length },
    { to: '/dashboard/trips', label: 'Călătorii', icon: '🗺️', count: trips.length },
    { to: '/dashboard/profile', label: 'Profil', icon: '👤', count: null },
  ];

  return (
    <div className="pb-16 page-shell">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <img src={user?.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-100 dark:ring-brand-900" />
            <div>
              <h1 className="page-title">Salut, {user?.name?.split(' ')[0]}!</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Bine ai revenit pe MoldovaGuide</p>
            </div>
          </div>
          <Link to="/explore" className="btn-primary text-sm">Explorează locuri noi</Link>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((l) => (
            <Link key={l.to} to={l.to} className="card p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{l.icon}</span>
                {l.count !== null && <span className="text-lg font-display font-bold text-slate-800 dark:text-white">{l.count}</span>}
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-brand-500 transition-colors">{l.label}</p>
            </Link>
          ))}
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — bookings + trips */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming bookings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Rezervări viitoare</h2>
                <Link to="/dashboard/bookings" className="text-sm text-brand-500 font-medium hover:underline">Vezi toate</Link>
              </div>
              {upcoming.length > 0 ? (
                <div className="space-y-3">
                  {upcoming.slice(0, 3).map((b) => (
                    <div key={b.id} className="card p-4 flex items-center gap-4">
                      <img src={b.tourImage} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-slate-800 dark:text-white truncate">{b.tourTitle}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{b.date} · {b.participants} pers. · {b.guideName}</p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card p-8 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Nu ai rezervări viitoare</p>
                  <Link to="/tours" className="btn-secondary text-sm">Descoperă tururi</Link>
                </div>
              )}
            </div>

            {/* Trips */}
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">Călătoriile mele</h2>
              {trips.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {trips.slice(0, 2).map((t) => (
                    <Link key={t.id} to="/dashboard/trips" className="card p-4 hover:border-brand-200 dark:hover:border-brand-800 transition-all">
                      <h3 className="font-display font-semibold text-slate-800 dark:text-white mb-1">{t.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t.startDate} — {t.endDate}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.days.reduce((a, d) => a + d.items.length, 0)} locuri planificate</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="card p-6 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Nu ai călătorii planificate</p>
                  <Link to="/dashboard/planner" className="btn-secondary text-sm">Planifică o călătorie</Link>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-8">
            {/* Notifications */}
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">Notificări</h2>
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="card p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === 'success' ? 'bg-emerald-500' : n.type === 'info' ? 'bg-blue-500' : 'bg-brand-500'}`} />
                        <div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{n.text}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card p-4 text-center">
                  <p className="text-xs text-slate-400">Fără notificări noi</p>
                </div>
              )}
            </div>

            {/* Saved places */}
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">Locuri salvate</h2>
              <div className="space-y-2">
                {saved.slice(0, 3).map((s) => (
                  <div key={s.id} className="card p-3 flex items-center gap-3">
                    <img src={s.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{s.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{s.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
