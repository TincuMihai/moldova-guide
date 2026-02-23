import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PUBLIC_NAV, TOURIST_NAV, GUIDE_NAV, ROLE_LABELS } from '../../constants';
import { SvgIcon } from '../common/UIComponents';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: Props) {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const roleNav = user?.role === 'guide' ? GUIDE_NAV : TOURIST_NAV;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar panel */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-100 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 lg:h-20 border-b border-slate-100 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group" onClick={onClose}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25">
              <span className="text-white font-display font-bold text-lg leading-none">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base leading-tight tracking-tight text-slate-900">MoldovaGuide</span>
              <span className="text-[9px] font-medium tracking-widest uppercase text-slate-400">Descoperă Moldova</span>
            </div>
          </Link>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 lg:hidden">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-none">
          {/* Public */}
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

          {/* Role-specific */}
          {isAuthenticated && (
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                {user?.role === 'guide' ? 'Ghid' : 'Contul meu'}
              </p>
              <div className="space-y-0.5">
                {roleNav.map((link) => {
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

          {/* Simulate 500 error link */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Demo</p>
            <Link to="/500" onClick={onClose} className="sidebar-link-inactive">
              <SvgIcon d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" className="w-5 h-5 flex-shrink-0" />
              <span>Pagina 500</span>
            </Link>
          </div>
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-slate-100 flex-shrink-0">
          {isAuthenticated && user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <img src={user.avatar} alt="" className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-100" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400">{ROLE_LABELS[user.role]}</p>
                </div>
              </div>
              <button onClick={() => { logout(); onClose(); }}
                className="w-full sidebar-link-inactive text-red-500 hover:text-red-600 hover:bg-red-50">
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
