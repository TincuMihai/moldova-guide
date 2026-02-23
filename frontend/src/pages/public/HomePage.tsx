import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { attractionService } from '../../services';
import { tours } from '../../data/tours';
import { events } from '../../data/events';
import { categories } from '../../data/categories';
import type { Attraction } from '../../types';
import { CATEGORY_ICONS, STATS_PLATFORM } from '../../constants';
import AttractionCard from '../../components/ui/AttractionCard';
import TourCard from '../../components/ui/TourCard';
import { SvgIcon } from '../../components/common/UIComponents';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [featured, setFeatured] = useState<Attraction[]>([]);
  const navigate = useNavigate();

  useEffect(() => { attractionService.getFeatured().then(setFeatured); }, []);

  const featuredTours = useMemo(() => tours.filter((t) => t.isFeatured).slice(0, 3), []);
  const upcomingEvents = useMemo(() => events.slice(0, 3), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/explore?search=${encodeURIComponent(search)}`);
  };

  const stats = [
    { value: STATS_PLATFORM.totalAttractions + '+', label: 'Atracții' },
    { value: STATS_PLATFORM.totalTours + '+', label: 'Tururi' },
    { value: STATS_PLATFORM.totalGuides + '+', label: 'Ghizi' },
    { value: (STATS_PLATFORM.happyTravelers / 1000).toFixed(1) + 'K', label: 'Călători' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Platforma #1 de turism din Moldova
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Descoperă farmecul<br /><span className="text-gradient bg-gradient-to-r from-brand-300 to-amber-300 bg-clip-text text-transparent">Republicii Moldova</span>
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Explorează atracții unice, rezervă tururi ghidate și planifică-ți călătoria perfectă.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-10">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-32 py-4 bg-white/95 backdrop-blur-sm rounded-2xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xl" placeholder="Caută atracții, tururi, restaurante..." />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2.5 px-5 text-sm">Caută</button>
          </form>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl lg:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Explorează pe categorii</h2>
            <p className="section-subheading mx-auto">Descoperă locurile care te inspiră</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/explore?category=${cat.id}`} className="card-elevated p-5 text-center group">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <SvgIcon d={CATEGORY_ICONS[cat.id]} className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-sm text-slate-800 mb-0.5">{cat.name}</h3>
                <p className="text-xs text-slate-400">{cat.count} locuri</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ATTRACTIONS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-heading mb-2">Destinații populare</h2>
              <p className="section-subheading">Cele mai vizitate locuri din Moldova</p>
            </div>
            <Link to="/explore" className="btn-secondary text-sm hidden sm:inline-flex">Vezi toate</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((a) => <AttractionCard key={a.id} attraction={a} />)}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link to="/explore" className="btn-secondary text-sm">Vezi toate atracțiile</Link>
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-heading mb-2">Tururi recomandate</h2>
              <p className="section-subheading">Experiențe ghidate de localnici pasionați</p>
            </div>
            <Link to="/tours" className="btn-secondary text-sm hidden sm:inline-flex">Toate tururile</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTours.map((t) => <TourCard key={t.id} tour={t} />)}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-10 text-center">Evenimente viitoare</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((ev) => (
              <div key={ev.id} className="card-elevated overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 badge bg-white/90 backdrop-blur-sm text-slate-700">{ev.category}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-brand-600 font-semibold mb-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                    {ev.date} · {ev.time}
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-800 mb-1">{ev.title}</h3>
                  <p className="text-xs text-slate-500 mb-3">{ev.venue}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-brand-600">{ev.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-500 to-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">Gata de aventură?</h2>
          <p className="text-brand-100 mb-8 max-w-lg mx-auto">Creează-ți cont gratuit și începe să explorezi cele mai frumoase locuri din Moldova.</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">Începe acum</Link>
            <Link to="/tours" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all">Descoperă tururi</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
