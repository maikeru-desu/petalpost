import api from './axiosConfig';

/**
 * Service for contact form related API calls
 */
const contactService = {
  /**
   * Submit a contact form message
   * @param {Object} data - Contact form data (name, email, subject, message)
   * @returns {Promise} Promise with the API response
   */
  submitContactForm: async (data) => {
    const response = await api.post('/api/contact', data);
    return response.data;
  }
};

export default contactService;
