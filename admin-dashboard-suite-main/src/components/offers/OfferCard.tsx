import { AssignedOffer } from "@/store/offersStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Clock, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OfferCardProps {
  assignedOffer: AssignedOffer;
  onViewDetails: () => void;
  onClaim?: () => void;
  isClient?: boolean;
}

export const OfferCard = ({ assignedOffer, onViewDetails, onClaim, isClient = false }: OfferCardProps) => {
  const { offer, status, assignedDate, expiryDate, claimedDate } = assignedOffer;

  const getDaysRemaining = () => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const getProgressPercentage = () => {
    const assigned = new Date(assignedDate);
    const expiry = new Date(expiryDate);
    const now = new Date();
    const total = expiry.getTime() - assigned.getTime();
    const elapsed = now.getTime() - assigned.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const daysRemaining = getDaysRemaining();
  const progress = getProgressPercentage();

  return (
    <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {offer.title}
                </h3>
                <p className="text-xs text-muted-foreground">{offer.category}</p>
              </div>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {offer.description}
        </p>

        {/* Expiry Info */}
        {status !== 'expired' && status !== 'used' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{daysRemaining} days remaining</span>
              </div>
              <span className="text-xs font-medium">{Math.round(100 - progress)}%</span>
            </div>
            <Progress value={100 - progress} className="h-1.5" />
          </div>
        )}

        {/* Dates */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Assigned: {new Date(assignedDate).toLocaleDateString()}</span>
          </div>
          {claimedDate && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Claimed: {new Date(claimedDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            View Details
          </Button>
          {isClient && status === 'assigned' && onClaim && (
            <Button
              onClick={onClaim}
              className="flex-1"
              size="sm"
            >
              Claim Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};