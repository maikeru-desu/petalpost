import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import { toast } from 'react-hot-toast';

/**
 * Hook for checking authentication status
 */
export const useAuthCheck = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getUser(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook for login functionality using React Query
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ email, password }) => {
      return await authService.login(email, password);
    },
    onSuccess: async () => {
      try {
        // Invalidate and refetch user query to ensure latest data
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        
        // Show success toast
        toast.success('Login successful');
        
        // Redirect to home after successful login
        navigate('/');
      } catch (error) {
        toast.error('Login succeeded but failed to fetch user data');
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  });
};

/**
 * Hook for logout functionality using React Query
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear user query data
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries(['user']);
      
      toast.success('Logged out successfully');
      navigate('/login');
    },
    onError: () => {
      toast.error('Failed to logout');
    }
  });
};

/**
 * Hook to fetch current user data
 */
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authService.getUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
