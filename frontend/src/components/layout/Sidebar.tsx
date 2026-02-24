import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PUBLIC_NAV, TOURIST_NAV, GUIDE_NAV, ADMIN_NAV, ROLE_LABELS } from '../../constants';
import { SvgIcon } from '../common/UIComponents';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isAdmin = user?.role === 'admin';
  const isGuide = user?.role === 'guide';

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar panel — FIXED on desktop, always h-screen */}
      <aside className={`fixed top-0 left-0 z-50 h-screen w-72 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isAdmin ? 'bg-slate-900' : 'bg-white border-r border-slate-100'}`}>
        {/* Logo */}
        <div className={`flex items-center justify-between px-5 h-16 flex-shrink-0 ${isAdmin ? 'border-b border-slate-700/50' : 'border-b border-slate-100'}`}>
          <Link to={isAdmin ? '/admin' : '/'} className="flex items-center gap-2.5 group" onClick={onClose}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ${isAdmin ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/25' : 'bg-gradient-to-br from-brand-500 to-brand-600 shadow-brand-500/25'}`}>
              <span className="text-white font-display font-bold text-lg leading-none">M</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-display font-bold text-base leading-tight tracking-tight ${isAdmin ? 'text-white' : 'text-slate-900'}`}>MoldovaGuide</span>
              <span className={`text-[9px] font-medium tracking-widest uppercase ${isAdmin ? 'text-slate-400' : 'text-slate-400'}`}>
                {isAdmin ? 'Administrare' : 'Descoperă Moldova'}
              </span>
            </div>
          </Link>
          <button onClick={onClose} className={`p-1.5 rounded-lg lg:hidden ${isAdmin ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-400'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Navigation — scrollable */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-none">
          {isAdmin ? (
            /* ====== ADMIN NAVIGATION ====== */
            <div>
              <p className={`px-3 text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-500`}>Administrare</p>
              <div className="space-y-0.5">
                {ADMIN_NAV.map((link) => {
                  const isActive = location.pathname === link.to || (link.to !== '/admin' && location.pathname.startsWith(link.to));
                  return (
                    <Link key={link.to} to={link.to} onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}>
                      <SvgIcon d={link.icon} className="w-5 h-5 flex-shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* PUBLIC NAV */}
              <div>
                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Navigare</p>
                <div className="space-y-0.5">
                  {PUBLIC_NAV.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <Link key={link.to} to={link.to} onClick={onClose}
                        className={isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}>
                        <SvgIcon d={link.icon} className="w-5 h-5 flex-shrink-0" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* ROLE NAV */}
              {isAuthenticated && (
                <div>
                  <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    {isGuide ? 'Ghid' : 'Contul meu'}
                  </p>
                  <div className="space-y-0.5">
                    {(isGuide ? GUIDE_NAV : TOURIST_NAV).map((link) => {
                      const isActive = location.pathname === link.to;
                      return (
                        <Link key={link.to} to={link.to} onClick={onClose}
                          className={isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}>
                          <SvgIcon d={link.icon} className="w-5 h-5 flex-shrink-0" />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </nav>

        {/* User section — fixed at bottom */}
        <div className={`p-3 flex-shrink-0 ${isAdmin ? 'border-t border-slate-700/50' : 'border-t border-slate-100'}`}>
          {isAuthenticated && user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <img src={user.avatar} alt="" className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-100" />
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold truncate ${isAdmin ? 'text-white' : 'text-slate-800'}`}>{user.name}</p>
                  <p className={`text-[10px] ${isAdmin ? 'text-red-400' : 'text-slate-400'}`}>{ROLE_LABELS[user.role]}</p>
                </div>
              </div>
              <button onClick={() => { logout(); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isAdmin ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-red-500 hover:text-red-600 hover:bg-red-50'}`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
                <span>Deconectare</span>
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={onClose} className="btn-primary w-full justify-center text-sm">
              Conectare
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
