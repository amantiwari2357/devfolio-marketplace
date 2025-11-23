import api from './api';
import { API_CONFIG } from '../config/api.config';

export interface TemplateDto {
  _id: string;
  name: string;
  description: string;
  technologies: string[];
  rating: number;
  downloads: string;
  isActive: boolean;
  pdfUrl?: string;
  pdfName?: string;
}

interface TemplatesResponse {
  templates: TemplateDto[];
}

interface TemplateResponse {
  message: string;
  template: TemplateDto;
}

export interface TemplatePayload {
  name: string;
  description: string;
  technologies: string[];
  rating: number;
  downloads: string;
  isActive: boolean;
  pdfUrl?: string;
  pdfName?: string;
}

export const templateService = {
  getAllAdmin: async (): Promise<TemplatesResponse> => {
    const response = await api.get(API_CONFIG.ENDPOINTS.TEMPLATES.ADMIN);
    return response.data;
  },

  create: async (data: TemplatePayload): Promise<TemplateResponse> => {
    const response = await api.post(API_CONFIG.ENDPOINTS.TEMPLATES.BASE, data);
    return response.data;
  },

  update: async (id: string, data: Partial<TemplatePayload>): Promise<TemplateResponse> => {
    const response = await api.put(`${API_CONFIG.ENDPOINTS.TEMPLATES.BASE}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`${API_CONFIG.ENDPOINTS.TEMPLATES.BASE}/${id}`);
    return response.data;
  },

  toggleStatus: async (id: string): Promise<TemplateResponse> => {
    const response = await api.patch(`${API_CONFIG.ENDPOINTS.TEMPLATES.BASE}/${id}/toggle`);
    return response.data;
  },
};
