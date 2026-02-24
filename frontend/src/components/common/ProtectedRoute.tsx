import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface Props { children: React.ReactNode; allowedRoles?: UserRole[]; }

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-[3px] border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // Not logged in → login page (401 logic handled internally)
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;

  // Wrong role → show 403 inline
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" state={{ forbidden: true }} replace />;
  }

  return <>{children}</>;
}
