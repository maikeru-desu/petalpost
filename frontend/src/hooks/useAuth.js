import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook for login functionality using React Query
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser, setLoading, setError } = useAuthStore();
  
  return useMutation({
    mutationFn: async ({ email, password }) => {
      setLoading(true);
      try {
        return await authService.login(email, password);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async () => {
      try {
        // Login succeeded, now fetch user data
        const userData = await authService.getUser();
        
        // Update Zustand store with user data
        setUser(userData);
        
        // Invalidate and refetch user query to ensure latest data
        queryClient.invalidateQueries({ queryKey: ['user'] });
        
        // Redirect to home after successful login
        navigate('/');
      } catch (error) {
        // Handle error when fetching user data
        setError('Login succeeded but failed to fetch user data');
        setLoading(false);
      }
    },
    onError: (error) => {
      // Update store with error message
      setError(error.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  });
};

/**
 * Hook for logout functionality
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearAuth, setLoading } = useAuthStore();
  
  return useMutation({
    mutationFn: async () => {
      setLoading(true);
      return await authService.logout();
    },
    onSuccess: () => {
      // Clear auth store state
      clearAuth();
      
      // Reset any auth-related queries
      queryClient.removeQueries({ queryKey: ['user'] });
      
      // Redirect to login page
      navigate('/login');
    },
    onError: () => {
      setLoading(false);
    }
  });
};

/**
 * Hook to fetch current user data
 */
export const useUser = () => {
  const { user, setUser, setError } = useAuthStore();
  
  return useQuery({
    queryKey: ['user'],
    queryFn: authService.getUser,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      setError(error.message);
    },
    // Skip query if we already have the user in store
    enabled: !user,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to check authentication status
 */
export const useAuthCheck = () => {
  const { setUser } = useAuthStore();
  
  return useQuery({
    queryKey: ['auth-check'],
    queryFn: authService.checkAuth,
    onSuccess: (isAuthenticated) => {
      if (isAuthenticated) {
        // If authenticated, fetch user data
        return authService.getUser().then(userData => {
          setUser(userData);
        });
      } else {
        // If not authenticated, clear user data
        setUser(null);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
