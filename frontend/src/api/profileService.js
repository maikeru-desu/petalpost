import api from './axiosConfig';

/**
 * Get the current user's profile
 * @returns {Promise} Promise with the profile data
 */
export const getProfile = async () => {
  const response = await api.get('/api/profile');
  return response.data;
};

/**
 * Update the current user's profile
 * @param {Object} profileData - The profile data to update
 * @returns {Promise} Promise with the updated profile data
 */
export const updateProfile = async (profileData) => {
  const response = await api.put('/api/profile', profileData);
  return response.data;
};
