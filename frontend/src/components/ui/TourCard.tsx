import { Link } from 'react-router-dom';
import type { Tour } from '../../types';
import { THEME_LABELS, THEME_COLORS, DIFFICULTY_LABELS } from '../../constants';
import StarRating from './StarRating';

export default function TourCard({ tour }: { tour: Tour }) {
  const themeColor = THEME_COLORS[tour.theme];
  const themeLabel = THEME_LABELS[tour.theme];
  const spots = tour.maxParticipants - tour.currentParticipants;
  return (
    <Link to={`/tours/${tour.slug}`} className="group card-elevated overflow-hidden flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`badge ${themeColor}`}>{themeLabel}</span>
          {spots <= 3 && <span className="badge bg-red-500/90 text-white">Doar {spots} locuri</span>}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <img src={tour.guide.avatar} alt={tour.guide.name} className="w-7 h-7 rounded-full ring-2 ring-white/50 object-cover" />
            <span className="text-xs text-white/90 font-medium">{tour.guide.name}</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-base text-slate-800 mb-1 group-hover:text-brand-600 transition-colors">{tour.title}</h3>
        <p className="text-xs text-slate-500 mb-3 line-clamp-2 flex-1">{tour.shortDescription}</p>
        <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>{tour.duration}</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-100">{DIFFICULTY_LABELS[tour.difficulty]}</span>
          <span>{tour.language.join(', ')}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <StarRating rating={tour.rating} reviewCount={tour.reviewCount} size="sm" />
          <div className="text-right">
            <span className="font-display text-lg font-bold text-brand-600">{tour.price}</span>
            <span className="text-[10px] text-slate-400 ml-0.5">{tour.currency}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
