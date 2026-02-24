import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMaintenance } from '../../context/MaintenanceContext';

interface Props { onMenuToggle: () => void; }

export default function Header({ onMenuToggle }: Props) {
  const { user, isAuthenticated } = useAuth();
  const { isMaintenanceMode } = useMaintenance();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAdmin = user?.role === 'admin';

  return (
    <header className={`sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isHome && !isAdmin ? 'bg-transparent absolute top-0 left-0 right-0' : 'bg-white/80 backdrop-blur-xl border-b border-slate-100'}`}>
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className={`p-2 rounded-xl transition-colors lg:hidden ${isHome && !isAdmin ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`} aria-label="Menu">
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
        {/* Maintenance indicator in header */}
        {isAdmin && isMaintenanceMode && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-red-600">Mentenanță activă</span>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {isAuthenticated && user ? (
          <Link to={isAdmin ? '/admin/settings' : '/dashboard/profile'} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
            <img src={user.avatar} alt="" className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-100" />
            <span className={`hidden sm:block text-sm font-medium ${isHome && !isAdmin ? 'text-white' : 'text-slate-700'}`}>{user.name.split(' ')[0]}</span>
          </Link>
        ) : (
          <Link to="/login" className="btn-primary text-sm py-2 px-4">Conectare</Link>
        )}
      </div>
    </header>
  );
}
