import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isOpen) return null;

  const navLinks = [
    { to: '/', label: 'Acasă', icon: '🏠' },
    { to: '/explore', label: 'Explorează', icon: '🗺️' },
    { to: '/tours', label: 'Tururi ghidate', icon: '📍' },
  ];

  const dashLink = user?.role === 'admin' ? '/admin' : user?.role === 'guide' ? '/guide/dashboard' : '/dashboard';

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 z-50 w-72 h-screen bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-slate-800">
          <span className="font-display font-bold text-lg text-slate-900 dark:text-white">Menu</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}

          {isAuthenticated && (
            <>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />
              <Link
                to={dashLink}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span className="text-lg">📋</span>
                {user?.role === 'admin' ? 'Admin Panel' : user?.role === 'guide' ? 'Panou ghid' : 'Panoul meu'}
              </Link>
            </>
          )}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          {isAuthenticated && user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <img src={user.avatar} alt="" className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-100" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
                Deconectare
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={onClose} className="btn-primary w-full justify-center text-sm">
              Conectare
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
