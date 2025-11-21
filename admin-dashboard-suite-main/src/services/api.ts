import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://devfolio-marketplace-1.onrender.com/api',
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

    console.error('API Error:', { status, message, errors });

    // Only logout on 401 (Unauthorized)
    if (status === 401) {
      console.warn('Unauthorized - logging out');
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Show toast for other errors (400, 500, etc.)
    if (status === 400 && errors && Array.isArray(errors)) {
      // Validation errors
      const errorMessages = errors.map((err: any) => `${err.path}: ${err.msg}`).join(', ');
      toast.error('Validation Error: ' + errorMessages);
    } else if (message) {
      toast.error(message);
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (status >= 400) {
      toast.error('Request failed. Please check your input.');
    } else {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default api;
