import { useState } from "react";
import { useOffersStore, AssignedOffer } from "@/store/offersStore";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { OfferCard } from "@/components/offers/OfferCard";
import { OfferDetailsModal } from "@/components/offers/OfferDetailsModal";
import { StatsCards } from "@/components/offers/StatsCards";
import { Filters } from "@/components/offers/Filters";
import { ActivityTimeline } from "@/components/offers/ActivityTimeline";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Offers</h1>
              <p className="text-sm text-muted-foreground">
                View and manage your exclusive offers
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
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