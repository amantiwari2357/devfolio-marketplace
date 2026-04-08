import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useOffersStore, AssignedOffer } from "@/store/offersStore";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { OfferCard } from "@/components/offers/OfferCard";
import { OfferDetailsModal } from "@/components/offers/OfferDetailsModal";
import { StatsCards } from "@/components/offers/StatsCards";
import { Filters } from "@/components/offers/Filters";
import { ActivityTimeline } from "@/components/offers/ActivityTimeline";

const ClientOffers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'assigned' | 'active' | 'used' | 'expired' | 'converted'>('all');
  const [selectedOffer, setSelectedOffer] = useState<AssignedOffer | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  
  const { assignedOffers, claimOffer, fetchAssignedOffers } = useOffersStore();
  const { toast } = useToast();

  // Load data on component mount
  useEffect(() => {
    fetchAssignedOffers();
  }, [fetchAssignedOffers]);

  // Mock client ID - in a real app, this would come from auth
  const currentClientId = 'c1';
  const clientOffers = assignedOffers.filter((o) => o.clientId === currentClientId);

  // Filter offers
  const filteredOffers = clientOffers.filter((offer) => {
    const matchesStatus = selectedStatus === 'all' || offer.status === selectedStatus;
    const matchesSearch =
      searchQuery === '' ||
      offer.offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.offer.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (offer: AssignedOffer) => {
    setSelectedOffer(offer);
    setDetailsModalOpen(true);
  };

  const handleClaimOffer = (offerId: string) => {
    claimOffer(offerId);
    toast({
      title: "Offer Claimed!",
      description: "You have successfully claimed this offer. It's now active and ready to use.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:translate-x-0`}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </header>
        
        {/* Scrollable Content */}
        <main className="flex-1 pt-24 pb-6 px-4 md:px-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
            {/* Header section with Stats */}
            <div className="space-y-6">
              <div className="px-1">
                 <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / Available Rewards</h1>
                 <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1 shadow-sm">Your Personal Reward Synchronizer</p>
              </div>
              
              <StatsCards assignedOffers={clientOffers} />
            </div>

            {/* Filters */}
            <Filters
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Offers Grid */}
            {filteredOffers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground font-bold uppercase tracking-widest text-[10px] italic">
                Node Scan Result: Zero Matches Found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredOffers.map((assignedOffer) => (
                  <OfferCard
                    key={assignedOffer.id}
                    assignedOffer={assignedOffer}
                    onViewDetails={() => handleViewDetails(assignedOffer)}
                    onClaim={() => handleClaimOffer(assignedOffer.id)}
                    isClient={true}
                  />
                ))}
              </div>
            )}

            {/* Activity Timeline for first active/used offer */}
            {clientOffers.length > 0 && (
              <div className="mt-8 md:mt-12">
                <h2 className="text-sm md:text-lg font-black tracking-tighter text-foreground italic uppercase mb-6 px-1">Sequencer / Recent Activity</h2>
                <ActivityTimeline assignedOffer={clientOffers[0]} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Offer Details Modal */}
      <OfferDetailsModal
        assignedOffer={selectedOffer}
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        onClaim={() => selectedOffer && handleClaimOffer(selectedOffer.id)}
        isClient={true}
      />
    </div>
  );
};

export default ClientOffers;