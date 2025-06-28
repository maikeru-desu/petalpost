import api from './axiosConfig';

export const profileService = { 
  /**
   * Get the current user's profile
   * @returns {Promise} Promise with the profile data
   */
   async getProfile() {
    const response = await api.get('/api/profile');
    return response.data.data;
  },

  /**
   * Update the current user's profile
   * @param {Object} profileData - The profile data to update
   * @returns {Promise} Promise with the updated profile data
   */
   async updateProfile(profileData) {
    const response = await api.put('/api/profile', profileData);
    return response.data.data;
  },
};
