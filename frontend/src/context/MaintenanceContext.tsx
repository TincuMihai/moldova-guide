import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface MaintenanceContextType {
  isMaintenanceMode: boolean;
  toggleMaintenance: () => void;
  maintenanceMessage: string;
  setMaintenanceMessage: (msg: string) => void;
  maintenanceSince: string | null;
}

const KEY = 'moldovaguide_maintenance';
const MaintenanceContext = createContext<MaintenanceContextType | null>(null);

export function MaintenanceProvider({ children }: { children: ReactNode }) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('Platforma este în mentenanță. Revenim curând!');
  const [maintenanceSince, setMaintenanceSince] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setIsMaintenanceMode(data.active);
        setMaintenanceMessage(data.message || 'Platforma este în mentenanță. Revenim curând!');
        setMaintenanceSince(data.since || null);
      }
    } catch { /* ignore */ }
  }, []);

  const toggleMaintenance = useCallback(() => {
    setIsMaintenanceMode((prev) => {
      const next = !prev;
      const since = next ? new Date().toISOString() : null;
      setMaintenanceSince(since);
      localStorage.setItem(KEY, JSON.stringify({
        active: next,
        message: maintenanceMessage,
        since,
      }));
      return next;
    });
  }, [maintenanceMessage]);

  const updateMessage = useCallback((msg: string) => {
    setMaintenanceMessage(msg);
    const stored = localStorage.getItem(KEY);
    if (stored) {
      const data = JSON.parse(stored);
      data.message = msg;
      localStorage.setItem(KEY, JSON.stringify(data));
    }
  }, []);

  return (
    <MaintenanceContext.Provider value={{
      isMaintenanceMode, toggleMaintenance,
      maintenanceMessage, setMaintenanceMessage: updateMessage,
      maintenanceSince,
    }}>
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  const ctx = useContext(MaintenanceContext);
  if (!ctx) throw new Error('useMaintenance must be used within MaintenanceProvider');
  return ctx;
}
