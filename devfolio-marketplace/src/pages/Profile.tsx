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
  ShieldCheck, Zap, Layers, Rocket, Plus, Trash, Github
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { cn } from "@/lib/utils";
import SEO from "@/components/layout/SEO";

import { OnboardingForm } from "@/components/forms/OnboardingForm";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isSubmittingProject, setIsSubmittingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    liveUrl: "",
    githubUrl: "",
    technologies: ""
  });

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmittingProject(true);
    try {
      const updatedPortfolio = [
        ...(user.portfolio || []),
        {
          ...newProject,
          technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean)
        }
      ];
      
      await userAPI.updatePortfolio({ portfolio: updatedPortfolio });
      setUser({ ...user, portfolio: updatedPortfolio });
      setIsAddProjectOpen(false);
      setNewProject({ title: "", description: "", liveUrl: "", githubUrl: "", technologies: "" });
      toast.success("Project added successfully!");
    } catch (error) {
      toast.error("Failed to add project");
    } finally {
      setIsSubmittingProject(false);
    }
  };

  const handleDeleteProject = async (index: number) => {
    if (!user || !user.portfolio) return;
    
    try {
      const updatedPortfolio = user.portfolio.filter((_, i) => i !== index);
      await userAPI.updatePortfolio({ portfolio: updatedPortfolio });
      setUser({ ...user, portfolio: updatedPortfolio });
      toast.success("Project removed.");
    } catch (error) {
      toast.error("Failed to remove project");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile();
        setUser(response.data.user);
      } catch (error) {
        toast.error("Failed to load profile");
        navigate("/login/");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 rounded-[22px] bg-primary/10 flex items-center justify-center text-primary animate-pulse shadow-sm">
           <UserIcon className="w-8 h-8" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <SEO title="Architect Profile" description="Authorized view of the senior technical architect profile and active showcase nodes." />
      <Header />
      
      <div className="flex min-h-screen relative pt-20">
        <AppSidebar activePath="/profile" />
        
        <main id="root-main-content" className="flex-1 relative overflow-hidden pb-20">
          {/* Background Accents */}
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/2 opacity-30 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-secondary/5 opacity-20 blur-[120px] rounded-full" />
          
          <div className="p-4 md:p-6 lg:p-10">
            <div className="max-w-5xl mx-auto space-y-10">
            {/* Profile Header Engine */}
            <Card className="rounded-[40px] bg-secondary/10 border-border/50 p-6 md:p-10 backdrop-blur-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-40 h-40 text-primary" />
               </div>
               
               <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative z-10">
                  <div className="shrink-0 relative group/avatar">
                     <div className="w-32 h-32 md:w-44 md:h-44 rounded-[32px] md:rounded-[40px] overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-1 backdrop-blur-md border border-border/20 shadow-2xl relative">
                        {(user as any)?.imageUrl ? (
                          <img
                            src={(user as any).imageUrl}
                            alt="Architect Profile"
                            className="w-full h-full object-cover rounded-[36px]"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary/50 rounded-[28px] md:rounded-[36px]">
                             <span className="text-4xl md:text-6xl font-black text-primary/40 italic">
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
                     <div className="space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                           <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              Active Status
                           </span>
                           <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground opacity-60">ID: {user?._id?.slice(-8).toUpperCase()}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground leading-none italic lowercase">
                           {user?.username}<span className="text-primary not-italic">.</span>
                        </h1>
                        <p className="text-sm md:text-lg font-bold italic text-muted-foreground/60 max-w-xl mx-auto md:mx-0 leading-relaxed tracking-tight">
                           {user?.bio || "No biography provided. Community member at Devfolio."}
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
                           onClick={() => navigate("/settings/")}
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
                <Card className="md:col-span-1 rounded-[40px] bg-secondary/10 border-border/50 p-6 md:p-8">
                   <header className="mb-6 md:mb-8">
                      <h3 className="text-lg md:text-xl font-black tracking-tight text-foreground flex items-center gap-3 italic uppercase">
                         <Layers className="w-5 h-5 text-primary" />
                         Stack Core
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
                  
                  <CardHeader className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 text-center sm:text-left">
                      <CardTitle className="text-xl md:text-2xl font-black tracking-tight flex items-center justify-center sm:justify-start gap-3 italic uppercase">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                        Asset Launch
                      </CardTitle>
                      <CardDescription className="text-xs md:text-sm font-bold text-muted-foreground italic leading-relaxed opacity-60">
                        Configure project parameters for directory deployment.
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
                      "p-6 md:p-8 pt-0 space-y-6 md:space-y-8 overflow-hidden transition-all duration-700 relative z-10",
                      isOnboardingOpen ? "max-h-[2000px] opacity-100 pb-10 md:pb-12" : "max-h-0 opacity-0 pointer-events-none"
                    )}
                  >
                    <OnboardingForm user={user} onSuccess={() => setIsOnboardingOpen(false)} />
                  </CardContent>
               </Card>
            </div>

            {/* Portfolio Showcase Segment */}
            <div className="mt-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
               <Card className="rounded-[40px] bg-secondary/10 border-border/50 p-6 md:p-10 relative overflow-hidden group">
                  <header className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                     <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-3 italic uppercase">
                        <Rocket className="w-6 h-6 text-primary" />
                        Portfolio Showcase
                     </h2>
                     <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
                       <DialogTrigger asChild>
                         <Button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest gap-2 shadow-lg hover:scale-105 transition-transform">
                           <Plus className="w-4 h-4" />
                           Add Project
                         </Button>
                       </DialogTrigger>
                       <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-xl border-border/50 rounded-[32px] p-6 md:p-8">
                         <DialogHeader>
                           <DialogTitle className="text-xl font-black italic uppercase">Add New Project</DialogTitle>
                           <DialogDescription>Showcase your best work to potential clients.</DialogDescription>
                         </DialogHeader>
                         <form onSubmit={handleAddProject} className="space-y-6 mt-4">
                           <div className="space-y-2">
                             <Label className="text-xs font-bold ml-1">Project Title *</Label>
                             <Input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="rounded-xl h-12 bg-secondary/50" placeholder="e.g. E-Commerce Dashboard" />
                           </div>
                           <div className="space-y-2">
                             <Label className="text-xs font-bold ml-1">Description *</Label>
                             <Textarea required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="rounded-xl min-h-[100px] bg-secondary/50" placeholder="Describe the project..." />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                               <Label className="text-xs font-bold ml-1">Live URL</Label>
                               <Input value={newProject.liveUrl} onChange={e => setNewProject({...newProject, liveUrl: e.target.value})} className="rounded-xl h-12 bg-secondary/50" placeholder="https://" />
                             </div>
                             <div className="space-y-2">
                               <Label className="text-xs font-bold ml-1">GitHub URL</Label>
                               <Input value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} className="rounded-xl h-12 bg-secondary/50" placeholder="https://github.com/" />
                             </div>
                           </div>
                           <div className="space-y-2">
                             <Label className="text-xs font-bold ml-1">Technologies (Comma separated)</Label>
                             <Input value={newProject.technologies} onChange={e => setNewProject({...newProject, technologies: e.target.value})} className="rounded-xl h-12 bg-secondary/50" placeholder="React, Node.js, Tailwind" />
                           </div>
                           <DialogFooter>
                             <Button type="submit" disabled={isSubmittingProject} className="w-full h-12 rounded-xl font-black text-xs uppercase tracking-widest mt-2">{isSubmittingProject ? "Saving..." : "Save Project"}</Button>
                           </DialogFooter>
                         </form>
                       </DialogContent>
                     </Dialog>
                  </header>

                  {user?.portfolio && user.portfolio.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {user.portfolio.map((project, index) => (
                        <div key={index} className="p-6 rounded-[24px] bg-background/50 border border-border/40 hover:border-primary/50 transition-all group/card relative">
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(index)} className="absolute top-4 right-4 h-8 w-8 rounded-full text-destructive/50 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover/card:opacity-100 transition-opacity">
                            <Trash className="w-4 h-4" />
                          </Button>
                          <h3 className="text-xl font-bold tracking-tight mb-2 pr-8">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                          
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.technologies.slice(0, 4).map(tech => (
                                <span key={tech} className="px-3 py-1 rounded-full bg-secondary/80 text-[10px] font-bold uppercase tracking-wider">{tech}</span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-primary hover:underline hover:underline-offset-4">
                                <Globe className="w-3.5 h-3.5" /> Live Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors ml-auto">
                                <Github className="w-3.5 h-3.5" /> Source
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-12 rounded-[24px] bg-background/50 border border-dashed border-border/50">
                      <Rocket className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-foreground mb-2">No Projects Yet</h3>
                      <p className="text-sm text-muted-foreground">Add your first project to start building your portfolio showcase.</p>
                    </div>
                  )}
               </Card>
            </div>
          </div>
        </div>
        <Footer />
        </main>
      </div>
    </div>
  );
};

export default Profile;