import { Link } from 'react-router-dom';

export default function Page401() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex items-center justify-center px-4 z-[9999]">
      <div className="text-center max-w-lg animate-fade-up">
        {/* Illustration */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-amber-50/60" />
          <svg viewBox="0 0 200 200" className="relative w-full h-full" fill="none">
            <circle cx="100" cy="100" r="80" fill="#FEF3C7" />
            <circle cx="70" cy="40" r="10" fill="#FCD34D" opacity="0.6" />
            <circle cx="150" cy="50" r="6" fill="#FBBF24" opacity="0.4" />
            {/* Lock body */}
            <rect x="70" y="95" width="60" height="50" rx="8" fill="#F59E0B" />
            <rect x="73" y="98" width="54" height="44" rx="6" fill="#FBBF24" />
            {/* Lock shackle */}
            <path d="M80 95V80a20 20 0 0 1 40 0v15" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Keyhole */}
            <circle cx="100" cy="115" r="6" fill="#92400E" />
            <rect x="97" y="118" width="6" height="10" rx="2" fill="#92400E" />
            {/* Sparkles */}
            <path d="M45 80l3-8 3 8-8-3 8-3z" fill="#FCD34D" />
            <path d="M155 90l2-6 2 6-6-2 6-2z" fill="#FBBF24" />
          </svg>
          {/* Floating 401 text */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-0">
            <span className="font-display text-6xl font-black text-amber-300/70">4</span>
            <div className="w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center -mx-1">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <span className="font-display text-6xl font-black text-amber-300/70">1</span>
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Autentificare necesară</h1>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
          Trebuie să te autentifici pentru a accesa această resursă. Conectează-te sau creează un cont nou.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/login" className="btn-primary px-8">Autentifică-te</Link>
          <Link to="/" className="btn-secondary">Acasă</Link>
        </div>
      </div>
    </div>
  );
}
