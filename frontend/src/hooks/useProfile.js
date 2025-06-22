import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile } from '../api/profileService';
import { toast } from 'react-hot-toast';

/**
 * Hook to fetch user profile
 */
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
};

/**
 * Hook to update user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData) => updateProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      toast.success('Profile updated successfully');
    },
    onError: () => {
      toast.error('Failed to update profile');
    }
  });
};
