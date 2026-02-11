import { useState, useMemo } from 'react';
import { attractions, categories } from '../data';
import type { AttractionCategory, PriceLevel } from '../types';
import { PRICE_OPTIONS } from '../constants';
import AttractionCard from '../components/ui/AttractionCard';

type ViewMode = 'grid' | 'list';
type SortOption = 'rating' | 'reviews' | 'name';

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<AttractionCategory | 'all'>('all');
  const [selectedPrice, setSelectedPrice] = useState<PriceLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAttractions = useMemo(() => {
    let result = [...attractions];
    if (selectedCategory !== 'all') result = result.filter((a) => a.category === selectedCategory);
    if (selectedPrice !== 'all') result = result.filter((a) => a.priceLevel === selectedPrice);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((a) => a.name.toLowerCase().includes(q) || a.shortDescription.toLowerCase().includes(q) || a.city.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q)));
    }
    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [selectedCategory, selectedPrice, searchQuery, sortBy]);

  const activeFiltersCount = [selectedCategory !== 'all', selectedPrice !== 'all', searchQuery.trim() !== ''].filter(Boolean).length;

  const resetFilters = () => { setSelectedCategory('all'); setSelectedPrice('all'); setSearchQuery(''); };

  return (
    <div className="pt-20 lg:pt-24 pb-16 min-h-screen bg-stone-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-0.5 bg-brand-500 rounded-full" />
                <span className="text-xs font-semibold text-brand-500 uppercase tracking-widest">Explorează</span>
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Descoperă Chișinăul și Moldova</h1>
              <p className="text-base text-slate-500 max-w-xl">Muzee, parcuri, restaurante, crame și multe altele — filtrează, caută și planifică-ți aventura.</p>
            </div>
            <div className="relative w-full lg:w-80 h-48 lg:h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-sky-100 border border-slate-200 flex-shrink-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-10 h-10 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>
                  <p className="text-sm font-medium text-slate-500">Hartă Interactivă</p>
                  <p className="text-xs text-slate-400">disponibilă în curând</p>
                </div>
              </div>
              <div className="absolute top-8 left-12 w-3 h-3 rounded-full bg-brand-500 ring-4 ring-brand-200 animate-pulse" />
              <div className="absolute top-16 right-20 w-3 h-3 rounded-full bg-forest-500 ring-4 ring-forest-200" />
              <div className="absolute bottom-12 left-28 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-200" />
              <div className="absolute bottom-20 right-12 w-3 h-3 rounded-full bg-violet-500 ring-4 ring-violet-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 lg:top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              <input type="text" placeholder="Caută atracții, locuri, categorii..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`btn-secondary ${showFilters ? 'bg-brand-50 border-brand-200 text-brand-600' : ''}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>
              Filtre
              {activeFiltersCount > 0 && <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] flex items-center justify-center">{activeFiltersCount}</span>}
            </button>
            <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`} aria-label="Grid view">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg>
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`} aria-label="List view">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              </button>
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="input-field w-auto min-w-[140px]">
              <option value="rating">⭐ Rating</option>
              <option value="reviews">💬 Recenzii</option>
              <option value="name">🔤 Nume (A–Z)</option>
            </select>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Categorie</label>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setSelectedCategory('all')} className={`badge border transition-all ${selectedCategory === 'all' ? 'bg-brand-50 text-brand-600 border-brand-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>Toate</button>
                    {categories.map((cat) => (
                      <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`badge border transition-all ${selectedCategory === cat.id ? 'bg-brand-50 text-brand-600 border-brand-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>{cat.name}</button>
                    ))}
                  </div>
                </div>
                <div className="sm:w-48">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Preț</label>
                  <div className="flex flex-wrap gap-2">
                    {PRICE_OPTIONS.map((opt) => (
                      <button key={opt.value} onClick={() => setSelectedPrice(opt.value as PriceLevel | 'all')} className={`badge border transition-all ${selectedPrice === opt.value ? 'bg-brand-50 text-brand-600 border-brand-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}>{opt.label}</button>
                    ))}
                  </div>
                </div>
              </div>
              {activeFiltersCount > 0 && (
                <button onClick={resetFilters} className="mt-4 text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  Șterge filtrele ({activeFiltersCount})
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500"><span className="font-semibold text-slate-700">{filteredAttractions.length}</span> atracții găsite</p>
        </div>
        {filteredAttractions.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAttractions.map((a) => <AttractionCard key={a.id} attraction={a} />)}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAttractions.map((a) => <AttractionCard key={a.id} attraction={a} variant="wide" />)}
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </div>
            <h3 className="font-display font-semibold text-lg text-slate-700 mb-2">Niciun rezultat găsit</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">Încearcă să modifici filtrele sau termenul de căutare.</p>
            <button onClick={resetFilters} className="btn-secondary mt-6">Resetează filtrele</button>
          </div>
        )}
      </div>
    </div>
  );
}
