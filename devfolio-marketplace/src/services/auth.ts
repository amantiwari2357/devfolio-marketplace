import api from './api';

// Auth API functions
export const authAPI = {
  signup: (data: { email: string; password: string }) =>
    api.post('/auth/signup', data),

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

// User API functions
export const userAPI = {
  getProfile: () => api.get('/profile'),

  updateProfile: (data: {
    socialUrl?: string;
    username: string;
    country: string;
    currency: string;
    expertise: string[];
  }) => api.put('/profile', data),

  updateAvailability: (data: {
    availability: Array<{
      day: string;
      enabled: boolean;
      startTime?: string;
      endTime?: string;
    }>;
  }) => api.put('/availability', data),

  updateServices: (data: {
    services: Array<{
      name: string;
      description: string;
    }>;
  }) => api.put('/services', data),

  updateWhatsApp: (data: {
    whatsappNumber?: string;
  }) => api.put('/whatsapp', data),
};
