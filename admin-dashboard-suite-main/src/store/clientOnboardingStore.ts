import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
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
  socket: Socket | null;
  fetchProjects: () => Promise<void>;
  createProject: (projectData: Partial<Project>) => Promise<Project | void>;
  updateProject: (id: string, projectData: Partial<Project>) => Promise<void>;
  updateStage: (projectId: string, stageId: number, updateData: Partial<Stage>) => Promise<void>;
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
      const response = await api.get('/client-onboarding-projects');
      set({ projects: response.data.projects || response.data.data || [], loading: false });
    } catch (error: unknown) {
      console.error('Error fetching projects:', error);
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to fetch projects';
      set({ error: errorMessage, loading: false });
    }
  },

  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/client-onboarding-projects', projectData);
      console.log('Create project response:', response.data);
      
      // Handle different response formats
      const newProject = response.data?.project || response.data;
      
      if (newProject) {
        set((state) => ({
          projects: [newProject, ...state.projects],
          loading: false,
          error: null
        }));
        return newProject;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: unknown) {
      console.error('Error creating project:', error);
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create project';
      set({ error: errorMessage, loading: false });
      throw error; // Re-throw to let component handle it
    }
  },

  updateProject: async (id, projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/client-onboarding-projects/${id}`, projectData);
      const updatedProject = response.data.project || response.data;
      set((state) => ({
        projects: state.projects.map(project =>
          project._id === id ? updatedProject : project
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
      const response = await api.patch(`/client-onboarding-projects/${projectId}/stage`, {
        stageIndex: stageId,
        status: updateData.status
      });
      const updatedProject = response.data.project || response.data;
      set((state) => ({
        projects: state.projects.map(project =>
          project._id === projectId ? updatedProject : project
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
