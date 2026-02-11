import { useState, useMemo } from 'react';
import { tours } from '../data';
import type { TourTheme } from '../types';
import { THEME_OPTIONS, DURATION_OPTIONS, LANGUAGE_OPTIONS, SORT_OPTIONS_TOURS } from '../constants';
import TourCard from '../components/ui/TourCard';

type SortOption = 'rating' | 'price_low' | 'price_high' | 'reviews';

export default function BrowseToursPage() {
  const [selectedTheme, setSelectedTheme] = useState<TourTheme | 'all'>('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = useMemo(() => {
    let result = [...tours];
    if (selectedTheme !== 'all') result = result.filter((t) => t.theme === selectedTheme);
    if (selectedDuration !== 'all') {
      result = result.filter((t) => {
        const hours = parseInt(t.duration);
        switch (selectedDuration) {
          case 'short': return hours <= 3;
          case 'half': return hours >= 4 && hours <= 6;
          case 'full': return hours >= 7;
          default: return true;
        }
      });
    }
    if (selectedLanguage !== 'all') result = result.filter((t) => t.language.includes(selectedLanguage));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q) || t.shortDescription.toLowerCase().includes(q) || t.guide.name.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'price_low': result.sort((a, b) => a.price - b.price); break;
      case 'price_high': result.sort((a, b) => b.price - a.price); break;
      case 'reviews': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return result;
  }, [selectedTheme, selectedDuration, selectedLanguage, sortBy, searchQuery]);

  const resetFilters = () => { setSelectedTheme('all'); setSelectedDuration('all'); setSelectedLanguage('all'); setSearchQuery(''); };

  return (
    <div className="pt-20 lg:pt-24 pb-16 min-h-screen bg-stone-50">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-forest-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-brand-400 rounded-full" />
              <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Tururi ghidate</span>
            </div>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Experiențe unice <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-amber-300">cu ghizi locali</span>
            </h1>
            <p className="text-base lg:text-lg text-slate-400 leading-relaxed">Alege un tur ghidat și descoperă Moldova prin ochii celor care o cunosc cel mai bine.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-slate-100 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-none -mx-4 px-4">
            {THEME_OPTIONS.map((theme) => (
              <button key={theme.value} onClick={() => setSelectedTheme(theme.value)} className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedTheme === theme.value ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
                <span>{theme.emoji}</span><span>{theme.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-36 space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Caută</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                  <input type="text" placeholder="Nume tur, ghid..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Durată</label>
                <div className="space-y-1">
                  {DURATION_OPTIONS.map((d) => (
                    <button key={d.value} onClick={() => setSelectedDuration(d.value)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedDuration === d.value ? 'bg-brand-50 text-brand-600 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>{d.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Limba turului</label>
                <div className="space-y-1">
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <button key={lang.value} onClick={() => setSelectedLanguage(lang.value)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedLanguage === lang.value ? 'bg-brand-50 text-brand-600 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>{lang.label}</button>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-amber-50 border border-brand-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                  <span className="text-sm font-semibold text-brand-700">Prețuri</span>
                </div>
                <p className="text-xs text-brand-600/70 leading-relaxed">Prețurile includ ghidul. Transportul și masa sunt de obicei extra.</p>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500"><span className="font-semibold text-slate-700">{filteredTours.length}</span> {filteredTours.length === 1 ? 'tur găsit' : 'tururi găsite'}</p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="input-field w-auto min-w-[160px] text-sm">
                {SORT_OPTIONS_TOURS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>

            {filteredTours.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {filteredTours.map((tour) => <TourCard key={tour.id} tour={tour} variant="featured" />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-700 mb-2">Niciun tur găsit</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">Încearcă să modifici filtrele sau tema.</p>
                <button onClick={resetFilters} className="btn-secondary">Resetează filtrele</button>
              </div>
            )}

            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl" />
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-white mb-1">Nu rata tururi noi</h3>
                  <p className="text-sm text-slate-400">Abonează-te și primești notificări când apar tururi noi.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input type="email" placeholder="email@exemplu.md" className="flex-1 sm:w-56 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-400" />
                  <button className="btn-primary px-5 py-2.5 text-sm">Abonare</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
