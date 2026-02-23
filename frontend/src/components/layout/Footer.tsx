import { Link } from 'react-router-dom';
import { FOOTER_SECTIONS } from '../../constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">M</span>
              </div>
              <span className="font-display font-bold text-lg">MoldovaGuide</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Platforma ta pentru descoperirea celor mai frumoase locuri din Republica Moldova.
            </p>
            <div className="flex items-center gap-3">
              {['facebook', 'instagram', 'twitter'].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-brand-500 transition-colors text-slate-400 hover:text-white">
                  <span className="text-xs font-bold uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {Object.entries(FOOTER_SECTIONS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-400 hover:text-brand-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">&copy; 2026 MoldovaGuide. Toate drepturile rezervate.</p>
          <p className="text-xs text-slate-500">Realizat cu dragoste pentru Moldova</p>
        </div>
      </div>
    </footer>
  );
}
