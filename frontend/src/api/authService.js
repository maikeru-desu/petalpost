import api, { initializeCsrf } from './axiosConfig';

export const authService = {
  /**
   * Login with email and password
   * 
   * @param {string} email User email
   * @param {string} password User password
   * @returns {Promise} Promise with user data
   */
  async login(email, password) {
    // First get CSRF token
    await initializeCsrf();
    
    // Then make the login request
    const response = await api.post('/login', { email, password });
    return response.data;
  },
  
  /**
   * Logout the current user
   * 
   * @returns {Promise} Promise with logout response
   */
  async logout() {
    const response = await api.post('/logout');
    return response.data;
  },
  
  /**
   * Get the current authenticated user
   * 
   * @returns {Promise} Promise with user data
   */
  async getUser() {
    const response = await api.get('/api/profile');
    return response.data;
  },

  /**
   * Check if the user is authenticated
   * 
   * @returns {Promise} Promise with boolean result
   */
  async checkAuth() {
    try {
      await this.getUser();
      return true;
    } catch (error) {
      return false;
    }
  }
};
