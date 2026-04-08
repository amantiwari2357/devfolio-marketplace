import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare } from "lucide-react";
import api from "@/services/api";
import { toast } from "sonner";

export function ReviewModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    role: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/testimonials", formData);
      toast.success("Review submitted! It will appear after admin approval.");
      setOpen(false);
      setFormData({ quote: "", author: "", role: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm flex items-center gap-1">
          Submit a Review
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-[24px] border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
            <MessageSquare className="w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">Share Your Experience</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your feedback helps us improve and helps others make informed decisions.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="author" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name</Label>
            <Input 
              id="author" 
              placeholder="e.g. John Doe"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
              className="h-12 rounded-xl bg-secondary/30 border-border/40 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Role / Company</Label>
            <Input 
              id="role" 
              placeholder="e.g. Founder at TechFlow"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="h-12 rounded-xl bg-secondary/30 border-border/40 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quote" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Review</Label>
            <Textarea 
              id="quote" 
              placeholder="What was your experience like?"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              required
              className="min-h-[120px] rounded-xl bg-secondary/30 border-border/40 focus:ring-primary/20 resize-none"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
