import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartItems, addToCart, removeFromCart, clearCart } from '../api/cartService';
import { toast } from 'react-hot-toast';

/**
 * Hook to fetch all items in user's cart
 */
export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartItems(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    onError: () => {
      toast.error('Failed to load your cart');
    }
  });
};

/**
 * Hook to add or update an item in the cart
 */
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({productId, quantity}) => addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Added to cart');
    },
    onError() {
      toast.error('Failed to add to cart'); 
    }
  });
};

/**
 * Hook to remove an item from the cart
 */
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => removeFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Removed from cart');
    },
    onError: () => {
      toast.error('Failed to remove from cart');
    }
  });
};

/**
 * Hook to clear the entire cart
 */
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Cart cleared');
    },
    onError: () => {
      toast.error('Failed to clear cart');
    }
  });
};
