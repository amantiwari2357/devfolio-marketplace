import api from './api';

// Type definitions
export interface Availability {
  day: string;
  enabled: boolean;
  startTime?: string;
  endTime?: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  country?: string;
  phone?: string;
  website?: string;
  expertise?: string[];
  currency?: string;
  whatsappNumber?: string;
  socialUrl?: string;
  onboardingCompleted?: boolean;
  currentStep?: number;
  availability?: Availability[];
  services?: Service[];
  createdAt?: string;
  updatedAt?: string;
}

export interface OnboardingRequest {
  experience: string;
  portfolio?: string;
  reason: string;
  availability: string;
  projectName?: string;
  projectDescription?: string;
  requirements?: string;
  timeline?: string;
  budget?: string;
}

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

  // Added Methods for onboarding
  getOnboardingStatus: () => api.get('/users/onboarding-status'),
  
  getOnboardingRequests: () => api.get('/users/onboarding-request'),

  submitOnboardingRequest: (data: OnboardingRequest) =>
    api.post('/users/onboarding-request', data),
};

// Enquiry API functions
export const enquiryAPI = {
  createEnquiry: (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    source?: string;
  }) => api.post('/enquiries', data),

  getUserEnquiries: () => api.get('/enquiries/my'),

  getAllEnquiries: () => api.get('/enquiries/all'),
};
