import api from './api';
import { API_CONFIG } from '../config/api.config';

export interface ClientOnboarding {
  _id?: string;
  clientName: string;
  email: string;
  phone: string;
  companyName: string;
  projectName: string;
  techStack: string;
  projectType: string;
  startDate: string;
  deadline: string;
  teamMembers: Array<{
    name: string;
    role: string;
    email: string;
  }>;
  totalAmount: number;
  paidAmount: number;
  stages: Array<{
    name: string;
    status: 'pending' | 'in-progress' | 'completed';
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientOnboardingFilters {
  clientName?: string;
  email?: string;
  companyName?: string;
  projectName?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const clientOnboardingService = {
  // Get all client onboarding records
  getAll: async (filters?: ClientOnboardingFilters) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.CLIENT_ONBOARDING.BASE, {
      params: filters,
    });
    return response.data;
  },

  // Get client onboarding by ID
  getById: async (id: string) => {
    const response = await api.get(
      `${API_CONFIG.ENDPOINTS.CLIENT_ONBOARDING.BASE}/${id}`
    );
    return response.data;
  },

  // Create new client onboarding
  create: async (data: ClientOnboarding) => {
    const response = await api.post(
      API_CONFIG.ENDPOINTS.CLIENT_ONBOARDING.BASE,
      data
    );
    return response.data;
  },

  // Update client onboarding
  update: async (id: string, data: Partial<ClientOnboarding>) => {
    const response = await api.put(
      `${API_CONFIG.ENDPOINTS.CLIENT_ONBOARDING.BASE}/${id}`,
      data
    );
    return response.data;
  },

  // Delete client onboarding
  delete: async (id: string) => {
    const response = await api.delete(
      `${API_CONFIG.ENDPOINTS.CLIENT_ONBOARDING.BASE}/${id}`
    );
    return response.data;
  },

  // Update stage status
  updateStageStatus: async (id: string, stageIndex: number, status: string) => {
    const response = await api.patch(
      `${API_CONFIG.ENDPOINTS.CLIENT_ONBOARDING.BASE}/${id}/stage`,
      { stageIndex, status }
    );
    return response.data;
  },

  // Update payment
  updatePayment: async (id: string, paidAmount: number) => {
    const response = await api.patch(
      `${API_CONFIG.ENDPOINTS.CLIENT_ONBOARDING.BASE}/${id}/payment`,
      { paidAmount }
    );
    return response.data;
  },

  // Get statistics
  getStats: async () => {
    const response = await api.get(
      API_CONFIG.ENDPOINTS.CLIENT_ONBOARDING.STATS
    );
    return response.data;
  },
};
