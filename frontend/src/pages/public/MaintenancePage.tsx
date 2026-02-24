import { useMaintenance } from '../../context/MaintenanceContext';

export default function MaintenancePage() {
  const { maintenanceMessage } = useMaintenance();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center px-4 z-[9999]">
      <div className="text-center max-w-lg animate-fade-up">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg viewBox="0 0 200 200" className="relative w-full h-full" fill="none">
            <circle cx="100" cy="100" r="80" fill="#1E293B" />
            {/* Wrench */}
            <g transform="translate(65, 55) rotate(-30, 35, 45)">
              <rect x="30" y="20" width="10" height="55" rx="3" fill="#F59E0B" />
              <path d="M25 20 Q35 5 45 20 L45 30 L25 30 Z" fill="#FBBF24" />
              <circle cx="35" cy="18" r="5" fill="#1E293B" />
            </g>
            {/* Gear */}
            <g transform="translate(95, 85)">
              <circle cx="15" cy="15" r="14" fill="#475569" />
              <circle cx="15" cy="15" r="7" fill="#1E293B" />
              <rect x="12" y="-3" width="6" height="9" rx="2" fill="#475569" />
              <rect x="12" y="30" width="6" height="9" rx="2" fill="#475569" />
              <rect x="-3" y="12" width="9" height="6" rx="2" fill="#475569" />
              <rect x="30" y="12" width="9" height="6" rx="2" fill="#475569" />
            </g>
            {/* Stars */}
            <circle cx="50" cy="40" r="2" fill="#FBBF24" opacity="0.8" />
            <circle cx="155" cy="55" r="2" fill="#FBBF24" opacity="0.6" />
            <circle cx="140" cy="140" r="1.5" fill="#F59E0B" opacity="0.5" />
          </svg>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Mentenanță în curs</h1>
        <p className="text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">{maintenanceMessage}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-medium text-amber-400">Se lucrează la îmbunătățiri</span>
        </div>
      </div>
    </div>
  );
}
