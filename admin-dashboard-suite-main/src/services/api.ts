import axios from 'axios';
import { toast } from 'sonner';
import { API_CONFIG } from '../config/api.config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    const errors = error.response?.data?.errors;
    const url = error.config?.url || '';

    console.error('API Error:', { status, message, errors, url });

    // Only logout on 401 (Unauthorized) - but be very careful about redirects
    if (status === 401) {
      // Don't redirect if:
      // 1. It's a validation error
      // 2. The response indicates it's not a real auth issue
      // 3. We're already on login page
      const isValidationError = errors && Array.isArray(errors);
      const isNotAuthError = message && !message.toLowerCase().includes('auth') && !message.toLowerCase().includes('unauthorized');
      const isOnLoginPage = window.location.pathname.includes('/login');
      
      if (!isValidationError && !isNotAuthError && !isOnLoginPage) {
        console.warn('Unauthorized - logging out');
        localStorage.removeItem('token');
        // Small delay to prevent race conditions
        setTimeout(() => {
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }, 100);
      }
      return Promise.reject(error);
    }

    // Show toast for other errors (400, 500, etc.) - but don't redirect
    if (status === 400 && errors && Array.isArray(errors)) {
      // Validation errors
      const errorMessages = errors.map((err: { path?: string; param?: string; msg?: string; message?: string }) => 
        `${err.path || err.param}: ${err.msg || err.message}`
      ).join(', ');
      toast.error('Validation Error: ' + errorMessages);
    } else if (message) {
      toast.error(message);
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (status >= 400) {
      toast.error('Request failed. Please check your input.');
    } else if (!status) {
      // Network error or no response
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default api;
