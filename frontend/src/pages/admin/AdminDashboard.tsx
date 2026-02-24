import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMaintenance } from '../../context/MaintenanceContext';
import { attractionService, tourService, bookingService } from '../../services';
import { mockUsers } from '../../data';
import type { Attraction, Tour, Booking } from '../../types';
import { LoadingSpinner, SvgIcon } from '../../components/common/UIComponents';

export default function AdminDashboard() {
  const { isMaintenanceMode, toggleMaintenance } = useMaintenance();
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      attractionService.getAll(),
      tourService.getAll(),
      bookingService.getByUser('u1'),
    ]).then(([a, t, b]) => { setAttractions(a); setTours(t); setBookings(b); })
      .finally(() => setIsLoading(false));
  }, []);

  const stats = useMemo(() => ({
    users: mockUsers.length,
    attractions: attractions.length,
    tours: tours.length,
    bookings: bookings.length,
    revenue: bookings.filter(b => b.status === 'completed').reduce((s, b) => s + b.totalPrice, 0),
    pending: bookings.filter(b => b.status === 'pending').length,
  }), [attractions, tours, bookings]);

  const recentActivity = [
    { icon: '👤', text: 'Utilizator nou: Elena Vasile', time: '2 ore', color: 'bg-emerald-50 text-emerald-600' },
    { icon: '🎫', text: 'Rezervare confirmată: Ruta Vinurilor', time: '4 ore', color: 'bg-sky-50 text-sky-600' },
    { icon: '🗺️', text: 'Tur nou publicat: Street Art Tour', time: '6 ore', color: 'bg-violet-50 text-violet-600' },
    { icon: '⭐', text: 'Recenzie nouă: 5 stele — Orheiul Vechi', time: '8 ore', color: 'bg-amber-50 text-amber-600' },
    { icon: '🔧', text: 'Actualizare sistem: v2.1.3', time: '1 zi', color: 'bg-slate-50 text-slate-600' },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Panou de administrare</h1>
          <p className="text-sm text-slate-500 mt-1">Monitorizează și gestionează platforma MoldovaGuide.</p>
        </div>
        <button onClick={toggleMaintenance}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${isMaintenanceMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}>
          <div className={`w-2 h-2 rounded-full ${isMaintenanceMode ? 'bg-red-200 animate-pulse' : 'bg-emerald-200'}`} />
          {isMaintenanceMode ? 'Oprește mentenanța' : 'Site online'}
        </button>
      </div>

      {/* Maintenance warning */}
      {isMaintenanceMode && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3">
          <span className="text-2xl">🔧</span>
          <div>
            <p className="text-sm font-semibold text-red-700">Modul mentenanță activ</p>
            <p className="text-xs text-red-500">Vizitatorii văd pagina de mentenanță. Doar adminii au acces.</p>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'Utilizatori', value: stats.users, emoji: '👥', accent: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Atracții', value: stats.attractions, emoji: '📍', accent: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Tururi', value: stats.tours, emoji: '🗺️', accent: 'text-sky-600', bg: 'bg-sky-50' },
          { label: 'Rezervări totale', value: stats.bookings, emoji: '🎫', accent: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Venituri', value: `${stats.revenue} €`, emoji: '💰', accent: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'În așteptare', value: stats.pending, emoji: '⏳', accent: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((s) => (
          <div key={s.label} className="card p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center text-lg mb-3`}>{s.emoji}</div>
            <p className={`font-display text-2xl font-bold ${s.accent}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Acțiuni rapide</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { to: '/admin/users', label: 'Gestionare utilizatori', desc: 'Vizualizează, blochează, editează', icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z', bg: 'bg-violet-50 text-violet-600' },
                { to: '/admin/tours', label: 'Gestionare tururi', desc: 'Aprobă, suspendă, editează', icon: 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z', bg: 'bg-sky-50 text-sky-600' },
                { to: '/admin/attractions', label: 'Gestionare atracții', desc: 'Adaugă, editează, șterge', icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z', bg: 'bg-emerald-50 text-emerald-600' },
                { to: '/admin/settings', label: 'Setări platformă', desc: 'Mentenanță, configurare', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z', bg: 'bg-amber-50 text-amber-600' },
              ].map((item) => (
                <Link key={item.to} to={item.to} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                  <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <SvgIcon d={item.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="card p-6">
          <h2 className="font-display text-lg font-bold text-slate-900 mb-4">Activitate recentă</h2>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-2">
                <span className="text-lg flex-shrink-0">{a.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-700">{a.text}</p>
                  <p className="text-xs text-slate-400">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
