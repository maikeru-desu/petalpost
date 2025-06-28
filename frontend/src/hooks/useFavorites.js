import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoriteService } from '../api/favoriteService';

/**
 * Hook to get user's favorite products with pagination
 */
export const useFavorites = (filters = {page: 1, per_page: 12}) => {
  return useQuery({
    queryKey: ['favorites', filters],
    queryFn: () => favoriteService.getUserFavorites(filters),
    keepPreviousData: true,
  });
};

/**
 * Hook to toggle favorite status of a product
 */
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId) => favoriteService.toggleFavorite(productId),
    onSuccess: () => {
      // Invalidate favorites and potentially the specific product
      queryClient.invalidateQueries(['favorites']);
    }
  });
};

/**
 * Hook to check if a product is favorited
 */
export const useFavoriteStatus = (productId) => {
  return useQuery({
    queryKey: ['favorite', productId],
    queryFn: () => favoriteService.checkFavoriteStatus(productId),
    enabled: !!productId,
  });
};
