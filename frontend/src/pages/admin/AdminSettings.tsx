import { useState } from 'react';
import { useMaintenance } from '../../context/MaintenanceContext';

export default function AdminSettings() {
  const { isMaintenanceMode, toggleMaintenance, maintenanceMessage, setMaintenanceMessage, maintenanceSince } = useMaintenance();
  const [msg, setMsg] = useState(maintenanceMessage);
  const [saved, setSaved] = useState(false);

  const handleSaveMsg = () => { setMaintenanceMessage(msg); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('ro-RO', { dateStyle: 'medium', timeStyle: 'short' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Setări platformă</h1>
        <p className="text-sm text-slate-500 mt-1">Configurează platforma MoldovaGuide.</p>
      </div>

      {/* Maintenance mode */}
      <div className="card p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">Mod mentenanță</h2>
            <p className="text-sm text-slate-500 mt-0.5">Când este activ, vizitatorii văd o pagină de mentenanță.</p>
          </div>
          <button onClick={toggleMaintenance}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${isMaintenanceMode ? 'bg-red-500' : 'bg-slate-200'}`}>
            <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-300 ${isMaintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {isMaintenanceMode && (
          <div className="p-4 rounded-xl bg-red-50/70 border border-red-100 space-y-1">
            <p className="text-sm font-semibold text-red-700">🔧 Mentenanța este activă</p>
            <p className="text-xs text-red-500">Activă din: {formatDate(maintenanceSince)}</p>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mesaj mentenanță</label>
          <textarea value={msg} onChange={e => setMsg(e.target.value)}
            className="input-field min-h-[80px] resize-none text-sm" placeholder="Mesajul afișat vizitatorilor..." />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSaveMsg} className="btn-primary text-sm">Salvează mesajul</button>
          {saved && <span className="text-sm text-emerald-600 font-medium animate-fade-in">✓ Salvat!</span>}
        </div>
      </div>

      {/* Platform info */}
      <div className="card p-6 space-y-4">
        <h2 className="font-display text-lg font-bold text-slate-900">Informații platformă</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Versiune', value: 'v2.1.3' },
            { label: 'Framework', value: 'React 18 + TypeScript' },
            { label: 'CSS', value: 'Tailwind CSS' },
            { label: 'Persistență', value: 'localStorage (demo)' },
            { label: 'Roluri', value: '3 (Tourist, Ghid, Admin)' },
            { label: 'Total pagini', value: '23+' },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <span className="text-sm text-slate-500">{item.label}</span>
              <span className="text-sm font-semibold text-slate-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="card p-6 border-red-100">
        <h2 className="font-display text-lg font-bold text-red-600 mb-2">Zonă periculoasă</h2>
        <p className="text-sm text-slate-500 mb-4">Aceste acțiuni sunt ireversibile.</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="btn-danger text-sm">🗑 Resetează toate datele</button>
        </div>
      </div>
    </div>
  );
}
