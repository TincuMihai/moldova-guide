import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../../constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="bg-stone-50">
        <svg viewBox="0 0 1440 64" fill="none" className="w-full h-12 md:h-16 text-slate-900">
          <path d="M0 32C240 0 480 64 720 32C960 0 1200 64 1440 32V64H0V32Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">M</span>
              </div>
              <span className="font-display font-bold text-lg text-white">MoldovaGuide</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Platforma ta completă pentru turism local și descoperire urbană în Republica Moldova.
              Conectăm turiștii cu ghizi locali, atracții autentice și experiențe unice.
            </p>
            <div className="flex items-center gap-3">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-brand-500 flex items-center justify-center transition-colors duration-200" aria-label={social}>
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /></svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-400 hover:text-brand-400 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2026 MoldovaGuide. Toate drepturile rezervate.</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Realizat cu</span>
            <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>în Moldova</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
