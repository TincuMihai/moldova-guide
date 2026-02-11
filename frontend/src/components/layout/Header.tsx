import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome
          ? 'bg-transparent'
          : 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
              <span className="text-white font-display font-bold text-lg leading-none">M</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-lg leading-tight tracking-tight ${isHome ? 'text-white' : 'text-slate-900'}`}>
                MoldovaGuide
              </span>
              <span className={`text-[10px] font-body font-medium tracking-widest uppercase ${isHome ? 'text-white/60' : 'text-slate-400'}`}>
                Descoperă Moldova
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isHome ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand-600'
                      : isHome ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/tours"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-500/25 hover:bg-brand-600 hover:shadow-brand-600/30 transition-all duration-200 active:scale-[0.97]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Rezervă un tur
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isHome ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 mt-2">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-slate-100 mt-2 pt-2 px-2">
                <Link to="/tours" onClick={() => setMobileOpen(false)} className="btn-primary w-full text-center">
                  Rezervă un tur
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
