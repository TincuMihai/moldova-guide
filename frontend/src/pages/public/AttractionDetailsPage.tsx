import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { attractionService, savedPlacesService } from '../../services';
import type { Attraction, Review } from '../../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../constants';
import { reviewService } from '../../services';
import StarRating from '../../components/ui/StarRating';
import AttractionCard from '../../components/ui/AttractionCard';
import { LoadingSpinner, ErrorState } from '../../components/common/UIComponents';
import { useAuth } from '../../context/AuthContext';

export default function AttractionDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const nav = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [attr, setAttr] = useState<Attraction | null>(null);
  const [nearby, setNearby] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [savingFav, setSavingFav] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeImg, setActiveImg] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const load = useCallback(async () => {
    if (!slug) return; setLoading(true); setError('');
    try {
      const d = await attractionService.getBySlug(slug);
      if (!d) { nav('/404', { replace: true }); return; }
      setAttr(d);
      setNearby(await attractionService.getNearby(slug, 4));
      // Check if saved
      const saved = await savedPlacesService.isSaved(d.id);
      setReviews(await reviewService.getByAttraction(d.id));
      setIsSaved(saved);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }, [slug, nav]);

  useEffect(() => { load(); }, [load]);

  const toggleSave = useCallback(async () => {
    if (!isAuthenticated) { nav('/login'); return; }
    if (!attr || savingFav) return;
    setSavingFav(true);
    try {
      if (isSaved) {
        // Find saved place and remove it
        const all = await savedPlacesService.getAll();
        const found = all.find(p => p.attractionId === attr.id);
        if (found) await savedPlacesService.remove(found.id);
        setIsSaved(false);
      } else {
        await savedPlacesService.add({
          attractionId: attr.id,
          name: attr.name,
          image: attr.images[0],
          category: attr.category,
          city: attr.city,
          rating: attr.rating,
          notes: '',
        });
        setIsSaved(true);
      }
    } catch {} finally { setSavingFav(false); }
  }, [attr, isSaved, isAuthenticated, nav, savingFav]);

  const handleReviewSubmit = useCallback(() => {
    if (!reviewText.trim()) return;
    setReviewSubmitted(true);
    setReviewText('');
  }, [reviewText]);

  if (loading) return <LoadingSpinner text="Se încarcă atracția..." />;
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!attr) return null;

  const cc = CATEGORY_COLORS[attr.category]; const cl = CATEGORY_LABELS[attr.category];
  const priceText = attr.priceLevel === 'free' ? 'Gratuit' : attr.priceLevel;

  return (
    <div className="pb-16 page-shell">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link to="/" className="hover:text-brand-500">Acasă</Link><span>/</span>
          <Link to="/explore" className="hover:text-brand-500">Explorează</Link><span>/</span>
          <span className="text-slate-600 dark:text-slate-400 font-medium truncate">{attr.name}</span>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
            <img src={attr.images[activeImg]} alt={attr.name} className="w-full h-full object-cover" />
            <span className={`absolute top-4 left-4 badge border ${cc}`}>{cl}</span>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {attr.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`relative h-44 rounded-xl overflow-hidden ring-2 transition-all ${activeImg === i ? 'ring-brand-500' : 'ring-transparent hover:ring-brand-200'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">{attr.name}</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                    {attr.address}
                  </p>
                </div>
                <button onClick={toggleSave} disabled={savingFav}
                  className={`flex-shrink-0 p-3 rounded-xl border-2 transition-all ${isSaved ? 'border-red-200 bg-red-50 text-red-500' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:border-brand-200'} ${savingFav ? 'opacity-50' : ''}`}>
                  <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                </button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <StarRating rating={attr.rating} reviewCount={attr.reviewCount} />
                <span className="text-sm font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{priceText}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{attr.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {attr.tags.map((tag) => <span key={tag} className="badge bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">#{tag}</span>)}
            </div>
            {/* Reviews */}
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">Recenzii ({attr.reviewCount})</h2>

              {/* Review form */}
              {isAuthenticated ? (
                <div className="card p-5 mb-6">
                  {reviewSubmitted ? (
                    <div className="flex items-center gap-3 text-emerald-600">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      <p className="text-sm font-medium">Recenzia ta a fost publicată!</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Notă:</p>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(s => (
                            <button key={s} onClick={() => setReviewRating(s)} className="p-0.5">
                              <svg className={`w-5 h-5 ${s <= reviewRating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="input-field min-h-[80px] resize-none mb-3" placeholder="Scrie o recenzie..." />
                      <button onClick={handleReviewSubmit} disabled={!reviewText.trim()} className="btn-primary text-sm disabled:opacity-50">Publică recenzia</button>
                    </>
                  )}
                </div>
              ) : (
                <div className="card p-4 mb-6 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Conectează-te pentru a lăsa o recenzie</p>
                  <Link to="/login" className="btn-secondary text-sm">Conectare</Link>
                </div>
              )}

              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="card p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1"><p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{r.author}</p><p className="text-xs text-slate-400">{r.date}</p></div>
                      <StarRating rating={r.rating} size="sm" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-4">Informații practice</h3>
              <div className="space-y-4 text-sm">
                <div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">Program</p><p className="text-slate-700 dark:text-slate-300">{attr.openingHours}</p></div>
                <div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">Preț</p><p className="text-slate-700 dark:text-slate-300 font-medium">{priceText}</p></div>
                {attr.phone && <div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">Telefon</p><p className="text-slate-700 dark:text-slate-300">{attr.phone}</p></div>}
                {attr.website && <div><p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">Website</p><a href={attr.website} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline truncate block">{attr.website}</a></div>}
              </div>
            </div>
            <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-sky-100 border border-slate-200 dark:border-slate-700">
              <div className="absolute inset-0 flex items-center justify-center"><p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hartă</p></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-brand-200 animate-pulse" />
            </div>
            {/* Share buttons */}
            <div className="card p-5">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-3">Distribuie</h3>
              <div className="flex gap-2">
                {[{name:'Facebook',bg:'bg-blue-600'},{name:'Twitter',bg:'bg-sky-500'},{name:'WhatsApp',bg:'bg-emerald-500'}].map(s => (
                  <button key={s.name} className={`flex-1 py-2 rounded-xl text-white text-xs font-semibold ${s.bg} hover:opacity-90 transition-opacity`}>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {nearby.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">Alte locuri din apropiere</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{nearby.map((a) => <AttractionCard key={a.id} attraction={a} />)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
