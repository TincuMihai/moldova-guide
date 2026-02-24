import { Link } from 'react-router-dom';

export default function Page403() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-stone-50 via-white to-red-50/30 flex items-center justify-center px-4 z-[9999]">
      <div className="text-center max-w-lg animate-fade-up">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-red-50/60" />
          <svg viewBox="0 0 200 200" className="relative w-full h-full" fill="none">
            <circle cx="100" cy="100" r="80" fill="#FEE2E2" />
            <circle cx="60" cy="35" r="8" fill="#FCA5A5" opacity="0.5" />
            <circle cx="155" cy="55" r="5" fill="#F87171" opacity="0.4" />
            {/* Shield */}
            <path d="M100 50 L140 70 L140 110 C140 140 100 160 100 160 C100 160 60 140 60 110 L60 70 Z" fill="#EF4444" />
            <path d="M100 55 L135 73 L135 108 C135 135 100 153 100 153 C100 153 65 135 65 108 L65 73 Z" fill="#F87171" />
            {/* X mark */}
            <path d="M85 90 L115 120 M115 90 L85 120" stroke="white" strokeWidth="8" strokeLinecap="round" />
            {/* Sparkles */}
            <path d="M40 85l3-8 3 8-8-3 8-3z" fill="#FCA5A5" />
            <path d="M160 80l2-6 2 6-6-2 6-2z" fill="#F87171" />
          </svg>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0">
            <span className="font-display text-6xl font-black text-red-200/70">4</span>
            <div className="w-14 h-14 rounded-full bg-red-400 flex items-center justify-center -mx-1">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <span className="font-display text-6xl font-black text-red-200/70">3</span>
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Acces interzis</h1>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
          Nu ai permisiunile necesare pentru a accesa această pagină. Contactează administratorul dacă crezi că este o eroare.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/dashboard" className="btn-primary px-8">Panoul meu</Link>
          <Link to="/" className="btn-secondary">Acasă</Link>
        </div>
      </div>
    </div>
  );
}
