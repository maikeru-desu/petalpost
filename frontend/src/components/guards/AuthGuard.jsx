import { Navigate, useLocation } from 'react-router-dom';
import { useAuthCheck } from '../../hooks/useAuth';
import LoadingScreen from '../common/LoadingScreen';

/**
 * AuthGuard component to protect routes that require authentication
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 */
export default function AuthGuard({ children }) {
  const location = useLocation();
  
  // Use our custom auth check hook
  const { data: user, isLoading, isError } = useAuthCheck();

  // Show loading state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect to login if not authenticated
  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return children;
}
