import { Navigate, useLocation } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { useUserAuth } from '../../context/authProvider';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useUserAuth();
  const location = useLocation();
  if (isLoading) return <LoadingOverlay />;
  if (!isAuthenticated) return <Navigate to="/" replace state={{ from: location }} />;
  return <>{children}</>;
};
