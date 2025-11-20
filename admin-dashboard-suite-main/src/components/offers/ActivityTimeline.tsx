import { AssignedOffer } from "@/store/offersStore";
import { Card } from "@/components/ui/card";
import { Circle, CheckCircle, Clock, XCircle, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityTimelineProps {
  assignedOffer: AssignedOffer;
}

export const ActivityTimeline = ({ assignedOffer }: ActivityTimelineProps) => {
  const events = [
    {
      status: 'assigned',
      label: 'Offer Assigned',
      date: assignedOffer.assignedDate,
      icon: Circle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      completed: true,
    },
    {
      status: 'active',
      label: 'Offer Claimed',
      date: assignedOffer.claimedDate,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      completed: !!assignedOffer.claimedDate,
    },
    {
      status: 'used',
      label: 'Offer Used',
      date: assignedOffer.usedDate,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      completed: !!assignedOffer.usedDate,
    },
    {
      status: 'converted',
      label: 'Converted to Sale',
      date: assignedOffer.convertedDate,
      icon: Sparkles,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      completed: !!assignedOffer.convertedDate,
    },
  ];

  // Add expired event if applicable
  if (assignedOffer.status === 'expired') {
    events.push({
      status: 'expired',
      label: 'Offer Expired',
      date: assignedOffer.expiryDate,
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      completed: true,
    });
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50">
      <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        Activity Timeline
      </h3>
      
      <div className="space-y-4">
        {events.map((event, index) => {
          const Icon = event.icon;
          const isLast = index === events.length - 1;
          
          return (
            <div key={event.status} className="relative flex gap-4">
              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-6 top-12 bottom-0 w-0.5",
                    event.completed ? "bg-primary/30" : "bg-border"
                  )}
                />
              )}

              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                  event.completed ? event.bgColor : "bg-muted",
                  event.completed && "ring-2 ring-offset-2 ring-offset-background",
                  event.completed && event.color.replace('text-', 'ring-')
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5",
                    event.completed ? event.color : "text-muted-foreground"
                  )}
                />
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h4
                  className={cn(
                    "font-semibold",
                    event.completed ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {event.label}
                </h4>
                {event.date && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
                {!event.completed && (
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    Pending
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};