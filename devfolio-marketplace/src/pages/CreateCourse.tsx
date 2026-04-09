import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Sparkles, Zap, ShieldCheck, 
  ChevronRight, Activity, Trash, 
  Fingerprint,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import SEO from "@/components/layout/SEO";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AppSidebar } from "@/components/layout/AppSidebar";

const CreateCourse = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    features: [{ id: 1, text: "High-Fidelity Interface" }]
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await api.get('/auth/profile');
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAddField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { id: Date.now(), text: "" }]
    }));
  };

  const handleRemoveField = (id: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f.id !== id)
    }));
  };

  const handleFeatureChange = (id: number, text: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map(f => f.id === id ? { ...f, text } : f)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    if (formData.features.filter(f => f.text.trim() !== "").length === 0) {
      toast.error("Please add at least one deliverable feature.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.put('/services', {
        services: [{
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          features: formData.features.map(f => f.text).filter(Boolean)
        }]
      });
      toast.success("Service published successfully! 🎉");
      window.location.href = "/services";
    } catch (error) {
      console.error("Error publishing service:", error);
      toast.error("Failed to publish service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-sm">
          <Plus className="w-8 h-8 stroke-[3px]" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Create Service | DevFolio" description="Configure and deploy your expert services to the marketplace." />
      <Header />
      
      <div className="flex min-h-screen relative pt-20">
        <AppSidebar activePath="/createcourse" />

        {/* Main Content Area */}
        <main className="flex-1 bg-background relative selection:bg-primary selection:text-primary-foreground">
          {/* Background effects */}
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
          
          <div className="p-4 md:p-8 lg:p-12 xl:p-20">
            <form onSubmit={handleSubmit} className="max-w-[900px] mx-auto space-y-16 md:space-y-20 animate-slide-up">
              <header className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-5 h-5 text-primary/80" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Service Builder</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  Add Your <span className="text-primary">Expertise.</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
                  Fill in the details below to list your service on the marketplace.
                </p>
              </header>

              <div className="grid gap-10">
                {/* Basic Info */}
                <Card className="p-6 md:p-12 rounded-3xl bg-secondary/10 border-border/40 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-5 transition-all duration-1000 pointer-events-none">
                    <Zap className="w-56 h-56 text-primary" />
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary" />
                    Service Details
                  </h2>

                  <div className="space-y-8 relative z-10">
                    <div className="space-y-2">
                      <Label htmlFor="serviceTitle" className="text-xs font-bold text-foreground ml-1">Service Title *</Label>
                      <Input
                        id="serviceTitle"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Full-Stack Web Development"
                        className="h-12 md:h-14 rounded-xl px-4 bg-background border-border focus:border-primary transition-all text-sm md:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceDescription" className="text-xs font-bold text-foreground ml-1">Service Description *</Label>
                      <Textarea
                        id="serviceDescription"
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe what you offer in detail..."
                        className="rounded-2xl bg-background border-border focus:border-primary transition-all min-h-[150px] p-4 text-sm resize-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="servicePrice" className="text-xs font-bold text-foreground ml-1">Starting Price (INR) *</Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">₹</span>
                          <Input
                            id="servicePrice"
                            type="number"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="4999"
                            className="h-12 md:h-14 pl-10 rounded-xl bg-background border-border focus:border-primary transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceCategory" className="text-xs font-bold text-foreground ml-1">Category *</Label>
                        <select
                          id="serviceCategory"
                          required
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full h-12 md:h-14 rounded-xl px-4 bg-background border border-border focus:border-primary transition-all text-sm outline-none"
                        >
                          <option value="">Select Category</option>
                          <option value="development">Development</option>
                          <option value="design">Design</option>
                          <option value="consultation">Consultation</option>
                          <option value="mentorship">Mentorship</option>
                          <option value="marketing">Marketing</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-xs font-bold text-foreground ml-1">Key Features/Deliverables</Label>
                      <div className="space-y-3">
                        {formData.features.map((feature, index) => (
                          <div key={feature.id} className="flex gap-2">
                            <Input
                              placeholder={`Feature ${index + 1}`}
                              value={feature.text}
                              onChange={(e) => handleFeatureChange(feature.id, e.target.value)}
                              className="h-11 rounded-xl bg-background border-border"
                            />
                            {formData.features.length > 1 && (
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleRemoveField(feature.id)}
                                className="h-11 w-11 rounded-xl text-destructive hover:bg-destructive/10 shrink-0"
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={handleAddField}
                          className="w-full h-11 rounded-xl border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all text-xs font-bold gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Deliverable
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Info Card */}
                <Card className="p-8 md:p-12 rounded-[40px] bg-foreground text-background border-none relative overflow-hidden group shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-40" />
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                      <ShieldCheck className="w-64 h-64 text-background" />
                  </div>
                  
                  <div className="space-y-4 mb-8 relative z-10">
                     <div className="flex items-center gap-2 text-primary">
                        <Zap className="w-4 h-4 fill-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Creator Advantage</span>
                     </div>
                     <h2 className="text-2xl font-bold tracking-tight leading-none uppercase italic">Earn More <span className="text-primary not-italic">Directly.</span></h2>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                    {[
                      "Zero Commission Fees",
                      "Direct Client Communication",
                      "Simplified Booking Engine",
                      "Built-in Analytics"
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-background/10 backdrop-blur-md flex items-center justify-center text-primary shrink-0">
                            <Zap className="w-4 h-4 fill-primary" />
                         </div>
                         <p className="text-xs font-bold uppercase tracking-wide opacity-80">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="h-14 flex-1 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      Publish Service
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className="h-14 flex-1 rounded-xl border-border/40 bg-secondary/10 font-bold hover:bg-secondary/20 transition-all"
                >
                  Save Draft
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-muted-foreground/30 italic pt-6">
                 <Fingerprint className="w-4 h-4" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Verified Creator Required</span>
              </div>
            </form>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;
