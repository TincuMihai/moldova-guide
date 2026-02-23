import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tourService, bookingService } from '../../services';
import type { Tour } from '../../types';
import { THEME_LABELS, THEME_COLORS, DIFFICULTY_LABELS } from '../../constants';
import StarRating from '../../components/ui/StarRating';
import { LoadingSpinner, ErrorState, Modal } from '../../components/common/UIComponents';
import { useAuth } from '../../context/AuthContext';

export default function TourDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const nav = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBook, setShowBook] = useState(false);
  const [bDate, setBDate] = useState('');
  const [bPart, setBPart] = useState(1);
  const [bSaving, setBSaving] = useState(false);
  const [bSuccess, setBSuccess] = useState(false);

  const load = useCallback(async () => {
    if (!slug) return; setLoading(true);
    try { const d = await tourService.getBySlug(slug); if (!d) { nav('/404', { replace: true }); return; } setTour(d); } catch (e) { setError((e as Error).message); } finally { setLoading(false); }
  }, [slug, nav]);
  useEffect(() => { load(); }, [load]);

  const handleBook = useCallback(async () => {
    if (!tour || !user || !bDate) return; setBSaving(true);
    try { await bookingService.create({ tourId: tour.id, tourTitle: tour.title, tourImage: tour.images[0], userId: user.id, guideName: tour.guide.name, date: bDate, participants: bPart, totalPrice: tour.price * bPart, currency: tour.currency, status: 'pending', meetingPoint: tour.meetingPoint }); setBSuccess(true); } catch {} finally { setBSaving(false); }
  }, [tour, user, bDate, bPart]);

  if (loading) return <LoadingSpinner text="Se incarca turul..." />;
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!tour) return null;

  const spots = tour.maxParticipants - tour.currentParticipants;

  return (
    <div className="pb-16 bg-stone-50 min-h-screen">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={`badge ${THEME_COLORS[tour.theme]}`}>{THEME_LABELS[tour.theme]}</span>
              {spots <= 3 && <span className="badge bg-red-500/90 text-white">Doar {spots} locuri</span>}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span>{tour.duration}</span><span>{DIFFICULTY_LABELS[tour.difficulty]}</span><span>{tour.language.join(', ')}</span>
              <StarRating rating={tour.rating} reviewCount={tour.reviewCount} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link to="/" className="hover:text-brand-500">Acasa</Link><span>/</span>
          <Link to="/tours" className="hover:text-brand-500">Tururi</Link><span>/</span>
          <span className="text-slate-600 font-medium truncate">{tour.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div><h2 className="font-display text-xl font-bold text-slate-900 mb-3">Despre acest tur</h2><p className="text-slate-600 leading-relaxed">{tour.description}</p></div>
            {/* Itinerary */}
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Itinerariu</h2>
              <div className="space-y-4">
                {tour.stops.map((stop, i) => (
                  <div key={stop.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                      {i < tour.stops.length - 1 && <div className="w-0.5 flex-1 bg-brand-200 mt-2" />}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1"><h3 className="font-display font-semibold text-slate-800 mb-1">{stop.name}</h3><p className="text-sm text-slate-500 mb-1">{stop.description}</p><span className="text-xs text-slate-400">Durata: {stop.duration}</span></div>
                        <img src={stop.image} alt={stop.name} className="w-full sm:w-32 h-20 sm:h-24 rounded-xl object-cover flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Included/Excluded */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h3 className="font-display font-semibold text-emerald-800 mb-3">Inclus</h3>
                <ul className="space-y-2">{tour.included.map((it) => <li key={it} className="text-sm text-emerald-700 flex items-start gap-2"><svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>{it}</li>)}</ul>
              </div>
              <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100">
                <h3 className="font-display font-semibold text-red-800 mb-3">Nu este inclus</h3>
                <ul className="space-y-2">{tour.excluded.map((it) => <li key={it} className="text-sm text-red-700 flex items-start gap-2"><svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>{it}</li>)}</ul>
              </div>
            </div>
            {/* Guide */}
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Ghidul tau</h2>
              <div className="flex items-start gap-4">
                <img src={tour.guide.avatar} alt={tour.guide.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-100" />
                <div className="flex-1">
                  <h3 className="font-display font-bold text-slate-800">{tour.guide.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">{tour.guide.languages.join(' · ')}</p>
                  <StarRating rating={tour.guide.rating} reviewCount={tour.guide.reviewCount} />
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">{tour.guide.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <aside><div className="lg:sticky lg:top-24 card p-6">
            <div className="flex items-end gap-2 mb-6"><span className="font-display text-3xl font-bold text-brand-600">{tour.price}</span><span className="text-slate-400 text-sm mb-1">{tour.currency} / pers.</span></div>
            <div className="space-y-3 mb-6 text-sm text-slate-600">
              <p>Durata: {tour.duration}</p><p>Max {tour.maxParticipants} participanti ({spots} locuri libere)</p><p>Intalnire: {tour.meetingPoint}</p>
            </div>
            <div className="mb-6"><p className="text-xs font-semibold text-slate-500 uppercase mb-2">Date disponibile</p><div className="flex flex-wrap gap-2">{tour.availableDates.map((d) => <span key={d} className="badge bg-slate-50 text-slate-600 border border-slate-200 text-xs">{d}</span>)}</div></div>
            {isAuthenticated ? <button onClick={() => setShowBook(true)} className="btn-primary w-full justify-center">Rezerva acum</button> : <Link to="/login" className="btn-primary w-full justify-center text-center block">Conecteaza-te pentru a rezerva</Link>}
          </div></aside>
        </div>
      </div>

      <Modal isOpen={showBook} onClose={() => { setShowBook(false); setBSuccess(false); }} title={bSuccess ? 'Rezervare confirmata!' : 'Rezerva turul'}>
        {bSuccess ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center"><svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg></div>
            <p className="text-slate-600 mb-4">Rezervarea ta a fost trimisa cu succes!</p>
            <Link to="/dashboard/bookings" className="btn-primary">Vezi rezervarile</Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Data</label><select value={bDate} onChange={(e) => setBDate(e.target.value)} className="input-field"><option value="">Selecteaza</option>{tour.availableDates.map((d) => <option key={d} value={d}>{d}</option>)}</select></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1.5">Participanti</label><input type="number" min={1} max={spots} value={bPart} onChange={(e) => setBPart(Number(e.target.value))} className="input-field" /></div>
            <div className="p-4 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-between"><span className="text-sm text-slate-600">Total:</span><span className="font-display text-xl font-bold text-brand-600">{tour.price * bPart} {tour.currency}</span></div>
            <button onClick={handleBook} disabled={!bDate || bSaving} className="btn-primary w-full justify-center disabled:opacity-50">{bSaving ? 'Se proceseaza...' : 'Confirma rezervarea'}</button>
          </div>
        )}
      </Modal>
    </div>
  );
}