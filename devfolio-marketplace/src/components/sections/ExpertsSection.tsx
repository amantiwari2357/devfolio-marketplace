import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Star, MessageCircle, Share2, Heart, MapPin, Award, Loader2, ChevronRight } from "lucide-react";

import api from "@/services/api";

const categories = [
  "Career", "Data & AI", "Study Abroad", "Software", "HR", "Product & Design", "Others"
];

interface Expert {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string;
  skills: string[];
  bio: string;
  email: string;
  rating?: number;
  connections?: number;
  experience?: string;
  location?: string;
}

const ExpertsSection = () => {
  const navigate = useNavigate();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Fetch experts on component mount
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/experts/all');
        setExperts(response.data.experts || []);
      } catch (err) {
        console.error('Error fetching experts:', err);
        setError('Failed to load experts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Career");
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpert) return;

    // Client-side validation
    if (!enquiryForm.name.trim() || !enquiryForm.email.trim() || !enquiryForm.phone.trim() || !enquiryForm.message.trim()) {
      toast.error("Please fill in all required fields", {
        description: "Name, email, phone and message are mandatory."
      });
      return;
    }

    if (enquiryForm.message.trim().length < 10) {
      toast.error("Message too short", {
        description: "Please describe your requirements in at least 10 characters."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.post('/experts/enquiries', {
        expertId: selectedExpert._id,
        expertName: `${selectedExpert.firstName} ${selectedExpert.lastName}`,
        name: enquiryForm.name,
        email: enquiryForm.email,
        phone: enquiryForm.phone,
        message: enquiryForm.message,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(`Request sent to ${selectedExpert.firstName} ${selectedExpert.lastName}! 🎉`, {
          description: "You'll receive a response within 24 hours on your email/phone."
        });
        setEnquiryForm({ name: "", email: "", phone: "", message: "" });
        setIsDialogOpen(false);
      } else {
        toast.error("Unable to send request", {
          description: "Please try again in a moment."
        });
      }
    } catch (error: any) {
      const serverMsg = error?.response?.data?.message;
      toast.error(serverMsg || "Connection error", {
        description: serverMsg
          ? "Please fix the issue and try again."
          : "Check your internet connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Desktop: show 3 initially, mobile: show all (horizontal scroll)
  const desktopExperts = showAll ? experts : experts.slice(0, 3);

  const renderExpertCard = (expert: Expert) => (
    <Dialog key={expert._id} open={isDialogOpen && selectedExpert?._id === expert._id} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setSelectedExpert(expert)}
          className="group relative overflow-hidden rounded-[32px] bg-card border border-border/60 shadow-md hover:border-primary/40 hover:shadow-xl transition-all duration-300 cursor-pointer p-0 flex flex-col h-full min-w-[280px] md:min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          {/* Profile Header */}
          <div className="h-28 md:h-32 bg-secondary/40 relative w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
              <Star className="w-24 h-24 text-primary" />
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-12 relative z-10 flex flex-col flex-1 w-full">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-bold mb-4 shadow-lg border-4 border-card group-hover:scale-105 transition-transform">
              {expert.firstName[0]}{expert.lastName[0]}
            </div>

            <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight mb-1">{expert.firstName} {expert.lastName}</h3>
            <p className="text-sm font-semibold text-primary mb-5">{expert.role}</p>

            {/* Rating & Connections */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg border border-primary/10">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                <span className="text-xs font-bold">{expert.rating || "4.9"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-lg border border-border/50">
                <MessageCircle className="w-3.5 h-3.5 text-foreground/70" />
                <span className="text-xs font-semibold">{expert.connections || "500+"} Connects</span>
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-3 mb-6 w-full">
              <div className="px-3 py-2.5 rounded-xl bg-secondary/30 border border-border/40">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Region</p>
                <p className="text-xs font-bold truncate">{expert.location || "Remote"}</p>
              </div>
              <div className="px-3 py-2.5 rounded-xl bg-secondary/30 border border-border/40">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Tenure</p>
                <p className="text-xs font-bold truncate">{expert.experience || "5+ Years"}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto w-full">
              <div
                className="flex-1 h-12 rounded-xl font-bold bg-foreground text-background shadow-md hover:shadow-lg group-hover:scale-[1.02] active:scale-95 transition-all text-xs md:text-sm border-none flex items-center justify-center"
              >
                Initiate Connect
              </div>
              <button 
                type="button"
                aria-label="Add to Favorites"
                className="w-12 h-12 shrink-0 rounded-xl hover:bg-red-500 hover:text-white hover:border-none transition-all border border-border/40 bg-secondary/20 flex items-center justify-center group/heart"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle favorite logic
                }}
              >
                <Heart className="w-5 h-5 transition-transform active:scale-125 group-active/heart:scale-125" />
              </button>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-3xl bg-background">
        <div className="h-2 bg-primary"></div>
        <div className="p-8 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {/* Expert Summary */}
          <div className="bg-secondary/30 p-8 rounded-3xl border border-border/50">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
              <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                {expert.firstName[0]}{expert.lastName[0]}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-1">{expert.firstName} {expert.lastName}</h3>
                <p className="text-primary font-semibold mb-4">{expert.role}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5 bg-background px-3 py-1 rounded-full border border-border shadow-sm">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    {expert.rating || "4.9"}
                  </span>
                  <span className="flex items-center gap-1.5 bg-background px-3 py-1 rounded-full border border-border shadow-sm">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    {expert.connections || "500+"}
                  </span>
                  <span className="flex items-center gap-1.5 bg-background px-3 py-1 rounded-full border border-border shadow-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    {expert.location || "Global"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Skills */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                About Expert
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{expert.bio}</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Core Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {expert.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold tracking-wide border border-border/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Connection Request Form */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
            <div className="mb-6">
              <h4 className="text-base font-bold text-foreground mb-2">Start a Collaboration</h4>
              <p className="text-sm text-muted-foreground">Describe your project requirements and get expert insights.</p>
            </div>

            <form onSubmit={handleEnquirySubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-foreground ml-1">Full Name</Label>
                  <Input
                    placeholder="Aman Tiwari"
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    required
                    className="bg-background rounded-xl border-border focus:ring-primary/20 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-foreground ml-1">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="hi@example.com"
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    required
                    className="bg-background rounded-xl border-border focus:ring-primary/20 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground ml-1">WhatsApp / Phone</Label>
                <Input
                  placeholder="+91 XXXXX XXXXX"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                  required
                  className="bg-background rounded-xl border-border focus:ring-primary/20 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-foreground ml-1">Your Vision & Goals</Label>
                <Textarea
                  placeholder="Tell us about what you want to build or the specific guidance you need..."
                  rows={4}
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  required
                  className="bg-background rounded-xl border-border focus:ring-primary/20 min-h-[120px] resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl h-14 text-sm shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending Request...
                  </>
                ) : "Send Connection Request"}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                Direct Response inside 24 Hours
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <section className="section-spacing bg-gradient-to-b from-secondary/30 to-background overflow-hidden relative">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full animate-pulse" />

      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32 animate-slide-up">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary italic mb-8">
            <Award className="w-4 h-4" />
            Elite Global Taskforce
          </div>
          <h2 className="heading-responsive">
            Connect with <span className="text-primary">Top Experts.</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed mt-6 max-w-2xl mx-auto">
            Get personalized guidance from industry leaders. Share your vision and accelerate your digital journey.
          </p>
        </div>

        {/* Horizontal scrollable categories on mobile */}
        <div className="flex flex-nowrap md:flex-wrap overflow-x-auto hide-scrollbar md:justify-center justify-start gap-3 mb-16 md:mb-20 pb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={`h-10 md:h-12 rounded-xl px-6 font-semibold text-xs md:text-sm whitespace-nowrap transition-all border-none flex-shrink-0 ${selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Finding experts...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border">
            <p className="text-destructive mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden overflow-x-auto hide-scrollbar -mx-6 px-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
                {experts.map((expert) => (
                  <div key={expert._id} className="w-[280px] flex-shrink-0">
                    {renderExpertCard(expert)}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid with 3 cards initially */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {desktopExperts.map((expert) => renderExpertCard(expert))}
            </div>

            {/* View All Experts button - desktop only (mobile already shows all in scroll) */}
            {!showAll && experts.length > 3 && (
              <div className="hidden md:flex justify-center mt-12 md:mt-16 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 md:h-16 rounded-2xl md:rounded-[22px] px-10 border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground font-black transition-all shadow-xl shadow-primary/5 uppercase tracking-widest text-[10px] italic border-none gap-2"
                  onClick={() => setShowAll(true)}
                >
                  View All {experts.length} Experts
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ExpertsSection;