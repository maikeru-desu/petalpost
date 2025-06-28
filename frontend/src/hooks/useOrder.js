import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createOrder, getOrders, getOrderById, cancelOrder } from '../api/orderService';
import { toast } from 'react-hot-toast';

/**
 * Hook to create a new order
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData) => createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        Object.values(validationErrors).forEach(errorMessages => {
          errorMessages.forEach(message => toast.error(message));
        });
      } else {
        toast.error('Failed to create order. Please try again.');
      }
    }
  });
};

/**
 * Hook to fetch all orders for the current user
 */
export const useOrders = (filters = {page: 1, per_page: 12}) => {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => getOrders(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    onError: () => {
      toast.error('Failed to load your orders');
    }
  });
};

/**
 * Hook to fetch a specific order by ID
 */
export const useOrderById = (orderId) => {
  return useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => getOrderById(orderId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!orderId,
    onError: () => {
      toast.error('Failed to load order details');
    }
  });
};

/**
 * Hook to cancel an order
 */
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, reason }) => cancelOrder(orderId, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['orders', variables.orderId]);
      toast.success('Order cancelled successfully');
    },
    onError: () => {
      toast.error('Failed to cancel order');
    }
  });
};
