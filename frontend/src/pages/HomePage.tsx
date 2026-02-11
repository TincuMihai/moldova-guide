import { Link } from 'react-router-dom';
import { attractions, tours, categories, reviews, stats } from '../data';
import AttractionCard from '../components/ui/AttractionCard';
import TourCard from '../components/ui/TourCard';
import StarRating from '../components/ui/StarRating';
import { CATEGORY_ICONS } from './home/categoryIcons';

export default function HomePage() {
  const featuredAttractions = attractions.filter((a) => a.isFeatured);
  const featuredTours = tours.filter((t) => t.isFeatured);

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop" alt="Moldova landscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/50 to-slate-950/80" />
          <div className="absolute inset-0 bg-grain opacity-30 mix-blend-overlay" />
        </div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl animate-float animate-delay-300" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-up">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-white/90 font-medium">Peste {stats.totalAttractions} atracții de descoperit</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 animate-fade-up animate-delay-100">
              Descoperă{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-amber-300">Moldova</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-brand-500/20 rounded-full blur-sm" />
              </span>
              <br />ca un local
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mb-10 animate-fade-up animate-delay-200">
              Tururi ghidate unice, atracții ascunse, crame legendare și experiențe autentice — toate într-un singur loc.
            </p>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20 max-w-2xl animate-fade-up animate-delay-300">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input type="text" placeholder="Ce vrei să descoperi? (ex: crame, muzee, tururi...)" className="w-full pl-12 pr-4 py-3.5 bg-white/10 rounded-xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:bg-white/20 transition-colors" />
                </div>
                <button className="btn-primary px-8 shadow-brand-500/40">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                  Caută
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 animate-fade-up animate-delay-400">
              {[
                { value: `${stats.totalTours}+`, label: 'Tururi' },
                { value: `${stats.totalGuides}`, label: 'Ghizi' },
                { value: `${(stats.happyTravelers / 1000).toFixed(1)}k`, label: 'Călători fericiți' },
                { value: `${stats.citiesCovered}`, label: 'Orașe' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Scroll</span>
          <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-3">Explorează pe categorii</h2>
            <p className="section-subheading mx-auto">De la crame subterane la muzee de artă — Moldova te surprinde la fiecare pas.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.slice(0, 10).map((cat) => (
              <Link key={cat.id} to={`/explore?category=${cat.id}`} className="group relative p-5 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/40 hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-brand-50 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <svg className="w-6 h-6 text-slate-400 group-hover:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    {CATEGORY_ICONS[cat.id] || <circle cx="12" cy="12" r="3" />}
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-sm text-slate-800 group-hover:text-brand-600 transition-colors">{cat.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{cat.count} locuri</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED TOURS ──────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-stone-50 via-brand-50/30 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="section-heading mb-3">Tururi populare</h2>
              <p className="section-subheading">Cele mai apreciate experiențe ghidate din Moldova.</p>
            </div>
            <Link to="/tours" className="btn-secondary self-start sm:self-auto">
              Toate tururile
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED ATTRACTIONS ────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="section-heading mb-3">Atracții de top</h2>
              <p className="section-subheading">Locurile care fac Moldova specială.</p>
            </div>
            <Link to="/explore" className="btn-secondary self-start sm:self-auto">
              Explorează toate
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading text-white mb-3">Ce spun călătorii</h2>
            <p className="section-subheading text-slate-400 mx-auto">Experiențe reale, povești autentice.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" />
                  <div>
                    <p className="text-sm font-semibold text-white">{review.author}</p>
                    <p className="text-xs text-slate-500">{review.date}</p>
                  </div>
                </div>
                <div className="mb-3"><StarRating rating={review.rating} /></div>
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&h=500&fit=crop" alt="Moldova wine cellar" className="w-full h-80 sm:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 sm:px-12 lg:px-16 max-w-lg">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">Ești ghid turistic?</h2>
                <p className="text-base text-white/70 mb-8 leading-relaxed">Alătură-te comunității MoldovaGuide, creează tururi unice și conectează-te cu călători din toată lumea.</p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/tours" className="btn-primary">
                    Devino ghid
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                  <button className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30">Află mai multe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
