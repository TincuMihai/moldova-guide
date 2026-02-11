import { Link } from 'react-router-dom';
import type { Tour } from '../../types';
import { THEME_LABELS, THEME_BADGE_COLORS } from '../../constants';
import StarRating from './StarRating';

interface TourCardProps {
  tour: Tour;
  variant?: 'default' | 'featured';
}

export default function TourCard({ tour, variant = 'default' }: TourCardProps) {
  const spotsLeft = tour.maxParticipants - tour.currentParticipants;
  const themeLabel = THEME_LABELS[tour.theme] || tour.theme;
  const themeColor = THEME_BADGE_COLORS[tour.theme] || 'bg-slate-100 text-slate-600';

  if (variant === 'featured') {
    return (
      <Link to={`/tours/${tour.slug}`} className="card-elevated group">
        <div className="relative h-64 overflow-hidden">
          <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`badge ${themeColor}`}>{themeLabel}</span>
            {spotsLeft <= 3 && <span className="badge bg-red-50 text-red-600">🔥 Doar {spotsLeft} locuri</span>}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-display font-bold text-xl text-white mb-1 drop-shadow-lg">{tour.title}</h3>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                {tour.duration}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
                Max {tour.maxParticipants}
              </span>
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">{tour.shortDescription}</p>
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-50">
            <img src={tour.guide.avatar} alt={tour.guide.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-100" />
            <div>
              <p className="text-sm font-semibold text-slate-800">{tour.guide.name}</p>
              <p className="text-xs text-slate-400">{tour.guide.languages.join(' · ')}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <StarRating rating={tour.rating} reviewCount={tour.reviewCount} />
            <div className="text-right">
              <span className="text-xl font-display font-bold text-brand-600">{tour.price}</span>
              <span className="text-sm text-slate-400 ml-1">{tour.currency}</span>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">per persoană</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/tours/${tour.slug}`} className="card-elevated group">
      <div className="relative h-48 overflow-hidden">
        <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 left-3"><span className={`badge ${themeColor}`}>{themeLabel}</span></div>
        {spotsLeft <= 3 && <div className="absolute top-3 right-3"><span className="badge bg-red-500 text-white text-[10px]">{spotsLeft} locuri rămase</span></div>}
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors mb-1.5">{tour.title}</h3>
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            {tour.duration}
          </span>
          <span>{tour.language.join(', ')}</span>
        </div>
        <p className="text-sm text-slate-500 line-clamp-2 mb-3">{tour.shortDescription}</p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <img src={tour.guide.avatar} alt={tour.guide.name} className="w-7 h-7 rounded-full object-cover" />
            <span className="text-xs font-medium text-slate-600">{tour.guide.name}</span>
          </div>
          <span className="font-display font-bold text-brand-600">{tour.price} <span className="text-xs text-slate-400 font-body">{tour.currency}</span></span>
        </div>
      </div>
    </Link>
  );
}
