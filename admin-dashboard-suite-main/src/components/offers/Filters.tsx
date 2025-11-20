import { OfferStatus } from "@/store/offersStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FiltersProps {
  selectedStatus: OfferStatus | 'all';
  onStatusChange: (status: OfferStatus | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const statusFilters: Array<{ value: OfferStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All Offers' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'active', label: 'Active' },
  { value: 'used', label: 'Used' },
  { value: 'expired', label: 'Expired' },
  { value: 'converted', label: 'Converted' },
];

export const Filters = ({
  selectedStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
}: FiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by client name or offer title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={selectedStatus === filter.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onStatusChange(filter.value)}
            className="transition-all duration-200"
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};