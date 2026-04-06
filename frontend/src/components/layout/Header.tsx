import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface Props { onMenuToggle: () => void; }

export default function Header({ onMenuToggle }: Props) {
  const { user, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAdmin = user?.role === 'admin';

  const headerClass = isHome && !isAdmin
    ? 'absolute top-0 left-0 right-0 z-30 h-16 bg-transparent'
    : 'sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 dark:bg-slate-950/80 dark:border-slate-800';

  const textClass = isHome && !isAdmin ? 'text-white' : 'text-slate-700 dark:text-slate-300 dark:text-slate-200';

  return (
    <header className={`${headerClass} flex items-center justify-between px-4 sm:px-6 lg:px-8`}>
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className={`p-2 rounded-xl transition-colors lg:hidden ${isHome && !isAdmin ? 'text-white hover:bg-white/10' : 'text-slate-700 dark:text-slate-300 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        </button>
        {isHome && !isAdmin && (
          <Link to="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-white">MoldovaGuide</span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button onClick={toggleTheme} className={`p-2 rounded-xl transition-all ${isHome && !isAdmin ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`} aria-label="Schimbă tema">
          {isDark ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
          )}
        </button>

        {isAuthenticated && user ? (
          <Link to={isAdmin ? '/admin/settings' : '/dashboard/profile'} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
            <img src={user.avatar} alt="" className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-100 dark:ring-brand-900" />
            <span className={`hidden sm:block text-sm font-medium ${textClass}`}>{user.name.split(' ')[0]}</span>
          </Link>
        ) : (
          <Link to="/login" className={isHome ? 'text-white font-semibold text-sm hover:text-white/80 transition-colors' : 'btn-primary text-sm py-2 px-4'}>Conectare</Link>
        )}
      </div>
    </header>
  );
}
