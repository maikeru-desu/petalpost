import { Navigate, useLocation } from 'react-router-dom';
import { useAuthCheck } from '../../hooks/useAuth';
import { useAuthStore } from '../../stores/authStore';

/**
 * AuthGuard component to protect routes that require authentication
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 */
export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  
  // Use our custom auth check hook
  const { isLoading } = useAuthCheck();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" 
        style={{ background: 'linear-gradient(135deg, rgba(var(--color-ecru)/0.9) 0%, rgba(var(--color-flax)/0.7) 100%)' }}>
        <div className="text-center">
          <svg className="inline animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg font-medium" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return children;
}
