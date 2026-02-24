import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { SidebarProvider, useSidebar } from '../../context/SidebarContext';
import { SvgIcon } from '../common/UIComponents';

function DashboardContent() {
  const { isOpen, toggleMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <Sidebar />
      <div className={`pt-16 transition-all duration-300 ${isOpen ? 'lg:pl-64' : 'lg:pl-[72px]'}`}>
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden px-4 pt-4">
          <button onClick={toggleMobile} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <SvgIcon d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" className="w-4 h-4" />
            Meniu
          </button>
        </div>
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}
