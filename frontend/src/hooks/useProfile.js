import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { profileService } from '../api/profileService';

/**
 * Hook to fetch user profile
 */
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  });
};

/**
 * Hook to update user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData) => profileService.updateProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      toast.success('Profile updated successfully');
    },
    onError: () => {
      toast.error('Failed to update profile');
    }
  });
};
