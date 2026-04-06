import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star, MessageCircle, Share2, Heart, MapPin, Award, Loader2 } from "lucide-react";

import api from "@/services/api";

const categories = [
  "Career", "Data & AI", "Study Abroad", "Software", "HR", "Finance", "Astrology", "Marketing", "Product & Design", "Others"
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
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        toast.success("Connection request sent successfully! 🎉");
        setEnquiryForm({ name: "", email: "", phone: "", message: "" });
        setIsDialogOpen(false);
      } else {
        toast.error("Failed to send connection request");
      }
    } catch (error) {
      toast.error("Error sending connection request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Connect with <span className="text-primary">Top Experts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized guidance from industry leaders. Share your vision and accelerate your digital journey.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={selectedCategory === category ? "bg-foreground text-background hover:bg-foreground/90" : "hover:bg-secondary/50"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert) => (
            <Dialog key={expert._id} open={isDialogOpen && selectedExpert?._id === expert._id} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <div
                  onClick={() => setSelectedExpert(expert)}
                  className="group bg-card rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-border hover:border-primary/20"
                >
                  {/* Profile Header */}
                  <div className="h-32 bg-secondary/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Profile Content */}
                  <div className="px-8 pb-8 -mt-14 relative z-10">
                    <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-4xl font-bold mb-4 shadow-xl border-4 border-card ring-1 ring-border/50">
                      {expert.firstName[0]}{expert.lastName[0]}
                    </div>

                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{expert.firstName} {expert.lastName}</h3>
                    <p className="text-sm font-medium text-muted-foreground mb-4">{expert.role}</p>

                    {/* Rating & Connections */}
                    <div className="flex items-center gap-5 mb-5 text-sm">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full">
                        <Star className="w-4 h-4 fill-primary" />
                        <span className="font-bold">{expert.rating || "4.9"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        <span>{expert.connections || "500+"} connected</span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{expert.location || "Remote"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Award className="w-4 h-4 text-primary" />
                        <span>{expert.experience || "5+ Years Exp."}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {expert.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-[10px] uppercase tracking-wider font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-8 line-clamp-2 leading-relaxed">{expert.bio}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <Button
                        className="flex-1 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl h-12 shadow-md group-hover:shadow-lg transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedExpert(expert);
                          setIsDialogOpen(true);
                        }}
                      >
                        Connect Now
                      </Button>
                      <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl hover:text-primary hover:border-primary/30 transition-all">
                        <Heart className="w-5 h-5 transition-transform active:scale-125" />
                      </Button>
                    </div>
                  </div>
                </div>
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
                        <h3 className="text-3xl font-bold text-foreground mb-1">{expert.firstName} {expert.lastName}</h3>
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
                      <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        About Expert
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{expert.bio}</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
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
                      <h4 className="text-xl font-bold text-foreground mb-2">Start a Collaboration</h4>
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
                        className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl h-14 text-lg shadow-lg"
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExpertsSection;