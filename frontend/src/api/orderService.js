import api from './axiosConfig';

export const orderService = { 
/**
 * Create a new order
 * @param {Object} orderData - Order details including items, shipping and billing addresses
 * @returns {Promise} Promise with order and payment intent data
 */
  async createOrder(orderData) {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  },

/**
 * Get all orders for the current user
 * @returns {Promise} Promise with orders data
 */
  async getOrders(filters = {page: 1, per_page: 12}) {
    const response = await api.get('/api/orders', { params: filters });
    return response.data;
  },

/**
 * Get a specific order by ID
 * @param {number} orderId - ID of the order to retrieve
 * @returns {Promise} Promise with order details
 */
  async getOrderById(orderId) {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  },

/**
 * Cancel an order
 * @param {number} orderId - ID of the order to cancel
 * @param {string} reason - Optional reason for cancellation
 * @returns {Promise} Promise with cancel status
 */
  async cancelOrder(orderId, reason = '') {
    const response = await api.post(`/api/orders/${orderId}/cancel`, { reason });
    return response.data;
  },

/**
 * Update order payment status (primarily for testing/admin use)
 * @param {number} orderId - ID of the order to update
 * @param {string} paymentStatus - New payment status
 * @returns {Promise} Promise with update status
 */
  async updateOrderPaymentStatus(orderId, paymentStatus) {
    const response = await api.put(`/api/orders/${orderId}/payment-status`, { payment_status: paymentStatus });
    return response.data;
  },

};
