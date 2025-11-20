import { useState } from "react";
import { useOffersStore, Offer, OfferCategory } from "@/store/offersStore";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Menu, Plus, Gift } from "lucide-react";
import { OffersTable } from "@/components/offers/OffersTable";
import { OfferAssignForm } from "@/components/offers/OfferAssignForm";
import { StatsCards } from "@/components/offers/StatsCards";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminOffers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [offerFormOpen, setOfferFormOpen] = useState(false);
  const [assignFormOpen, setAssignFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<OfferCategory | 'all'>('all');
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const { offers, assignedOffers, addOffer, updateOffer, deleteOffer } = useOffersStore();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "SEO" as OfferCategory,
    terms: "",
    validityDays: 30,
  });

  // Filter offers
  const filteredOffers = offers.filter((offer) => {
    const matchesCategory = categoryFilter === 'all' || offer.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenOfferForm = (offer?: Offer) => {
    if (offer) {
      setEditingOffer(offer);
      setFormData({
        title: offer.title,
        description: offer.description,
        category: offer.category,
        terms: offer.terms,
        validityDays: offer.validityDays,
      });
    } else {
      setEditingOffer(null);
      setFormData({
        title: "",
        description: "",
        category: "SEO",
        terms: "",
        validityDays: 30,
      });
    }
    setOfferFormOpen(true);
  };

  const handleSubmitOffer = () => {
    if (!formData.title || !formData.description || !formData.terms) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingOffer) {
      updateOffer(editingOffer.id, formData);
      toast({
        title: "Offer Updated",
        description: "The offer has been updated successfully.",
      });
    } else {
      const newOffer: Offer = {
        id: `off${Date.now()}`,
        ...formData,
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      addOffer(newOffer);
      toast({
        title: "Offer Created",
        description: "The new offer has been created successfully.",
      });
    }

    setOfferFormOpen(false);
  };

  const handleDeleteOffer = (id: string) => {
    deleteOffer(id);
    toast({
      title: "Offer Deleted",
      description: "The offer has been deleted successfully.",
    });
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    updateOffer(id, { isActive });
    toast({
      title: isActive ? "Offer Activated" : "Offer Deactivated",
      description: `The offer has been ${isActive ? 'activated' : 'deactivated'}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between gap-4 px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Offers Management</h1>
                <p className="text-sm text-muted-foreground">
                  Create and manage client offers
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setAssignFormOpen(true)} variant="outline">
                <Gift className="w-4 h-4 mr-2" />
                Assign Offer
              </Button>
              <Button onClick={() => handleOpenOfferForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Create Offer
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Stats */}
          <StatsCards assignedOffers={assignedOffers} />

          {/* Tabs */}
          <Tabs defaultValue="offers" className="space-y-6">
            <TabsList>
              <TabsTrigger value="offers">All Offers</TabsTrigger>
              <TabsTrigger value="assigned">Assigned Offers</TabsTrigger>
            </TabsList>

            <TabsContent value="offers" className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search offers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={(value) => setCategoryFilter(value as OfferCategory | 'all')}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="SEO">SEO</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Deployment">Deployment</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Audit">Audit</SelectItem>
                    <SelectItem value="Hosting">Hosting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Offers Table */}
              <OffersTable
                offers={filteredOffers}
                onEdit={handleOpenOfferForm}
                onDelete={handleDeleteOffer}
                onToggleActive={handleToggleActive}
              />
            </TabsContent>

            <TabsContent value="assigned" className="space-y-4">
              <div className="text-center py-12 text-muted-foreground">
                View all assigned offers and their status here.
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Create/Edit Offer Dialog */}
      <Dialog open={offerFormOpen} onOpenChange={setOfferFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingOffer ? "Edit Offer" : "Create New Offer"}
            </DialogTitle>
            <DialogDescription>
              {editingOffer
                ? "Update the offer details below."
                : "Fill in the details to create a new offer for your clients."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Offer Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Free SEO Optimization - 1 Month"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as OfferCategory })}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SEO">SEO</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Deployment">Deployment</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Audit">Audit</SelectItem>
                  <SelectItem value="Hosting">Hosting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what this offer includes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="terms">Terms & Conditions *</Label>
              <Textarea
                id="terms"
                placeholder="Enter the terms and conditions..."
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validity">Validity Period (days) *</Label>
              <Input
                id="validity"
                type="number"
                min="1"
                placeholder="30"
                value={formData.validityDays}
                onChange={(e) => setFormData({ ...formData, validityDays: parseInt(e.target.value) || 30 })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={() => setOfferFormOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSubmitOffer} className="flex-1">
                {editingOffer ? "Update Offer" : "Create Offer"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Offer Form */}
      <OfferAssignForm open={assignFormOpen} onClose={() => setAssignFormOpen(false)} />
    </div>
  );
};

export default AdminOffers;