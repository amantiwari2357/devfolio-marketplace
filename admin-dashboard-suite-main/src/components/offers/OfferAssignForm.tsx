import { useState, useEffect } from "react";
import { useOffersStore } from "@/store/offersStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Gift, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

interface OfferAssignFormProps {
  open: boolean;
  onClose: () => void;
}

interface Client {
  id: string;
  email: string;
  username?: string;
}

export const OfferAssignForm = ({ open, onClose }: OfferAssignFormProps) => {
  const { offers, assignOffer } = useOffersStore();
  const { toast } = useToast();
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedOffer, setSelectedOffer] = useState<string>("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const fetchClients = async () => {
      setLoading(true);
      try {
        const res = await api.get("/users/all");
        if (mounted) setClients(res.data.users || []);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load clients.",
          variant: "destructive",
        });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchClients();
    return () => {
      mounted = false;
    };
  }, []);

  const activeOffers = offers.filter((o) => o.isActive);
  const selectedOfferData = offers.find((o) => o.id === selectedOffer);

  const handleSubmit = async () => {
    if (!selectedClient || !selectedOffer) {
      toast({
        title: "Missing Information",
        description: "Please select both a client and an offer.",
        variant: "destructive",
      });
      return;
    }

    const client = clients.find((c) => c.id === selectedClient);
    if (!client) return;

    try {
      await assignOffer(selectedOffer, selectedClient, client.username || client.email);
      toast({
        title: "Offer Assigned Successfully",
        description: `${selectedOfferData?.title} has been assigned to ${client.username || client.email}`,
      });

      setSelectedClient("");
      setSelectedOffer("");
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Assign Offer to Client</DialogTitle>
          <DialogDescription>
            Select a client and an offer to assign. The client will receive the offer details via email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Client Selection */}
          <div className="space-y-2">
            <Label htmlFor="client">Select Client</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient} disabled={loading}>
              <SelectTrigger id="client">
                <SelectValue placeholder={loading ? "Loading clients..." : "Choose a client..."} />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{client.username || client.email}</span>
                      <span className="text-xs text-muted-foreground">{client.email}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Offer Selection */}
          <div className="space-y-2">
            <Label htmlFor="offer">Select Offer</Label>
            <Select value={selectedOffer} onValueChange={setSelectedOffer}>
              <SelectTrigger id="offer">
                <SelectValue placeholder="Choose an offer..." />
              </SelectTrigger>
              <SelectContent>
                {activeOffers.map((offer) => (
                  <SelectItem key={offer.id} value={offer.id}>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      <span>{offer.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Offer Preview */}
          {selectedOfferData && (
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{selectedOfferData.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedOfferData.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Validity: <span className="font-medium text-foreground">{selectedOfferData.validityDays} days</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Category: <span className="font-medium text-foreground">{selectedOfferData.category}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedClient || !selectedOffer}
              className="flex-1"
            >
              Assign Offer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};  