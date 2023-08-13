import { useLocation, Navigate } from 'react-router-dom';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { useUserAuth } from '../../context/authProvider';

export const RequireNoAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useUserAuth();
  const location = useLocation();
  const origin = location.state?.from?.pathname + location.state?.from?.search || '/app';
  if (isLoading) return <LoadingOverlay />;
  if (isAuthenticated) return <Navigate to={origin} replace />;
  return <>{children}</>;
};
