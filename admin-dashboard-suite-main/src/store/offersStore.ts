import { create } from 'zustand';
import api from '../services/api';

export type OfferStatus = 'assigned' | 'active' | 'used' | 'expired' | 'converted';
export type OfferCategory = 'SEO' | 'Maintenance' | 'Deployment' | 'Development' | 'Audit' | 'Hosting';

export interface Offer {
  _id?: string;
  id: string;
  title: string;
  description: string;
  category: OfferCategory;
  terms: string;
  validityDays: number;
  isActive: boolean;
  createdAt: string;
}

export interface AssignedOffer {
  _id?: string;
  id: string;
  offerId: string;
  offer: Offer;
  clientId: string;
  clientName: string;
  status: OfferStatus;
  assignedDate: string;
  expiryDate: string;
  claimedDate?: string;
  usedDate?: string;
  convertedDate?: string;
  notes?: string;
}

interface OffersStore {
  offers: Offer[];
  assignedOffers: AssignedOffer[];
  loading: boolean;
  error: string | null;
  setOffers: (offers: Offer[]) => void;
  addOffer: (offer: Offer) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  assignOffer: (offerId: string, clientId: string, clientName: string) => void;
  claimOffer: (id: string) => void;
  updateOfferStatus: (id: string, status: OfferStatus) => void;
  getOffersByStatus: (status?: OfferStatus) => AssignedOffer[];
  getOffersByClient: (clientId: string) => AssignedOffer[];
  // API actions
  fetchOffers: () => Promise<void>;
  createOffer: (offer: Omit<Offer, 'id' | 'createdAt'>) => Promise<void>;
  assignOfferToClient: (offerId: string, clientId: string, clientName: string, notes?: string) => Promise<void>;
  fetchAssignedOffers: () => Promise<void>;
  claimUserOffer: (offerId: string) => Promise<void>;
  updateAssignedOfferStatus: (offerId: string, status: OfferStatus, notes?: string) => Promise<void>;
}



export const useOffersStore = create<OffersStore>((set, get) => ({
  offers: [],
  assignedOffers: [],
  loading: false,
  error: null,

  setOffers: (offers) => set({ offers }),

  addOffer: (offer) => set((state) => ({ offers: [...state.offers, offer] })),

  updateOffer: (id, updatedOffer) =>
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === id ? { ...offer, ...updatedOffer } : offer
      ),
    })),

  deleteOffer: (id) =>
    set((state) => ({
      offers: state.offers.filter((offer) => offer.id !== id),
    })),

  assignOffer: (offerId, clientId, clientName) => {
    const offer = get().offers.find((o) => o.id === offerId);
    if (!offer) return;

    const assignedDate = new Date();
    const expiryDate = new Date(assignedDate);
    expiryDate.setDate(expiryDate.getDate() + offer.validityDays);

    const newAssignment: AssignedOffer = {
      id: `a${Date.now()}`,
      offerId,
      offer,
      clientId,
      clientName,
      status: 'assigned',
      assignedDate: assignedDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    };

    set((state) => ({
      assignedOffers: [...state.assignedOffers, newAssignment],
    }));
  },

  claimOffer: (id) =>
    set((state) => ({
      assignedOffers: state.assignedOffers.map((offer) =>
        offer.id === id
          ? {
              ...offer,
              status: 'active' as OfferStatus,
              claimedDate: new Date().toISOString(),
            }
          : offer
      ),
    })),

  updateOfferStatus: (id, status) =>
    set((state) => ({
      assignedOffers: state.assignedOffers.map((offer) =>
        offer.id === id
          ? {
              ...offer,
              status,
              ...(status === 'used' && { usedDate: new Date().toISOString() }),
              ...(status === 'converted' && { convertedDate: new Date().toISOString() }),
            }
          : offer
      ),
    })),

  getOffersByStatus: (status) => {
    const { assignedOffers } = get();
    return status ? assignedOffers.filter((o) => o.status === status) : assignedOffers;
  },

  getOffersByClient: (clientId) => {
    const { assignedOffers } = get();
    return assignedOffers.filter((o) => o.clientId === clientId);
  },

  // API actions
  fetchOffers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/offers/all');
      const offers = response.data.offers.map((offer: any) => ({
        ...offer,
        id: offer._id,
      }));
      set({ offers, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch offers', loading: false });
    }
  },

  createOffer: async (offerData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/offers', offerData);
      const newOffer = {
        ...response.data.offer,
        id: response.data.offer._id,
      };
      set((state) => ({
        offers: [...state.offers, newOffer],
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to create offer', loading: false });
      throw error;
    }
  },

  assignOfferToClient: async (offerId, clientId, clientName, notes) => {
    set({ loading: true, error: null });
    try {
      await api.post('/offers/assign', {
        offerId,
        clientId,
        clientName,
        notes
      });
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to assign offer', loading: false });
      throw error;
    }
  },

  fetchAssignedOffers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/offers/assigned');
      const assignedOffers = response.data.assignedOffers.map((assignedOffer: any) => ({
        ...assignedOffer,
        id: assignedOffer._id,
      }));
      set({ assignedOffers, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch assigned offers', loading: false });
    }
  },

  claimUserOffer: async (offerId) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/offers/${offerId}/claim`);
      // Update local state
      set((state) => ({
        assignedOffers: state.assignedOffers.map((offer) =>
          offer.id === offerId
            ? {
                ...offer,
                status: 'active' as OfferStatus,
                claimedDate: new Date().toISOString(),
              }
            : offer
        ),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to claim offer', loading: false });
      throw error;
    }
  },

  updateAssignedOfferStatus: async (offerId, status, notes) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/offers/${offerId}/status`, { status, notes });
      // Update local state
      set((state) => ({
        assignedOffers: state.assignedOffers.map((offer) =>
          offer.id === offerId
            ? {
                ...offer,
                status,
                notes,
                ...(status === 'used' && { usedDate: new Date().toISOString() }),
                ...(status === 'converted' && { convertedDate: new Date().toISOString() }),
              }
            : offer
        ),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to update offer status', loading: false });
      throw error;
    }
  },
}));
