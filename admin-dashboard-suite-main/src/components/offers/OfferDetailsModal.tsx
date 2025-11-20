import { AssignedOffer } from "@/store/offersStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Clock, FileText, Gift, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface OfferDetailsModalProps {
  assignedOffer: AssignedOffer | null;
  open: boolean;
  onClose: () => void;
  onClaim?: () => void;
  isClient?: boolean;
}

export const OfferDetailsModal = ({
  assignedOffer,
  open,
  onClose,
  onClaim,
  isClient = false,
}: OfferDetailsModalProps) => {
  if (!assignedOffer) return null;

  const { offer, status, assignedDate, expiryDate, claimedDate, clientName } = assignedOffer;

  const getDaysRemaining = () => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{offer.title}</DialogTitle>
              <DialogDescription className="text-base">
                {offer.category} • {offer.validityDays} days validity
              </DialogDescription>
            </div>
            <StatusBadge status={status} />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4" />
              Description
            </h4>
            <p className="text-muted-foreground leading-relaxed">{offer.description}</p>
          </div>

          <Separator />

          {/* Terms & Conditions */}
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4" />
              Terms & Conditions
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{offer.terms}</p>
          </div>

          <Separator />

          {/* Status Information */}
          <div className="grid grid-cols-2 gap-4">
            {!isClient && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  Client Name
                </div>
                <p className="font-medium text-foreground">{clientName}</p>
              </div>
            )}
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Assigned Date
              </div>
              <p className="font-medium text-foreground">
                {new Date(assignedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {claimedDate && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Claimed Date
                </div>
                <p className="font-medium text-foreground">
                  {new Date(claimedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Expiry Date
              </div>
              <p className="font-medium text-foreground">
                {new Date(expiryDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Countdown */}
          {status !== 'expired' && status !== 'used' && (
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Time Remaining</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          {isClient && status === 'assigned' && onClaim && (
            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline" className="flex-1">
                Close
              </Button>
              <Button
                onClick={() => {
                  onClaim();
                  onClose();
                }}
                className="flex-1"
              >
                Claim This Offer
              </Button>
            </div>
          )}

          {(!isClient || status !== 'assigned') && (
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
