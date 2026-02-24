import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-stone-50 via-white to-violet-50/30 flex items-center justify-center px-4 z-[9999]">
      <div className="text-center max-w-lg animate-fade-up">
        <div className="relative w-72 h-64 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-violet-50/50" />
          <svg viewBox="0 0 240 200" className="relative w-full h-full" fill="none">
            <circle cx="120" cy="100" r="80" fill="#EDE9FE" />
            {/* Sun */}
            <circle cx="70" cy="45" r="14" fill="#FCD34D" />
            <circle cx="70" cy="45" r="10" fill="#FBBF24" />
            {/* Cloud */}
            <ellipse cx="165" cy="50" rx="22" ry="12" fill="white" />
            <ellipse cx="150" cy="48" rx="14" ry="10" fill="white" />
            {/* Character body */}
            <circle cx="120" cy="80" r="18" fill="#FED7AA" />
            <circle cx="114" cy="76" r="2" fill="#78350F" />
            <circle cx="126" cy="76" r="2" fill="#78350F" />
            <path d="M116 84 Q120 88 124 84" stroke="#78350F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Hair */}
            <path d="M102 74 Q105 55 120 52 Q135 55 138 74" fill="#DC2626" />
            <path d="M138 74 Q142 68 140 60" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Body */}
            <path d="M108 97 L105 130 L135 130 L132 97" fill="#059669" />
            <rect x="105" y="130" width="12" height="16" rx="4" fill="#6B7280" />
            <rect x="123" y="130" width="12" height="16" rx="4" fill="#6B7280" />
            {/* Backpack strap */}
            <path d="M110 98 L106 110" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M130 98 L134 110" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
            {/* Question mark */}
            <text x="158" y="95" fontSize="24" fill="#A78BFA" fontWeight="bold">?</text>
            {/* Grass */}
            <path d="M60 155 Q65 145 70 155" stroke="#34D399" strokeWidth="2" fill="none" />
            <path d="M170 150 Q175 140 180 150" stroke="#34D399" strokeWidth="2" fill="none" />
          </svg>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-0">
            <span className="font-display text-7xl font-black text-violet-200/70">4</span>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center -mx-1 shadow-lg shadow-violet-300/40">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <span className="font-display text-7xl font-black text-violet-200/70">4</span>
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Pagina nu a fost găsită!</h1>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
          Ne pare rău, nu am găsit pagina pe care o cauți. Poate ai introdus greșit URL-ul? Verifică din nou.
        </p>
        <Link to="/" className="btn-primary px-8 py-3">Acasă</Link>
      </div>
    </div>
  );
}
