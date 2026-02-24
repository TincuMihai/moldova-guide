import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { MaintenanceProvider } from './context/MaintenanceContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MaintenanceProvider>
        <App />
      </MaintenanceProvider>
    </AuthProvider>
  </StrictMode>,
);
