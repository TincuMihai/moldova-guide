import { Link } from 'react-router-dom';
import type { Attraction } from '../../types';
import { CATEGORY_LABELS, CATEGORY_BADGE_COLORS } from '../../constants';
import StarRating from './StarRating';

interface AttractionCardProps {
  attraction: Attraction;
  variant?: 'default' | 'compact' | 'wide';
}

export default function AttractionCard({ attraction, variant = 'default' }: AttractionCardProps) {
  const badgeColor = CATEGORY_BADGE_COLORS[attraction.category] || 'bg-slate-50 text-slate-600';
  const categoryLabel = CATEGORY_LABELS[attraction.category] || attraction.category;
  const priceDisplay = attraction.priceLevel === 'free' ? 'Gratuit' : attraction.priceLevel;

  if (variant === 'wide') {
    return (
      <Link to={`/explore/${attraction.slug}`} className="card-elevated group flex flex-col sm:flex-row">
        <div className="relative sm:w-72 lg:w-80 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          <img src={attraction.images[0]} alt={attraction.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 left-3">
            <span className={`badge border ${badgeColor}`}>{categoryLabel}</span>
          </div>
        </div>
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors mb-2">{attraction.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">{attraction.shortDescription}</p>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {attraction.address}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <StarRating rating={attraction.rating} reviewCount={attraction.reviewCount} />
            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{priceDisplay}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/explore/${attraction.slug}`} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <img src={attraction.images[0]} alt={attraction.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-sm text-slate-800 truncate group-hover:text-brand-600 transition-colors">{attraction.name}</h4>
          <p className="text-xs text-slate-400 mt-0.5">{attraction.city}</p>
          <StarRating rating={attraction.rating} size="sm" />
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/explore/${attraction.slug}`} className="card-elevated group">
      <div className="relative h-48 overflow-hidden">
        <img src={attraction.images[0]} alt={attraction.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`badge border ${badgeColor}`}>{categoryLabel}</span>
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all" onClick={(e) => e.preventDefault()} aria-label="Save">
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors mb-1">{attraction.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          {attraction.city}
        </div>
        <p className="text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">{attraction.shortDescription}</p>
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <StarRating rating={attraction.rating} reviewCount={attraction.reviewCount} />
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500">{priceDisplay}</span>
        </div>
      </div>
    </Link>
  );
}
