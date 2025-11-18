import api from './api';

// Auth API functions
export const authAPI = {
  signup: (data: { email: string; password: string }) =>
    api.post('/users/signup', data),

  login: (data: { email: string; password: string }) =>
    api.post('/users/login', data),
};

// User API functions
export const userAPI = {
  getProfile: () => api.get('/users/profile'),

  updateProfile: (data: {
    socialUrl?: string;
    username: string;
    country: string;
    currency: string;
    expertise: string[];
  }) => api.put('/users/profile', data),

  updateAvailability: (data: {
    availability: Array<{
      day: string;
      enabled: boolean;
      startTime?: string;
      endTime?: string;
    }>;
  }) => api.put('/users/availability', data),

  updateServices: (data: {
    services?: Array<{
      name: string;
      description: string;
    }>;
  }) => api.put('/users/services', data),

  updateWhatsApp: (data: {
    whatsappNumber?: string;
  }) => api.put('/users/whatsapp', data),
};

// Enquiry API functions
export const enquiryAPI = {
  createEnquiry: (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => api.post('/enquiries', data),

  getUserEnquiries: () => api.get('/enquiries/my'),

  getAllEnquiries: () => api.get('/enquiries/all'),
};
