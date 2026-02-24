import { Link } from 'react-router-dom';

export default function Page500() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-stone-50 via-white to-sky-50/30 flex items-center justify-center px-4 z-[9999]">
      <div className="text-center max-w-lg animate-fade-up">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-sky-50/60" />
          <svg viewBox="0 0 200 200" className="relative w-full h-full" fill="none">
            <circle cx="100" cy="100" r="80" fill="#E0F2FE" />
            <circle cx="55" cy="40" r="8" fill="#7DD3FC" opacity="0.5" />
            <circle cx="150" cy="45" r="6" fill="#38BDF8" opacity="0.4" />
            {/* Gear 1 */}
            <g transform="translate(80, 75)">
              <circle cx="15" cy="15" r="12" fill="#0284C7" />
              <circle cx="15" cy="15" r="6" fill="#E0F2FE" />
              <rect x="12" y="-2" width="6" height="8" rx="2" fill="#0284C7" />
              <rect x="12" y="28" width="6" height="8" rx="2" fill="#0284C7" />
              <rect x="-2" y="12" width="8" height="6" rx="2" fill="#0284C7" />
              <rect x="28" y="12" width="8" height="6" rx="2" fill="#0284C7" />
            </g>
            {/* Gear 2 */}
            <g transform="translate(110, 95)">
              <circle cx="12" cy="12" r="10" fill="#0EA5E9" />
              <circle cx="12" cy="12" r="5" fill="#E0F2FE" />
              <rect x="9.5" y="-2" width="5" height="7" rx="2" fill="#0EA5E9" />
              <rect x="9.5" y="21" width="5" height="7" rx="2" fill="#0EA5E9" />
              <rect x="-2" y="9.5" width="7" height="5" rx="2" fill="#0EA5E9" />
              <rect x="21" y="9.5" width="7" height="5" rx="2" fill="#0EA5E9" />
            </g>
            {/* Lightning bolt = broken */}
            <path d="M95 55 L88 80 L98 78 L90 105" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Sparkles */}
            <path d="M45 110l3-8 3 8-8-3 8-3z" fill="#7DD3FC" />
            <path d="M155 75l2-6 2 6-6-2 6-2z" fill="#38BDF8" />
          </svg>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0">
            <span className="font-display text-6xl font-black text-sky-200/70">5</span>
            <div className="w-14 h-14 rounded-full bg-sky-400 flex items-center justify-center -mx-1">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" />
              </svg>
            </div>
            <span className="font-display text-6xl font-black text-sky-200/70">0</span>
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Eroare de server</h1>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
          Ceva a mers prost pe server. Echipa noastră a fost notificată. Încearcă din nou sau revino mai târziu.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => window.location.reload()} className="btn-primary px-8">Reîncarcă</button>
          <Link to="/" className="btn-secondary">Acasă</Link>
        </div>
      </div>
    </div>
  );
}
