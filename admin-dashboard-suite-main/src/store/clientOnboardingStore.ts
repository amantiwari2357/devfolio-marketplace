import { create } from 'zustand';
import { io } from 'socket.io-client';
import api from '@/services/api';

interface Stage {
  id: number;
  name: string;
  output: string;
  status: "pending" | "in-progress" | "done";
  completionDate: string;
  assignedMember: string;
  payment: number;
  paymentStatus: "pending" | "partially-paid" | "paid";
  notes: string;
  approvalRequired: boolean;
  approved: boolean;
}

interface Project {
  _id: string;
  clientName: string;
  email: string;
  phone: string;
  companyName: string;
  projectName: string;
  techStack: string;
  projectType: string;
  startDate: string;
  deadline: string;
  teamMembers: string[];
  totalAmount: number;
  paidAmount: number;
  stages: Stage[];
  createdAt: string;
  updatedAt: string;
}

interface ClientOnboardingState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  socket: any;

  // Actions
  fetchProjects: () => Promise<void>;
  createProject: (projectData: Partial<Project>) => Promise<void>;
  updateProject: (id: string, projectData: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateStage: (projectId: string, stageId: number, updates: Partial<Stage>) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const useClientOnboardingStore = create<ClientOnboardingState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  socket: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/client-onboarding-projects');
      set({ projects: response.data.projects, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch projects', loading: false });
    }
  },

  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/client-onboarding-projects', projectData);
      set((state) => ({
        projects: [...state.projects, response.data.project],
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create project', loading: false });
    }
  },

  updateProject: async (id, projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/client-onboarding-projects/${id}`, projectData);
      set((state) => ({
        projects: state.projects.map((p) => (p._id === id ? response.data.project : p)),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update project', loading: false });
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/client-onboarding-projects/${id}`);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete project', loading: false });
    }
  },

  updateStage: async (projectId, stageId, updates) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/client-onboarding-projects/${projectId}/stage`, {
        stageId,
        ...updates
      });
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === projectId ? response.data.project : p
        ),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update stage', loading: false });
    }
  },

  connectSocket: () => {
    const socket = io(import.meta.env.VITE_API_URL || 'https://devfolio-marketplace-1.onrender.com');
    socket.on('stage-updated', (data: { projectId: string; stage: Stage }) => {
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === data.projectId
            ? {
                ...p,
                stages: p.stages.map((s) => (s.id === data.stage.id ? data.stage : s))
              }
            : p
        )
      }));
    });
    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  }
}));

export default useClientOnboardingStore;
