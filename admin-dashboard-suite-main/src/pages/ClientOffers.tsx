import { useState } from "react";
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
  
  const { assignedOffers, claimOffer } = useOffersStore();
  const { toast } = useToast();

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
        <main className="flex-1 pt-24 pb-6 px-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <StatsCards assignedOffers={clientOffers} />

            {/* Filters */}
            <Filters
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Offers Grid */}
            {filteredOffers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No offers found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
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