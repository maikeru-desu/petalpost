import api from './axiosConfig';

const API_URL = import.meta.env.VITE_API_URL;

export const favoriteService = {
  // Get all favorites for the authenticated user
  getUserFavorites: async (filters) => {
    const response = await api.get(`/api/favorites`, { params: filters });
    return response.data;
  },
  
  // Toggle a product as favorite/unfavorite
  toggleFavorite: async (productId) => {
    const response = await api.post(`/api/favorites/${productId}`, {});
    return response.data;
  },
  
  // Check if a product is favorited by the user
  checkFavoriteStatus: async (productId) => {
    try {
      const response = await api.get(`/api/favorites/${productId}/check`);
      return response.data.data.favorited;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }
};
