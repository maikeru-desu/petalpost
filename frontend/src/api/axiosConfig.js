import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Required for Laravel Sanctum
  },
  withCredentials: true, // Important for cookies to be sent with requests
});

// Helper function to get cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Sanctum CSRF token handling
export const initializeCsrf = async () => {
  try {
    // Get CSRF cookie
    await api.get('/sanctum/csrf-cookie');
    return true;
  } catch (error) {
    console.error('Failed to initialize CSRF token:', error);
    return false;
  }
};

// Request interceptor - add CSRF token from cookie to header
api.interceptors.request.use(request => {
  // Get the XSRF-TOKEN from cookie
  const token = getCookie('XSRF-TOKEN');
  if (token) {
    // Add the token to X-XSRF-TOKEN header
    request.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  return request;
});

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      // Clear any auth state if needed
      localStorage.removeItem('user');
      
      // Only redirect to login for protected routes
      // This array should match your PROTECTED_ROUTES paths
      const protectedRoutes = [
        '/profile',
        '/favorites',
        '/cart',
        '/checkout',
        '/orders',
        '/order-confirmation'
      ];
      
      // Check if current path is a protected route
      const isProtectedRoute = protectedRoutes.some(route => 
        window.location.pathname.startsWith(route)
      );
      
      // Only redirect if on a protected route and not already on login page
      if (isProtectedRoute && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
