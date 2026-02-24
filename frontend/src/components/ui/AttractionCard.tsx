
import { Link } from 'react-router-dom';
import type { Attraction } from '../../types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../constants';
import StarRating from './StarRating';

export default function AttractionCard({ attraction }: { attraction: Attraction }) {
  const catColor = CATEGORY_COLORS[attraction.category];
  const catLabel = CATEGORY_LABELS[attraction.category];
  return (
    <Link to={`/explore/${attraction.slug}`} className="group card-elevated overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img src={attraction.images[0]} alt={attraction.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className={`absolute top-3 left-3 badge border ${catColor}`}>{catLabel}</span>
        {attraction.isFeatured && <span className="absolute top-3 right-3 badge bg-brand-500 text-white">Popular</span>}
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-sm text-slate-800 mb-1 group-hover:text-brand-600 transition-colors line-clamp-1">{attraction.name}</h3>
        <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
          {attraction.city}
        </p>
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{attraction.shortDescription}</p>
        <div className="flex items-center justify-between">
          <StarRating rating={attraction.rating} reviewCount={attraction.reviewCount} size="sm" />
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            {attraction.priceLevel === 'free' ? 'Gratuit' : attraction.priceLevel}
          </span>
        </div>
      </div>
    </Link>
  );
}