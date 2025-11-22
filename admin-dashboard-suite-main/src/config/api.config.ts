// Centralized API Configuration
export const API_CONFIG = {
  // Base URL - Change this to your backend URL
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // API Endpoints
  ENDPOINTS: {
    // Auth
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile',
      LOGOUT: '/auth/logout',
    },
    
    // Users
    USERS: {
      BASE: '/users',
      EXPERTS: '/users/experts',
      STATS: '/users/stats',
    },
    
    // Projects
    PROJECTS: {
      BASE: '/projects',
      FEATURED: '/projects/featured',
      SEARCH: '/projects/search',
    },
    
    // Courses
    COURSES: {
      BASE: '/courses',
      FEATURED: '/courses/featured',
      SEARCH: '/courses/search',
    },
    
    // Services
    SERVICES: {
      BASE: '/services',
      FEATURED: '/services/featured',
      SEARCH: '/services/search',
    },
    
    // Client Onboarding
    CLIENT_ONBOARDING: {
      BASE: '/client-onboarding',
      STATS: '/client-onboarding/stats',
    },
    
    // Experts
    EXPERTS: {
      BASE: '/experts',
      STATS: '/experts/:id/stats',
    },
    
    // Testimonials
    TESTIMONIALS: {
      BASE: '/testimonials',
      FEATURED: '/testimonials/featured',
    },
  },
  
  // Request timeout
  TIMEOUT: 30000,
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
