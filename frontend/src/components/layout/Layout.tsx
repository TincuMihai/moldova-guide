import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMaintenance } from '../../context/MaintenanceContext';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MaintenancePage from '../../pages/public/MaintenancePage';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { isMaintenanceMode } = useMaintenance();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') || location.pathname.startsWith('/guide');

  // Maintenance mode: show maintenance page for non-admin users
  const isAdmin = user?.role === 'admin';
  if (isMaintenanceMode && !isAdmin) {
    return <MaintenancePage />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — fixed position, always visible on desktop */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — pushed right by sidebar on desktop, scrollable */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-72">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className={`flex-1 ${isDashboard ? 'p-4 sm:p-6 lg:p-8' : ''}`}>
          <Outlet />
        </main>
        {!isAdmin && <Footer />}
      </div>
    </div>
  );
}
