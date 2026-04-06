import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { userAPI } from "@/services/auth";
import type { User, OnboardingRequest } from "@/services/auth";
import { toast } from "sonner";
import { 
  Mail, MapPin, Globe, Phone, Edit, Send, 
  CheckCircle2, ChevronDown, ChevronUp, Bell, 
  Eye, Activity, Sparkles, User as UserIcon, 
  ShieldCheck, Zap, Layers, Rocket
} from "lucide-react";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import SEO from "@/components/layout/SEO";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const [onboardingForm, setOnboardingForm] = useState<OnboardingRequest>({
    experience: "",
    portfolio: "",
    reason: "",
    availability: "",
    projectName: "",
    projectDescription: "",
    requirements: "",
    timeline: "",
    budget: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile();
        setUser(response.data.user);
      } catch (error) {
        toast.error("Failed to load profile");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();

    const intervalId = setInterval(async () => {
      if(user) {
        try {
          await userAPI.getOnboardingStatus();
        } catch (error) {}
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleOnboardingSubmit = async () => {
    if (!onboardingForm.projectName || !onboardingForm.projectDescription || !onboardingForm.requirements) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const requestData = {
        ...onboardingForm,
        clientName: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || ""
      };
      
      const response = await userAPI.submitOnboardingRequest(requestData);
      
      if (response && response.data) {
        toast.success("Project onboarding request submitted successfully!");
        setIsOnboardingOpen(false);
        setOnboardingForm({
          experience: "", portfolio: "", reason: "", availability: "",
          projectName: "", projectDescription: "", requirements: "",
          timeline: "", budget: ""
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to submit request";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
           <UserIcon className="w-6 h-6" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Synchronizing Profile Node...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Architect Profile" description="Authorized view of the senior technical architect profile and active showcase nodes." />
      <Header />
      
      <main className="pt-32 pb-32 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-secondary/5 opacity-20 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-10">
            {/* Profile Header Engine */}
            <Card className="rounded-[40px] bg-secondary/10 border-border/50 p-10 backdrop-blur-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-40 h-40 text-primary" />
               </div>
               
               <div className="flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
                  <div className="shrink-0 relative group/avatar">
                     <div className="w-44 h-44 rounded-[40px] overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-1 backdrop-blur-md border border-border/20 shadow-2xl relative">
                        {(user as any)?.imageUrl ? (
                          <img
                            src={(user as any).imageUrl}
                            alt="Architect Profile"
                            className="w-full h-full object-cover rounded-[36px]"
                            fetchPriority="high"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary/50 rounded-[36px]">
                             <span className="text-6xl font-black text-primary/40 italic">
                                {user?.username?.charAt(0).toUpperCase()}
                             </span>
                          </div>
                        )}
                     </div>
                     <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-background border border-border/50 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                        <Activity className="w-6 h-6 animate-pulse" />
                     </div>
                  </div>

                  <div className="flex-1 space-y-6 text-center md:text-left">
                     <div className="space-y-2">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 flex items-center gap-2">
                              <Zap className="w-3 h-3" />
                              Active Node
                           </span>
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">Architect ID: {user?._id?.slice(-8).toUpperCase()}</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-foreground leading-tight italic">
                           {user?.username}
                        </h1>
                        <p className="text-lg font-medium text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed italic">
                           {user?.bio || "No system bio initialized. Senior Architect at Devfolio Directory."}
                        </p>
                     </div>

                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <div className="flex items-center gap-2.5">
                           <Mail className="w-4 h-4 text-primary" />
                           {user?.email}
                        </div>
                        {user?.country && (
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-primary" />
                            {user.country}
                          </div>
                        )}
                        {user?.website && (
                          <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-primary transition-all">
                            <Globe className="w-4 h-4" />
                            {user.website.replace(/^https?:\/\//, '')}
                          </a>
                        )}
                     </div>

                     <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <Button
                           onClick={() => navigate("/settings")}
                           className="h-12 px-8 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all gap-3"
                        >
                           <Edit className="w-4 h-4" />
                           Configure Node
                        </Button>
                        <Button variant="outline" className="h-12 px-8 rounded-2xl border-border/50 bg-secondary/5 font-black text-xs uppercase tracking-widest gap-3">
                           <Bell className="w-4 h-4" />
                           Signals
                        </Button>
                     </div>
                  </div>
               </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-10">
               {/* Expertise Segment */}
               <Card className="md:col-span-1 rounded-[40px] bg-secondary/10 border-border/50 p-8">
                  <header className="mb-8">
                     <h3 className="text-xl font-black tracking-tight text-foreground flex items-center gap-3">
                        <Layers className="w-5 h-5 text-primary" />
                        Technological Stack
                     </h3>
                  </header>
                  <div className="flex flex-wrap gap-2.5">
                     {user?.expertise && user.expertise.length > 0 ? (
                       user.expertise.map((item) => (
                         <div key={item} className="px-5 py-2.5 rounded-xl bg-background shadow-inner border border-border/20 text-[10px] font-black uppercase tracking-widest hover:border-primary/30 transition-all italic">
                            {item}
                         </div>
                       ))
                     ) : (
                        <p className="text-xs font-bold text-muted-foreground opacity-40 uppercase tracking-widest italic pt-4">No logic modules defined.</p>
                     )}
                  </div>
               </Card>

               {/* Project Onboarding Segment */}
               <Card className="md:col-span-2 rounded-[40px] bg-secondary/10 border-border/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                     <Sparkles className="w-32 h-32 text-primary" />
                  </div>
                  
                  <CardHeader className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 text-center sm:text-left">
                      <CardTitle className="text-2xl font-black tracking-tight flex items-center justify-center sm:justify-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                        Asset Initialization
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-muted-foreground italic leading-relaxed">
                        Configure your project parameters to authorize directory deployment.
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setIsOnboardingOpen((prev) => !prev)}
                      className="h-14 px-8 rounded-2xl bg-background/50 backdrop-blur-md border border-border/50 font-black text-xs uppercase tracking-widest gap-4 flex-shrink-0"
                    >
                      <span>Initialize View</span>
                      {isOnboardingOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CardHeader>

                  <CardContent
                    className={cn(
                      "p-8 pt-0 space-y-8 overflow-hidden transition-all duration-700 relative z-10",
                      isOnboardingOpen ? "max-h-[1500px] opacity-100 pb-12" : "max-h-0 opacity-0 pointer-events-none"
                    )}
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2.5">
                        <Label htmlFor="projectName" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Asset Identifier (Name)</Label>
                        <Input
                          id="projectName"
                          className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold px-5"
                          value={onboardingForm.projectName}
                          onChange={(e) => setOnboardingForm({ ...onboardingForm, projectName: e.target.value })}
                          placeholder="Ex. Quantum Architecture"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="timeline" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Deployment Velocity</Label>
                        <Input
                          id="timeline"
                          className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold px-5"
                          value={onboardingForm.timeline}
                          onChange={(e) => setOnboardingForm({ ...onboardingForm, timeline: e.target.value })}
                          placeholder="e.g., Immediate Sync"
                        />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <Label htmlFor="projectDescription" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">System Summary</Label>
                      <Textarea
                        id="projectDescription"
                        className="rounded-2xl bg-background border-border/50 focus:border-primary/50 font-medium p-5 min-h-[120px]"
                        value={onboardingForm.projectDescription}
                        onChange={(e) => setOnboardingForm({ ...onboardingForm, projectDescription: e.target.value })}
                        placeholder="Define the structural scope..."
                      />
                    </div>

                    <div className="space-y-2.5">
                      <Label htmlFor="requirements" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Module Dependencies</Label>
                      <Textarea
                        id="requirements"
                        className="rounded-2xl bg-background border-border/50 focus:border-primary/50 font-medium p-5 min-h-[120px]"
                        value={onboardingForm.requirements}
                        onChange={(e) => setOnboardingForm({ ...onboardingForm, requirements: e.target.value })}
                        placeholder="List critical requirements..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                      <div className="flex-1 space-y-2.5 w-full">
                        <Label htmlFor="budget" className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Value Quantifier</Label>
                        <Input
                          id="budget"
                          className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 font-bold px-5"
                          value={onboardingForm.budget}
                          onChange={(e) => setOnboardingForm({ ...onboardingForm, budget: e.target.value })}
                          placeholder="Enter value bracket"
                        />
                      </div>
                      <Button
                        onClick={handleOnboardingSubmit}
                        disabled={isSubmitting}
                        className="h-20 px-12 rounded-3xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
                      >
                        {isSubmitting ? "Processing..." : "Authorize Module Deployment"}
                      </Button>
                    </div>
                  </CardContent>
               </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;