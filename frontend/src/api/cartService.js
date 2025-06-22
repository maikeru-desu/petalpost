import api from './axiosConfig';

/**
 * Get all items in the user's cart
 * @returns {Promise} Promise with cart items data
 */
export const getCartItems = async () => {
  const response = await api.get('/api/cart');
  return response.data;
};

/**
 * Add or update product quantity in cart
 * @param {number} productId - ID of the product to add to cart
 * @param {number} quantity - Quantity to add (default: 1)
 * @returns {Promise} Promise with cart update status
 */
export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post(`/api/cart/${productId}`, { quantity });
  return response.data;
};

/**
 * Remove product from cart
 * @param {number} productId - ID of the product to remove
 * @returns {Promise} Promise with removal status
 */
export const removeFromCart = async (productId) => {
  const response = await api.delete(`/api/cart/${productId}`);
  return response.data;
};

/**
 * Clear all items from cart
 * @returns {Promise} Promise with clear status
 */
export const clearCart = async () => {
  const response = await api.delete('/api/cart');
  return response.data;
};
