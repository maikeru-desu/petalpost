import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Set loading state
      setLoading: (isLoading) => {
        set({ isLoading });
      },
      
      // Set error state
      setError: (error) => {
        set({ error });
      },

      // Set authenticated user
      setUser: (userData) => {
        set({ 
          user: userData, 
          isAuthenticated: !!userData,
          isLoading: false,
          error: null
        });
      },

      // Clear authentication state (for logout)
      clearAuth: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false, 
          error: null 
        });
      },

      // Set user data manually (e.g. after retrieving from API)
      setUser: (userData) => {
        set({ user: userData, isAuthenticated: !!userData });
      },

      // Reset auth state
      resetAuthState: () => {
        set({ user: null, isAuthenticated: false, isLoading: false, error: null });
      },
    }),
    {
      name: 'petalpost-auth', // unique name for localStorage
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // only persist these fields
    }
  )
);
