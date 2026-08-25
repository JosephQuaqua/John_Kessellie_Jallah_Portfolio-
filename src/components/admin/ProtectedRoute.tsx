import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { LoadingSpinner } from '@/components/ui/States';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner size="lg" />;
  if (!session) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return <>{children}</>;
}
