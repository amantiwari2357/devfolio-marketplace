import { create } from 'zustand';

export type OfferStatus = 'assigned' | 'active' | 'used' | 'expired' | 'converted';
export type OfferCategory = 'SEO' | 'Maintenance' | 'Deployment' | 'Development' | 'Audit' | 'Hosting';

export interface Offer {
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
  setOffers: (offers: Offer[]) => void;
  addOffer: (offer: Offer) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  assignOffer: (offerId: string, clientId: string, clientName: string) => void;
  claimOffer: (id: string) => void;
  updateOfferStatus: (id: string, status: OfferStatus) => void;
  getOffersByStatus: (status?: OfferStatus) => AssignedOffer[];
  getOffersByClient: (clientId: string) => AssignedOffer[];
}

// Mock initial data
const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Free SEO Optimization - 1 Month',
    description: 'Complete on-page and off-page SEO optimization for your website including keyword research, meta tags optimization, and performance tracking.',
    category: 'SEO',
    terms: 'Valid for 90 days from assignment. Must be used within validity period. Non-transferable.',
    validityDays: 90,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Free Website Revision',
    description: 'One complete round of design and content revisions for your website after launch. Includes minor feature updates and bug fixes.',
    category: 'Development',
    terms: 'Valid for 60 days post-launch. Covers design changes, content updates, and minor functionality tweaks.',
    validityDays: 60,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Launch Support Package',
    description: '24/7 priority support for 7 days after your website goes live. Includes monitoring, quick fixes, and performance optimization.',
    category: 'Maintenance',
    terms: 'Activated on launch day. 7 days of dedicated support. Response time under 2 hours.',
    validityDays: 30,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Free Security Audit',
    description: 'Comprehensive security assessment of your website including vulnerability scanning, SSL verification, and security recommendations.',
    category: 'Audit',
    terms: 'One-time audit valid for 120 days. Includes detailed report and recommendations.',
    validityDays: 120,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Free Hosting Setup',
    description: 'Complete hosting configuration including domain setup, SSL installation, email configuration, and deployment automation.',
    category: 'Hosting',
    terms: 'Valid for 45 days. Includes setup only, hosting fees separate.',
    validityDays: 45,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const mockAssignedOffers: AssignedOffer[] = [
  {
    id: 'a1',
    offerId: '1',
    offer: mockOffers[0],
    clientId: 'c1',
    clientName: 'Acme Corporation',
    status: 'active',
    assignedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000).toISOString(),
    claimedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'a2',
    offerId: '3',
    offer: mockOffers[2],
    clientId: 'c1',
    clientName: 'Acme Corporation',
    status: 'used',
    assignedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    expiryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    claimedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    usedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useOffersStore = create<OffersStore>((set, get) => ({
  offers: mockOffers,
  assignedOffers: mockAssignedOffers,

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
}));
