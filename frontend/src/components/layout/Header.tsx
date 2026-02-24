import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props { onMenuToggle: () => void; }

export default function Header({ onMenuToggle }: Props) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isPublicPage = ['/', '/explore', '/tours'].includes(location.pathname) || location.pathname.startsWith('/explore/') || location.pathname.startsWith('/tours/');

  return (
    <header className={`fixed top-0 right-0 z-30 h-16 lg:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isPublicPage && !isHome ? 'left-0 lg:left-72 bg-white/80 backdrop-blur-xl border-b border-slate-100' : isHome ? 'left-0 bg-transparent' : 'left-0 lg:left-72 bg-white/80 backdrop-blur-xl border-b border-slate-100'}`}>
      {/* Left side: hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className={`p-2 rounded-xl transition-colors lg:hidden ${isHome ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        </button>
        {isHome && (
          <Link to="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">M</span>
            </div>
            <span className="font-display font-bold text-white">MoldovaGuide</span>
          </Link>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search button */}
        <button className={`p-2 rounded-xl transition-colors ${isHome ? 'text-white/80 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        </button>

        {isAuthenticated && user ? (
          <Link to="/dashboard/profile" className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
            <img src={user.avatar} alt="" className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-100" />
            <span className={`hidden sm:block text-sm font-medium ${isHome ? 'text-white' : 'text-slate-700'}`}>{user.name.split(' ')[0]}</span>
          </Link>
        ) : (
          <Link to="/login" className="btn-primary text-sm py-2 px-4">Conectare</Link>
        )}
      </div>
    </header>
  );
}
