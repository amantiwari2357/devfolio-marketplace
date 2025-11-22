import { create } from 'zustand';
import { io } from 'socket.io-client';
import api from '../services/api';

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

interface ClientOnboardingStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  socket: any;
  fetchProjects: () => Promise<void>;
  createProject: (projectData: any) => Promise<void>;
  updateProject: (id: string, projectData: any) => Promise<void>;
  updateStage: (projectId: string, stageId: number, updateData: any) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const useClientOnboardingStore = create<ClientOnboardingStore>((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  socket: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/client-onboarding');
      set({ projects: response.data.data || response.data.projects || [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch projects', loading: false });
    }
  },

  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/client-onboarding', projectData);
      set((state) => ({
        projects: [...state.projects, response.data],
        loading: false
      }));
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create project';
      set({ error: errorMessage, loading: false });
      throw error; // Re-throw to let component handle it
    }
  },

  updateProject: async (id, projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/client-onboarding/${id}`, projectData);
      set((state) => ({
        projects: state.projects.map(project =>
          project._id === id ? response.data : project
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update project', loading: false });
    }
  },

  updateStage: async (projectId, stageId, updateData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch(`/client-onboarding/${projectId}/stage`, {
        stageIndex: stageId,
        status: updateData.status
      });
      set((state) => ({
        projects: state.projects.map(project =>
          project._id === projectId ? response.data : project
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update stage', loading: false });
    }
  },

  connectSocket: () => {
    const socket = io('https://devfolio-marketplace-1.onrender.com');
    socket.on('projectUpdated', (updatedProject) => {
      set((state) => ({
        projects: state.projects.map(project =>
          project._id === updatedProject._id ? updatedProject : project
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
  },
}));

export default useClientOnboardingStore;
